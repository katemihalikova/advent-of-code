// == SHARED ==

Array.prototype.min = function() { // najde minimum
  return this.reduce((acc, el) => Math.min(acc, el), Infinity);
}

class Grid {
  grid = {};

  read(x, y) {
    if (y in this.grid && x in this.grid[y]) {
      return this.grid[y][x];
    }
  }

  write(x, y, value) {
    this.grid[y] = this.grid[y] || {};
    this.grid[y][x] = value;
  }

  getAllCells() {
    return Object.values(this.grid).flatMap(row => Object.values(row));
  }

  getCellsAround(x, y) {
    return [
      [x, y + 1],
      [x, y - 1],
      [x + 1, y],
      [x - 1, y],
    ].filter(([x, y]) => (this.grid[y] && this.grid[y][x]) !== undefined);
  }
}

// == PART 1 ==

function part1(input) {
  let grid = new Grid();

  let startSquare;
  let endSquareCoords;

  input = input
    .split("\n")
    .forEach((line, y) => [...line].forEach((char,x) => {
      let square = {};

      if (char === "S") {
        char = "a";
        startSquare = square;
      } else if (char === "E") {
        char = "z";
        endSquareCoords = [x, y];
      }

      square.height = char.codePointAt(0);
      grid.write(x, y, square);
    }));

  let squaresToVisit = [endSquareCoords];

  for (let steps = 0;; steps++) {
    let nextSquaresToVisit = [];

    for (let [x, y] of squaresToVisit) {
      let currentSquare = grid.read(x,y);

      if (currentSquare.steps !== undefined) continue;
      currentSquare.steps = steps;

      nextSquaresToVisit.push(...grid.getCellsAround(x,y).filter(([x, y]) => currentSquare.height - grid.read(x, y).height <= 1));
    }

    if (nextSquaresToVisit.length === 0) break;
    squaresToVisit = nextSquaresToVisit;
  }

  return startSquare.steps;
}

// == PART 2 ==

function part2(input) {
  let grid = new Grid();

  let endSquareCoords;

  input = input
    .split("\n")
    .forEach((line, y) => [...line].forEach((char,x) => {
      let square = {char};

      if (char === "S") {
        square.char = "a";
      } else if (char === "E") {
        square.char = "z";
        endSquareCoords = [x, y];
      }

      square.height = square.char.codePointAt(0);
      grid.write(x, y, square);
    }));

  let squaresToVisit = [endSquareCoords];

  for (let steps = 0;; steps++) {
    let nextSquaresToVisit = [];

    for (let [x, y] of squaresToVisit) {
      let currentSquare = grid.read(x,y);

      if (currentSquare.steps !== undefined) continue;
      currentSquare.steps = steps;

      nextSquaresToVisit.push(...grid.getCellsAround(x,y).filter(([x, y]) => currentSquare.height - grid.read(x, y).height <= 1));
    }

    if (nextSquaresToVisit.length === 0) break;
    squaresToVisit = nextSquaresToVisit;
  }

  return grid.getAllCells()
    .filter(square => square.char === "a" && square.steps)
    .map(square => square.steps)
    .min();
}

// == ASSERTS ==

console.assert(part1(
`Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`) === 31);

console.assert(part2(
`Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`) === 29);
