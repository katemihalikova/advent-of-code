// == SHARED ==

type Dir = "N" | "E" | "S" | "W";
type Tile = Record<Dir, number> | undefined;
type State = {row: number, col: number, dir: Dir};

function walkMaze(input: string): {maze: Tile[][], endRow: number, endCol: number} {
  let startRow = NaN, startCol = NaN, endRow = NaN, endCol = NaN;

  let maze = input
    .split("\n")
    .map((line, row) => [...line].map<Tile>((tile, col) => {
      if (tile === "#") return undefined;
      if (tile === "S") {
        startRow = row;
        startCol = col;
        return {
          N: Infinity,
          E: 0,
          S: Infinity,
          W: Infinity,
        };
      }
      if (tile === "E") {
        endRow = row;
        endCol = col;
      }
      return {
        N: Infinity,
        E: Infinity,
        S: Infinity,
        W: Infinity,
      };
    }));

  let currentTiles: State[] = [{row: startRow, col: startCol, dir: "E"}];

  while (currentTiles.length > 0) {
    let nextTiles: State[] = [];

    for (let {row, col, dir} of currentTiles) {
      let score = maze[row][col]![dir];

      let nextRow = {E: row, W: row, S: row + 1, N: row - 1}[dir];
      let nextCol = {E: col + 1, W: col - 1, S: col, N: col}[dir];

      if (maze[nextRow]?.[nextCol] && maze[nextRow]?.[nextCol][dir] > score + 1) {
        maze[nextRow][nextCol][dir] = score + 1;
        nextTiles.push({row: nextRow, col: nextCol, dir});
      }

      (["N","E","S","W"] as const)
        .filter(nextDir => maze[row][col]![nextDir] > score + 1000)
        .forEach(nextDir => {
          maze[row][col]![nextDir] = score + 1000;
          nextTiles.push({row, col, dir: nextDir});
        });
    }

    currentTiles = nextTiles;
  }

  return {maze, endRow, endCol};
}

// == PART 1 ==

function part1(input: string): number {
  let {maze, endRow, endCol} = walkMaze(input);

  return Math.min(...Object.values(maze[endRow][endCol]!));
}

// == PART 2 ==

function part2(input: string): number {
  let {maze, endRow, endCol} = walkMaze(input);

  let minScore = Math.min(...Object.values(maze[endRow][endCol]!));

  let currentTiles: State[] = Object.entries(maze[endRow][endCol]!)
    .filter(([, score]) => score === minScore)
    .map(([dir]) => ({row: endRow, col: endCol, dir: dir as Dir}));

  let bestTiles = new Set([`${endRow},${endCol}`]);

  while (currentTiles.length > 0) {
    let nextTiles: State[] = [];

    for (let {row, col, dir} of currentTiles) {
      let score = maze[row][col]![dir];

      let nextRow = {E: row, W: row, S: row - 1, N: row + 1}[dir];
      let nextCol = {E: col - 1, W: col + 1, S: col, N: col}[dir];

      if (maze[nextRow]?.[nextCol]?.[dir] === score - 1) {
        bestTiles.add(`${nextRow},${nextCol}`);
        nextTiles.push({row: nextRow, col: nextCol, dir});
      }

      nextTiles.push(...(["N","E","S","W"] as const)
        .filter(nextDir => maze[row][col]![nextDir] === score - 1000)
        .map(nextDir => ({row, col, dir: nextDir}))
      );
    }

    currentTiles = nextTiles;
  }

  return bestTiles.size;
}

// == ASSERTS ==

let example1 = `\
###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`;
let example2 = `\
#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`

console.assert(part1(example1) === 7036);
console.assert(part1(example2) === 11048);

console.assert(part2(example1) === 45);
console.assert(part2(example2) === 64);
