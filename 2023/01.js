// == PART 1 ==

function part1(input) {
  return input
    .split("\n")
    .map(line => {
      let [, a] = line.match(/(\d)/);
      let [, b] = line.match(/.*(\d)/);
      return Number(`${a}${b}`);
    })
    .reduce((acc, n) => acc + n, 0);
}

// == PART 2 ==

function part2(input) {
  const NUMBERS = {one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9};

  return input
    .split("\n")
    .map(line => {
      let [, a] = line.match(`(\\d|${Object.keys(NUMBERS).join("|")})`);
      let [, b] = line.match(`.*(\\d|${Object.keys(NUMBERS).join("|")})`);
      if (a in NUMBERS) a = NUMBERS[a];
      if (b in NUMBERS) b = NUMBERS[b];
      return Number(`${a}${b}`);
    })
    .reduce((acc, n) => acc + n, 0);
}

// == ASSERTS ==

console.assert(part1(
`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`) === 142);

console.assert(part2(
`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`) === 281);
