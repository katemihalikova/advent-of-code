// == PART 1 ==

function part1(input, steps = 100) {
  let ON = 1, OFF = 0;

  let grid = input
    .split("\n")
    .map(line => line.split("").map(cell => cell === "#" ? ON : OFF));

  let sum = (grid, ...args) => args.reduce((sum, [y, x]) => {
    if (grid[y] && grid[y][x]) sum++;
    return sum;
  }, 0);

  for (let i = 0; i < steps; i++) {
    grid = grid.map((line, y) => {
      return line.map((cell, x) => {
        let neighboursOn = sum(grid, [y, x + 1], [y, x - 1], [y + 1, x + 1], [y + 1, x], [y + 1, x - 1], [y - 1, x + 1], [y - 1, x], [y - 1, x - 1]);

        if (cell === ON && (neighboursOn < 2 || neighboursOn > 3)) cell = OFF;
        else if (cell === OFF && neighboursOn === 3) cell = ON;

        return cell;
      });
    }, []);
  }

  return grid.reduce((cells, line) => line.reduce((cells, cell) => cells + cell, cells), 0);
}

// == PART 2 ==

function part2(input, steps = 100) {
  let ON = 1, OFF = 0;

  let grid = input
    .split("\n")
    .map(line => line.split("").map(cell => cell === "#" ? ON : OFF));

  let maxX = grid[0].length - 1;
  let maxY = grid.length - 1;

  grid = grid.map((line, y) => line.map((cell, x) => (x === 0 && y === 0) || (x === 0 && y === maxY) || (x === maxX && y === 0) || (x === maxX && y === maxY) ? ON : cell));

  let sum = (grid, ...args) => args.reduce((sum, [y, x]) => {
    if (grid[y] && grid[y][x]) sum++;
    return sum;
  }, 0);

  for (let i = 0; i < steps; i++) {
    grid = grid.map((line, y) => {
      return line.map((cell, x) => {
        if ((x === 0 && y === 0) || (x === 0 && y === maxY) || (x === maxX && y === 0) || (x === maxX && y === maxY)) return ON;

        let neighboursOn = sum(grid, [y, x + 1], [y, x - 1], [y + 1, x + 1], [y + 1, x], [y + 1, x - 1], [y - 1, x + 1], [y - 1, x], [y - 1, x - 1]);

        if (cell === ON && (neighboursOn < 2 || neighboursOn > 3)) cell = OFF;
        else if (cell === OFF && neighboursOn === 3) cell = ON;

        return cell;
      });
    }, []);
  }

  return grid.reduce((cells, line) => line.reduce((cells, cell) => cells + cell, cells), 0);
}

// == ASSERTS ==

console.assert(part1(".#.#.#\n...##.\n#....#\n..#...\n#.#..#\n####..", 4) === 4);
console.assert(part1(".#.#.#\n...##.\n#....#\n..#...\n#.#..#\n####..") === 4);

console.assert(part2("##.#.#\n...##.\n#....#\n..#...\n#.#..#\n####.#", 5) === 17);
console.assert(part2("##.#.#\n...##.\n#....#\n..#...\n#.#..#\n####.#") === 7);
