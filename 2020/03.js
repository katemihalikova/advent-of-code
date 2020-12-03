// == SHARED ==

class TobogganGrid {
  constructor(grid) {
    this.grid = grid;
    this.width = this.grid[0].length;
  }

  read(x, y) {
    return this.grid[y] && this.grid[y][x % this.width];
  }
}

// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(line => line.split(""));
  let grid = new TobogganGrid(input);

  for (let trees = 0, x = 0, y = 0;; x += 3, y += 1) {
    let cell = grid.read(x, y);
    if (cell === undefined) return trees;
    if (cell === "#") trees++;
  }
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(line => line.split(""));
  let grid = new TobogganGrid(input);

  return [[1,1], [3,1], [5,1], [7,1], [1,2]].map(([dx, dy]) => {
    for (let trees = 0, x = 0, y = 0;; x += dx, y += dy) {
      let cell = grid.read(x, y);
      if (cell === undefined) return trees;
      if (cell === "#") trees++;
    }
  }).reduce((a, b) => a * b);
}

// == ASSERTS ==

console.assert(part1("..##.......\n#...#...#..\n.#....#..#.\n..#.#...#.#\n.#...##..#.\n..#.##.....\n.#.#.#....#\n.#........#\n#.##...#...\n#...##....#\n.#..#...#.#") === 7);

console.assert(part2("..##.......\n#...#...#..\n.#....#..#.\n..#.#...#.#\n.#...##..#.\n..#.##.....\n.#.#.#....#\n.#........#\n#.##...#...\n#...##....#\n.#..#...#.#") === 336);
