// == PART 1 ==

class ThreeDimensionalLifeGrid {
  constructor(grid = {}) {
    this.grid = grid;
  }

  read(x, y, z) {
    if (z in this.grid && y in this.grid[z] && x in this.grid[z][y]) {
      return this.grid[z][y][x];
    }
  }

  write(x, y, z, value) {
    this.grid[z] = this.grid[z] || {};
    this.grid[z][y] = this.grid[z][y] || {};
    this.grid[z][y][x] = value;
  }

  clone() {
    let grid = new this.constructor();
    grid.grid = JSON.parse(JSON.stringify(this.grid));
    return grid;
  }

  mapCell(cb) {
    let newGrid = this.clone();
    let xs = Object.values(this.grid).flatMap(plane => Object.values(plane).flatMap(row => Object.keys(row)));
    let ys = Object.values(this.grid).flatMap(plane => Object.keys(plane));
    let zs = Object.keys(this.grid);

    let minX = Math.min(...xs) - 1, maxX = Math.max(...xs) + 1;
    let minY = Math.min(...ys) - 1, maxY = Math.max(...ys) + 1;
    let minZ = Math.min(...zs) - 1, maxZ = Math.max(...zs) + 1;

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        for (let z = minZ; z <= maxZ; z++) {
          let oldCell = this.read(x, y, z);
          let newCell = cb(oldCell, x, y, z);
          if (oldCell === "#" || newCell === "#") newGrid.write(x, y, z, newCell);
        }
      }
    }
    return newGrid;
  }

  countActiveCellsAround(x, y, z) {
    let count = 0;
    for (let dx of [-1,0,1]) {
      for (let dy of [-1,0,1]) {
        for (let dz of [-1,0,1]) {
          if (dx === 0 && dy === 0 && dz === 0) continue;
          if (this.read(x + dx, y + dy, z + dz) === "#") count++;
        }
      }
    }
    return count;
  }
}

function part1(input) {
  input = input.split("\n").map(line => line.split(""));

  let area = new ThreeDimensionalLifeGrid([input]);

  for (let i = 1; i <= 6; i++) {
    area = area.mapCell((cell, x, y, z) => {
      let activeCellsAround = area.countActiveCellsAround(x, y, z);
      if (cell === "#" && activeCellsAround >= 2 && activeCellsAround <= 3) return "#";
      if (cell === "#") return '.';
      if (activeCellsAround === 3) return "#";
      return '.';
    });
  }

  return Object.values(area.grid)
    .flatMap(plane => Object.values(plane))
    .flatMap(row => Object.values(row))
    .filter(cell => cell === "#")
    .length;
}

// == PART 2 ==

class FourDimensionalLifeGrid {
  constructor(grid = {}) {
    this.grid = grid;
  }

  read(w, x, y, z) {
    if (z in this.grid && y in this.grid[z] && x in this.grid[z][y] && w in this.grid[z][y][x]) {
      return this.grid[z][y][x][w];
    }
  }

  write(w, x, y, z, value) {
    this.grid[z] = this.grid[z] || {};
    this.grid[z][y] = this.grid[z][y] || {};
    this.grid[z][y][x] = this.grid[z][y][x] || {};
    this.grid[z][y][x][w] = value;
  }

  clone() {
    let grid = new this.constructor();
    grid.grid = JSON.parse(JSON.stringify(this.grid));
    return grid;
  }

  mapCell(cb) {
    let newGrid = this.clone();
    let ws = Object.values(this.grid).flatMap(space => Object.values(space).flatMap(plane => Object.values(plane).flatMap(row => Object.keys(row))));
    let xs = Object.values(this.grid).flatMap(space => Object.values(space).flatMap(plane => Object.keys(plane)));
    let ys = Object.values(this.grid).flatMap(space => Object.keys(space));
    let zs = Object.keys(this.grid);

    let minW = Math.min(...ws) - 1, maxW = Math.max(...ws) + 1;
    let minX = Math.min(...xs) - 1, maxX = Math.max(...xs) + 1;
    let minY = Math.min(...ys) - 1, maxY = Math.max(...ys) + 1;
    let minZ = Math.min(...zs) - 1, maxZ = Math.max(...zs) + 1;

    for (let w = minW; w <= maxW; w++) {
      for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
          for (let z = minZ; z <= maxZ; z++) {
            let oldCell = this.read(w, x, y, z);
            let newCell = cb(oldCell, w, x, y, z);
            if (oldCell === "#" || newCell === "#") newGrid.write(w, x, y, z, newCell);
          }
        }
      }
    }
    return newGrid;
  }

  countActiveCellsAround(w, x, y, z) {
    let count = 0;
    for (let dw of [-1,0,1]) {
      for (let dx of [-1,0,1]) {
        for (let dy of [-1,0,1]) {
          for (let dz of [-1,0,1]) {
            if (dx === 0 && dy === 0 && dz === 0 && dw === 0) continue;
            if (this.read(w + dw, x + dx, y + dy, z + dz) === "#") count++;
          }
        }
      }
    }
    return count;
  }
}

function part2(input) {
  input = input.split("\n").map(line => line.split(""));

  let area = new FourDimensionalLifeGrid([[input]]);

  for (let i = 1; i <= 6; i++) {
    area = area.mapCell((cell, w, x, y, z) => {
      let activeCellsAround = area.countActiveCellsAround(w, x, y, z);
      if (cell === "#" && activeCellsAround >= 2 && activeCellsAround <= 3) return "#";
      if (cell === "#") return '.';
      if (activeCellsAround === 3) return "#";
      return '.';
    });
  }

  return Object.values(area.grid)
    .flatMap(space => Object.values(space))
    .flatMap(plane => Object.values(plane))
    .flatMap(row => Object.values(row))
    .filter(cell => cell === "#")
    .length;
}

// == ASSERTS ==

console.assert(part1(".#.\n..#\n###") === 112);

console.assert(part2(".#.\n..#\n###") === 848);
