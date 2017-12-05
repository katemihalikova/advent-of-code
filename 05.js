// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(Number);

  let index = 0;
  let count = 0;

  while (true) {
    let i = index;
    index += input[i];

    input[i]++;
    count++;

    if (index >= input.length) return count;
  }
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(Number);

  let index = 0;
  let count = 0;

  while (true) {
    let i = index;
    index += input[i];

    if (input[i] >= 3) input[i]--;
    else input[i]++;
    count++;

    if (index >= input.length) return count;
  }
}

// == ASSERTS ==

console.assert(part1("0\n3\n0\n1\n-3") === 5);

console.assert(part2("0\n3\n0\n1\n-3") === 10);
