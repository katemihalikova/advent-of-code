// == PART 1 ==

function part1(input) {
  let points = input.split("\n").map(point => {
    let [, x, y, velX, velY] = point.match(/^position=<\s*([\d+-]+),\s*([\d+-]+)> velocity=<\s*([\d+-]+),\s*([\d+-]+)>$/).map(Number);
    return {x, y, velX, velY};
  });

  let prevSpread = Infinity;
  while (true) {
    points.forEach(point => {
      point.x += point.velX;
      point.y += point.velY;
    });

    let xs = points.map(({x}) => x);
    let ys = points.map(({y}) => y);
    let spread = Math.max(...xs) - Math.min(...xs) + Math.max(...ys) - Math.min(...ys);

    if (spread > prevSpread) break;
    prevSpread = spread;
  }

  let grid = {};
  points.forEach(point => {
    point.x -= point.velX;
    point.y -= point.velY;
    grid[point.y] = grid[point.y] || {};
    grid[point.y][point.x] = true;
  });

  let xs = points.map(({x}) => x);
  let ys = points.map(({y}) => y);
  let minX = Math.min(...xs);
  let maxX = Math.max(...xs);
  let minY = Math.min(...ys);
  let maxY = Math.max(...ys);

  let output = "";
  for (let Y = minY; Y <= maxY; Y++) {
    for (let X = minX; X <= maxX; X++) {
      output += grid[Y] && grid[Y][X] ? "█" : " ";
    }
    if (Y < maxY) output += "\n";
  }
  return output;
}

// == PART 2 ==

function part2(input) {
  let points = input.split("\n").map(point => {
    let [, x, y, velX, velY] = point.match(/^position=<\s*([\d+-]+),\s*([\d+-]+)> velocity=<\s*([\d+-]+),\s*([\d+-]+)>$/).map(Number);
    return {x, y, velX, velY};
  });

  let prevSpread = Infinity;
  for (let seconds = 0;; seconds++) {
    points.forEach(point => {
      point.x += point.velX;
      point.y += point.velY;
    });

    let xs = points.map(({x}) => x);
    let ys = points.map(({y}) => y);
    let spread = Math.max(...xs) - Math.min(...xs) + Math.max(...ys) - Math.min(...ys);

    if (spread > prevSpread) return seconds;
    prevSpread = spread;
  }
}

// == ASSERTS ==

const exampleInput = `position=< 9,  1> velocity=< 0,  2>
position=< 7,  0> velocity=<-1,  0>
position=< 3, -2> velocity=<-1,  1>
position=< 6, 10> velocity=<-2, -1>
position=< 2, -4> velocity=< 2,  2>
position=<-6, 10> velocity=< 2, -2>
position=< 1,  8> velocity=< 1, -1>
position=< 1,  7> velocity=< 1,  0>
position=<-3, 11> velocity=< 1, -2>
position=< 7,  6> velocity=<-1, -1>
position=<-2,  3> velocity=< 1,  0>
position=<-4,  3> velocity=< 2,  0>
position=<10, -3> velocity=<-1,  1>
position=< 5, 11> velocity=< 1, -2>
position=< 4,  7> velocity=< 0, -1>
position=< 8, -2> velocity=< 0,  1>
position=<15,  0> velocity=<-2,  0>
position=< 1,  6> velocity=< 1,  0>
position=< 8,  9> velocity=< 0, -1>
position=< 3,  3> velocity=<-1,  1>
position=< 0,  5> velocity=< 0, -1>
position=<-2,  2> velocity=< 2,  0>
position=< 5, -2> velocity=< 1,  2>
position=< 1,  4> velocity=< 2,  1>
position=<-2,  7> velocity=< 2, -2>
position=< 3,  6> velocity=<-1, -1>
position=< 5,  0> velocity=< 1,  0>
position=<-6,  0> velocity=< 2,  0>
position=< 5,  9> velocity=< 1, -2>
position=<14,  7> velocity=<-2,  0>
position=<-3,  6> velocity=< 2, -1>`;

console.assert(part1(exampleInput) ===
  "█   █  ███\n" +
  "█   █   █ \n" +
  "█   █   █ \n" +
  "█████   █ \n" +
  "█   █   █ \n" +
  "█   █   █ \n" +
  "█   █   █ \n" +
  "█   █  ███"
);

console.assert(part2(exampleInput) === 3);
