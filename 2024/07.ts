// == SHARED ==

function calculateCalibrationResult(input: string, operators: Array<(left: number, right: number) => number>) {
  let equations = input
    .split("\n")
    .map(line => {
      let [testResult, ...numbers] = line.match(/(\d+)/g)!.map(Number);
      return {testResult, numbers};
    });

  function canProduceResult(testResult: number, ...[left, right, ...rest]: number[]): boolean {
    return operators.some(operator => {
      let result = operator(left, right);
      if (rest.length === 0) return result === testResult;
      return canProduceResult(testResult, result, ...rest);
    });
  }

  return equations
    .filter(({testResult, numbers}) => canProduceResult(testResult, ...numbers))
    .reduce((acc, {testResult}) => acc + testResult, 0);
}

// == PART 1 ==

function part1(input: string): number {
  return calculateCalibrationResult(input, [
    (left, right) => left + right,
    (left, right) => left * right,
  ]);
}

// == PART 2 ==

function part2(input: string): number {
  return calculateCalibrationResult(input, [
    (left, right) => left + right,
    (left, right) => left * right,
    (left, right) => Number(String(left) + String(right)),
  ]);
}

// == ASSERTS ==

let example = `\
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;


console.assert(part1(example) === 3749);

console.assert(part2(example) === 11387);
