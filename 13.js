// == PART 1 ==

function part1(input) {
  return input
    .split("\n")
    .map(line => line.split(": ").map(Number))
    .reduce((severity, [depth, range]) => severity + (depth % ((range - 1) * 2) === 0 ? depth * range : 0), 0);
}

// == PART 2 ==

function part2(input) {
  input = input
    .split("\n")
    .map(line => line.split(": ").map(Number));

  for (let delay = 0;; delay++) {
    if (input.every(([depth, range]) => (depth + delay) % ((range - 1) * 2) !== 0)) return delay;
  }
}

// == ASSERTS ==

console.assert(part1("0: 3\n1: 2\n4: 4\n6: 4") === 24);

console.assert(part2("0: 3\n1: 2\n4: 4\n6: 4") === 10);
