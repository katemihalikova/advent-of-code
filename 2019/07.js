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
    this.input = [];
    this.output = [];
    this.pointer = 0;
    this.instructions = {
      1: instruction(3)(({param, set}) => set(3, param(1) + param(2))),
      2: instruction(3)(({param, set}) => set(3, param(1) * param(2))),
      3: instruction(1)(({set}) => {
        if (this.input.length === 0) {
          throw 'NO_INPUT';
        } else {
          set(1, this.input.shift());
        }
      }),
      4: instruction(1)(({param}) => this.output.push(param(1))),
      5: instruction(2)(({param, goto}) => param(1) && goto(param(2))),
      6: instruction(2)(({param, goto}) => param(1) || goto(param(2))),
      7: instruction(3)(({param, set}) => set(3, param(1) < param(2) ? 1 : 0)),
      8: instruction(3)(({param, set}) => set(3, param(1) === param(2) ? 1 : 0)),
      99: instruction(1)(() => {throw 'HALT'}),
    };
  }

  run(input) {
    this.input = this.input.concat(input === undefined ? [] : input);
    try {
      this.runNext();
    } catch (signal) {
      if (signal === 'HALT' || signal === 'NO_INPUT') {
        this.isHalted = signal === 'HALT';
        let output = this.output;
        this.output = [];
        return output;
      }
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

let getPermutations = elements => {
  if (elements.length === 1) return [elements];
  let result = [];
  elements.forEach((element, index) => {
    let remainingElements = [...elements];
    remainingElements.splice(index, 1);
    result.push(...getPermutations(remainingElements).map(permutation => [element, ...permutation]));
  })
  return result;
}

// == PART 1 ==

function part1(program) {
  program = program.split(",").map(Number);

  return getPermutations([0, 1, 2, 3, 4])
    .map(phases => phases.reduce((io, phase) => new IntcodeComputer(program).run([phase, io]).pop(), 0))
    .reduce((max, output) => output > max ? output : max, 0);
}

// == PART 2 ==

function part2(program) {
  program = program.split(",").map(Number);

  return getPermutations([5, 6, 7, 8, 9])
    .map(phases => {
      let amplifiers = phases.map(phase => {
        let amplifier = new IntcodeComputer(program);
        amplifier.run(phase);
        return amplifier;
      });

      let io = 0;
      while(true) {
        io = amplifiers.reduce((io, amplifier) => amplifier.run([io]).pop(), io);
        if (amplifiers.some(amplifier => amplifier.isHalted)) return io;
      }
    })
    .reduce((max, output) => output > max ? output : max, 0);
}

// == ASSERTS ==

console.assert(part1(`3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0`) === 43210);
console.assert(part1(`3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0`) === 54321);
console.assert(part1(`3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0`) === 65210);

console.assert(part2(`3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5`) === 139629729);
console.assert(part2(`3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10`) === 18216);
