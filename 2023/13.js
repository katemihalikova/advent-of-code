// == PART 1 ==

function part1(input) {
  function getLineOfReflection(pattern) {
    for (let y = 1; y < pattern.length; y++) {
      let nextRows = pattern.slice(y, 2 * y).reverse();
      let prevRows = pattern.slice(0, y).slice(-nextRows.length);
      if (prevRows.every((row, i) => row.every((cell, j) => cell === nextRows[i][j]))) return y;
    }
  }

  return input
    .split("\n\n")
    .map(pattern => pattern
      .split("\n")
      .map(row => [...row])
    )
    .reduce((sum, pattern) => {
      let result = getLineOfReflection(pattern);
      if (result) return sum + 100 * result;

      pattern = pattern[0].map((_, i) => pattern.map(row => row[i]));
      return sum + getLineOfReflection(pattern);
    }, 0);
}

// == PART 2 ==

function part2(input) {
  function getLineOfReflection(pattern) {
    for (let y = 1; y < pattern.length; y++) {
      let nextRows = pattern.slice(y, 2 * y).reverse();
      let prevRows = pattern.slice(0, y).slice(-nextRows.length);
      for (let i = 0; i < prevRows.length; i++) {
        for (let j = 0; j < prevRows[i].length; j++) {
          prevRows[i][j] = prevRows[i][j] === "." ? "#" : ".";
          if (prevRows.every((row, m) => row.every((cell, n) => cell === nextRows[m][n]))) return y;
          prevRows[i][j] = prevRows[i][j] === "." ? "#" : ".";
        }
      }
    }
  }

  return input
    .split("\n\n")
    .map(pattern => pattern
      .split("\n")
      .map(row => [...row])
    )
    .reduce((sum, pattern) => {
      let result = getLineOfReflection(pattern);
      if (result) return sum + 100 * result;

      pattern = pattern[0].map((_, i) => pattern.map(row => row[i]));
      return sum + getLineOfReflection(pattern);
    }, 0);
}

// == ASSERTS ==

const example =
`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

console.assert(part1(example) === 405);

console.assert(part2(example) === 400);
