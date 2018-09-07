// == PART 1 & 2 ==

function aoc_day12(input, registers) {
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
  }

  return registers.a;
}

// == PART 1 ==

function aoc_day12_part1(input) {
  return aoc_day12(input, {});
}

// == PART 2 ==

function aoc_day12_part2(input) {
  return aoc_day12(input, {c: 1});
}

// == ASSERTS ==

console.assert(aoc_day12_part1("cpy 41 a\ninc a\ninc a\ndec a\njnz a 2\ndec a") === 42);
console.assert(aoc_day12_part1("cpy 41 a\ninc a\ninc a\ndec a\njnz c 2\ndec a") === 41);

console.assert(aoc_day12_part2("cpy 41 a\ninc a\ninc a\ndec a\njnz c 2\ndec a") === 42);
