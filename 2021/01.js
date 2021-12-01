// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(Number);

  return input
    .filter((_, i, arr) => i > 0 && arr[i] > arr[i - 1])
    .length;
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(Number);

  return input
    .filter((_, i, arr) => i > 2 && arr[i] > arr[i - 3])
    .length;
}

// == ASSERTS ==

console.assert(part1("199\n200\n208\n210\n200\n207\n240\n269\n260\n263") === 7);

console.assert(part2("199\n200\n208\n210\n200\n207\n240\n269\n260\n263") === 5);
