// == CLASSES ==

class Position {
  risk;
  minTotalRisk = Infinity;

  constructor(risk) {
    this.risk = risk;
  }
}

// == PART 1 ==

function part1(input) {
  let cave = input
    .split("\n")
    .map(line => line
      .split("")
      .map(risk => new Position(Number(risk)))
    );

  cave[0][0].minTotalRisk = 0;

  for (let checkNow = [[0, 0]]; checkNow.length > 0;) {
    let checkNext = [];

    for (let [x, y] of checkNow) {
      for (let [dx, dy] of [[+1, 0], [-1, 0], [0, +1], [0, -1]]) {
        if (cave[y + dy]?.[x + dx] === undefined) continue;

        let previousMinRisk = cave[y + dy][x + dx].minTotalRisk;
        let possibleMinRisk = cave[y][x].minTotalRisk + cave[y + dy][x + dx].risk;

        if (possibleMinRisk < previousMinRisk) {
          cave[y + dy][x + dx].minTotalRisk = possibleMinRisk;
          checkNext.push([x + dx, y + dy]);
        }
      }
    }

    checkNow = checkNext;
  }

  return cave.at(-1).at(-1).minTotalRisk;
}

// == PART 2 ==

function part2(input) {
  input = input
    .split("\n")
    .map(line => line
      .split("")
      .map(Number)
    );

  let cave = [];

  for (let i = 0; i <= 4; i++) {
    let rows = input
      .map(row => row.map(risk => (risk + i) % 9 || 9))
      .map(row => {
        let newRow = [];
        for (let i = 0; i <= 4; i++) {
          let newInput = row.map(risk => new Position((risk + i) % 9 || 9));
          newRow.push(...newInput);
        }
    
        return newRow;
      });
    cave.push(...rows);
  }

  cave[0][0].minTotalRisk = 0;

  for (let checkNow = [[0, 0]]; checkNow.length > 0;) {
    let checkNext = [];

    for (let [x, y] of checkNow) {
      for (let [dx, dy] of [[+1, 0], [-1, 0], [0, +1], [0, -1]]) {
        if (cave[y + dy]?.[x + dx] === undefined) continue;

        let previousMinRisk = cave[y + dy][x + dx].minTotalRisk;
        let possibleMinRisk = cave[y][x].minTotalRisk + cave[y + dy][x + dx].risk;

        if (possibleMinRisk < previousMinRisk) {
          cave[y + dy][x + dx].minTotalRisk = possibleMinRisk;
          checkNext.push([x + dx, y + dy]);
        }
      }
    }

    checkNow = checkNext;
  }

  return cave.at(-1).at(-1).minTotalRisk;
}

// == ASSERTS ==

console.assert(part1("1163751742\n1381373672\n2136511328\n3694931569\n7463417111\n1319128137\n1359912421\n3125421639\n1293138521\n2311944581") === 40);

console.assert(part2("1163751742\n1381373672\n2136511328\n3694931569\n7463417111\n1319128137\n1359912421\n3125421639\n1293138521\n2311944581") === 315);
