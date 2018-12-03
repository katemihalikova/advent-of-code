// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(claim => {
    let [, xLeft, yTop, width, height] = claim.match(/^#\d+ @ (\d+),(\d+): (\d+)x(\d+)$/).map(Number);
    return {xLeft, yTop, width, height};
  });

  let grid = [];

  input.forEach(({xLeft, yTop, width, height}) => {
    for (let y = yTop; y < yTop + height; y++) {
      grid[y] = grid[y] || [];
      for (let x = xLeft; x < xLeft + width; x++) {
        grid[y][x] = grid[y][x] || 0;
        grid[y][x]++;
      }
    }
  });

  return grid.reduce((sum, row) => sum + row.reduce((rowSum, overlaps) => rowSum + (overlaps > 1 ? 1 : 0), 0), 0);
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(claim => {
    let [, id, xLeft, yTop, width, height] = claim.match(/^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/).map(Number);
    return {id, xLeft, yTop, width, height};
  });

  let grid = [];

  input.forEach(({xLeft, yTop, width, height}) => {
    for (let y = yTop; y < yTop + height; y++) {
      grid[y] = grid[y] || [];
      for (let x = xLeft; x < xLeft + width; x++) {
        grid[y][x] = grid[y][x] || 0;
        grid[y][x]++;
      }
    }
  });

  return input.find(({xLeft, yTop, width, height}) => {
    for (let y = yTop; y < yTop + height; y++) {
      for (let x = xLeft; x < xLeft + width; x++) {
        if (grid[y][x] > 1) return false;
      }
    }

    return true;
  }).id;
}

// == ASSERTS ==

console.assert(part1("#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2") === 4);

console.assert(part2("#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2") === 3);
