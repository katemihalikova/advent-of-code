// == PART 1 ==

function part1(input) {
  let registers = {};

  input.split("\n").forEach(line => {
    let [, register, operator, operand, conditionRegister, conditionOperator, conditionOperand] = line.match(/(\w+) (inc|dec) ([\d-]+) if (\w+) ((?:>|<|=|!)=?) ([\d-]+)/);
    operand = +operand;
    conditionOperand = +conditionOperand;

    registers[conditionRegister] = registers[conditionRegister] || 0;

    let cond = false;
    if (conditionOperator === ">") cond = registers[conditionRegister] > conditionOperand;
    if (conditionOperator === ">=") cond = registers[conditionRegister] >= conditionOperand;
    if (conditionOperator === "<") cond = registers[conditionRegister] < conditionOperand;
    if (conditionOperator === "<=") cond = registers[conditionRegister] <= conditionOperand;
    if (conditionOperator === "==") cond = registers[conditionRegister] === conditionOperand;
    if (conditionOperator === "!=") cond = registers[conditionRegister] !== conditionOperand;

    if (!cond) return;

    registers[register] = registers[register] || 0;

    if (operator === "inc") registers[register] += operand;
    if (operator === "dec") registers[register] -= operand;
  });

  return Math.max(...Object.values(registers));
}

// == PART 2 ==

function part2(input) {
  let registers = {};

  return input.split("\n").reduce((max, line) => {
    let [, register, operator, operand, conditionRegister, conditionOperator, conditionOperand] = line.match(/(\w+) (inc|dec) ([\d-]+) if (\w+) ((?:>|<|=|!)=?) ([\d-]+)/);
    operand = +operand;
    conditionOperand = +conditionOperand;

    registers[conditionRegister] = registers[conditionRegister] || 0;

    let cond = false;
    if (conditionOperator === ">") cond = registers[conditionRegister] > conditionOperand;
    if (conditionOperator === ">=") cond = registers[conditionRegister] >= conditionOperand;
    if (conditionOperator === "<") cond = registers[conditionRegister] < conditionOperand;
    if (conditionOperator === "<=") cond = registers[conditionRegister] <= conditionOperand;
    if (conditionOperator === "==") cond = registers[conditionRegister] === conditionOperand;
    if (conditionOperator === "!=") cond = registers[conditionRegister] !== conditionOperand;

    if (!cond) return max;

    registers[register] = registers[register] || 0;

    if (operator === "inc") registers[register] += operand;
    if (operator === "dec") registers[register] -= operand;

    return Math.max(max, registers[register]);
  }, 0);
}

// == ASSERTS ==

console.assert(part1("b inc 5 if a > 1\na inc 1 if b < 5\nc dec -10 if a >= 1\nc inc -20 if c == 10") === 1);

console.assert(part2("b inc 5 if a > 1\na inc 1 if b < 5\nc dec -10 if a >= 1\nc inc -20 if c == 10") === 10);
