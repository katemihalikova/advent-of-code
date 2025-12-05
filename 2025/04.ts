// == PART 1 ==

function part1(input: string): number {
  return input
    .split("\n")
    .map(line => line.split(""))
    .reduce((sum, line, row, grid) => sum + line
      .filter((item, col) => item === "@" && [
        grid[row-1]?.[col-1],
        grid[row-1]?.[col],
        grid[row-1]?.[col+1],
        grid[row][col-1],
        grid[row][col+1],
        grid[row+1]?.[col-1],
        grid[row+1]?.[col],
        grid[row+1]?.[col+1],
      ].filter(roll => roll === "@").length < 4)
      .length, 0);
}

// == PART 2 ==

function part2(input: string): number {
  let grid = input.split("\n").map(line => line.split(""));

  let countRolls = () => grid.reduce((sum, line) => sum + line.filter(roll => roll === "@").length, 0);
  let initCount = countRolls();
  let prevCount = initCount;

  while (true) {
    grid = grid
      .map((line, row) => line
        .map((roll, col) => roll === "@" && [
          grid[row-1]?.[col-1],
          grid[row-1]?.[col],
          grid[row-1]?.[col+1],
          grid[row][col-1],
          grid[row][col+1],
          grid[row+1]?.[col-1],
          grid[row+1]?.[col],
          grid[row+1]?.[col+1],
        ].filter(roll => roll === "@").length < 4 ? "." : roll));

    let count = countRolls();
    if (count === prevCount) return initCount - count;
    prevCount = count;
  }
}

// == ASSERTS ==

console.assert(part1(`\
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`) === 13);

console.assert(part2(`\
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`) === 43);
