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

  let maxRowCoherency = 0, rowCoherencySecond = 0;
  let maxColumnCoherency = 0, columnCoherencySecond = 0;

  for (let second = 1; second < width || second < height; second++) {
    for (let robot of robots) {
      robot.x = (robot.x + robot.vx + width) % width;
      robot.y = (robot.y + robot.vy + height) % height;
    }

    let rowCoherency = robots
      .reduce<number[]>((counts, {x, y}) => {
        counts[y * width + x] = (counts[y * width + x] ?? 0) + 1;
        return counts;
      }, Array(width * height + 1))
      .reduce((sum, count, index, counts) => sum + count * counts.slice(index).findIndex(nextCount => !nextCount), 0);

    let columnCoherency = robots
      .reduce<number[]>((counts, {x, y}) => {
        counts[x * height + y] = (counts[x * height + y] ?? 0) + 1;
        return counts;
      }, Array(width * height + 1))
      .reduce((sum, count, index, counts) => sum + count * counts.slice(index).findIndex(nextCount => !nextCount), 0);

    if (second <= width && rowCoherency > maxRowCoherency) {
      maxRowCoherency = rowCoherency;
      rowCoherencySecond = second;
    }
    if (second <= height && columnCoherency > maxColumnCoherency) {
      maxColumnCoherency = columnCoherency;
      columnCoherencySecond = second;
    }
  }

  for (let second = rowCoherencySecond;; second += height) {
    if (second % width === columnCoherencySecond) return second;
  }
}

// == ASSERTS ==

let example = `\
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
p=9,5 v=-3,-3`;

console.assert(part1(example, 11, 7) === 12);

// No testing data provided for PART 2
console.assert(part2 !== undefined);
