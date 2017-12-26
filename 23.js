// == PART 1 & 2 ==

function aoc_day23(input, registers) {
  input = input.split("\n");

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

    if (operator === "cpy") {
      registers[y] = valueX;
    }
    if (operator === "inc") {
      registers[x]++;
    }
    if (operator === "dec") {
      registers[x]--;
    }
    if (operator === "jnz" && valueX !== 0) {
      position += valueY - 1;
    }
    if (operator === "tgl" && input[position + valueX]) {
      let oldOperator = input[position + valueX].slice(0, 3);
      let newOperator;
      if (oldOperator === "jnz") newOperator = "cpy";
      else if (oldOperator === "cpy") newOperator = "jnz";
      else if (oldOperator === "inc") newOperator = "dec";
      else newOperator = "inc";

      input[position + valueX] = newOperator + input[position + valueX].slice(3);
    }
  }

  return registers.a;
}

// == PART 1 ==

function aoc_day23_part1(input) {
  return aoc_day23(input, {a: 7});
}

// == PART 2 ==

function aoc_day23_part2(input) {
  return aoc_day23(input, {a: 12});
}

// manually decompiled version of the actual input - use values from lines 20 & 21 of the input
function aoc_day23_part2_decompiled(cpy_c, jnz_d) {
  return (12 * 11 * 10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2) + (cpy_c * jnz_d);
}

// == ASSERTS ==

console.assert(aoc_day23_part1("cpy 2 a\ntgl a\ntgl a\ntgl a\ncpy 1 a\ndec a\ndec a") === 3);

console.assert(aoc_day23_part2("cpy 5 z\ndec a\ndec z\njnz z -2\ncpy 5 z\ndec a\ndec z\njnz z -2\ntgl a\ntgl a\ntgl a\ncpy 1 a\ndec a\ndec a") === 3);

console.assert(aoc_day23_part2_decompiled(75, 88) === 479008200);
