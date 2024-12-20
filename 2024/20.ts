// == SHARED ==

type Position = number | undefined;
type State = {row: number, col: number};

function runThroughRacetrack(input: string): Position[][] {
  let startRow = NaN, startCol = NaN;

  let racetrack = input
    .split("\n")
    .map((line, row) => [...line].map<Position>((position, col) => {
      if (position === "#") return undefined;
      if (position === "S") {
        startRow = row;
        startCol = col;
        return 0;
      }
      return Infinity;
    }));

  let currentPositions: State[] = [{row: startRow, col: startCol}];

  for (let score = 1; currentPositions.length > 0; score++) {
    let nextPositions: State[] = [];

    for (let {row, col} of currentPositions) {
      [
        [row + 1, col],
        [row - 1, col],
        [row, col + 1],
        [row, col - 1],
      ]
        .filter(([nextRow, nextCol]) => racetrack[nextRow]?.[nextCol] && racetrack[nextRow]?.[nextCol] > score + 1)
        .forEach(([nextRow, nextCol]) => {
          racetrack[nextRow][nextCol] = score;
          nextPositions.push({row: nextRow, col: nextCol});
        });
    }

    currentPositions = nextPositions;
  }

  return racetrack;
}

// == PART 1 ==

function part1(input: string, threshold = 100): number {
  let runWithoutCheating = runThroughRacetrack(input);

  function getCheatablePositions(row: number, col: number): number[] {
    return [
      [row + 2, col],
      [row - 2, col],
      [row, col + 2],
      [row, col - 2],
      [row + 1, col + 1],
      [row + 1, col + 1],
      [row - 1, col - 1],
      [row - 1, col - 1],
    ]
      .map(([row, col]) => runWithoutCheating[row]?.[col])
      .filter((position): position is number => Number.isFinite(position));
  }

  let cheats = 0;

  runWithoutCheating.forEach((line, row1) => line.forEach((position1, col1) => {
    getCheatablePositions(row1, col1).forEach(position2 => {
      if (Number.isFinite(position1) && Number.isFinite(position2)) {
        if (position2! - position1! - 2 >= threshold) cheats++;
      }
    });
  }));

  return cheats;
}

// == PART 2 ==

function part2(input: string, threshold = 100): number {
  let runWithoutCheating = runThroughRacetrack(input);

  let cheats = 0;

  runWithoutCheating.forEach((line, row1) => line.forEach((position1, col1) => {
    runWithoutCheating.forEach((line, row2) => line.forEach((position2, col2) => {
      let taxicabDistance = Math.abs(row1 - row2) + Math.abs(col1 - col2);
      if (Number.isFinite(position1) && Number.isFinite(position2) && taxicabDistance <= 20) {
        if (position2! - position1! - taxicabDistance >= threshold) cheats++;
      }
    }));
  }));

  return cheats;
}

// == ASSERTS ==

let example = `\
###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`;

console.assert(part1(example, 64) === 1);
console.assert(part1(example, 40) === 1 + 1);
console.assert(part1(example, 38) === 1 + 1 + 1);
console.assert(part1(example, 36) === 1 + 1 + 1 + 1);
console.assert(part1(example, 20) === 1 + 1 + 1 + 1 + 1);
console.assert(part1(example, 12) === 1 + 1 + 1 + 1 + 1 + 3);
console.assert(part1(example, 10) === 1 + 1 + 1 + 1 + 1 + 3 + 2);
console.assert(part1(example, 8) === 1 + 1 + 1 + 1 + 1 + 3 + 2 + 4);
console.assert(part1(example, 6) === 1 + 1 + 1 + 1 + 1 + 3 + 2 + 4 + 2);
console.assert(part1(example, 4) === 1 + 1 + 1 + 1 + 1 + 3 + 2 + 4 + 2 + 14);
console.assert(part1(example, 2) === 1 + 1 + 1 + 1 + 1 + 3 + 2 + 4 + 2 + 14 + 14);

console.assert(part2(example, 76) === 3);
console.assert(part2(example, 74) === 3 + 4);
console.assert(part2(example, 72) === 3 + 4 + 22);
console.assert(part2(example, 70) === 3 + 4 + 22 + 12);
console.assert(part2(example, 68) === 3 + 4 + 22 + 12 + 14);
console.assert(part2(example, 66) === 3 + 4 + 22 + 12 + 14 + 12);
console.assert(part2(example, 64) === 3 + 4 + 22 + 12 + 14 + 12 + 19);
console.assert(part2(example, 62) === 3 + 4 + 22 + 12 + 14 + 12 + 19 + 20);
console.assert(part2(example, 60) === 3 + 4 + 22 + 12 + 14 + 12 + 19 + 20 + 23);
console.assert(part2(example, 58) === 3 + 4 + 22 + 12 + 14 + 12 + 19 + 20 + 23 + 25);
console.assert(part2(example, 56) === 3 + 4 + 22 + 12 + 14 + 12 + 19 + 20 + 23 + 25 + 39);
console.assert(part2(example, 54) === 3 + 4 + 22 + 12 + 14 + 12 + 19 + 20 + 23 + 25 + 39 + 29);
console.assert(part2(example, 52) === 3 + 4 + 22 + 12 + 14 + 12 + 19 + 20 + 23 + 25 + 39 + 29 + 31);
console.assert(part2(example, 50) === 3 + 4 + 22 + 12 + 14 + 12 + 19 + 20 + 23 + 25 + 39 + 29 + 31 + 32);
