// == PART 1 ==

function part1(input) {
  input = Math.ceil(input / 10);

  for (let house = 1;; house++) {
    let presents = house;
    for (let elf = 1; elf <= house / 2; elf++) {
      if ((house / elf) % 1 === 0) presents += elf;
    }
    if (presents >= input) return house;
  }
}

// == PART 2 ==

function part2(input) {
  input = Math.ceil(input / 11);

  for (let house = 1;; house++) {
    let presents = house;
    for (let elf = 1; elf <= house / 2; elf++) {
      if ((house / elf) % 1 === 0 && house <= elf * 50) presents += elf;
    }
    if (presents >= input) return house;
  }
}

// == ASSERTS ==

console.assert(part1(10) === 1);
console.assert(part1(50) === 4);
console.assert(part1(100) === 6);
console.assert(part1(130) === 8);
console.assert(part1(150) === 8);

console.assert(part2(10) === 1);
console.assert(part2(50) === 4);
console.assert(part2(100) === 6);
console.assert(part2(130) === 6);
console.assert(part2(150) === 8);
