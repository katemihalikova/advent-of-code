// == PART 1 ==

function part1(input) {
  const INFECTED = Symbol("infected"), CLEAN = undefined;
  const UP = 0, RIGHT = 1, DOWN = 2, LEFT = 3;

  let grid = input.split("\n").map(row => row.split("").map(node => node === "#" ? INFECTED : CLEAN));

  let x = (grid.length - 1) / 2;
  let y = x;
  let dir = UP;

  let infected = 0;

  for (let i = 0; i < 10000; i++) {
    grid[y] = grid[y] || {};

    if (grid[y][x] === INFECTED) {
      dir = (dir + 1) % 4;
      grid[y][x] = CLEAN;
    } else {
      dir = (dir + 3) % 4;
      grid[y][x] = INFECTED;
      infected++;
    }

    if (dir === UP) y--;
    if (dir === RIGHT) x++;
    if (dir === DOWN) y++;
    if (dir === LEFT) x--;
  }

  return infected;
}

// == PART 2 ==

function part2(input) {
  const WEAKENED = Symbol("weakened"), INFECTED = Symbol("infected"), FLAGGED = Symbol("flagged"), CLEAN = undefined;
  const UP = 0, RIGHT = 1, DOWN = 2, LEFT = 3;

  let grid = input.split("\n").map(row => row.split("").map(node => node === "#" ? INFECTED : CLEAN));

  let x = (grid.length - 1) / 2;
  let y = x;
  let dir = UP;

  let infected = 0;

  for (let i = 0; i < 10000000; i++) {
    grid[y] = grid[y] || {};

    if (grid[y][x] === WEAKENED) {
      grid[y][x] = INFECTED;
      infected++;
    } else if (grid[y][x] === INFECTED) {
      dir = (dir + 1) % 4;
      grid[y][x] = FLAGGED;
    } else if (grid[y][x] === FLAGGED) {
      dir = (dir + 2) % 4;
      grid[y][x] = CLEAN;
    } else {
      dir = (dir + 3) % 4;
      grid[y][x] = WEAKENED;
    }

    if (dir === UP) y--;
    if (dir === RIGHT) x++;
    if (dir === DOWN) y++;
    if (dir === LEFT) x--;
  }

  return infected;
}

// == ASSERTS ==

console.assert(part1("..#\n#..\n...") === 5587);

console.assert(part2("..#\n#..\n...") === 2511944);
