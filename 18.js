// == PART 1 ==

function part1(input) {
  input = input.split("\n");

  let registers = {};
  let lastPlayedSound;

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

    if (operator === "snd") {
      lastPlayedSound = valueX;
    }
    if (operator === "set") {
      registers[x] = valueY;
    }
    if (operator === "add") {
      registers[x] += valueY;
    }
    if (operator === "mul") {
      registers[x] *= valueY;
    }
    if (operator === "mod") {
      registers[x] %= valueY;
    }
    if (operator === "rcv" && valueX !== 0) {
      return lastPlayedSound;
    }
    if (operator === "jgz" && valueX > 0) {
      position += valueY - 1;
    }
  }
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n");

  let registers = [{p:0}, {p:1}];
  let positions = [0, 0];
  let queues = [[], []];
  let ended = [false, false];
  let program1SentTimes = 0;

  let getValue = (id, r) => {
    if (isNaN(r)) {
      registers[id][r] = registers[id][r] || 0;
      return registers[id][r];
    } else {
      return Number(r);
    }
  };

  while (true) {
    let possibleDeadlock = [false, false];

    for (let id of [0, 1]) {
      if (ended[id]) continue;

      let line = input[positions[id]];
      let [, operator, x, y] = line.match(/(\w+) ([\w\d-]+)(?: ([\w\d-]+))?/);
      let valueX = getValue(id, x);
      let valueY = getValue(id, y);

      if (operator === "snd") {
        queues[[1, 0][id]].push(valueX);
        if (id === 1) program1SentTimes++;
      }
      if (operator === "set") {
        registers[id][x] = valueY;
      }
      if (operator === "add") {
        registers[id][x] += valueY;
      }
      if (operator === "mul") {
        registers[id][x] *= valueY;
      }
      if (operator === "mod") {
        registers[id][x] %= valueY;
      }
      if (operator === "rcv") {
        if (queues[id].length > 0) {
          registers[id][x] = queues[id].shift();
        } else {
          positions[id]--;
          possibleDeadlock[id] = true;
        }
      }
      if (operator === "jgz" && valueX > 0) {
        positions[id] += valueY - 1;
      }

      positions[id]++;
      if (positions[id] < 0 || positions[id] >= input.length) ended[id] = true;
    }

    if (ended.every(v => v === true) || possibleDeadlock.every(v => v === true)) return program1SentTimes;
  }
}

// == ASSERTS ==

console.assert(part1("set a 1\nadd a 2\nmul a a\nmod a 5\nsnd a\nset a 0\nrcv a\njgz a -1\nset a 1\njgz a -2") === 4);

console.assert(part2(`snd 1\nsnd 2\nsnd p\nrcv a\nrcv b\nrcv c\nrcv d`) === 3);
