// == PART 1 ==

function aoc_day19_part1(input) {
  let elves = [];
  let evenOrOdd = 1;

  for (let i = 0; i < input; i++) elves[i] = i;

  while (elves.length > 1) {
    let previousLength = elves.length;
    elves = elves.filter((_, i) => i % 2 !== evenOrOdd);
    evenOrOdd = (evenOrOdd + previousLength) % 2;
  }

  return elves[0] + 1;
}

// == PART 2 ==

function aoc_day19_part2_slow(input) {
  let elves = [];
  let position = 0;

  for (let i = 0; i < input; i++) elves[i] = i;

  while (elves.length > 1) {
    if (position >= elves.length / 2) {
      let robbedElf = position - Math.ceil(elves.length / 2);
      elves.splice(robbedElf, 1);
      position = position % elves.length;
    } else {
      let robbedElf = position + Math.floor(elves.length / 2);
      elves.splice(robbedElf, 1);
      position = (position + 1) % (elves.length + 1) % elves.length;
    }
  }

  return elves[0] + 1;
}

function aoc_day19_part2(input) {
  // Using manual pattern recognition on 2222 samples

  let largestLowerPowerOfThree = 1;
  while (largestLowerPowerOfThree * 3 < input) largestLowerPowerOfThree *= 3;

  if (input <= 2 * largestLowerPowerOfThree) {
    return input - largestLowerPowerOfThree;
  } else {
    return 2 * (input - 2 * largestLowerPowerOfThree);
  }
}

// == ASSERTS ==

console.assert(aoc_day19_part1(5) === 3);

console.assert(aoc_day19_part2(5) === 2);
