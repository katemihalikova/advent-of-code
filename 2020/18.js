// == PART 1 ==

function part1(input) {
  input = input.split("\n");

  function solve(equation) {
    while(equation.includes(" ")) {
      if (equation.includes("(")) {
        let [partToSolve, innerEquation] = equation.match(/\(([^()]+)\)/);
        equation = equation.replace(partToSolve, solve(innerEquation));
      } else {
        let [partToSolve, operand1, operation, operand2] = equation.match(/(\d+) ([+*]) (\d+)/);
        operand1 = Number(operand1);
        operand2 = Number(operand2);
        let output = operation === "+" ? operand1 + operand2 : operand1 * operand2;
        equation = equation.replace(partToSolve, output);
      }
    }
    return Number(equation);
  };

  return input
    .map(solve)
    .reduce((a, b) => a + b, 0);
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n");

  function solve(equation) {
    while(equation.includes(" ")) {
      if (equation.includes("(")) {
        let [partToSolve, innerEquation] = equation.match(/\(([^()]+)\)/);
        equation = equation.replace(partToSolve, solve(innerEquation));
      } else {
        let [partToSolve, operand1, operation, operand2] = equation.match(/(\d+) (\+) (\d+)/) || equation.match(/(\d+) (\*) (\d+)/);
        operand1 = Number(operand1);
        operand2 = Number(operand2);
        let output = operation === "+" ? operand1 + operand2 : operand1 * operand2;
        equation = equation.replace(partToSolve, output);
      }
    }
    return Number(equation);
  };

  return input
    .map(solve)
    .reduce((a, b) => a + b, 0);
}

// == ASSERTS ==

console.assert(part1("1 + 2 * 3 + 4 * 5 + 6") === 71);
console.assert(part1("1 + (2 * 3) + (4 * (5 + 6))") === 51);
console.assert(part1("2 * 3 + (4 * 5)") === 26);
console.assert(part1("5 + (8 * 3 + 9 + 3 * 4 * 3)") === 437);
console.assert(part1("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))") === 12240);
console.assert(part1("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2") === 13632);

console.assert(part2("1 + 2 * 3 + 4 * 5 + 6") === 231);
console.assert(part2("1 + (2 * 3) + (4 * (5 + 6))") === 51);
console.assert(part2("2 * 3 + (4 * 5)") === 46);
console.assert(part2("5 + (8 * 3 + 9 + 3 * 4 * 3)") === 1445);
console.assert(part2("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))") === 669060);
console.assert(part2("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2") === 23340);
