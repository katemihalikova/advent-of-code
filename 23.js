// == PART 1 ==

function part1(input) {
  input = input.split("\n");

  let registers = {};
  let muls = 0;

  let getValue = r => {
    if (isNaN(r)) {
      registers[r] = registers[r] || 0;
      return registers[r];
    } else {
      return Number(r);
    }
  };

  for (let position = 0; position >= 0 && position < input.length; position++) {
    let line = input[position];
    let [, operator, x, y] = line.match(/(\w+) ([\w\d-]+)(?: ([\w\d-]+))?/);
    let valueX = getValue(x);
    let valueY = getValue(y);

    if (operator === "set") {
      registers[x] = valueY;
    }
    if (operator === "sub") {
      registers[x] -= valueY;
    }
    if (operator === "mul") {
      registers[x] *= valueY;
      muls++;
    }
    if (operator === "jnz" && valueX !== 0) {
      position += valueY - 1;
    }
  }

  return muls;
}

// == PART 2 ==

function part2(input) {
  let registers = {b: input, h: 0};

  for (
    registers.b = registers.b * 100 + 100000, registers.c = registers.b + 17000;
    registers.g !== 0;
    registers.g = registers.b - registers.c, registers.b += 17
  ) {
    for (registers.d = 2; registers.b > Math.pow(registers.d, 2); registers.d++) {
      if (registers.b % registers.d === 0) {
        registers.h++;
        break;
      }
    }
  }

  return registers.h;
}

// == ASSERTS ==

console.assert(part1("set x 5\nmul x 1\nsub x 1\njnz x -2") === 5);

console.assert(part2(123456789) === 948);
