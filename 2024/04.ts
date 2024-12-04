// == PART 1 ==

function part1(input: string): number {
  return input
    .split("\n")
    .reduce((count, row, rowIndex, crossword) => {
      [...row].forEach((_, colIndex) => {
        for (let colDir = -1; colDir <= 1; colDir++) {
          for (let rowDir = -1; rowDir <= 1; rowDir++) {
            if ([..."XMAS"].every((letter, distance) => crossword[rowIndex + rowDir * distance]?.[colIndex + colDir * distance] === letter)) {
              count++;
            }
          }
        }
      });
      return count;
    }, 0);
}

// == PART 2 ==

function part2(input: string): number {
  return input
    .split("\n")
    .reduce((count, row, rowIndex, crossword) => count + [...row]
      .filter((_, colIndex) => [
        crossword[rowIndex - 1]?.[colIndex - 1] + crossword[rowIndex][colIndex] + crossword[rowIndex + 1]?.[colIndex + 1],
        crossword[rowIndex - 1]?.[colIndex + 1] + crossword[rowIndex][colIndex] + crossword[rowIndex + 1]?.[colIndex - 1],
      ].every(word => word === "MAS" || word === "SAM"))
      .length,
    0);
}

// == ASSERTS ==

let example = `\
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

console.assert(part1(example) === 18);

console.assert(part2(example) === 9);
