// == PARTS 1 & 2 ==

function part(part, input) {
  let grid = {};
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  const CLAY = "clay";
  const SAND = undefined;
  const FLOWING = "flowing water";
  const MAYBE = "flowing water that might become still";
  const STILL = "still water";

  input.split("\n").forEach(line => {
    let [, fromX, fromY, toY] = line.match(/^[xy]=(\d+), [xy]=(\d+)\.\.(\d+)$/).map(Number);
    let toX = fromX;
    let [, coord] = line.match(/^([xy])=/);

    if (coord === "y") {
      [fromX, toX, fromY, toY] = [fromY, toY, fromX, toX];
    }

    if (fromX < minX) minX = fromX;
    if (toX > maxX) maxX = toX;
    if (fromY < minY) minY = fromY;
    if (toY > maxY) maxY = toY;

    for (let y = fromY; y <= toY; y++) {
      grid[y] = grid[y] || {};
      for (let x = fromX; x <= toX; x++) {
        grid[y][x] = CLAY;
      }
    }
  });

  let waters = [];
  let addWater = (x, y) => {
    waters.push([x, y]);
    grid[y] = grid[y] || {};
    grid[y][x] = FLOWING;
  };
  addWater(500, 0);

  while (true) {
    let waterAddedAtLevels = [];

    waters.forEach(([x, y]) => {
      let state = grid[y][x];
      if (state === STILL || state === MAYBE) return;

      let left = grid[y] && grid[y][x - 1];
      let right = grid[y] && grid[y][x + 1];
      let bottom = grid[y + 1] && grid[y + 1][x];

      let isSandLeft = left === SAND;
      let isSandRight = right === SAND;
      let isSandBottom = bottom === SAND;
      let isClayLeft = left === CLAY;
      let isClayRight = right === CLAY;
      let isClayBottom = bottom === CLAY;
      let isStillWaterBottom = bottom === STILL;

      if (isSandBottom) {
        addWater(x, y + 1);
        waterAddedAtLevels.push(y + 1);
      } else {
        if (isSandLeft && (isClayBottom || isStillWaterBottom)) {
          addWater(x - 1, y);
          waterAddedAtLevels.push(y);
        }
        if (isSandRight && (isClayBottom || isStillWaterBottom)) {
          addWater(x + 1, y);
          waterAddedAtLevels.push(y);
        }
      }

      if ((isClayBottom || isStillWaterBottom) && (isClayLeft || isClayRight)) {
        grid[y][x] = MAYBE;
      }
    });

    waters.forEach(([x, y]) => {
      let state = grid[y][x];
      if (state !== MAYBE) return;

      let nearestLeftClay, nearestRightClay;

      for (let searchedX = x - 1; searchedX >= minX; searchedX--) {
        if (grid[y][searchedX] === CLAY) {
          nearestLeftClay = searchedX;
          break;
        }
      }
      for (let searchedX = x + 1; searchedX <= maxX; searchedX++) {
        if (grid[y][searchedX] === CLAY) {
          nearestRightClay = searchedX;
          break;
        }
      }

      if (nearestLeftClay === undefined || nearestRightClay === undefined) return;

      let allAreMaybe = grid[y][nearestLeftClay + 1] === MAYBE && grid[y][nearestRightClay - 1] === MAYBE;
      for (let searchedX = nearestLeftClay + 2; searchedX <= nearestRightClay -2; searchedX++) {
        allAreMaybe = allAreMaybe && grid[y][searchedX] === FLOWING;
      }

      if (allAreMaybe) {
        for (let searchedX = nearestLeftClay + 1; searchedX < nearestRightClay; searchedX++) {
          grid[y][searchedX] = STILL;
        }
      }
    });

    if (waterAddedAtLevels.length && Math.min(...waterAddedAtLevels) > maxY) break;
  }

  waters = waters.filter(([, y]) => y >= minY && y <= maxY);
  if (part === 2) waters = waters.filter(([x, y]) => grid[y][x] === STILL);
  return waters.length;
}

// == ASSERTS ==

console.assert(part(1, "x=495, y=2..7\ny=7, x=495..501\nx=501, y=3..7\nx=498, y=2..4\nx=506, y=1..2\nx=498, y=10..13\nx=504, y=10..13\ny=13, x=498..504") === 57);

console.assert(part(2, "x=495, y=2..7\ny=7, x=495..501\nx=501, y=3..7\nx=498, y=2..4\nx=506, y=1..2\nx=498, y=10..13\nx=504, y=10..13\ny=13, x=498..504") === 29);
