// == PART 1 ==

function part1(input) {
  grid = input
    .split("\n")
    .map(line => [...line]);

  let startX = grid.find(row => row.includes("S")).indexOf("S");
  let startY = grid.findIndex(row => row.includes("S"));

  let x = startX;
  let y = startY;
  let dir = ["-","7", "J"].includes(grid[startY][startX + 1]) ? "R" : ["-","F", "L"].includes(grid[startY][startX - 1]) ? "L" : "D";

  for (let step = 1;; step++) {
    if (dir === "U") y--;
    if (dir === "R") x++;
    if (dir === "D") y++;
    if (dir === "L") x--;

    let pipe = grid[y][x];

    if (pipe === "S") {
      return step / 2;
    } else if (dir === "R") {
      if (pipe === "J") dir = "U";
      if (pipe === "7") dir = "D";
    } else if (dir === "D") {
      if (pipe === "J") dir = "L";
      if (pipe === "L") dir = "R";
    } else if (dir === "L") {
      if (pipe === "F") dir = "D";
      if (pipe === "L") dir = "U";
    } else {
      if (pipe === "F") dir = "R";
      if (pipe === "7") dir = "L";
    }
  }
}

// == PART 2 ==

function part2(input) {
  let grid = input
    .split("\n")
    .map((line, y, grid) => [...line].map((symbol, x) => {
      if (symbol === "S") {
        let dir = "";
        if (["-","7", "J"].includes(grid[y][x + 1])) dir += "R";
        if (["-","F", "L"].includes(grid[y][x - 1])) dir += "L";
        if (["|","F", "7"].includes(grid[y - 1]?.[x])) dir += "U";
        if (["|","L", "J"].includes(grid[y + 1]?.[x])) dir += "D";
        if (dir === "RL") symbol = "-";
        if (dir === "RU") symbol = "L";
        if (dir === "RD") symbol = "F";
        if (dir === "LU") symbol = "J";
        if (dir === "LD") symbol = "7";
        if (dir === "UD") symbol = "|";
      }

      let upleft, upright, downleft, downright;

      if (symbol === "-") {
        upleft = upright = {out: false};
        downleft = downright = {out: false};
      } else if (symbol === "|") {
        upleft = downleft = {out: false};
        upright = downright = {out: false};
      } else if (symbol === "L") {
        upleft = downleft = downright = {out: false};
        upright = {out: false};
      } else if (symbol === "F") {
        upleft = downleft = upright = {out: false};
        downright = {out: false};
      } else if (symbol === "J") {
        upleft = {out: false};
        downleft = upright = downright = {out: false};
      } else if (symbol === "7") {
        downleft = {out: false};
        upleft = upright = downright = {out: false};
      } else {
        upleft = upright = downleft = downright = {out: false};
      }

      if (x === 0) upleft.out = downleft.out = true;
      if (y === 0) upleft.out = upright.out = true;
      if (x === line.length - 1) upright.out = downright.out = true;
      if (y === grid.length - 1) downleft.out = downright.out = true;

      return {
        upleft,
        upright,
        downleft,
        downright,
        symbol,
      }
    }));

  while (true) {
    let changed = false;
    grid.forEach((row, y) => row.forEach(({upleft, upright, downleft, downright}, x) => {
      if (!upleft.out && (grid[y - 1]?.[x].downleft.out || grid[y][x - 1]?.upright.out)) upleft.out = changed = true;
      if (!upright.out && (grid[y - 1]?.[x].downright.out || grid[y][x + 1]?.upleft.out)) upright.out = changed = true;
      if (!downleft.out && (grid[y + 1]?.[x].upleft.out || grid[y][x - 1]?.downright.out)) downleft.out = changed = true;
      if (!downright.out && (grid[y + 1]?.[x].upright.out || grid[y][x + 1]?.downleft.out)) downright.out = changed = true;
    }));
    if (!changed) break;
  }

  return grid.reduce((count, row) => count + row.filter(({upleft, upright, downleft, downright}) => !upleft.out && !upright.out && !downleft.out && !downright.out).length, 0);
}

// == ASSERTS ==

console.assert(part1(
`.....
.S-7.
.|.|.
.L-J.
.....`) === 4);
console.assert(part1(
`..F7.
.FJ|.
SJ.L7
|F--J
LJ...`) === 8);
console.assert(part1(
`-L|F7
7S-7|
L|7||
-L-J|
L|-JF`) === 4);
console.assert(part1(
`7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`) === 8);

console.assert(part2(
`...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`) === 4);
console.assert(part2(
`..........
.S------7.
.|F----7|.
.||....||.
.||....||.
.|L-7F-J|.
.|..||..|.
.L--JL--J.
..........`) === 4);
console.assert(part2(
`.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`) === 8);
console.assert(part2(
`FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`) === 10);
