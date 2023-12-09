// == PART 1 ==

function part1(input) {
  function predictNextValue(sequence) {
    if (sequence.every(n => n === 0)) return 0;
    let differences = sequence.slice(0, -1).map((_, i) => sequence[i + 1] - sequence[i]);
    return sequence.at(-1) + predictNextValue(differences);
  }

  return input
    .split("\n")
    .map(line => line.split(" ").map(Number))
    .map(predictNextValue)
    .reduce((sum, n) => sum + n, 0);
}

// == PART 2 ==

function part2(input) {
  function predictPreviousValue(sequence) {
    if (sequence.every(n => n === 0)) return 0;
    let differences = sequence.slice(0, -1).map((_, i) => sequence[i + 1] - sequence[i]);
    return sequence[0] - predictPreviousValue(differences);
  }

  return input
    .split("\n")
    .map(line => line.split(" ").map(Number))
    .map(predictPreviousValue)
    .reduce((sum, n) => sum + n, 0);
}

// == ASSERTS ==

console.assert(part1("0 3 6 9 12 15\n1 3 6 10 15 21\n10 13 16 21 30 45") === 114);

console.assert(part2("0 3 6 9 12 15\n1 3 6 10 15 21\n10 13 16 21 30 45") === 2);
