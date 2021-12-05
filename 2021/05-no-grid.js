// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(line => {
    let [, x1, y1, x2, y2] = line.match(/^(\d+),(\d+) -> (\d+),(\d+)$/).map(Number);
    return {x1, y1, x2, y2};
  });

  let vents = new Set();
  let ventOverlaps = new Set();
  let addCoordsToVent = (x, y) => {
    let coords = x**2 + 3*x + 2*x*y + y + y**2; // Cantor pairing function
    if (vents.has(coords)) ventOverlaps.add(coords);
    else vents.add(coords);
  };

  for (let {x1, y1, x2, y2} of input) {
    if (x1 === x2) {
      let [yStart, yEnd] = y1 > y2 ? [y2, y1] : [y1, y2];
      for (let y = yStart; y <= yEnd; y++) {
        addCoordsToVent(x1, y);
      }
    }

    if (y1 === y2) {
      let [xStart, xEnd] = x1 > x2 ? [x2, x1] : [x1, x2];
      for (let x = xStart; x <= xEnd; x++) {
        addCoordsToVent(x, y1);
      }
    }
  }

  return ventOverlaps.size;
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(line => {
    let [, x1, y1, x2, y2] = line.match(/^(\d+),(\d+) -> (\d+),(\d+)$/).map(Number);
    return {x1, y1, x2, y2};
  });

  let vents = new Set();
  let ventOverlaps = new Set();
  let addCoordsToVent = (x, y) => {
    let coords = x**2 + 3*x + 2*x*y + y + y**2; // Cantor pairing function
    if (vents.has(coords)) ventOverlaps.add(coords);
    else vents.add(coords);
  };

  for (let {x1, y1, x2, y2} of input) {
    let xDir = Math.sign(x2 - x1);
    let yDir = Math.sign(y2 - y1);
    let length = Math.abs(x1 === x2 ? y2 - y1 : x2 - x1);

    for (let d = 0; d <= length; d++) {
      addCoordsToVent(
        x1 + d * xDir,
        y1 + d * yDir,
      );
    }
  }

  return ventOverlaps.size;
}

// == ASSERTS ==

console.assert(part1("0,9 -> 5,9\n8,0 -> 0,8\n9,4 -> 3,4\n2,2 -> 2,1\n7,0 -> 7,4\n6,4 -> 2,0\n0,9 -> 2,9\n3,4 -> 1,4\n0,0 -> 8,8\n5,5 -> 8,2") === 5);

console.assert(part2("0,9 -> 5,9\n8,0 -> 0,8\n9,4 -> 3,4\n2,2 -> 2,1\n7,0 -> 7,4\n6,4 -> 2,0\n0,9 -> 2,9\n3,4 -> 1,4\n0,0 -> 8,8\n5,5 -> 8,2") === 12);
