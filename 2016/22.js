// == PART 1 ==

function aoc_day22_part1(input) {
  input = input.split("\n").map(e => e.match(/\/dev\/grid\/node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+(\d+)%/)).map(e => ({x: +e[1], y: +e[2], used: +e[4], avail: +e[5]}));

  return input.reduce((r, e) => r + (e.used && input.filter(f => e !== f && e.used <= f.avail).length), 0);
}

// == PART 2 ==

function aoc_day22_part2(input) {
  input = input.split("\n").map(e => e.match(/\/dev\/grid\/node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+(\d+)%/)).map(e => ({x: +e[1], y: +e[2], used: +e[4], avail: +e[5]}));

  let maxEmpty = Math.max(...input.filter(e => e.used === 0).map(e => e.avail));
  let maxX = input[input.length - 1].x;

  return input.reduce((r, e) => {
    if (e.x > 0 && e.y === 0) r += "\n";
    if (e.x === maxX && e.y === 0) return r + "G";
    if (e.used > maxEmpty) return r + "#";
    if (e.used === 0) return r + "_";
    return r + ".";
  }, "");
}

// == ASSERTS ==

console.assert(aoc_day22_part1("/dev/grid/node-x0-y0 10T 8T 2T 80%\n/dev/grid/node-x0-y1 11T 6T 5T 54%\n/dev/grid/node-x0-y2 32T 28T 4T 87%\n/dev/grid/node-x1-y0 9T 7T 2T 77%\n/dev/grid/node-x1-y1 8T 0T 8T 0%\n/dev/grid/node-x1-y2 11T 7T 4T 63%\n/dev/grid/node-x2-y0 10T 6T 4T 60%\n/dev/grid/node-x2-y1 9T 8T 1T 88%\n/dev/grid/node-x2-y2 9T 6T 3T 66%") === 7);

console.assert(aoc_day22_part2("/dev/grid/node-x0-y0 10T 8T 2T 80%\n/dev/grid/node-x0-y1 11T 6T 5T 54%\n/dev/grid/node-x0-y2 32T 28T 4T 87%\n/dev/grid/node-x1-y0 9T 7T 2T 77%\n/dev/grid/node-x1-y1 8T 0T 8T 0%\n/dev/grid/node-x1-y2 11T 7T 4T 63%\n/dev/grid/node-x2-y0 10T 6T 4T 60%\n/dev/grid/node-x2-y1 9T 8T 1T 88%\n/dev/grid/node-x2-y2 9T 6T 3T 66%") === "..#\n._.\nG..");
