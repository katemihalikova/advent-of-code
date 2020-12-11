// == SHARED ==

class LifeGrid {
  constructor(grid = []) {
    this.grid = grid;
  }

  read(x, y) {
    if (y in this.grid && x in this.grid[y]) {
      return this.grid[y][x];
    }
  }

  write(x, y, value) {
    this.grid[y] = this.grid[y] || [];
    this.grid[y][x] = value;
  }

  clone() {
    let grid = new LifeGrid();
    grid.grid = JSON.parse(JSON.stringify(this.grid));
    return grid;
  }

  toString() {
    return this.grid.map(row => row.join("")).join("\n");
  }

  mapCell(cb) {
    let newGrid = this.clone();
    this.grid.forEach((row, y) => row.forEach((cell, x) => newGrid.write(x, y, cb(cell, x, y))));
    return newGrid;
  }

  getCellsAround(x, y) {
    return [[0, 1], [0, -1], [1, 1], [1, 0], [1, -1], [-1, 1], [-1, 0], [-1, -1]]
      .map(([dx, dy]) => this.read(x + dx, y + dy));
  }

  getCellsAroundInLineOfSight(x, y) {
    return [[0, 1], [0, -1], [1, 1], [1, 0], [1, -1], [-1, 1], [-1, 0], [-1, -1]]
      .map(([dx, dy]) => {
        for (let m = 1;; m++) {
          let cell = this.read(x + (dx * m), y + (dy * m));
          if (cell !== ".") return cell;
        }
      });
  }
}

// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(line => line.split(""));

  let area = new LifeGrid(input);

  while(true) {
    let nextArea = area.mapCell((seat, x, y) => {
      let seatsAround = area.getCellsAround(x, y);
      if (seat === "L" && seatsAround.every(seat => seat !== "#")) return "#";
      if (seat === "#" && seatsAround.filter(seat => seat === "#").length >= 4) return "L";
      return seat;
    });

    if (area.toString() === nextArea.toString()) return area.grid.flat().filter(cell => cell === "#").length;
    area = nextArea;
  }
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(line => line.split(""));

  let area = new LifeGrid(input);

  while(true) {
    let nextArea = area.mapCell((seat, x, y) => {
      let seatsAround = area.getCellsAroundInLineOfSight(x, y);
      if (seat === "L" && seatsAround.every(seat => seat !== "#")) return "#";
      if (seat === "#" && seatsAround.filter(seat => seat === "#").length >= 5) return "L";
      return seat;
    });

    if (area.toString() === nextArea.toString()) return area.grid.flat().filter(cell => cell === "#").length;
    area = nextArea;
  }
}

// == ASSERTS ==

console.assert(part1("L.LL.LL.LL\nLLLLLLL.LL\nL.L.L..L..\nLLLL.LL.LL\nL.LL.LL.LL\nL.LLLLL.LL\n..L.L.....\nLLLLLLLLLL\nL.LLLLLL.L\nL.LLLLL.LL") === 37);

console.assert(part2("L.LL.LL.LL\nLLLLLLL.LL\nL.L.L..L..\nLLLL.LL.LL\nL.LL.LL.LL\nL.LLLLL.LL\n..L.L.....\nLLLLLLLLLL\nL.LLLLLL.L\nL.LLLLL.LL") === 26);
