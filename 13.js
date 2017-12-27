// == PART 1 ==

function aoc_day13_part1(input, {x: endX, y: endY}) {
  let maze = new Set(["1,1"]);
  let lastVisited = [{x: 1, y: 1}];

  for (let distance = 1;; distance++) {
    lastVisited = lastVisited.reduce((visited, {x, y}) => {
      return [...visited, ...[{x: x + 1, y}, {x: x - 1, y}, {x, y: y + 1}, {x, y: y - 1}]
        .filter(({x, y}) => x >= 0 && y >= 0)
        .filter(({x, y}) => !maze.has(`${x},${y}`))
        .filter(({x, y}) => {
          maze.add(`${x},${y}`);
          return (x*x + 3*x + 2*x*y + y + y*y + input).toString(2).replace(/0/g, "").length % 2 === 0;
        })];
    }, []);

    if (maze.has(`${endX},${endY}`)) return distance;
  }
}

// == PART 2 ==

function aoc_day13_part2(input) {
  let maze = new Set(["1,1"]);
  let visited = 1;
  let lastVisited = [{x: 1, y: 1}];

  for (let distance = 1; distance <= 50; distance++) {
    lastVisited = lastVisited.reduce((visited, {x, y}) => {
      return [...visited, ...[{x: x + 1, y}, {x: x - 1, y}, {x, y: y + 1}, {x, y: y - 1}]
        .filter(({x, y}) => x >= 0 && y >= 0)
        .filter(({x, y}) => !maze.has(`${x},${y}`))
        .filter(({x, y}) => {
          maze.add(`${x},${y}`);
          return (x*x + 3*x + 2*x*y + y + y*y + input).toString(2).replace(/0/g, "").length % 2 === 0;
        })];
    }, []);

    visited += lastVisited.length;
  }

  return visited;
}

// == ASSERTS ==

console.assert(aoc_day13_part1(10, {x: 7, y: 4}) === 11);

console.assert(aoc_day13_part2(10) === 151);
