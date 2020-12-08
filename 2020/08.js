// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(line => {
    let [, operation, argument] = line.match(/^(\w+) ([+-]\d+)$/);
    argument = Number(argument);
    return {operation, argument};
  });

  let accumulator = 0;
  let visited = [];

  for (let instruction = 0;;) {
    if (visited.includes(instruction)) return accumulator;
    visited.push(instruction);

    let {operation, argument} = input[instruction];

    if (operation === "acc") {
      accumulator += argument;
      instruction++;
    } else if (operation === "nop") {
      instruction++;
    } else if (operation === "jmp") {
      instruction += argument;
    }
  }
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(line => {
    let [, operation, argument] = line.match(/^(\w+) ([+-]\d+)$/);
    argument = Number(argument);
    return {operation, argument};
  });

  for (let corruptedInstruction = 0; corruptedInstruction < input.length; corruptedInstruction++) {
    if (input[corruptedInstruction].operation === "acc") continue;

    let accumulator = 0;
    let visited = [];

    for (let instruction = 0;;) {
      if (visited.includes(instruction)) break;
      if (instruction === input.length) return accumulator;
      visited.push(instruction);

      let {operation, argument} = input[instruction];

      if (instruction === corruptedInstruction && operation === "nop") operation = "jmp";
      else if (instruction === corruptedInstruction && operation === "jmp") operation = "nop";

      if (operation === "acc") {
        accumulator += argument;
        instruction++;
      } else if (operation === "nop") {
        instruction++;
      } else if (operation === "jmp") {
        instruction += argument;
      }
    }
  }
}

// == ASSERTS ==

console.assert(part1(
`nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`
) === 5);

console.assert(part2(
`nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`
) === 8);
