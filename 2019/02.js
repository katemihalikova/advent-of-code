
// == SHARED ==

let createInstruction = numberOfParams => instructionFn => (memory, pointer) => {
  let params = memory.slice(pointer + 1, pointer + numberOfParams + 1);
  instructionFn(memory, params);
  return pointer + 1 + numberOfParams;
};

class IntcodeComputer {
  constructor(memory) {
    this.memory = [...memory];
    this.pointer = 0;
    this.instructions = {
      1: createInstruction(3)((memory, [param1, param2, param3]) => memory[param3] = memory[param1] + memory[param2]),
      2: createInstruction(3)((memory, [param1, param2, param3]) => memory[param3] = memory[param1] * memory[param2]),
      99: createInstruction(0)(() => {throw 'HALT'}),
    };
  }

  run() {
    try {
      this.runNext();
    } catch (signal) {
      if (signal === 'HALT') return this.memory[0];
      else throw signal;
    }
  }

  runNext() {
    let instruction = this.instructions[this.memory[this.pointer]];
    this.pointer = instruction(this.memory, this.pointer);
    this.runNext();
  }
}

// == PART 1 ==

function part1(input) {
  input = input.split(",").map(Number);

  // input[1] = 12;
  // input[2] = 2;

  return new IntcodeComputer(input).run();
}

// == PART 2 ==

function part2(input) {
  input = input.split(",").map(Number);

  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      input[1] = noun;
      input[2] = verb;

      let output = new IntcodeComputer(input).run();
      if (output === 19690720) return 100 * noun + verb;
    }
  }
}

// == ASSERTS ==

console.assert(part1("1,0,0,0,99") === 2);
console.assert(part1("2,3,0,3,99") === 2);
console.assert(part1("2,4,4,0,99,0") === 9801);
console.assert(part1("1,1,1,4,99,5,6,0,99") === 30);

console.assert(part2("2,0,0,0,2,11,0,0,99,0,0,16,0,0,0,0,70,0,0,0,0,17581") === 1621);
