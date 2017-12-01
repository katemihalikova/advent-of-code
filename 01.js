// == PART 1 ==

function part1(input) {
  let checksum = 0;

  input = input + input[0];
  input.replace(/(.)(?=\1)/g, (_, nr) => checksum += +nr);

  return checksum;
}

// == PART 2 ==

function part2(input) {
  return input
    .substr(input.length / 2)
    .split("")
    .reduce((checksum, nr, i) => {
      if (input[i] === nr) checksum += 2 * nr;
      return checksum;
    }, 0);
}

// == ASSERTS ==

console.assert(part1("1122") === 3);
console.assert(part1("1111") === 4);
console.assert(part1("1234") === 0);
console.assert(part1("91212129") === 9);

console.assert(part2("1212") === 6);
console.assert(part2("1221") === 0);
console.assert(part2("123425") === 4);
console.assert(part2("123123") === 12);
console.assert(part2("12131415") === 4);
