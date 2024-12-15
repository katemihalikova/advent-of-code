// == PART 1 ==

function part1(input: string): number {
  let [mapString, directionsString] = input.split("\n\n");
  let map = mapString
    .split("\n")
    .map(line => [...line]);
  let directions = [...directionsString].filter(symbol => symbol !== "\n");

  class Warehouse {
    #map: string[][];
    #left: number;
    #top: number;

    constructor(map: string[][]) {
      this.#map = map;
      this.#left = map[0].findIndex((_, left) => map.some(line => line[left] === "@"));
      this.#top = map.findIndex((_, top) => map[top].some(symbol => symbol === "@"));
      this.#map[this.#top][this.#left] = ".";
    }

    walk(directions: string[]): void {
      for (let direction of directions) {
        this.#step(direction);
      }
    }

    #step(direction: string): void {
      if (direction === "^") {
        let minTop = this.#map.findLastIndex((line, top) => line[this.#left] !== "O" && top < this.#top);
        if (this.#map[minTop][this.#left] === "#") return;
        this.#top--;
        [this.#map[minTop][this.#left], this.#map[this.#top][this.#left]] = [this.#map[this.#top][this.#left], this.#map[minTop][this.#left]];

      } else if (direction === "v") {
        let maxTop = this.#map.findIndex((line, top) => line[this.#left] !== "O" && top > this.#top);
        if (this.#map[maxTop][this.#left] === "#") return;
        this.#top++;
        [this.#map[maxTop][this.#left], this.#map[this.#top][this.#left]] = [this.#map[this.#top][this.#left], this.#map[maxTop][this.#left]];

      } else if (direction === "<") {
        let minLeft = this.#map[this.#top].findLastIndex((symbol, left) => symbol !== "O" && left < this.#left);
        if (this.#map[this.#top][minLeft] === "#") return;
        this.#left--;
        [this.#map[this.#top][minLeft], this.#map[this.#top][this.#left]] = [this.#map[this.#top][this.#left], this.#map[this.#top][minLeft]];

      } else if (direction === ">") {
        let maxLeft = this.#map[this.#top].findIndex((symbol, left) => symbol !== "O" && left > this.#left);
        if (this.#map[this.#top][maxLeft] === "#") return;
        this.#left++;
        [this.#map[this.#top][maxLeft], this.#map[this.#top][this.#left]] = [this.#map[this.#top][this.#left], this.#map[this.#top][maxLeft]];
      }
    }

    getSumOfCrateGpsCoordinates(): number {
      return this.#map.reduce((sum, line, top) => {
        line.forEach((symbol, left) => {
          if (symbol === "O") sum += left + 100 * top;
        })
        return sum;
      }, 0);
    }
  }

  let warehouse = new Warehouse(map);
  warehouse.walk(directions);
  return warehouse.getSumOfCrateGpsCoordinates();
}

// == PART 2 ==

function part2(input: string): number {
  let [mapString, directionsString] = input.split("\n\n");
  let map = mapString
    .replaceAll(".", "..")
    .replaceAll("#", "##")
    .replaceAll("O", "[]")
    .replaceAll("@", "@.")
    .split("\n")
    .map(line => [...line]);
  let directions = [...directionsString].filter(symbol => symbol !== "\n");

  class Warehouse {
    #map: string[][];
    #left: number;
    #top: number;

    constructor(map: string[][]) {
      this.#map = map;
      this.#left = map[0].findIndex((_, left) => map.some(line => line[left] === "@"));
      this.#top = map.findIndex((_, top) => map[top].some(symbol => symbol === "@"));
      this.#map[this.#top][this.#left] = ".";
    }

    walk(directions: string[]): void {
      for (let direction of directions) {
        this.#step(direction);
      }
    }

    #step(direction: string): void {
      if (direction === "^") {
        let robotAndCrates = [[this.#top, this.#left]];
        for (let top = this.#top - 1; top >= 0; top--) {
          for (let [prevTop, left] of robotAndCrates) {
            if (prevTop !== top + 1) continue;
            if (this.#map[top][left] === "[") {
              if (robotAndCrates.every(([t, l]) => t !== top || l !== left)) robotAndCrates.push([top, left]);
              if (robotAndCrates.every(([t, l]) => t !== top || l !== left + 1)) robotAndCrates.push([top, left + 1]);
            }
            if (this.#map[top][left] === "]") {
              if (robotAndCrates.every(([t, l]) => t !== top || l !== left)) robotAndCrates.push([top, left]);
              if (robotAndCrates.every(([t, l]) => t !== top || l !== left - 1)) robotAndCrates.push([top, left - 1]);
            }
          }
        }
        if (robotAndCrates.every(([top, left]) => this.#map[top - 1][left] !== "#")) {
          for (let [top, left] of robotAndCrates.toReversed()) {
            [this.#map[top - 1][left], this.#map[top][left]] = [this.#map[top][left], this.#map[top - 1][left]];
          }
          this.#top--;
        }

      } else if (direction === "v") {
        let robotAndCrates = [[this.#top, this.#left]];
        for (let top = this.#top + 1; top < this.#map.length; top++) {
          for (let [prevTop, left] of robotAndCrates) {
            if (prevTop !== top - 1) continue;
            if (this.#map[top][left] === "[") {
              if (robotAndCrates.every(([t, l]) => t !== top || l !== left)) robotAndCrates.push([top, left]);
              if (robotAndCrates.every(([t, l]) => t !== top || l !== left + 1)) robotAndCrates.push([top, left + 1]);
            }
            if (this.#map[top][left] === "]") {
              if (robotAndCrates.every(([t, l]) => t !== top || l !== left)) robotAndCrates.push([top, left]);
              if (robotAndCrates.every(([t, l]) => t !== top || l !== left - 1)) robotAndCrates.push([top, left - 1]);
            }
          }
        }
        if (robotAndCrates.every(([top, left]) => this.#map[top + 1][left] !== "#")) {
          for (let [top, left] of robotAndCrates.toReversed()) {
            [this.#map[top + 1][left], this.#map[top][left]] = [this.#map[top][left], this.#map[top + 1][left]];
          }
          this.#top++;
        }

      } else if (direction === "<") {
        let minLeft = this.#map[this.#top].findLastIndex((symbol, left) => symbol !== "[" && symbol !== "]" && left < this.#left);
        if (this.#map[this.#top][minLeft] === "#") return;
        for (let left = minLeft; left < this.#left; left++) {
          [this.#map[this.#top][left + 1], this.#map[this.#top][left]] = [this.#map[this.#top][left], this.#map[this.#top][left + 1]];
        }
        this.#left--;

      } else if (direction === ">") {
        let maxLeft = this.#map[this.#top].findIndex((symbol, left) => symbol !== "[" && symbol !== "]" && left > this.#left);
        if (this.#map[this.#top][maxLeft] === "#") return;
        for (let left = maxLeft; left > this.#left; left--) {
          [this.#map[this.#top][left - 1], this.#map[this.#top][left]] = [this.#map[this.#top][left], this.#map[this.#top][left - 1]];
        }
        this.#left++;
      }
    }

    getSumOfCrateGpsCoordinates(): number {
      return this.#map.reduce((sum, line, top) => {
        line.forEach((symbol, left) => {
          if (symbol === "[") sum += left + 100 * top;
        })
        return sum;
      }, 0);
    }
  }

  let warehouse = new Warehouse(map);
  warehouse.walk(directions);
  return warehouse.getSumOfCrateGpsCoordinates();
}

// == ASSERTS ==

console.assert(part1(`\
##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`) === 10092);
console.assert(part1(`\
########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`) === 2028);

console.assert(part2(`\
##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`) === 9021);
