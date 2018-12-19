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

  let reg = [0, 0, 0, 0, 0, 0];

  while (reg[ip] < input.length) {
    let {op, args} = input[reg[ip]];
    ops[op](reg, ...args);
    reg[ip]++;
  }

  return reg[0] - (ip === 0 ? 1 : 0);
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

  let reg = [1, 0, 0, 0, 0, 0];

  while (reg[ip] < input.length - 1) {
    let {op, args} = input[reg[ip]];
    ops[op](reg, ...args);
    reg[ip]++;
  }

  // Manually decompiled: when last instruction is reached, take the largest number
  // in registers and return a sum of all its divisors including 1 and itself

  let sum = 0;
  let base = Math.max(...reg);

  for (let divisor = 1; divisor <= Math.sqrt(base); divisor++) {
    if (base % divisor === 0) {
      sum += divisor;
      sum += base / divisor;
    }
  }

  return sum;
}

// == ASSERTS ==

console.assert(part1("#ip 0\nseti 5 0 1\nseti 6 0 2\naddi 0 1 0\naddr 1 2 3\nsetr 1 0 0\nseti 8 0 4\nseti 9 0 5") === 6);

// No testing data provided for PART 2
