// == SHARED ==

type ThreeBitNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

class ChronospatialComputer {
  #registerA: number;
  #registerB: number;
  #registerC: number;
  #pointer = 0;
  #output: ThreeBitNumber[] = [];

  constructor(registerA: number, registerB: number, registerC: number) {
    this.#registerA = registerA;
    this.#registerB = registerB;
    this.#registerC = registerC;
  }

  runProgram(program: ThreeBitNumber[]): ThreeBitNumber[] {
    while (this.#pointer < program.length) {
      let opcode = program[this.#pointer];
      let operand = program[this.#pointer + 1];
      this.#instructions[opcode](operand);
    }
    return this.#output;
  }

  #instructions: Array<(n: ThreeBitNumber) => void> = [
    operand => { // adv
      this.#registerA = (this.#registerA / (2 ** this.#comboOperand(operand))) >>> 0;
      this.#pointer += 2;
    },
    operand => { // bxl
      this.#registerB = (operand ^ this.#registerB) >>> 0;
      this.#pointer += 2;
    },
    operand => { // bst
      this.#registerB = this.#comboOperand(operand) % 8;
      this.#pointer += 2;
    },
    operand => { // jnz
      if (this.#registerA === 0) {
        this.#pointer += 2;
      } else {
        this.#pointer = operand;
      }
    },
    () => { // bxc
      this.#registerB = (this.#registerB ^ this.#registerC) >>> 0;
      this.#pointer += 2;
    },
    operand => { // out
      this.#output.push(this.#comboOperand(operand) % 8 as ThreeBitNumber);
      this.#pointer += 2;
    },
    operand => { // bdv
      this.#registerB = (this.#registerA / (2 ** this.#comboOperand(operand))) >>> 0;
      this.#pointer += 2;
    },
    operand => { // cdv
      this.#registerC = (this.#registerA / (2 ** this.#comboOperand(operand))) >>> 0;
      this.#pointer += 2;
    },
  ];

  #comboOperand(n: ThreeBitNumber): number | ThreeBitNumber {
    if (n <= 3) return n;
    if (n === 4) return this.#registerA;
    if (n === 5) return this.#registerB;
    if (n === 6) return this.#registerC;
    throw "Invalid combo value";
  }
}

// == PART 1 ==

function part1(input: string): string {
  let [registerA, registerB, registerC, ...program] = input.match(/\d+/g)!.map(Number);
  let computer = new ChronospatialComputer(registerA, registerB, registerC);
  return computer.runProgram(program as ThreeBitNumber[]).join(",");
}

// == PART 2 ==

function part2(input: string): number {
  let [, registerB, registerC, ...program] = input.match(/\d+/g)!.map(Number);

  for (let registerA = 1;; registerA++) {
    let computer = new ChronospatialComputer(registerA, registerB, registerC);
    let output = computer.runProgram(program as ThreeBitNumber[]);

    if (program.length === output.length && program.every((_, index) => program[index] === output[index])) return registerA;
  }
}

// For real input, some manual reverse-engineering has been done

// == ASSERTS ==

console.assert(part1(`\
Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`) === "4,6,3,5,6,3,5,2,1,0");

console.assert(part2(`\
Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`) === 117440);
