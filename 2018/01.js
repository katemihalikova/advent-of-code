// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(Number);

  return input.reduce((current, change) => current + change, 0);
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(Number);

  let initial = 0;
  let reached = new Set([initial]);
  let duplicate;

  while (duplicate === undefined) {
    initial = input.reduce((current, change) => {
      let resulting = current + change;
      if (duplicate === undefined && reached.has(resulting)) duplicate = resulting;
      reached.add(resulting);
      return resulting;
    }, initial);
  }

  return duplicate;
}

// == ASSERTS ==

console.assert(part1("+1\n-2\n+3\n+1") === 3);
console.assert(part1("+1\n+1\n+1") === 3);
console.assert(part1("+1\n+1\n-2") === 0);
console.assert(part1("-1\n-2\n-3") === -6);

console.assert(part2("+1\n-2\n+3\n+1") === 2);
console.assert(part2("+1\n-1") === 0);
console.assert(part2("+3\n+3\n+4\n-2\n-4") === 10);
console.assert(part2("-6\n+3\n+8\n+5\n-6") === 5);
console.assert(part2("+7\n+7\n-2\n-7\n-4") === 14);
