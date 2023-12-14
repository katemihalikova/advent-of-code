// == PART 1 ==

function part1(input) {
  input = input.split("\n");
  input = [...input[0]].map((_, index) => input.map(row => row[index]).reverse().join(""));

  return input
    .map(row => row.replaceAll(/[\.O]+/g, (roundRocksAndSpaces) => {
      let length = roundRocksAndSpaces.length;
      return roundRocksAndSpaces.replaceAll(".", "").padStart(length, ".");
    }))
    .reduce((sum, row) => sum + [...row].reduce((rowSum, rockOrSpace, index) => rowSum + (rockOrSpace === "O" ? index + 1 : 0), 0), 0);
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n");

  let rotateClockwise = () => input = [...input[0]].map((_, index) => input.map(row => row[index]).reverse().join(""));

  let moveRocks = () => input = input.map(row => row.replaceAll(/[\.O]+/g, (roundRocksAndSpaces) => {
    let length = roundRocksAndSpaces.length;
    return roundRocksAndSpaces.replaceAll(".", "").padStart(length, ".");
  }));

  let seenStates = new Map();

  for (let cycle = 1; cycle <= 1000000000; cycle++) {
    rotateClockwise();
    moveRocks();
    rotateClockwise();
    moveRocks();
    rotateClockwise();
    moveRocks();
    rotateClockwise();
    moveRocks();

    let currentState = input.join("\n");

    if (seenStates.has(currentState)) {
      let diff = cycle - seenStates.get(currentState);
      while (cycle < 1000000000 - diff) cycle += diff;
    } else {
      seenStates.set(currentState, cycle);
    }
  }

  return input.reduce((sum, row, index) => sum + ((row.length - index) * row.replaceAll(/[^O]/g, "").length), 0);
}

// == ASSERTS ==

const example =
`O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

console.assert(part1(example) === 136);

console.assert(part2(example) === 64);
