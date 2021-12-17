// == PART 1 ==

function part1(input) {
  let [, minX, maxX, minY, maxY] = input.match(/^target area: x=(\d+)\.\.(\d+), y=(-?\d+)\.\.(-?\d+)$/).map(Number);

  let highestYs = new Set();

  for (let vx = 0; vx <= maxX; vx++) {
    for (let vy = minY; vy <= 500; vy++) {
      let x = 0, y = 0, dx = vx, dy = vy, highestY = -Infinity;

      for (let step = 0;; step++) {
        x += dx;
        y += dy;

        if (dx > 0) dx--;
        dy--;

        if (y > highestY) highestY = y;

        if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
          highestYs.add(highestY);
          break;
        } else if (x > maxX || y < minY) {
          break;
        }
      }
    }
  }

  return Math.max(...highestYs);
}

// == PART 2 ==

function part2(input) {
  let [, minX, maxX, minY, maxY] = input.match(/^target area: x=(\d+)\.\.(\d+), y=(-?\d+)\.\.(-?\d+)$/).map(Number);

  let successfulCount = 0;

  for (let vx = 0; vx <= maxX; vx++) {
    for (let vy = minY; vy <= 500; vy++) {
      let x = 0, y = 0, dx = vx, dy = vy;

      for (let step = 0;; step++) {
        x += dx;
        y += dy;

        if (dx > 0) dx--;
        dy--;

        if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
          successfulCount++;
          break;
        } else if (x > maxX || y < minY) {
          break;
        }
      }
    }
  }

  return successfulCount;
}

// == ASSERTS ==

console.assert(part1("target area: x=20..30, y=-10..-5") === 45);

console.assert(part2("target area: x=20..30, y=-10..-5") === 112);
