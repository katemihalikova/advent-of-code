// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(coords => coords.split(", ").map(Number));

  let minX = Math.min(...input.map(([x]) => x));
  let minY = Math.min(...input.map(([, y]) => y));
  let maxX = Math.max(...input.map(([x]) => x));
  let maxY = Math.max(...input.map(([, y]) => y));

  let grid = [];

  input.forEach(([x, y], origin) => {
    grid[y] = grid[y] || [];
    grid[y][x] = {origin, distance: 0};
  })

  for (let distance = 1;; distance++) {
    let changed = false;

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        grid[y] = grid[y] || [];

        if (grid[y][x]) continue;

        let locationsAround = [
          grid[y - 1] && grid[y - 1][x],
          grid[y + 1] && grid[y + 1][x],
          grid[y][x + 1],
          grid[y][x - 1],
        ]
          .filter(Boolean)
          .filter(location => location.distance === distance - 1)
          .filter((location, index, locationsAround) => locationsAround.findIndex(({origin}) => location.origin === origin) === index);
        
        if (locationsAround.length > 1) {
          grid[y][x] = {origin: -1, distance};
          changed = true;
        } else if (locationsAround.length === 1) {
          grid[y][x] = {origin: locationsAround[0].origin, distance};
          changed = true;
        }
      }
    }

    if (!changed) break;
  }

  let areas = grid.reduce((areas, row) => row.reduce((areas, location) => {
    areas[location.origin] = areas[location.origin] || 0;
    areas[location.origin]++;
    return areas;
  }, areas), {});

  grid.forEach(row => {
    delete areas[row[minX].origin];
    delete areas[row[maxX].origin];
  });
  grid[minY].forEach(location => delete areas[location.origin]);
  grid[maxY].forEach(location => delete areas[location.origin]);
  delete areas[-1];

  return Math.max(...Object.values(areas));
}

// == PART 2 ==

function part2(input, maxTotalDistance = 10000) {
  input = input.split("\n").map(coords => coords.split(", ").map(Number));
  
  let maxDistance = Math.round(maxTotalDistance / input.length);
  let minX = Math.min(...input.map(([x]) => x));
  let minY = Math.min(...input.map(([, y]) => y));
  let maxX = Math.max(...input.map(([x]) => x));
  let maxY = Math.max(...input.map(([, y]) => y));

  let regionSize = 0;

  for (let x = minX - maxDistance; x <= maxX + maxDistance; x++) {
    for (let y = minY - maxDistance; y <= maxY + maxDistance; y++) {
      let totalDistance = input.map(([coordX, coordY]) => Math.abs(x - coordX) + Math.abs(y - coordY)).reduce((a, b) => a + b);
      if (totalDistance < maxTotalDistance) regionSize++;
    }
  }

  return regionSize;
}

// == ASSERTS ==

console.assert(part1("1, 1\n1, 6\n8, 3\n3, 4\n5, 5\n8, 9") === 17);

console.assert(part2("1, 1\n1, 6\n8, 3\n3, 4\n5, 5\n8, 9", 32) === 16);
