// == PART 1 ==

function part1(samples) {
  samples = samples.split("\n\n").map(sample => {
    let [, b0, b1, b2, b3, a, b, c, a0, a1, a2, a3] = sample
      .match(/^Before: \[(\d+), (\d+), (\d+), (\d+)\]\n\d+ (\d+) (\d+) (\d+)\nAfter:  \[(\d+), (\d+), (\d+), (\d+)\]$/)
      .map(Number);
    return {before: [b0, b1, b2, b3], args: [a, b, c], after: [a0, a1, a2, a3]};
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

  return samples.filter(({args, before, after}) => {
    let opsMatched = Object.values(ops).filter(op => {
      let reg = [...before];
      op(reg, ...args);
      return after.every((expected, i) => expected === reg[i]);
    })
    return opsMatched.length >= 3;
  }).length;
}

// == PART 2 ==

function part2(samples, input) {
  samples = samples.split("\n\n").map(sample => {
    let [, b0, b1, b2, b3, opCode, a, b, c, a0, a1, a2, a3] = sample
      .match(/^Before: \[(\d+), (\d+), (\d+), (\d+)\]\n(\d+) (\d+) (\d+) (\d+)\nAfter:  \[(\d+), (\d+), (\d+), (\d+)\]$/)
      .map(Number);
    return {before: [b0, b1, b2, b3], opCode, args: [a, b, c], after: [a0, a1, a2, a3]};
  });

  input = input.split("\n").map(id => id.split(" ").map(Number));

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

  let candidates = new Map(Object.values(ops).map(op => [op, new Set()]));

  samples.forEach(({opCode, args, before, after}) => {
    candidates.forEach((possibleOpCodes, op) => {
      let reg = [...before];
      op(reg, ...args);

      if (after.every((expected, i) => expected === reg[i])) {
        possibleOpCodes.add(opCode);
      }
    });
  });

  let opCodes = {};

  while (true) {
    let knownOpCodes = new Set();

    candidates.forEach((possibleOpCodes, op) => {
      if (possibleOpCodes.size === 1) {
        let opCode = possibleOpCodes.values().next().value;
        opCodes[opCode] = op;
        knownOpCodes.add(opCode);
        candidates.delete(op);
      }
    });

    if (candidates.size === 0) break;

    candidates.forEach(possibleOpCodes => {
      knownOpCodes.forEach(opCode => possibleOpCodes.delete(opCode));
    });
  }

  let reg = [0, 0, 0, 0];
  input.forEach(([opCode, a, b, c]) => opCodes[opCode](reg, a, b, c));
  return reg[0];
}

// == ASSERTS ==

console.assert(part1("Before: [3, 2, 1, 1]\n9 2 1 2\nAfter:  [3, 2, 2, 1]") === 1);

// No testing data provided for PART 2
