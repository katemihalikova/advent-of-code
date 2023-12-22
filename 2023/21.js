// == PART 1 ==

function part1(input, steps = 64) {
  let garden = input
    .split("\n")
    .map(line => [...line].map(symbol => ({symbol, visitedInStep: undefined})));

  let startX = garden[0].findIndex((_, x) => garden.some(row => row[x].symbol === "S"));
  let startY = garden.findIndex(row => row.some(({symbol}) => symbol === "S"));

  let walkers = [{x: startX, y: startY}];

  for (let step = 1; step <= steps; step++) {
    walkers = walkers.flatMap(({x, y}) => {
      return [
        {x, y: y - 1},
        {x, y: y + 1},
        {x: x - 1, y},
        {x: x + 1, y},
      ]
        .filter(({x, y}) => {
          let plot = garden[y]?.[x];
          if (!plot || plot.symbol === "#" || plot.visitedInStep !== undefined) return false;
          plot.visitedInStep = step;
          return true;
        });
    });
  }

  return garden
    .flat()
    .filter(e => e.visitedInStep && e.visitedInStep % 2 === steps % 2)
    .length;
}

// == PART 2 ==

// Made a lot of assumptions based on my actual input, precomputed gardens with different entry points, and used them to calculate the result.

// == ASSERTS ==

console.assert(part1(
`...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`, 6) === 16);

// No testing data provided for PART 2
