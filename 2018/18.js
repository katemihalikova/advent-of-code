// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(row => row.split(""));

  const OPEN_GROUND = ".";
  const TREES = "|";
  const LUMBERYARD = "#";

  for (let time = 1; time <= 10; time++) {
    input = input.map((row, y) => row.map((acre, x) => {
      let adjacent = [
        input[y][x + 1],
        input[y][x - 1],
        input[y + 1] && input[y + 1][x],
        input[y + 1] && input[y + 1][x + 1],
        input[y + 1] && input[y + 1][x - 1],
        input[y - 1] && input[y - 1][x],
        input[y - 1] && input[y - 1][x + 1],
        input[y - 1] && input[y - 1][x - 1],
      ].filter(Boolean);

      if (acre === OPEN_GROUND) {
        if (adjacent.filter(a => a === TREES).length >= 3) return TREES;
        else return OPEN_GROUND;
      } else if (acre === TREES) {
        if (adjacent.filter(a => a === LUMBERYARD).length >= 3) return LUMBERYARD;
        else return TREES;
      } else {
        if (adjacent.filter(a => a === LUMBERYARD).length >= 1 && adjacent.filter(a => a === TREES).length >= 1) return LUMBERYARD;
        else return OPEN_GROUND;
      }
    }));
  }

  let trees = 0;
  let lumberyards = 0;
  input.forEach(row => row.forEach(acre => {
    if (acre === TREES) trees++;
    if (acre === LUMBERYARD) lumberyards++;
  }))

  return trees * lumberyards;
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(row => row.split(""));

  const OPEN_GROUND = ".";
  const TREES = "|";
  const LUMBERYARD = "#";

  let previousStates = {};
  let totalTime = 1000000000;

  for (let time = 1; time <= totalTime; time++) {
    input = input.map((row, y) => row.map((acre, x) => {
      let adjacent = [
        input[y][x + 1],
        input[y][x - 1],
        input[y + 1] && input[y + 1][x],
        input[y + 1] && input[y + 1][x + 1],
        input[y + 1] && input[y + 1][x - 1],
        input[y - 1] && input[y - 1][x],
        input[y - 1] && input[y - 1][x + 1],
        input[y - 1] && input[y - 1][x - 1],
      ].filter(Boolean);

      if (acre === OPEN_GROUND) {
        if (adjacent.filter(a => a === TREES).length >= 3) return TREES;
        else return OPEN_GROUND;
      } else if (acre === TREES) {
        if (adjacent.filter(a => a === LUMBERYARD).length >= 3) return LUMBERYARD;
        else return TREES;
      } else {
        if (adjacent.filter(a => a === LUMBERYARD).length >= 1 && adjacent.filter(a => a === TREES).length >= 1) return LUMBERYARD;
        else return OPEN_GROUND;
      }
    }));

    let snapshot = input.map(row => row.join("")).join("/");

    if (snapshot in previousStates) {
      let previousTime = previousStates[snapshot];
      let timeDiff = time - previousTime;
      time += Math.floor((totalTime - time) / timeDiff) * timeDiff;
    } else {
      previousStates[snapshot] = time;
    }

  }

  let trees = 0;
  let lumberyards = 0;
  input.forEach(row => row.forEach(acre => {
    if (acre === TREES) trees++;
    if (acre === LUMBERYARD) lumberyards++;
  }))

  return trees * lumberyards;
}

// == ASSERTS ==

console.assert(part1(".#.#...|#.\n.....#|##|\n.|..|...#.\n..|#.....#\n#.#|||#|#|\n...#.||...\n.|....|...\n||...#|.#|\n|.||||..|.\n...#.|..|.") === 1147);

console.assert(part2(".#.#...|#.\n.....#|##|\n.|..|...#.\n..|#.....#\n#.#|||#|#|\n...#.||...\n.|....|...\n||...#|.#|\n|.||||..|.\n...#.|..|.") === 0);
