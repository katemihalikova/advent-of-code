// == SHARED ==

class Grove {
  #grove = {};

  addElf(x, y) {
    this.#grove[y] = this.#grove[y] || {};
    this.#grove[y][x] = {x, y};
  }

  moveElf(elf, x, y) {
    delete this.#grove[elf.y][elf.x];
    if (Object.keys(this.#grove[elf.y]).length === 0) delete this.#grove[elf.y];
    this.addElf(x, y);
  }

  getElvesAroundElf({x, y}) {
    return {
      N: this.#grove[y - 1]?.[x],
      NE: this.#grove[y - 1]?.[x + 1],
      E: this.#grove[y]?.[x + 1],
      SE: this.#grove[y + 1]?.[x + 1],
      S: this.#grove[y + 1]?.[x],
      SW: this.#grove[y + 1]?.[x - 1],
      W: this.#grove[y]?.[x - 1],
      NW: this.#grove[y - 1]?.[x - 1],
    };
  }

  getEmptyTiles() {
    let elvesCount = Object.values(this.#grove).reduce((acc, row) => acc + Object.keys(row).length, 0);

    let xs = Object.values(this.#grove).reduce((acc, row) => new Set([...acc, ...Object.keys(row)]), []);
    let minX = Math.min(...xs);
    let maxX = Math.max(...xs);
    let ys = Object.keys(this.#grove);
    let minY = Math.min(...ys);
    let maxY = Math.max(...ys);

    return (maxX - minX + 1) * (maxY - minY + 1) - elvesCount;
  }

  *[Symbol.iterator]() {
    for (let y in this.#grove) {
      for (let x in this.#grove[y]) {
        yield this.#grove[y][x];
      }
    }
  }
}

// == PART 1 ==

function part1(input) {
  let grove = new Grove();

  input
    .split("\n")
    .forEach((line, y) => [...line]
      .forEach((cell, x) => cell === "#" && grove.addElf(x, y)));

  let conditions = [
    {canMove: ({N, NE, NW}) => [N, NE, NW].every(elf => elf === undefined), getNewCoords: (x, y) => `${x},${y - 1}`},
    {canMove: ({S, SE, SW}) => [S, SE, SW].every(elf => elf === undefined), getNewCoords: (x, y) => `${x},${y + 1}`},
    {canMove: ({W, NW, SW}) => [W, NW, SW].every(elf => elf === undefined), getNewCoords: (x, y) => `${x - 1},${y}`},
    {canMove: ({E, NE, SE}) => [E, NE, SE].every(elf => elf === undefined), getNewCoords: (x, y) => `${x + 1},${y}`},
  ];

  for (let round = 1; round <= 10; round++) {
    let moves = {};

    for (let elf of grove) {
      let elvesAround = grove.getElvesAroundElf(elf);

      if (Object.values(elvesAround).every(elf => elf === undefined)) {
        continue;
      }

      let coords = conditions.find(({canMove}) => canMove(elvesAround))?.getNewCoords(elf.x,elf.y);
      if (coords) {
        moves[coords] = moves[coords] || [];
        moves[coords].push(elf);
      }
    }

    for (let [coords, [elf, otherElf]] of Object.entries(moves)) {
      if (otherElf) continue;

      let [newX, newY] = coords.split(",").map(Number);
      grove.moveElf(elf, newX, newY);
    }

    conditions.push(conditions.shift());
  }

  return grove.getEmptyTiles();
}

// == PART 2 ==

function part2(input) {
  let grove = new Grove();

  input
    .split("\n")
    .forEach((line, y) => [...line]
      .forEach((cell, x) => cell === "#" && grove.addElf(x, y)));

  let conditions = [
    {canMove: ({N, NE, NW}) => [N, NE, NW].every(elf => elf === undefined), getNewCoords: (x, y) => `${x},${y - 1}`},
    {canMove: ({S, SE, SW}) => [S, SE, SW].every(elf => elf === undefined), getNewCoords: (x, y) => `${x},${y + 1}`},
    {canMove: ({W, NW, SW}) => [W, NW, SW].every(elf => elf === undefined), getNewCoords: (x, y) => `${x - 1},${y}`},
    {canMove: ({E, NE, SE}) => [E, NE, SE].every(elf => elf === undefined), getNewCoords: (x, y) => `${x + 1},${y}`},
  ];

  for (let round = 1;; round++) {
    let moves = {};

    for (let elf of grove) {
      let elvesAround = grove.getElvesAroundElf(elf);

      if (Object.values(elvesAround).every(elf => elf === undefined)) {
        continue;
      }
      
      let coords = conditions.find(({canMove}) => canMove(elvesAround))?.getNewCoords(elf.x,elf.y);
      if (coords) {
        moves[coords] = moves[coords] || [];
        moves[coords].push(elf);
      }
    }

    if (Object.values(moves).every(elves => elves.length !== 1)) return round;

    for (let [coords, [elf, otherElf]] of Object.entries(moves)) {
      if (otherElf) continue;

      let [newX, newY] = coords.split(",").map(Number);
      grove.moveElf(elf, newX, newY);
    }

    conditions.push(conditions.shift());
  }
}

// == ASSERTS ==

let smallerExample = `\
.....
..##.
..#..
.....
..##.
.....`;
let largerExample = `\
....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..`;

console.assert(part1(smallerExample) === 25);
console.assert(part1(largerExample) === 110);

console.assert(part2(smallerExample) === 4);
console.assert(part2(largerExample) === 20);
