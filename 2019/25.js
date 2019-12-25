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

// == PART 1 ==

function part1(program) {
  program = program.split(",").map(Number);
  let computer = new IntcodeComputer(program);

  let instructions = [
    "south",
    "take space heater",
    "east",
    "north",
    "west",
    "south",
    "take antenna",
    "north",
    "east",
    "south",
    "east",
    "north",
    "take klein bottle",
    "north",
    "take spool of cat6",
    "west",
    "north",
    "north",
  ].join("\n");

  let output = computer.run(instructions).map(e => String.fromCharCode(e)).join("");
  let code = output.match(/You should be able to get in by typing (\d+) on the keypad at the main airlock./)[1];

  return code;
}

// == PART 2 ==

// Warp drive aligned :)

// == ASSERTS ==

// no runnable examples today
