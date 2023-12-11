// == PART 1 ==

function part1(input) {
  return input
    .split("\n")
    .map(line => [...line])
    .flatMap(row => row.every(cell => cell === ".") ? [row, row] : [row])
    .map((row, _, space) => row.flatMap((cell, x) => space.every(r => r[x] === ".") ? [cell, cell] : [cell]))

    .reduce((galaxies, row, y) => [...galaxies, ...row.map((cell, x) => cell === "#" ? [x, y] : undefined).filter(Boolean)], [])
    .reduce((sum, [x1, y1], index, galaxies) => {
      galaxies.slice(0, index).forEach(([x2, y2]) => {
        sum += Math.abs(x1 - x2) + Math.abs(y1 - y2);
      });
      return sum;
    }, 0);
}

// == PART 2 (works for part 1 as well) ==

function part2(input, expansion = 1000000) {
  let space = input
    .split("\n")
    .map(line => [...line])
    .map(row => row.every(cell => cell !== "#") ? row.map(() => "$") : row)
    .map((row, _, space) => row.map((cell, x) => space.every(r => r[x] !== "#") ? "$" : cell));

  return space
    .reduce((galaxies, row, y) => [...galaxies, ...row.map((cell, x) => cell === "#" ? [x, y] : undefined).filter(Boolean)], [])
    .reduce((sum, [x1, y1], index, galaxies) => {
      galaxies.slice(0, index).forEach(([x2, y2]) => {
        for (let x = Math.min(x1, x2); x < Math.max(x1, x2); x++) {
          if (space[y1][x] === "$") sum += expansion;
          else sum++;
        }
        for (let y = Math.min(y1, y2); y < Math.max(y1, y2); y++) {
          if (space[y][x1] === "$") sum += expansion;
          else sum++;
        }
      });
      return sum;
    }, 0);
}

// == ASSERTS ==

let example =
`...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

console.assert(part1(example) === 374);

console.assert(part2(example, 2) === 374);
console.assert(part2(example, 10) === 1030);
console.assert(part2(example, 100) === 8410);
