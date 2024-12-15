// == PART 1 ==

function part1(input: string, width: number, height: number): number {
  let robots = input
    .split("\n")
    .map(line => {
      let [, x, y, vx, vy] = line.match(/^p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)$/)!.map(Number);
      return {x, y, vx, vy};
    });

  for (let second = 1; second <= 100; second++) {
    for (let robot of robots) {
      robot.x = (robot.x + robot.vx + width) % width;
      robot.y = (robot.y + robot.vy + height) % height;
    }
  }

  return robots
    .reduce((quadrants, {x, y}) => {
      if (x !== (width - 1) / 2 && y !== (height - 1) / 2) {
        quadrants[2 * Number(x < (width - 1) / 2) + Number(y < (height - 1) / 2)]++;
      }
      return quadrants;
    }, [0, 0, 0, 0])
    .reduce((product, count) => product * count, 1);
}

// == PART 2 ==

function part2(input: string, width: number, height: number): number {
  let robots = input
    .split("\n")
    .map(line => {
      let [, x, y, vx, vy] = line.match(/^p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)$/)!.map(Number);
      return {x, y, vx, vy};
    });

  for (let second = 1;; second++) {
    for (let robot of robots) {
      robot.x = (robot.x + robot.vx + width) % width;
      robot.y = (robot.y + robot.vy + height) % height;
    }

    let coherency = robots
      .reduce((counts, {x,y}) => {
        counts[y * width + x] = (counts[y * width + x] ?? 0) + 1;
        return counts;
      }, Array(width * height))
      .reduce((product, _, index, counts) => product * Math.max(counts.slice(index+1).findIndex(nextCount => !nextCount), 1), 1);

    if (coherency > 10 ** width) return second;
  }
}

// == ASSERTS ==

console.assert(part1(`\
p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`, 11, 7) === 12);

// No testing data provided for PART 2
