const permute = require("permute");

// == PART 1 & 2 ==

function aoc_day24(part, input) {

  let maxItem = 0;
  let maze = input.split("\n").map(e => e.split("").map(f => {
    let item;
    if (f !== "." && f !== "#") {
      item = +f;
      if (maxItem < item) maxItem = item;
    }
    return {
      item,
      notWall: f !== "#",
      distance: {},
    }
  }));

  for (let i = 0; i <= maxItem; i++) {
    maze.forEach(row => row.forEach(cell => {if (cell.item === i) cell.distance[i] = 0;}))

    for (let k = 0;; k++) {
      let changes = 0;

      maze.forEach((row, y) => row.forEach((cell, x) => {
        if (cell.distance[i] === k) {
          [maze[y - 1][x], maze[y + 1][x], maze[y][x - 1], maze[y][x + 1]]
            .filter(adj => adj.notWall && adj.distance[i] === undefined)
            .forEach(adj => {
              adj.distance[i] = k + 1;
              changes++;
            });
        }
      }));

      if (changes === 0) break;
    }
  }

  let distances = [];
  let places = [];
  maze.forEach(row => row.forEach(cell => {
    if (cell.item !== undefined) {
      distances[cell.item] = cell.distance;
      if (cell.item > 0) places.push(cell.item);
    }
  }));

  places.sort((a, b) => a - b);

  let solutions = [];
  while(permute(places)) {
    solutions.push(places
      .concat(part === 1 ? [] : 0)
      .map((place, i)  => distances[place][places[i - 1] || 0])
      .reduce((a, b) => a + b, 0));
  }

  return solutions.sort((a, b) => a - b)[0];
}

// == ASSERTS ==

console.assert(aoc_day24(1, "###########\n#0.1.....2#\n#.#######.#\n#4.......3#\n###########") === 14);

console.assert(aoc_day24(2, "###########\n#0.1.....2#\n#.#######.#\n#4.......3#\n###########") === 20);
