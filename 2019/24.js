class LifeGrid {
  grid = [];

  read(x, y) {
    if (y in this.grid && x in this.grid[y]) {
      return this.grid[y][x];
    }
  }

  write(x, y, value) {
    this.grid[y] = this.grid[y] || [];
    this.grid[y][x] = value;
  }

  getGridAsArray() {
    return this.grid;
  }

  clone() {
    let grid = new LifeGrid();
    grid.grid = JSON.parse(JSON.stringify(this.grid));
    return grid;
  }

  getCellsAround(x, y) {
    return [
      this.grid[y][x - 1],
      this.grid[y][x + 1],
      this.grid[y - 1] && this.grid[y - 1][x],
      this.grid[y + 1] && this.grid[y + 1][x],
    ].filter(Boolean);
  }
}

// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(row => row.split(""));

  let grid = new LifeGrid();
  input.forEach((row, y) => row.forEach((c, x) => grid.write(x, y, c)));

  let seenLayouts = new Set();

  while (true) {
    let nextGrid = grid.clone();

    grid.getGridAsArray().forEach((row, y) => row.forEach((cell, x) => {
      let liveCellsAround = grid.getCellsAround(x, y).filter(c => c === "#").length;
      if (cell === "#" && liveCellsAround !== 1) nextGrid.write(x, y, ".");
      if (cell === "." && (liveCellsAround === 1 || liveCellsAround === 2)) nextGrid.write(x, y, "#");
    }));

    let layout = nextGrid.getGridAsArray().map(e => e.join("")).join("\n");

    if (seenLayouts.has(layout)) {
      return nextGrid.getGridAsArray().reduce((acc, row, y) => acc + row.reduce((acc, cell, x) => acc + (cell === "#" ? 2 ** (y * 5 + x) : 0), 0), 0);
    }
    seenLayouts.add(layout);
    grid = nextGrid;
  }


}

// == PART 2 ==

function part2(input, minutes = 200) {
  input = input.split("\n").map(row => row.split(""));
  input[2][2] = "?";

  let grids = {};
  for (let level = -minutes; level <= minutes; level++) {
    let grid = new LifeGrid();
    input.forEach((row, y) => row.forEach((cell, x) => grid.write(x, y, cell === "?" || level === 0 ? cell : ".")));
    grids[level] = grid;
  }

  let getCellsAround = (level, x, y) => {
    let cellsAround = grids[level].getCellsAround(x, y);
    if (cellsAround.length < 4 && level > -minutes) {
      if (x === 0) cellsAround.push(grids[level - 1].read(1, 2));
      if (x === 4) cellsAround.push(grids[level - 1].read(3, 2));
      if (y === 0) cellsAround.push(grids[level - 1].read(2, 1));
      if (y === 4) cellsAround.push(grids[level - 1].read(2, 3));
    } else if (cellsAround.includes("?") && level < minutes) {
      cellsAround = cellsAround.filter(cell => cell !== "?");
      let line = [0, 1, 2, 3, 4];
      if (x === 1) cellsAround.push(...line.map(y => grids[level + 1].read(0, y)));
      if (x === 3) cellsAround.push(...line.map(y => grids[level + 1].read(4, y)));
      if (y === 1) cellsAround.push(...line.map(x => grids[level + 1].read(x, 0)));
      if (y === 3) cellsAround.push(...line.map(x => grids[level + 1].read(x, 4)));
    }
    return cellsAround;
  };

  for (let i = 0; i < minutes; i++) {
    let newGrids = Object.fromEntries(Object.entries(grids).map(([key, value]) => [key, value.clone()]));

    for (let [level, grid] of Object.entries(grids)) {
      grid.getGridAsArray().forEach((row, y) => row.forEach((cell, x) => {
        if (x === 2 && y === 2) return;
        let liveCellsAround = getCellsAround(Number(level), x, y).filter(c => c === "#").length;
        if (cell === "#" && liveCellsAround !== 1) newGrids[level].write(x, y, ".");
        if (cell === "." && (liveCellsAround === 1 || liveCellsAround === 2)) newGrids[level].write(x, y, "#");
      }));
    }

    grids = newGrids;
  }

  return Object.values(grids).reduce((acc, grid) => acc + grid.getGridAsArray().flat().filter(cell => cell === "#").length, 0);
}

// == ASSERTS ==

let layout = `
....#
#..#.
#..##
..#..
#....
`.trim();

console.assert(part1(layout) === 2129920);

console.assert(part2(layout, 10) === 99);
