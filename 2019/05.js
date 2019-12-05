// == SHARED ==

let instruction = numberOfParams => instructionFn => (memory, pointer) => {
  let params = memory.slice(pointer + 1, pointer + numberOfParams + 1);
  let modes = [...Math.floor(memory[pointer] / 100).toString()].reverse().map(Number);
  let gotoPointer;
  instructionFn({
    param: paramNr => (modes[paramNr - 1] ? params[paramNr - 1] : memory[params[paramNr - 1]]) || 0,
    set: (paramNr, value) => memory[params[paramNr - 1]] = value,
    goto: pointer => gotoPointer = pointer,
  });
  return gotoPointer || pointer + 1 + numberOfParams;
};

class IntcodeComputer {
  constructor(memory) {
    this.memory = [...memory];
    this.output = [];
    this.pointer = 0;
    this.instructions = {
      1: instruction(3)(({param, set}) => set(3, param(1) + param(2))),
      2: instruction(3)(({param, set}) => set(3, param(1) * param(2))),
      3: instruction(1)(({set}) => set(1, this.input.shift())),
      4: instruction(1)(({param}) => this.output.push(param(1))),
      5: instruction(2)(({param, goto}) => param(1) && goto(param(2))),
      6: instruction(2)(({param, goto}) => param(1) || goto(param(2))),
      7: instruction(3)(({param, set}) => set(3, param(1) < param(2) ? 1 : 0)),
      8: instruction(3)(({param, set}) => set(3, param(1) === param(2) ? 1 : 0)),
      99: instruction(1)(() => {throw 'HALT'}),
    };
  }

  run(input) {
    this.input = [].concat(input || []);
    try {
      this.runNext();
    } catch (signal) {
      if (signal === 'HALT') return this.output;
      else throw signal;
    }
  }

  runNext() {
    let opcode = this.memory[this.pointer] % 100;
    let instruction = this.instructions[opcode];
    this.pointer = instruction(this.memory, this.pointer);
    this.runNext();
  }
}

// == PARTS 1 & 2 ==

function part(program, input) {
  program = program.split(",").map(Number);

  return new IntcodeComputer(program).run(input).pop();
}

// == ASSERTS ==

let isNonZeroV1 = "3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9";
console.assert(part(isNonZeroV1, 0) === 0);
console.assert(part(isNonZeroV1, 1) === 1);
console.assert(part(isNonZeroV1, 5) === 1);

let isNonZeroV2 = "3,3,1105,-1,9,1101,0,0,12,4,12,99,1";
console.assert(part(isNonZeroV2, 0) === 0);
console.assert(part(isNonZeroV2, 1) === 1);
console.assert(part(isNonZeroV2, 5) === 1);

let isEightV1 = "3,9,8,9,10,9,4,9,99,-1,8";
console.assert(part(isEightV1, 5) === 0);
console.assert(part(isEightV1, 7) === 0);
console.assert(part(isEightV1, 8) === 1);
console.assert(part(isEightV1, 9) === 0);
console.assert(part(isEightV1, 17) === 0);

let isEightV2 = "3,3,1108,-1,8,3,4,3,99";
console.assert(part(isEightV2, 5) === 0);
console.assert(part(isEightV2, 7) === 0);
console.assert(part(isEightV2, 8) === 1);
console.assert(part(isEightV2, 9) === 0);
console.assert(part(isEightV2, 17) === 0);

let isLessThanEightV1 = "3,9,7,9,10,9,4,9,99,-1,8";
console.assert(part(isLessThanEightV1, 5) === 1);
console.assert(part(isLessThanEightV1, 7) === 1);
console.assert(part(isLessThanEightV1, 8) === 0);
console.assert(part(isLessThanEightV1, 9) === 0);
console.assert(part(isLessThanEightV1, 17) === 0);

let isLessThanEightV2 = "3,3,1107,-1,8,3,4,3,99";
console.assert(part(isLessThanEightV2, 5) === 1);
console.assert(part(isLessThanEightV2, 7) === 1);
console.assert(part(isLessThanEightV2, 8) === 0);
console.assert(part(isLessThanEightV2, 9) === 0);
console.assert(part(isLessThanEightV2, 17) === 0);

let compareToEight = "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99";
console.assert(part(compareToEight, 5) === 999);
console.assert(part(compareToEight, 7) === 999);
console.assert(part(compareToEight, 8) === 1000);
console.assert(part(compareToEight, 9) === 1001);
console.assert(part(compareToEight, 17) === 1001);
