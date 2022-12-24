// == SHARED ==

class Grid {
  #grid = {};

  read(x, y) {
    return this.#grid[y]?.[x];
  }

  write(x, y, value) {
    this.#grid[y] = this.#grid[y] || {};
    this.#grid[y][x] = value;
  }

  getAllCells() {
    return Object.values(this.#grid).flatMap(row => Object.values(row));
  }

  getCellsAround(x, y) {
    return [
      [x, y],
      [x+1, y],
      [x-1, y],
      [x, y+1],
      [x, y-1],
    ]
      .map(([x, y]) => [this.#grid[y]?.[x], x, y])
      .filter(([cell]) => cell !== undefined);
  }

  clone() {
    let copy = new Grid();
    copy.#grid = JSON.parse(JSON.stringify(this.#grid));
    return copy;
  }

  *[Symbol.iterator]() {
    for (let y in this.#grid) {
      for (let x in this.#grid[y]) {
        yield [this.#grid[y][x], Number(x), Number(y)];
      }
    }
  }
}

// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(line => [...line]);

  let minX = 1;
  let maxX = input[0].length - 2;
  let minY = 1;
  let maxY = input.length - 2;

  let gridCount; // least common multiple
  for (gridCount = maxY; gridCount % maxX !== 0; gridCount += maxY);

  let initialGrid = new Grid();

  input.forEach((row, y) => row.forEach((cell, x) => {
    if (cell === "#") initialGrid.write(x, y, {});
    else if (cell === ".") initialGrid.write(x, y, {blizzards: []});
    else initialGrid.write(x, y, {blizzards: [cell]});
  }));

  let grids = [initialGrid];

  for (let gridNumber = 1; gridNumber < gridCount; gridNumber++) {
    let oldGrid = grids.at(-1);
    let newGrid = oldGrid.clone();

    for (let [cell] of newGrid) {
      if (cell.blizzards) cell.blizzards.length = 0;
    }

    for (let [cell, x, y] of oldGrid) {
      cell.blizzards?.forEach(blizzard => {
        let newX = x, newY = y;

        if (blizzard === ">") newX = newX === maxX ? minX : newX + 1;
        if (blizzard === "v") newY = newY === maxY ? minY : newY + 1;
        if (blizzard === "<") newX = newX === minX ? maxX : newX - 1;
        if (blizzard === "^") newY = newY === minY ? maxY : newY - 1;

        newGrid.read(newX, newY).blizzards.push(blizzard);
      });
    }

    grids.push(newGrid);
  }

  let startX = 1, startY = 0, endX = maxX, endY = maxY + 1;

  let currentCoords = [[startX, startY]];
  grids[0].read(startX, startY).distance = 0;

  for (let minute = 1;; minute++) {
    let grid = grids[minute % grids.length];
    let nextCoords = [];

    for (let [currX, currY] of currentCoords) {
      let possibleCellsAround = grid.getCellsAround(currX, currY)
        .filter(([cell, x, y]) => cell.blizzards && cell.blizzards.length === 0 && (cell.distance === undefined || (x === currX && y === currY)));

      for (let [cell, x, y] of possibleCellsAround) {
        if (x === endX && y === endY) return minute;

        nextCoords.push([x, y]);
        cell.distance = minute;
      }
    }

    currentCoords = nextCoords;
  }
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(line => [...line]);

  let minX = 1;
  let maxX = input[0].length - 2;
  let minY = 1;
  let maxY = input.length - 2;

  let gridCount; // least common multiple
  for (gridCount = maxY; gridCount % maxX !== 0; gridCount += maxY);

  let initialGrid = new Grid();

  input.forEach((row, y) => row.forEach((cell, x) => {
    if (cell === "#") initialGrid.write(x, y, {});
    else if (cell === ".") initialGrid.write(x, y, {blizzards: []});
    else initialGrid.write(x, y, {blizzards: [cell]});
  }));

  let grids = [initialGrid];

  for (let gridNumber = 1; gridNumber < gridCount; gridNumber++) {
    let oldGrid = grids.at(-1);
    let newGrid = oldGrid.clone();

    for (let [cell] of newGrid) {
      if (cell.blizzards) cell.blizzards.length = 0;
    }

    for (let [cell, x, y] of oldGrid) {
      cell.blizzards?.forEach(blizzard => {
        let newX = x, newY = y;

        if (blizzard === ">") newX = newX === maxX ? minX : newX + 1;
        if (blizzard === "v") newY = newY === maxY ? minY : newY + 1;
        if (blizzard === "<") newX = newX === minX ? maxX : newX - 1;
        if (blizzard === "^") newY = newY === minY ? maxY : newY - 1;

        newGrid.read(newX, newY).blizzards.push(blizzard);
      });
    }

    grids.push(newGrid);
  }

  let startX = 1, startY = 0, endX = maxX, endY = maxY + 1;

  let currentCoords = [[startX, startY]];
  grids[0].read(startX, startY).distance = 0;

  let startEndVisits = 0;

  for (let minute = 1;; minute++) {
    let grid = grids[minute % grids.length];
    let nextCoords = [];

    coords: for (let [currX, currY] of currentCoords) {
      let possibleCellsAround = grid.getCellsAround(currX, currY)
        .filter(([cell, x, y]) => cell.blizzards && cell.blizzards.length === 0 && (cell.distance === undefined || (x === currX && y === currY)));

      for (let [cell, x, y] of possibleCellsAround) {
        if (x === endX && y === endY && startEndVisits === 2) return minute;

        nextCoords.push([x, y]);
        cell.distance = minute;

        if ((x === startX && y === startY && startEndVisits === 1) || (x === endX && y === endY && startEndVisits === 0)) {
          startEndVisits++;
          grids.forEach(grid => grid.getAllCells().forEach(cell => delete cell.distance));
          nextCoords = [[x, y]];
          cell.distance = minute;
          break coords;
        }
      }
    }

    currentCoords = nextCoords;
  }
}

// == ASSERTS ==

let exampleCalmValley = `\
#.#####
#.....#
#>....#
#.....#
#...v.#
#.....#
#####.#`
let exampleFierceValley = `\
#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`;

console.assert(part1(exampleCalmValley) === 10);
console.assert(part1(exampleFierceValley) === 18);

console.assert(part2(exampleCalmValley) === 3 * 10);
console.assert(part2(exampleFierceValley) === 54);
