// == SHARED ==

class VideoSystem {
  #program;

  #ops = {
    addx: value => this.#x += value,
    noop: () => {},
  };
  #ticksNeeded = {
    addx: 2,
    noop: 1,
  };

  #nextInstruction = {op: "noop"};
  #ticksRemaining = 0;

  #x = 1;

  constructor(program) {
    this.#program = program;
  }

  runCycle() {
    if (this.#ticksRemaining === 0) {
      let {op, value} = this.#nextInstruction;
      this.#ops[op](value);

      this.#nextInstruction = this.#program.shift();
      this.#ticksRemaining = this.#ticksNeeded[this.#nextInstruction.op];
    }

    this.#ticksRemaining--;

    return this.#x;
  }
}

// == PART 1 ==

function part1(input) {
  input = input
    .split("\n")
    .map(line => {
      let [, op,value] = line.match(/^(\w+)(?: (-?\d+))?$/);
      return {op, value: Number(value)};
    });

  let system = new VideoSystem(input);
  let output = 0;

  for (let cycle = 1; cycle <= 240; cycle++) {
    let x = system.runCycle();

    if (cycle % 40 === 20) {
      output += cycle * x;
    }
  }

  return output;
}

// == PART 2 ==

function part2(input) {
  input = input
    .split("\n")
    .map(line => {
      let [, op,value] = line.match(/^(\w+)(?: (-?\d+))?$/);
      return {op, value: Number(value)};
    });

  let system = new VideoSystem(input);
  let crtOutput = "";

  for (let cycle = 1; cycle <= 240; cycle++) {
    let spritePos = system.runCycle();
    let crtPos = (cycle - 1) % 40;

    if (Math.abs(spritePos - crtPos) <= 1) crtOutput += "█";
    else crtOutput += "░";

    if (crtPos === 39) crtOutput += "\n";
  }

  return crtOutput.trimEnd();
}

// == ASSERTS ==

let exampleProgram =
`addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

console.assert(part1(exampleProgram) === 13140);

console.assert(part2(exampleProgram) ===
`██░░██░░██░░██░░██░░██░░██░░██░░██░░██░░
███░░░███░░░███░░░███░░░███░░░███░░░███░
████░░░░████░░░░████░░░░████░░░░████░░░░
█████░░░░░█████░░░░░█████░░░░░█████░░░░░
██████░░░░░░██████░░░░░░██████░░░░░░████
███████░░░░░░░███████░░░░░░░███████░░░░░`);
