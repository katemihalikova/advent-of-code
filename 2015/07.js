// == PART 1 ==

function part1(input) {
  let gates = input
    .split("\n")
    .map(line => {
      if (/^(\w+) -> (\w+)$/.test(line)) {
        let [, input1, output] = line.match(/^(\w+) -> (\w+)$/);
        return {output, operator: "PASS", input1};
      } else if (/^(\w+) (AND|OR|LSHIFT|RSHIFT) (\w+) -> (\w+)$/.test(line)) {
        let [, input1, operator, input2, output] = line.match(/^(\w+) (AND|OR|LSHIFT|RSHIFT) (\w+) -> (\w+)$/);
        return {output, operator, input1, input2};
      } else if (/^(NOT) (\w+) -> (\w+)$/.test(line)) {
        let [, operator, input1, output] = line.match(/^(NOT) (\w+) -> (\w+)$/);
        return {output, operator, input1};
      }
    });

  let wires = {};
  const getInput = input => /^\d+$/.test(input) ? Number(input) : wires[input];

  while (gates.length > 0) {
    gates = gates.filter(gate => {
      let input1 = getInput(gate.input1);
      let input2 = getInput(gate.input2);

      if (gate.operator === "AND" && input1 !== undefined && input2 !== undefined) {
        wires[gate.output] = input1 & input2;
      } else if (gate.operator === "OR" && input1 !== undefined && input2 !== undefined) {
        wires[gate.output] = input1 | input2;
      } else if (gate.operator === "LSHIFT" && input1 !== undefined && input2 !== undefined) {
        wires[gate.output] = ((input1 << input2) + 0x10000) % 0x10000;
      } else if (gate.operator === "RSHIFT" && input1 !== undefined && input2 !== undefined) {
        wires[gate.output] = ((input1 >>> input2) + 0x10000) % 0x10000;
      } else if (gate.operator === "NOT" && input1 !== undefined) {
        wires[gate.output] = ~input1;
        if (wires[gate.output] < 0) wires[gate.output] += 0x10000;
      } else if (gate.operator === "PASS" && input1 !== undefined) {
        wires[gate.output] = input1;
      } else {
        return true;
      }
    });
  }

  return wires.a;
}

// == PART 2 ==

function part2(input) {
  return part1(input.replace(/^\d+ -> b$/m, `${part1(input)} -> b`));
}

// == ASSERTS ==

console.assert(part1("123 -> b\n456 -> c\nb AND c -> a") === 72);
console.assert(part1("123 -> b\n456 -> c\nb OR c -> a") === 507);
console.assert(part1("123 -> b\n456 -> c\nb LSHIFT 2 -> a") === 492);
console.assert(part1("123 -> b\n456 -> c\nc RSHIFT 2 -> a") === 114);
console.assert(part1("123 -> b\n456 -> c\nNOT b -> a") === 65412);
console.assert(part1("123 -> b\n456 -> c\nNOT c -> a") === 65079);

console.assert(part2("123 -> b\n456 -> c\nb AND c -> a") === 72);
console.assert(part2("123 -> b\n456 -> c\nb OR c -> a") === 507);
console.assert(part2("123 -> b\n456 -> c\nb LSHIFT 2 -> a") === 1968);
console.assert(part2("123 -> b\n456 -> c\nc RSHIFT 2 -> a") === 114);
console.assert(part2("123 -> b\n456 -> c\nNOT b -> a") === 123);
console.assert(part2("123 -> b\n456 -> c\nNOT c -> a") === 65079);
