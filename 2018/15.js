// == PART 1 ==

function part1(input, elfPower = undefined) {
  let grid = input.split("\n").map((row, y) => row.split("").map((type, x) => {
    if (type === "#") return undefined;
    let cell = {x, y};
    if (type !== ".") cell.unit = {type, hp: 200, cell, power: type === "E" && elfPower || 3};
    return cell;
  }));

  let getCells = () => grid.flatMap(row => row.filter(Boolean));
  let getAllUnits = () => getCells().map(cell => cell.unit).filter(Boolean);
  let getAllOpponents = attacker => getAllUnits().filter(unit => unit.type !== attacker.type);

  let getCellsAround = ({x, y}) => [
    grid[y][x + 1],
    grid[y][x - 1],
    grid[y + 1] && grid[y + 1][x],
    grid[y - 1] && grid[y - 1][x],
  ].filter(Boolean);

  let getFreeCellsAround = unitOrCell => getCellsAround(unitOrCell.cell || unitOrCell).filter(cell => !cell.unit);
  let getFreeOrOwnCellsAround = (unit, ownUnit) => getCellsAround(unit.cell).filter(cell => !cell.unit || cell.unit === ownUnit);
  let getOpponentsAround = aroundUnit => getCellsAround(aroundUnit.cell).map(q => q.unit).filter(unit => unit && unit.type !== aroundUnit.type);

  let uniqueFilter = (item, index, array) => array.indexOf(item) === index;
  let getPossibleDestinationCells = fromUnit => getAllOpponents(fromUnit)
    .flatMap(unit => getFreeOrOwnCellsAround(unit, fromUnit))
    .filter(uniqueFilter);

  let readingOrderSorter = (a, b) => a.y - b.y || a.x - b.x;

  let pathfind = (sourceCell, possibleDestinationCells) => {
    let visitedCells = [sourceCell];
    let destination;

    while (!destination) {
      let searchedCells = getCells()
        .filter(cell => visitedCells.includes(cell))
        .flatMap(cell => getFreeCellsAround(cell))
        .filter(cell => !visitedCells.includes(cell))
        .filter(uniqueFilter);

      if (searchedCells.length === 0) return undefined;
      visitedCells.push(...searchedCells);

      destination = searchedCells
        .sort(readingOrderSorter)
        .find(cell => possibleDestinationCells.includes(cell));
    }

    return destination;
  }

  for (let round = 1;; round++) {
    let unitsOfThisRound = getAllUnits();
    round: for (let attacker of unitsOfThisRound) {
      if (attacker.hp <= 0) continue round;

      let possibleDestinationCells = getPossibleDestinationCells(attacker);

      if (!possibleDestinationCells.includes(attacker.cell)) {
        let destinationCell = pathfind(attacker.cell, possibleDestinationCells);
        if (!destinationCell) continue round;

        let possibleNextStepCells = getFreeCellsAround(attacker.cell);
        let nextStepCell = possibleNextStepCells.find(cell => cell === destinationCell) || pathfind(destinationCell, possibleNextStepCells);

        attacker.cell.unit = undefined;
        attacker.cell = nextStepCell;
        attacker.cell.unit = attacker;
      }

      let possibleTargets = getOpponentsAround(attacker);

      if (possibleTargets.length > 0) {
        let target = possibleTargets.sort((a, b) => a.hp - b.hp || readingOrderSorter(a.cell, b.cell))[0];
        target.hp -= attacker.power;

        if (target.hp <= 0) {
          if (target.type === "E" && elfPower) throw "Elf died :(";
          target.cell.unit = undefined;

          if (getAllOpponents(attacker).length === 0) {
            let lastFullRound = attacker === unitsOfThisRound[unitsOfThisRound.length - 1] ? round : round - 1;
            return lastFullRound * getAllUnits().reduce((sum, {hp}) => sum + hp, 0);
          }
        }
      }
    }
  }
}

// == PART 2 ==

function part2(input) {
  for (let power = 3;; power++) {
    try {
      return part1(input, power);
    } catch {}
  }
}

// == ASSERTS ==

console.assert(part1(`#######
#.G...#
#...EG#
#.#.#G#
#..G#E#
#.....#
#######`) === 47 * 590);
console.assert(part1(`#######
#G..#E#
#E#E.E#
#G.##.#
#...#E#
#...E.#
#######`) === 37 * 982);
console.assert(part1(`#######
#E..EG#
#.#G.E#
#E.##E#
#G..#.#
#..E#.#
#######`) === 46 * 859);
console.assert(part1(`#######
#E.G#.#
#.#G..#
#G.#.G#
#G..#.#
#...E.#
#######`) === 35 * 793);
console.assert(part1(`#######
#.E...#
#.#..G#
#.###.#
#E#G#G#
#...#G#
#######`) === 54 * 536);
console.assert(part1(`#########
#G......#
#.E.#...#
#..##..G#
#...##..#
#...#...#
#.G...G.#
#.....G.#
#########`) === 20 * 937);

console.assert(part2(`#######
#.G...#
#...EG#
#.#.#G#
#..G#E#
#.....#
#######`) === 29 * 172);
console.assert(part2(`#######
#E..EG#
#.#G.E#
#E.##E#
#G..#.#
#..E#.#
#######`) === 33 * 948);
console.assert(part2(`#######
#E.G#.#
#.#G..#
#G.#.G#
#G..#.#
#...E.#
#######`) === 37 * 94);
console.assert(part2(`#######
#.E...#
#.#..G#
#.###.#
#E#G#G#
#...#G#
#######`) === 39 * 166);
console.assert(part2(`#########
#G......#
#.E.#...#
#..##..G#
#...##..#
#...#...#
#.G...G.#
#.....G.#
#########`) === 30 * 38);
