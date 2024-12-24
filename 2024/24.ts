// == PART 1 ==

function part1(input: string): number {
  let [wiresInput, gatesInput] = input.split("\n\n");

  let gates = gatesInput
    .split("\n")
    .map(line => {
      let [, input1, operator, input2, output] = line.match(/^(\w+) (AND|OR|XOR) (\w+) -> (\w+)$/)!;
      return {input1, input2, operator, output};
    });

  let wires = wiresInput
    .split("\n")
    .map(line => line.match(/^(\w+): (\d+)$/)!)
    .reduce<Record<string, number>>((acc, [, wire, output]) => ({...acc, [wire]: Number(output)}), {});

  while (gates.length > 0) {
    gates = gates.filter(({input1, input2, operator, output}) => {
      if (wires[input1] !== undefined && wires[input2] !== undefined) {
        if (operator === "AND") wires[output] = wires[input1] & wires[input2];
        else if (operator === "OR") wires[output] = wires[input1] | wires[input2];
        else wires[output] = wires[input1] ^ wires[input2];

        return false;
      }

      return true;
    });
  }

  let binaryOutput = Object.keys(wires)
    .filter(wire => wire.startsWith("z"))
    .sort((wireA, wireB) => wireB.localeCompare(wireA))
    .map(wire => wires[wire])
    .join("");

  return parseInt(binaryOutput, 2);
}

// == PART 2 ==

// Manually decompiled the input adder and fixed the wire mess

// == ASSERTS ==

console.assert(part1(`\
x00: 1
x01: 1
x02: 1
y00: 0
y01: 1
y02: 0

x00 AND y00 -> z00
x01 XOR y01 -> z01
x02 OR y02 -> z02`) === 4);
console.assert(part1(`\
x00: 1
x01: 0
x02: 1
x03: 1
x04: 0
y00: 1
y01: 1
y02: 1
y03: 1
y04: 1

ntg XOR fgs -> mjb
y02 OR x01 -> tnw
kwq OR kpj -> z05
x00 OR x03 -> fst
tgd XOR rvg -> z01
vdt OR tnw -> bfw
bfw AND frj -> z10
ffh OR nrd -> bqk
y00 AND y03 -> djm
y03 OR y00 -> psh
bqk OR frj -> z08
tnw OR fst -> frj
gnj AND tgd -> z11
bfw XOR mjb -> z00
x03 OR x00 -> vdt
gnj AND wpb -> z02
x04 AND y00 -> kjc
djm OR pbm -> qhw
nrd AND vdt -> hwm
kjc AND fst -> rvg
y04 OR y02 -> fgs
y01 AND x02 -> pbm
ntg OR kjc -> kwq
psh XOR fgs -> tgd
qhw XOR tgd -> z09
pbm OR djm -> kpj
x03 XOR y03 -> ffh
x00 XOR y04 -> ntg
bfw OR bqk -> z06
nrd XOR fgs -> wpb
frj XOR qhw -> z04
bqk OR frj -> z07
y03 OR x01 -> nrd
hwm AND bqk -> z03
tgd XOR rvg -> z12
tnw OR pbm -> gnj`) === 2024);
