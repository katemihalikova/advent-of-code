// == PART 1 ==

function part1(input) {
  let map = input
    .split("\n")
    .map(line => [...line].map(Number));

  let crucibles = [
    {x: 0, y: 0, direction: "R", stepsInDirection: 0, heatToLose: 0},
    {x: 0, y: 0, direction: "D", stepsInDirection: 0, heatToLose: 0},
  ];

  let visitedCityBlocks = new Set();

  for (let totalHeatLoss = 0;; totalHeatLoss++) {
    let nextCrucibles = [];

    for (let {x, y, direction, stepsInDirection, heatToLose} of crucibles) {
      heatToLose--;

      if (heatToLose > 0) {
        nextCrucibles.push({x, y, direction, stepsInDirection, heatToLose});
        continue;
      }

      if (x === map[0].length - 1 && y === map.length - 1) {
        return totalHeatLoss;
      }

      if (direction === "U") y--;
      if (direction === "D") y++;
      if (direction === "L") x--;
      if (direction === "R") x++;
      stepsInDirection++;

      heatToLose = map[y]?.[x];
      if (heatToLose === undefined) continue;

      let key = `${x}/${y}/${direction}/${stepsInDirection}`;
      if (visitedCityBlocks.has(key)) continue;
      visitedCityBlocks.add(key);

      if (stepsInDirection < 3) nextCrucibles.push({x, y, direction, stepsInDirection, heatToLose});
      nextCrucibles.push({x, y, direction: {R: "D", D: "L", L: "U", U: "R"}[direction], stepsInDirection: 0, heatToLose});
      nextCrucibles.push({x, y, direction: {R: "U", U: "L", L: "D", D: "R"}[direction], stepsInDirection: 0, heatToLose});
    }

    crucibles = nextCrucibles;
  }
}

// == PART 2 ==

function part2(input) {
  let map = input
    .split("\n")
    .map(line => [...line].map(Number));

  let crucibles = [
    {x: 0, y: 0, direction: "R", stepsInDirection: 0, heatToLose: 0},
    {x: 0, y: 0, direction: "D", stepsInDirection: 0, heatToLose: 0},
  ];

  let visitedCityBlocks = new Set();

  for (let totalHeatLoss = 0;; totalHeatLoss++) {
    let nextCrucibles = [];

    for (let {x, y, direction, stepsInDirection, heatToLose} of crucibles) {
      heatToLose--;

      if (heatToLose > 0) {
        nextCrucibles.push({x, y, direction, stepsInDirection, heatToLose});
        continue;
      }

      if (x === map[0].length - 1 && y === map.length - 1 && stepsInDirection >= 4) {
        return totalHeatLoss;
      }

      if (direction === "U") y--;
      if (direction === "D") y++;
      if (direction === "L") x--;
      if (direction === "R") x++;
      stepsInDirection++;

      heatToLose = map[y]?.[x];
      if (heatToLose === undefined) continue;

      let key = `${x}/${y}/${direction}/${stepsInDirection}`;
      if (visitedCityBlocks.has(key)) continue;
      visitedCityBlocks.add(key);

      if (stepsInDirection < 10) nextCrucibles.push({x, y, direction, stepsInDirection, heatToLose});
      if (stepsInDirection >= 4) nextCrucibles.push({x, y, direction: {R: "D", D: "L", L: "U", U: "R"}[direction], stepsInDirection: 0, heatToLose});
      if (stepsInDirection >= 4) nextCrucibles.push({x, y, direction: {R: "U", U: "L", L: "D", D: "R"}[direction], stepsInDirection: 0, heatToLose});
    }

    crucibles = nextCrucibles;
  }
}

// == ASSERTS ==

let example =
`2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`;

console.log(part1(example) ,"===", 102);

console.log(part2(example) ,"===", 94);
console.log(part2(
`111111111111
999999999991
999999999991
999999999991
999999999991`) ,"===", 71);
