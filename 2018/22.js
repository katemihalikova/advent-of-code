// == PART 1 ==

function part1(input) {
  let [, depth, targetX, targetY] = input.match(/^depth: (\d+)\ntarget: (\d+),(\d+)$/).map(Number);

  let memoize = cb => {
    let cache = {};
    return (x, y) => {
      cache[x] = cache[x] || {};
      if (cache[x][y] === undefined) {
        cache[x][y] = cb(x, y);
      }
      return cache[x][y];
    }
  }
  let getGeologicIndex = memoize((x, y) => {
    if ((x === 0 && y === 0) || (x === targetX && y === targetY)) return 0;
    if (y === 0) return x * 16807;
    if (x === 0) return y * 48271;
    return getErosionLevel(x - 1, y) * getErosionLevel(x, y - 1);
  });
  let getErosionLevel = memoize((x, y) => (getGeologicIndex(x, y) + depth) % 20183);
  let getRegionType = memoize((x, y) => getErosionLevel(x, y) % 3);

  let riskLevel = 0;
  for (let x = 0; x <= targetX; x++) {
    for (let y = 0; y <= targetY; y++) {
      riskLevel += getRegionType(x, y);
    }
  }

  return riskLevel;
}

// == PART 2 ==

function part2(input) {
  let [, depth, targetX, targetY] = input.match(/^depth: (\d+)\ntarget: (\d+),(\d+)$/).map(Number);

  const ROCKY = 0, WET = 1, NARROW = 2;
  const TORCH = 0, CLIMBING_GEAR = 1, NEITHER = 2;

  let memoize = cb => {
    let cache = {};
    return (x, y) => {
      cache[x] = cache[x] || {};
      if (cache[x][y] === undefined) {
        cache[x][y] = cb(x, y);
      }
      return cache[x][y];
    }
  }
  let getGeologicIndex = memoize((x, y) => {
    if ((x === 0 && y === 0) || (x === targetX && y === targetY)) return 0;
    if (y === 0) return x * 16807;
    if (x === 0) return y * 48271;
    return getErosionLevel(x - 1, y) * getErosionLevel(x, y - 1);
  });
  let getErosionLevel = memoize((x, y) => (getGeologicIndex(x, y) + depth) % 20183);
  let getRegionType = memoize((x, y) => getErosionLevel(x, y) % 3);

  let grid = {0: {0: {[TORCH]: 0}}};
  let checkNow = [[0, 0, TORCH]];

  for (let distance = 0;; distance++) {
    let checkNext = checkNow.filter(([x, y, tool]) => grid[x][y][tool] > distance);

    let finished = checkNow
      .filter(([x, y, tool]) => grid[x][y][tool] === distance)
      .some(([x, y, tool]) => {
        if (x === targetX && y === targetY && tool === TORCH) {
          return true;
        }
  
        let type = getRegionType(x, y);
  
        [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]
          .filter(([adjX, adjY]) => adjX >= 0 && adjY >= 0)
          .filter(([adjX, adjY]) => {
            let adjType = getRegionType(adjX, adjY);
            if (type === adjType) return true;
            if (((type === ROCKY && adjType === WET) || (type === WET && adjType === ROCKY)) && tool === CLIMBING_GEAR) return true;
            if (((type === WET && adjType === NARROW) || (type === NARROW && adjType === WET)) && tool === NEITHER) return true;
            if (((type === NARROW && adjType === ROCKY) || (type === ROCKY && adjType === NARROW)) && tool === TORCH) return true;
            return false;
          })
          .forEach(([x, y]) => {
            grid[x] = grid[x] || {};
            grid[x][y] = grid[x][y] || {};
            if (grid[x][y][tool] === undefined || grid[x][y][tool] > distance + 1) {
              grid[x][y][tool] = distance + 1;
              checkNext.push([x, y, tool]);
            }
          });
  
        [TORCH, CLIMBING_GEAR, NEITHER]
          .filter(adjTool => adjTool !== tool)
          .filter(adjTool => {
            if (type === ROCKY && adjTool === NEITHER) return false;
            if (type === WET && adjTool === TORCH) return false;
            if (type === NARROW && adjTool === CLIMBING_GEAR) return false;
            return true;
          })
          .forEach(tool => {
            grid[x] = grid[x] || {};
            grid[x][y] = grid[x][y] || {};
            if (grid[x][y][tool] === undefined || grid[x][y][tool] > distance + 7) {
              grid[x][y][tool] = distance + 7;
              checkNext.push([x, y, tool]);
            }
          });
      });

    if (finished) return distance;
    checkNow = checkNext;
  }
}

// == ASSERTS ==

console.assert(part1("depth: 510\ntarget: 10,10") === 114);

console.assert(part2("depth: 510\ntarget: 10,10") === 45);
