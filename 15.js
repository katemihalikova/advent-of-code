// == PART 1 ==

function part1(input) {
  let [A, B] = input;
  let judge = 0;

  for (let i = 0; i < 40000000; i++) {
    A = A * 16807 % 2147483647;
    B = B * 48271 % 2147483647;

    if ((A & 0b1111111111111111) === (B & 0b1111111111111111)) judge++;
  }

  return judge;
}

// == PART 2 ==

function part2(input) {
  let [A, B] = input;
  let judge = 0;

  for (let i = 0; i < 5000000; i++) {
    do {
      A = A * 16807 % 2147483647;
    } while (A % 4 !== 0);
    do {
      B = B * 48271 % 2147483647;
    } while (B % 8 !== 0);

    if ((A & 0b1111111111111111) === (B & 0b1111111111111111)) judge++;
  }

  return judge;
}

// == ASSERTS ==

console.assert(part1([65, 8921]) === 588);
console.assert(part2([65, 8921]) === 309);
