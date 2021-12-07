// == PART 1 ==

function part1(input) {
  input = input.split(",").map(Number);

  let minPos = Math.min(...input);
  let maxPos = Math.max(...input);

  let fuels = [];

  for (let pos = minPos; pos <= maxPos; pos++) {
    fuels.push(input
      .map(crabPos => Math.abs(crabPos - pos))
      .reduce((a, b) => a + b),
    );
  }

  return Math.min(...fuels);
}

// == PART 2 ==

function part2(input) {
  input = input.split(",").map(Number);

  let minPos = Math.min(...input);
  let maxPos = Math.max(...input);

  let fuels = [];

  for (let pos = minPos; pos <= maxPos; pos++) {
    fuels.push(input
      .map(crabPos => Math.abs(crabPos - pos))
      .map(n => n * (n + 1) / 2) // partial sum
      .reduce((a, b) => a + b),
    );
  }

  return Math.min(...fuels);
}

// == ASSERTS ==

console.assert(part1("16,1,2,0,4,2,7,1,2,14") === 37);

console.assert(part2("16,1,2,0,4,2,7,1,2,14") === 168);
