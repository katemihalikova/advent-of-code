// == CLASSES ==

class DotGrid {
  #grid = {};

  constructor(input = []) {
    for (let [x, y] of input) {
      this.#add(x, y);
    }
  }

  fold(axis, coord) {
    if (axis === "x") {
      for (let y in this.#grid) {
        for (let x in this.#grid[y]) {
          if (x > coord) {
            this.#add(2 * coord - x, y);
            this.#remove(x, y);
          }
        }
      }
    } else {
      for (let y in this.#grid) {
        if (y >= coord) {
          this.#mergeRows(y, 2 * coord - y);
          this.#removeRow(y);
        }
      }
    }
  }

  #add(x, y) {
    this.#grid[y] = this.#grid[y] || {};
    this.#grid[y][x] = true;
  }

  #remove(x, y) {
    delete this.#grid[y][x];
  }

  #mergeRows(yFrom, yTo) {
    this.#grid[yTo] = this.#grid[yTo] || {};
    Object.assign(this.#grid[yTo], this.#grid[yFrom]);
  }

  #removeRow(y) {
    delete this.#grid[y];
  }

  getGridAsString() {
    let ys = Object.keys(this.#grid).filter(y => Object.keys(this.#grid[y]).length > 0);
    let minY = Math.min(...ys);
    let maxY = Math.max(...ys);
    let xs = Object.values(this.#grid).reduce((acc, row) => new Set([...acc, ...Object.keys(row)]), []);
    let minX = Math.min(...xs);
    let maxX = Math.max(...xs);

    let gridAsString = "";
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        if (y in this.#grid && x in this.#grid[y]) {
          gridAsString += "█";
        } else {
          gridAsString += " ";
        }
      }
      gridAsString += "\n";
    }
    return gridAsString.slice(0, -1);
  }

  getNumberOfDots() {
    return Object.values(this.#grid).flatMap(row => Object.values(row)).length;
  }
}

// == PART 1 ==

function part1(input) {
  input = input.split("\n\n");

  let dots = input[0].split("\n").map(line => line.split(",").map(Number));
  let folds = input[1].split("\n").map(line => {
    let [, axis, coord] = line.match(/^fold along ([xy])=(\d+)$/);
    coord = Number(coord);
    return {axis, coord};
  });
  let {axis, coord} = folds[0];

  let dotGrid = new DotGrid(dots);
  dotGrid.fold(axis, coord);

  return dotGrid.getNumberOfDots();
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n\n");

  let dots = input[0].split("\n").map(line => line.split(",").map(Number));
  let folds = input[1].split("\n").map(line => {
    let [, axis, coord] = line.match(/^fold along ([xy])=(\d+)$/);
    coord = Number(coord);
    return {axis, coord};
  });

  let dotGrid = new DotGrid(dots);

  for (let {axis, coord} of folds) {
    dotGrid.fold(axis, coord);
  }

  return dotGrid.getGridAsString();
}

// == ASSERTS ==

console.assert(part1(`6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`) === 17);

console.assert(part2(`6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`) ===
`█████
█   █
█   █
█   █
█████`);
