// == SHARED ==

class IntcodeComputer {
  constructor(memory) {
    this.memory = [...memory];
    this.input = [];
    this.output = [];
    this.pointer = 0;
    this.relBase = 0;
    this.instructions = this.getInstructions();
  }

  run(input) {
    this.input = this.input
      .concat(input === undefined ? [] : input)
      .flatMap(data => typeof data === "string" ? [...data].map(char => char.charCodeAt(0)) : data);
    try {
      while (true) this.runNext();
    } catch (signal) {
      if (signal === "HALT" || signal === "NO_INPUT") {
        this.isHalted = signal === "HALT";
        let output = this.output;
        this.output = [];
        return output;
      }
      else throw signal;
    }
  }

  runNext() {
    let opcode = this.memory[this.pointer] % 100;
    this.instructions[opcode]();
  }

  getInstructions() {
    return {
      1: this.createInstruction(3, ({param, set}) => set(3, param(1) + param(2))),
      2: this.createInstruction(3, ({param, set}) => set(3, param(1) * param(2))),
      3: this.createInstruction(1, ({input, set}) => set(1, input())),
      4: this.createInstruction(1, ({param, output}) => output(param(1))),
      5: this.createInstruction(2, ({param, goto}) => param(1) && goto(param(2))),
      6: this.createInstruction(2, ({param, goto}) => param(1) || goto(param(2))),
      7: this.createInstruction(3, ({param, set}) => set(3, param(1) < param(2) ? 1 : 0)),
      8: this.createInstruction(3, ({param, set}) => set(3, param(1) === param(2) ? 1 : 0)),
      9: this.createInstruction(1, ({param, offset}) => offset(param(1))),
      99: this.createInstruction(1, ({halt}) => halt()),
    };
  }

  createInstruction(numberOfParams, handler) {
    return () => {
      let params = this.memory.slice(this.pointer + 1, this.pointer + numberOfParams + 1);
      let modes = [...Math.floor(this.memory[this.pointer] / 100).toString()].reverse().map(Number);
      let nextPointer = this.pointer + 1 + numberOfParams;
      handler({
        param: paramNr => {
          switch (modes[paramNr - 1]) {
            case 1: return params[paramNr - 1];
            case 2: return this.memory[params[paramNr - 1] + this.relBase] || 0;
            default: return this.memory[params[paramNr - 1]] || 0;
          }
        },
        set: (paramNr, value) => {
          switch (modes[paramNr - 1]) {
            case 2: return this.memory[params[paramNr - 1] + this.relBase] = value;
            default: return this.memory[params[paramNr - 1]] = value;
          }
        },
        halt: () => {throw "HALT"},
        goto: pointer => nextPointer = pointer,
        input: () => {
          if (this.input.length === 0) throw "NO_INPUT";
          return this.input.shift();
        },
        output: value => this.output.push(value),
        offset: value => this.relBase += value,
      });
      this.pointer = nextPointer;
    };
  }
}

function chunkThree(array) {
  return array.reduce((acc, element, index) => {
    if (index % 3 === 0) acc.push([]);
    acc[acc.length - 1].push(element);
    return acc;
  }, []);
}

// == PART 1 ==

function part1(program) {
  program = program.split(",").map(Number);

  let computers = Array.from({length: 50}).map((_, address) => {
    let computer = new IntcodeComputer(program);
    computer.queue = [];
    computer.run(address);
    return computer;
  });

  while (true) {
    for (let computer of computers) {
      let output;
      if (computer.queue.length > 0) {
        output = computer.run(computer.queue)
        computer.queue = [];
      } else {
        output = computer.run(-1);
      }

      if (output.length) {
        output = chunkThree(output);
        for (let [address, x, y] of output) {
          if (address === 255) {
            return y;
          }
          computers[address].queue.push(x, y);
        }
      }
    }
  }
}

// == PART 2 ==

function part2(program) {
  program = program.split(",").map(Number);

  let computers = Array.from({length: 50}).map((_, address) => {
    let computer = new IntcodeComputer(program);
    computer.queue = [];
    computer.run(address);
    return computer;
  });

  let nat;
  let deliveredYs = new Set();

  while (true) {
    let idle = true;
    for (let computer of computers) {
      let output;
      if (computer.queue.length > 0) {
        idle = false;
        output = computer.run(computer.queue)
        computer.queue = [];
      } else {
        output = computer.run(-1);
      }

      if (output.length) {
        idle = false;
        output = chunkThree(output);
        for (let [address, x, y] of output) {
          if (address === 255) {
            nat = {x, y};
          } else {
            computers[address].queue.push(x, y);
          }
        }
      }
    }

    if (idle) {
      if (deliveredYs.has(nat.y)) {
        return nat.y;
      }
      deliveredYs.add(nat.y);
      computers[0].queue.push(nat.x, nat.y);
    }
  }
}

// == ASSERTS ==

// no runnable examples today
