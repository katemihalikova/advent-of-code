// == CLASSES ==

class Grid {
  #grid;

  constructor(grid = []) {
    this.#grid = grid;
  }

  increment(x, y) {
    this.#grid[y][x]++;
  }

  reset(x, y) {
    this.#grid[y][x] = 0;
  }

  incrementCellsAround(x, y) {
    [[0, 1], [0, -1], [1, 1], [1, 0], [1, -1], [-1, 1], [-1, 0], [-1, -1]]
      .map(([dx, dy]) => [x + dx, y + dy])
      .filter(([x, y]) => this.#grid[y]?.[x] !== undefined)
      .forEach(([x, y]) => this.increment(x, y));
  }

  *[Symbol.iterator]() {
    yield *this.#grid.flatMap((row, y) => row.map((value, x) => ({x, y, value})));
  }
}

// == PART 1 ==

function part1(input, steps = 100) {
  input = input.split("\n").map(line => line.split("").map(Number));

  let grid = new Grid(input);
  let total = 0;

  for (let step = 1; step <= steps; step++) {
    for (let {x, y} of grid) {
      grid.increment(x, y);
    }
    
    let flashed = new Set();
    let hasFlashed;

    do {
      hasFlashed = false;

      for (let {x, y, value} of grid) {
        if (value > 9 && !flashed.has(`${x},${y}`)) {
          hasFlashed = true;
          flashed.add(`${x},${y}`);
          grid.incrementCellsAround(x, y);
        }
      }
    } while (hasFlashed);

    for (let {x, y, value} of grid) {
      if (value > 9) {
        grid.reset(x, y);
      }
    }

    total += flashed.size;
    flashed.clear();
  }

  return total;
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(line => line.split("").map(Number));

  let grid = new Grid(input);

  for (let step = 1;; step++) {
    for (let {x, y} of grid) {
      grid.increment(x, y);
    }
    
    let flashed = new Set();
    let hasFlashed;

    do {
      hasFlashed = false;

      for (let {x, y, value} of grid) {
        if (value > 9 && !flashed.has(`${x},${y}`)) {
          hasFlashed = true;
          flashed.add(`${x},${y}`);
          grid.incrementCellsAround(x, y);
        }
      }
    } while (hasFlashed);

    for (let {x, y, value} of grid) {
      if (value > 9) {
        grid.reset(x, y);
      }
    }

    if (flashed.size === input.length * input[0].length) return step;

    flashed.clear();
  }
}

// == ASSERTS ==

console.assert(part1(`11111
19991
19191
19991
11111`, 1) === 9);
console.assert(part1(`11111
19991
19191
19991
11111`, 2) === 9);

console.assert(part1(`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`, 1) === 0);
console.assert(part1(`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`, 2) === 35);
console.assert(part1(`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`, 3) === 80);
console.assert(part1(`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`, 4) === 96);
console.assert(part1(`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`, 5) === 104);
console.assert(part1(`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`, 6) === 105);
console.assert(part1(`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`, 7) === 112);
console.assert(part1(`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`, 8) === 136);
console.assert(part1(`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`, 9) === 175);
console.assert(part1(`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`, 10) === 204);

console.assert(part1(`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`) === 1656);

console.assert(part2(`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`) === 195);
