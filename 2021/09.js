// == CLASSES ==

class Heightmap {
  #grid = {};

  write(x, y, value) {
    this.#grid[y] = this.#grid[y] || {};
    this.#grid[y][x] = this.#grid[y][x] || {x, y};
    this.#grid[y][x].value = value;
  }

  *[Symbol.iterator]() {
    for (let y in this.#grid) {
      for (let x in this.#grid[y]) {
        yield this.#grid[y][x];
      }
    }
  }

  getAllPoints() {
    return Object.values(this.#grid).flatMap(row => Object.values(row));
  }

  getPointsAround(x, y) {
    return [
      this.#grid[y][x+1],
      this.#grid[y][x-1],
      this.#grid[y+1]?.[x],
      this.#grid[y-1]?.[x],
    ].filter(point => point !== undefined);
  }
}

// == PART 1 ==

function part1(input) {
  let heightmap = new Heightmap();

  input
    .split("\n")
    .map(line => line.split("").map(Number))
    .forEach((row, y) => row.forEach((height, x) => {
      heightmap.write(x, y, height);
    }));

  let lowPoints = [];

  for (let {x, y, value: height} of heightmap) {
    if (heightmap.getPointsAround(x, y).every(({value: heightNearby}) => heightNearby > height)) {
      lowPoints.push(height + 1);
    }
  }

  return lowPoints.reduce((a, b) => a + b);
}

// == PART 2 ==

function part2(input) {
  let heightmap = new Heightmap();

  input
    .split("\n")
    .map(line => line.split("").map(Number))
    .forEach((row, y) => row.forEach((height, x) => {
      if (height < 9) {
        heightmap.write(x, y, undefined);
      }
    }));

  let nextBasin = 1;

  for (let {x, y} of heightmap) {
    let basinsAround = heightmap.getPointsAround(x, y).map(({value}) => value).filter(value => value !== undefined).filter((el, i, arr) => arr.indexOf(el) === i);
    let currentBasin = basinsAround.pop() || nextBasin++;

    heightmap.write(x, y, currentBasin);

    for (let basinToMerge of basinsAround) {
      for (let {x, y, value: basin} of heightmap) {
        if (basin === basinToMerge) {
          heightmap.write(x, y, currentBasin);
        }
      }
    }
  }

  let basinSizes = heightmap.getAllPoints()
    .map(({value}) => value)
    .reduce((acc, value) => {
      acc[value] = acc[value] || 0;
      acc[value]++;
      return acc;
    }, {});
  
  return Object.values(basinSizes)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b);
}

// == ASSERTS ==

console.assert(part1("2199943210\n3987894921\n9856789892\n8767896789\n9899965678") === 15);

console.assert(part2("2199943210\n3987894921\n9856789892\n8767896789\n9899965678") === 1134);
