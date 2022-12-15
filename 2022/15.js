// == PART 1 ==

function part1(input, y = 2000000) {
  input = input.split("\n").map(line => {
    let [, sensorX, sensorY, beaconX, beaconY] = line.match(/^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/).map(Number);
    return {sensorX, sensorY, beaconX, beaconY};
  });

  let covered = new Set();
  let beacons = new Set();

  for (let {sensorX, sensorY, beaconX, beaconY} of input) {
    let dist = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);

    let yDiff = Math.abs(sensorY - y);
    let minX = sensorX - dist + yDiff;
    let maxX = sensorX + dist - yDiff;

    for (let x = minX; x <= maxX; x++) {
      covered.add(x);
      if (x === beaconX && y === beaconY) beacons.add(x);
    }
  }

  return covered.size - beacons.size;
}

// == PART 2 ==

function part2(input, maxCoord = 4000000) {
  input = input.split("\n").map(line => {
    let [, sensorX, sensorY, beaconX, beaconY] = line.match(/^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/).map(Number);
    return {sensorX, sensorY, beaconX, beaconY};
  });

  try {
    for (let y = 0; y <= maxCoord; y++) {
      let xRanges = [];
    
      for (let {sensorX, sensorY, beaconX, beaconY} of input) {
        let dist = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);

        let minY = sensorY - dist;
        let maxY = sensorY + dist;
        if (y < minY || y > maxY) continue;

        let yDiff = Math.abs(sensorY - y);
        let minX = Math.max(0, sensorX - dist + yDiff);
        let maxX = Math.min(maxCoord, sensorX + dist - yDiff);
    
        xRanges.push([minX, maxX]);
      }
    
      xRanges
        .sort(([startX1, endX1], [startX2, endX2]) => startX1 - startX2 || endX1 - endX2)
        .reduce(([startX1, endX1], [startX2, endX2]) => {
          if (endX1 < startX2 - 1) throw {x: startX2 - 1, y};
          return [Math.min(startX1, startX2), Math.max(endX1, endX2)];
        });
    }
  } catch ({x, y}) {
    return x * 4000000 + y;
  }
}

// == ASSERTS ==

let exampleReport = 
`Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

console.assert(part1(exampleReport, 10) === 26);

console.assert(part2(exampleReport, 20) === 56000011);
