// == SHARED ==

Array.prototype.sum = function() {
  return this.reduce((sum, nr) => sum + nr, 0);
}

// == PART 1 ==

function part1(input) {
  return Math.max(...input
    .split("\n\n")
    .map(elf => elf
      .split("\n")
      .map(Number)
      .sum()
    )
  );
}

// == PART 2 ==

function part2(input) {
  return input
    .split("\n\n")
    .map(elf => elf
      .split("\n")
      .map(Number)
      .sum()
    )
    .sort((a, b) => b - a)
    .slice(0, 3)
    .sum();
}

// == ASSERTS ==

console.assert(part1(`1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`) === 24000);

console.assert(part2(`1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`) === 45000);
