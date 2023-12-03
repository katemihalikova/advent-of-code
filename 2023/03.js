// == SHARED ==

function parseSchematics(input) {
  let numbers = [];
  let symbols = [];

  let lines = input.split("\n");

  symbols = lines
    .flatMap((row, y) => [...row.matchAll(/[^\d\.]/g)]
      .map(({0: symbol, index: x}) => ({
        x,
        y,
        symbol,
        adjacentNumbers: [],
      }))
    );

  numbers = lines
    .flatMap((row, y) => [...row.matchAll(/\d+/g)]
      .map(({0: number, index: startX}) => ({
        number: Number(number),
        adjacentSymbols: symbols
          .filter(({x: symbolX, y: symbolY}) =>
            symbolX >= startX - 1 &&
            symbolX <= startX + number.length &&
            symbolY >= y - 1 &&
            symbolY <= y + 1
          ),
      }))
    );

  numbers.forEach(number => number.adjacentSymbols.forEach(symbol => symbol.adjacentNumbers.push(number)));

  return {numbers, symbols};
}

// == PART 1 ==

function part1(input) {
  return parseSchematics(input)
    .numbers
    .filter(({adjacentSymbols}) => adjacentSymbols.length > 0)
    .reduce((sum, {number}) => sum + number, 0);
}

// == PART 2 ==

function part2(input) {
  return parseSchematics(input)
    .symbols
    .filter(({symbol}) => symbol === "*")
    .filter(({adjacentNumbers}) => adjacentNumbers.length === 2)
    .map(({adjacentNumbers: [{number: number1}, {number: number2}]}) => number1 * number2)
    .reduce((sum, gearRatio) => sum + gearRatio, 0);
}

// == ASSERTS ==

console.assert(part1(`
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`) === 4361);

console.assert(part2(`
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`) === 467835);
