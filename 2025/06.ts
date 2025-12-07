// == PART 1 ==

function part1(input: string): number {
  let [operations, ...rawNumbers] = input
    .split("\n")
    .toReversed()
    .map(line => line.trim().split(/\s+/));
  let numbers = rawNumbers
    [0].map((_, i) => rawNumbers.map(row => row[i]))
    .map(line => line.map(Number));

  return operations.reduce((result, operation, i) => {
    if (operation === "+") {
      return result + numbers[i].reduce((sum, n) => sum + n, 0);
    } else {
      return result + numbers[i].reduce((product, n) => product * n, 1);
    }
  }, 0);
}

// == PART 2 ==

function part2(input: string): number {
  let [operations, ...rawNumbers] = input
    .split("\n")
    .toReversed()
    .map(line => line.split(""));
  let stringNumbers = rawNumbers
    [0].map((_, i) => rawNumbers.map(row => row[i]))
    .map(line => line.toReversed().join("").trim());
  operations = [...operations.filter((_, i) => stringNumbers[i] !== ""), "end"];
  let numbers = stringNumbers.filter(number => number !== "").map(Number);

  let total = 0;
  let currentOperation: string;
  let currentResult: number = 0;

  operations.forEach((operation, i) => {
    if (operation !== " ") {
      total += currentResult;
      currentOperation = operation;
      currentResult = numbers[i];
    } else if (currentOperation === "+") {
      currentResult += numbers[i];
    } else {
      currentResult *= numbers[i];
    }
  });

  return total;
}

// == ASSERTS ==

console.assert(part1(`\
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `) === 4277556);

console.assert(part2(`\
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `) === 3263827);
