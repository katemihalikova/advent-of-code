// == PART 1 ==

function part1(input) {
  input = input.split("-").map(Number);

  let counter = 0;
  
  for (let i = input[0]; i <= input[1]; i++) {
    let digits = [...i.toString()];

    let fact1 = digits.length === 6;
    let fact3 = digits.some((digit, i) => digit === digits[i + 1]);
    let fact4 = digits.every((digit, i) => i === 0 || digit >= digits[i - 1])

    if (fact1 && fact3 && fact4) counter++;
  }
  
  return counter;
}

// == PART 2 ==

function part2(input) {
  input = input.split("-").map(Number);

  let counter = 0;
  
  for (let i = input[0]; i <= input[1]; i++) {
    let digits = [...i.toString()];

    let fact1 = digits.length === 6;
    let fact3 = digits.some((digit, i) => digit === digits[i + 1] && digit !== digits[i + 2] && digit !== digits[i - 1]);
    let fact4 = digits.every((digit, i) => i === 0 || digit >= digits[i - 1])

    if (fact1 && fact3 && fact4) counter++;
  }
  
  return counter;
}

// == ASSERTS ==

console.assert(part1("111111-111111") === 1);
console.assert(part1("223450-223450") === 0);
console.assert(part1("123789-123789") === 0);

console.assert(part2("112233-112233") === 1);
console.assert(part2("123444-123444") === 0);
console.assert(part2("111122-111122") === 1);
