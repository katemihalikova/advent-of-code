// == PART 1 ==

function part1(input) {
  return input
    .split("\n")
    .map(line => [...line].map(char => char.codePointAt(0)))

    .reduce((acc, [opponent,, me]) => {
      let shape = me % 3 || 3;
      let outcome = (me - opponent - 1) % 3 * 3;
      return acc + shape + outcome;
    }, 0);
}

// == PART 2 ==

function part2(input) {
  return input
    .split("\n")
    .map(line => [...line].map(char => char.codePointAt(0)))

    .reduce((acc, [opponent,, result]) => {
      let shape = (opponent + result) % 3 || 3;
      let outcome = (result - 1) % 3 * 3;
      return acc + shape + outcome;
    }, 0);
}

// == ASSERTS ==

console.assert(part1("A Y\nB X\nC Z") === 15);

console.assert(part2("A Y\nB X\nC Z") === 12);
