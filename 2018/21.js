// == PART 1 ==

function part1(input) {
  let ip;
  [ip, ...input] = input.split("\n").map((instruction, i) => {
    if (i === 0) {
      return Number(instruction.match(/^#ip (\d+)$/)[1]);
    } else {
      let [, op, a, b, c] = instruction.match(/^(\w+) (\d+) (\d+) (\d+)$/);
      let args = [a, b, c].map(Number);
      return {op, args};
    }
  });

  let ops = {
    addr: (reg, a, b, c) => reg[c] = reg[a] + reg[b],
    addi: (reg, a, b, c) => reg[c] = reg[a] + b,

    mulr: (reg, a, b, c) => reg[c] = reg[a] * reg[b],
    muli: (reg, a, b, c) => reg[c] = reg[a] * b,

    banr: (reg, a, b, c) => reg[c] = reg[a] & reg[b],
    bani: (reg, a, b, c) => reg[c] = reg[a] & b,

    borr: (reg, a, b, c) => reg[c] = reg[a] | reg[b],
    bori: (reg, a, b, c) => reg[c] = reg[a] | b,

    setr: (reg, a, b, c) => reg[c] = reg[a],
    seti: (reg, a, b, c) => reg[c] = a,
    
    gtir: (reg, a, b, c) => reg[c] = a > reg[b] ? 1 : 0,
    gtri: (reg, a, b, c) => reg[c] = reg[a] > b ? 1 : 0,
    gtrr: (reg, a, b, c) => reg[c] = reg[a] > reg[b] ? 1 : 0,

    eqir: (reg, a, b, c) => reg[c] = a == reg[b] ? 1 : 0,
    eqri: (reg, a, b, c) => reg[c] = reg[a] == b ? 1 : 0,
    eqrr: (reg, a, b, c) => reg[c] = reg[a] == reg[b] ? 1 : 0,
  };

  let reg = [-1, 0, 0, 0, 0, 0];

  while (reg[ip] < input.length) {
    let {op, args} = input[reg[ip]];
    ops[op](reg, ...args);
    reg[ip]++;

    if (op === "eqrr") {
      return reg[args[0]];
    }
  }
}

// == PART 2 ==

function part2(input) {
  let ip;
  [ip, ...input] = input.split("\n").map((instruction, i) => {
    if (i === 0) {
      return Number(instruction.match(/^#ip (\d+)$/)[1]);
    } else {
      let [, op, a, b, c] = instruction.match(/^(\w+) (\d+) (\d+) (\d+)$/);
      let args = [a, b, c].map(Number);
      return {op, args};
    }
  });

  let ops = {
    addr: (reg, a, b, c) => reg[c] = reg[a] + reg[b],
    addi: (reg, a, b, c) => reg[c] = reg[a] + b,

    mulr: (reg, a, b, c) => reg[c] = reg[a] * reg[b],
    muli: (reg, a, b, c) => reg[c] = reg[a] * b,

    banr: (reg, a, b, c) => reg[c] = reg[a] & reg[b],
    bani: (reg, a, b, c) => reg[c] = reg[a] & b,

    borr: (reg, a, b, c) => reg[c] = reg[a] | reg[b],
    bori: (reg, a, b, c) => reg[c] = reg[a] | b,

    setr: (reg, a, b, c) => reg[c] = reg[a],
    seti: (reg, a, b, c) => reg[c] = a,
    
    gtir: (reg, a, b, c) => reg[c] = a > reg[b] ? 1 : 0,
    gtri: (reg, a, b, c) => reg[c] = reg[a] > b ? 1 : 0,
    gtrr: (reg, a, b, c) => reg[c] = reg[a] > reg[b] ? 1 : 0,

    eqir: (reg, a, b, c) => reg[c] = a == reg[b] ? 1 : 0,
    eqri: (reg, a, b, c) => reg[c] = reg[a] == b ? 1 : 0,
    eqrr: (reg, a, b, c) => reg[c] = reg[a] == reg[b] ? 1 : 0,
  };

  let reg = [-1, 0, 0, 0, 0, 0];
  let possibleInts = new Set();
  let lastCheckedInt;

  while (reg[ip] < input.length) {
    let {op, args} = input[reg[ip]];
    ops[op](reg, ...args);
    reg[ip]++;

    if (op === "eqrr") {
      let int = reg[args[0]];

      if (possibleInts.has(int)) return lastCheckedInt;

      possibleInts.add(int);
      lastCheckedInt = int;
    }
  }
}

// == ASSERTS ==

// No testing data provided
