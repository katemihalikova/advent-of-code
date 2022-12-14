// == SHARED ==

class Grid {
  #grid = {};

  write([x, y], value) {
    this.#grid[y] = this.#grid[y] || {};
    this.#grid[y][x] = value;
  }

  getEmptyCellBelow([x, y]) {
    return [
      [x, y + 1],
      [x - 1, y + 1],
      [x + 1, y + 1],
    ].find(([x, y]) => !this.#grid[y] || !this.#grid[y][x]);
  }
}

// == PART 1 ==

function part1(input) {
  let g = new Grid();
  g.write([500, 0], "▓");

  let maxY = 0;

  input
    .split("\n")
    .map(line => line
      .split(" -> ")
      .map(e => e.split(",").map(Number))
      .forEach(([x2, y2], i, arr) => {
        if (y2 > maxY) maxY = y2;
        if (i === 0) return;

        let [x1, y1] = arr[i - 1];

        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
          for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
            g.write([x, y], "█");
          }
        }
      }));

  for (let unit = 1;; unit++) {
    let pos = [500, 0];

    while (true) {
      let next = g.getEmptyCellBelow(pos);

      if (pos[1] > maxY) {
        return unit - 1;
      } else if (next) {
        pos = next;
      } else {
        g.write(pos, "░");
        break;
      }
    }
  }
}

// == PART 2 ==

function part2(input) {
  let g = new Grid();
  g.write([500, 0], "▓");

  let maxY = 0;

  input
    .split("\n")
    .map(line => line
      .split(" -> ")
      .map(e => e.split(",").map(Number))
      .forEach(([x2, y2], i, arr) => {
        if (y2 > maxY) maxY = y2;
        if (i === 0) return;

        let [x1, y1] = arr[i - 1];

        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
          for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
            g.write([x, y], "█");
          }
        }
      }));

  maxY += 2;
  for (let x = 500 - maxY; x <= 500 + maxY; x++) g.write([x, maxY], "▚");

  for (let unit = 1;; unit++) {
    let pos = [500, 0];

    while (true) {
      let next = g.getEmptyCellBelow(pos);

      if (next) {
        pos = next;
      } else if (pos[0] === 500 && pos[1] === 0) {
        return unit;
      } else {
        g.write(pos, "░");
        break;
      }
    }
  }
}

// == ASSERTS ==

console.assert(part1("498,4 -> 498,6 -> 496,6\n503,4 -> 502,4 -> 502,9 -> 494,9") === 24);

console.assert(part2("498,4 -> 498,6 -> 496,6\n503,4 -> 502,4 -> 502,9 -> 494,9") === 93);
