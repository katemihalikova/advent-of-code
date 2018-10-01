// == PART 1 ==

function part1(input) {

  for (let i = 0; i < 40; i++) {
    input = input.replace(/(\d)\1*/g, n => `${n.length}${n[0]}`);
  }

  return input.length;
}

// == PART 2 ==

function part2(input) {

  for (let i = 0; i < 50; i++) {
    input = input.replace(/(\d)\1*/g, n => `${n.length}${n[0]}`);
  }

  return input.length;
}

// == ASSERTS ==

console.assert(part1("1") === 82350);
console.assert(part1("2") === 95798);

console.assert(part2("1") === 1166642);
console.assert(part2("2") === 1355550);
