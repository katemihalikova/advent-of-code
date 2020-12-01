// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(Number);

  for (let i of input) {
    for (let j of input) {
      if (i + j === 2020) return i * j;
    }
  }
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(Number);

  for (let i of input) {
    for (let j of input) {
      for (let k of input) {
        if (i + j + k === 2020) return i * j * k;
      }
    }
  }
}

// == ASSERTS ==

console.assert(part1("1721\n979\n366\n299\n675\n1456") === 514579);

console.assert(part2("1721\n979\n366\n299\n675\n1456") === 241861950);
