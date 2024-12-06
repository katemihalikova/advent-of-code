// == SHARED ==

class LabGuard {
  #lab: string[][];
  #row: number;
  #col: number;
  #dir: "U" | "R" | "D" | "L" = "U";
  #visitedPositions = new Set<string>();
  #visitedPositionsAndDirections = new Set<string>();
  #startRow: number;
  #startCol: number;

  constructor(lab: string[][]) {
    this.#lab = structuredClone(lab);
    this.#row = this.#lab.findIndex(row => row.some(position => position === "^"));
    this.#col = this.#lab[this.#row].findIndex(position => position === "^");
    this.#lab[this.#row][this.#col] = ".";
    this.#startRow = this.#row;
    this.#startCol = this.#col;
    this.#saveVisitedPosition();
  }

  walkThroughLab(): void {
    while (true) {
      while(this.#readFromInFrontOfMe() === "#") this.#turnRight();
      this.#moveForward();
      if (this.#readFromInFrontOfMe() === undefined) break;
    }
  }

  getNumberOfVisitedPositions(): number {
    return this.#visitedPositions.size;
  }

  getPossibleObstructionPositions(): [number, number][] {
    return [...this.#visitedPositions]
      .map(pos => pos.split(",").map(Number) as [number, number])
      .filter(([row, col]) => row !== this.#startRow || col !== this.#startCol);
  }

  #moveForward() {
    if (this.#dir === "U") this.#row--;
    if (this.#dir === "R") this.#col++;
    if (this.#dir === "D") this.#row++;
    if (this.#dir === "L") this.#col--;
    this.#saveVisitedPosition();
  }

  #readFromInFrontOfMe() {
    let col = this.#col, row = this.#row;
    if (this.#dir === "U") row--;
    if (this.#dir === "R") col++;
    if (this.#dir === "D") row++;
    if (this.#dir === "L") col--;
    return this.#lab[row]?.[col];
  }

  #turnRight() {
    this.#dir = ({"U":"R", "R":"D", "D":"L", "L":"U"} as const)[this.#dir];
  }

  #saveVisitedPosition() {
    let rowAndColAndDir = `${this.#row},${this.#col},${this.#dir}`;
    if (this.#visitedPositionsAndDirections.has(rowAndColAndDir)) {
      throw "infinite loop";
    }

    this.#visitedPositions.add(`${this.#row},${this.#col}`);
    this.#visitedPositionsAndDirections.add(rowAndColAndDir);
  }
}

function part1(input: string): number  {
  let lab = input.split("\n").map(line => [...line]);

  let guard = new LabGuard(lab);
  guard.walkThroughLab();
  return guard.getNumberOfVisitedPositions();
}

// == PART 2 ==

function part2(input: string): number {
  let lab = input.split("\n").map(line => [...line]);

  let guard = new LabGuard(lab);
  guard.walkThroughLab();

  return guard.getPossibleObstructionPositions()
    .filter(([obstructionRow, obstructionCol]) => {
      let obstructedLab = structuredClone(lab);
      obstructedLab[obstructionRow][obstructionCol] = "#";
      let obstructedGuard = new LabGuard(obstructedLab);

      try {
        obstructedGuard.walkThroughLab();
        return false;
      } catch {
        return true;
      }
    })
    .length;
}

// == ASSERTS ==

let example = `\
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

console.assert(part1(example) === 41);

console.assert(part2(example) === 6);
