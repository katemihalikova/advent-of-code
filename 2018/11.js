// == PART 1 ==

function part1(input) {
  let powerLevels = {};

  for (let y = 1; y <= 300; y++) {
    powerLevels[y] = {};
    for (let x = 1; x <= 300; x++) {
      let rackId = x + 10;
      let powerLevel = rackId * y;
      powerLevel += input;
      powerLevel *= rackId;
      powerLevel = Math.floor(powerLevel / 100) % 10;
      powerLevel -= 5;
      powerLevels[y][x] = powerLevel;
    }
  }

  let max = {sum: -Infinity};

  for (let y = 1; y <= 298; y++) {
    for (let x = 1; x <= 298; x++) {
      let sum = 0;

      for (let yDiff = 0; yDiff < 3; yDiff++) {
        for (let xDiff = 0; xDiff < 3; xDiff++) {
          sum += powerLevels[y + yDiff][x + xDiff];
        }
      }

      if (sum > max.sum) {
        max = {sum, x, y};
      }
    }
  }

  return `${max.x},${max.y}`;
}

// == PART 2 ==

function part2(input) {
  let powerLevels = {};

  for (let y = 1; y <= 300; y++) {
    powerLevels[y] = {};
    for (let x = 1; x <= 300; x++) {
      let rackId = x + 10;
      let powerLevel = rackId * y;
      powerLevel += input;
      powerLevel *= rackId;
      powerLevel = Math.floor(powerLevel / 100) % 10;
      powerLevel -= 5;
      powerLevels[y][x] = powerLevel;
    }
  }

  let max = {sum: -Infinity};

  for (let y = 1; y <= 300; y++) {
    for (let x = 1; x <= 300; x++) {
      let maxSize = 301 - Math.max(x, y);

      for (let size = 1; size <= maxSize; size++) {
        let sum = 0;

        for (let yDiff = 0; yDiff < size; yDiff++) {
          for (let xDiff = 0; xDiff < size; xDiff++) {
            sum += powerLevels[y + yDiff][x + xDiff];
          }
        }

        if (sum > max.sum) {
          max = {sum, x, y, size};
        }
      }
    }
  }

  return `${max.x},${max.y},${max.size}`;
}

// == ASSERTS ==

console.assert(part1(18) === "33,45");
console.assert(part1(42) === "21,61");

console.assert(part2(18) === "90,269,16");
console.assert(part2(42) === "232,251,12");
