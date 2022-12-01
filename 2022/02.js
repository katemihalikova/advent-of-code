// == PART 1 ==

function part1(input) {
  return input
    .split("\n")

    .reduce((acc, [opponent,, me]) => {
      let shape = {X: 1, Y: 2, Z: 3}[me];
      let outcome = {A: {X: 3, Y: 6, Z: 0}, B: {X: 0, Y: 3, Z: 6}, C: {X: 6, Y: 0, Z: 3}}[opponent][me];
      return acc + shape + outcome;
    }, 0);
}

// == PART 2 ==

function part2(input) {
  return input
    .split("\n")

    .reduce((acc, [opponent,, result]) => {
      let shape = {A: {X: 3, Y: 1, Z: 2}, B: {X: 1, Y: 2, Z: 3}, C: {X: 2, Y: 3, Z: 1}}[opponent][result];
      let outcome = {X: 0, Y: 3, Z: 6}[result];
      return acc + shape + outcome;
    }, 0);
}

// == ASSERTS ==

console.assert(part1("A Y\nB X\nC Z") === 15);

console.assert(part2("A Y\nB X\nC Z") === 12);
