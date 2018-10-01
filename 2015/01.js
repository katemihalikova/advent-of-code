// == PART 1 ==

function part1(input) {
  return input
    .split("")
    .reduce((floor, next) => floor + (next === "(" ? +1 : -1), 0);
}

// == PART 2 ==

function part2(input) {
  return input
    .split("")
    .reduce((floors, next) => floors.concat(floors[floors.length - 1] + (next === "(" ? +1 : -1)), [0])
    .findIndex(floor => floor < 0);
}

// == ASSERTS ==

console.assert(part1("(())") === 0);
console.assert(part1("()()") === 0);
console.assert(part1("(((") === 3);
console.assert(part1("(()(()(") === 3);
console.assert(part1("))(((((") === 3);
console.assert(part1("())") === -1);
console.assert(part1("))(") === -1);
console.assert(part1(")))") === -3);
console.assert(part1(")())())") === -3);

console.assert(part2(")") === 1);
console.assert(part2("()())") === 5);
