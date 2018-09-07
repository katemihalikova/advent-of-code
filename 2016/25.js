// == PART 1 ==

function aoc_day25_part1(input) {
  input = input.split("\n");

  let registers;

  let getValue = r => {
    if (isNaN(r)) {
      registers[r] = registers[r] || 0;
      return registers[r];
    } else {
      return Number(r);
    }
  };

  outer: for (let a = 0;; a++) {
    let previousOut;
    let alreadySeen = new Set();
    registers = {a};

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
      if (operator === "out") {
        if ((valueX === 0 || valueX === 1) && previousOut !== valueX) {
          previousOut = valueX;
          let currentState = JSON.stringify([registers, position]);
          if (alreadySeen.has(currentState)) {
            return a;
          } else {
            alreadySeen.add(currentState);
          }
        } else {
          continue outer;
        }
      }
    }
  }
}

// == ASSERTS ==

console.assert(aoc_day25_part1("dec a\ndec a\ndec a\nout a\ninc a\nout a\njnz 1 -4") === 3);
