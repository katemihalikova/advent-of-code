// == SHARED ==

class Grid {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.grid = {};
  }

  go(direction) {
    if (direction === "U") this.y--;
    if (direction === "D") this.y++;
    if (direction === "L") this.x--;
    if (direction === "R") this.x++;
  }
  jump(x, y) {
    this.x = x;
    this.y = y;
  }

  get() {
    return this.grid[y] && this.grid[this.y][this.x];
  }
  set(value) {
    this.grid[this.y] = this.grid[this.y] || {};
    this.grid[this.y][this.x] = value;
  }
  patch(value) {
    this.grid[this.y] = this.grid[this.y] || {};
    this.grid[this.y][this.x] = {
      ...(this.grid[this.y][this.x] || {}),
      ...value,
    };
  }
  patchIfEmpty(value) {
    this.grid[this.y] = this.grid[this.y] || {};
    this.grid[this.y][this.x] = {
      ...value,
      ...(this.grid[this.y][this.x] || {}),
    };
  }

  *[Symbol.iterator]() {
    for (let y in this.grid) {
      for (let x in this.grid[y]) {
        yield [this.grid[y][x], Number(x), Number(y)];
      }
    }
  }
}

// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(wire => wire.split(",").map(path => ({direction: path[0], steps: Number(path.substring(1))})));

  grid = new Grid;

  input.forEach((wire, wireNumber) => {
    grid.jump(0,0);
    wire.forEach(({direction, steps}) => {
      for (let step = 0; step < steps; step++) {
        grid.go(direction);
        grid.patch({[wireNumber]: true});
      }
    });
  });

  return [...grid]
    .filter(([point]) => point[0] && point[1])
    .reduce((min, [_, x, y]) => Math.min(min, Math.abs(x) + Math.abs(y)), Infinity);
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(wire => wire.split(",").map(path => ({direction: path[0], steps: Number(path.substring(1))})));

  grid = new Grid;

  input.forEach((wire, wireNumber) => {
    grid.jump(0,0);
    let distance = 0;
    wire.forEach(({direction, steps}) => {
      for (let step = 0; step < steps; step++) {
        grid.go(direction);
        distance++;
        grid.patchIfEmpty({[wireNumber]: distance});
      }
    });
  });

  return [...grid]
    .filter(([point]) => point[0] && point[1])
    .reduce((min, [point]) => Math.min(min, point[0] + point[1]), Infinity);
}

// == ASSERTS ==

console.assert(part1("R8,U5,L5,D3\nU7,R6,D4,L4") === 6);
console.assert(part1("R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83") === 159);
console.assert(part1("R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7") === 135);

console.assert(part2("R8,U5,L5,D3\nU7,R6,D4,L4") === 30);
console.assert(part2("R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83") === 610);
console.assert(part2("R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7") === 410);
