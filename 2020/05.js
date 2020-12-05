// == PART 1 ==

function part1(input) {
  let passes = input
    .split("\n")
    .map(bsp => parseInt(bsp.replace(/[FL]/g, "0").replace(/[BR]/g, "1"), 2));

  return Math.max(...passes);
}

// == PART 2 ==

function part2(input) {
  let passes = input
    .split("\n")
    .map(bsp => parseInt(bsp.replace(/[FL]/g, "0").replace(/[BR]/g, "1"), 2));

  for (let i = 0; i <= Math.max(...passes); i++) {
    if (!passes.includes(i) && passes.includes(i - 1) && passes.includes(i + 1)) return i;
  }
}

// == ASSERTS ==

console.assert(part1("FBFBBFFRLR\nBFFFBBFRRR\nFFFBBBFRRR\nBBFFBBFRLL") === 820);

// No testing data for part 2
