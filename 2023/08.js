// == PART 1 ==

function part1(input) {
  let [instructions, nodes] = input.split("\n\n");

  nodes = Object.fromEntries(nodes.split("\n").map(line => {
    let [, from, L, R] = line.match(/^(\w+) = \((\w+), (\w+)\)$/);
    return [from, {L, R}];
  }));

  let currentNode = "AAA";

  for (let steps = 0;; steps++) {
    if (currentNode === "ZZZ") return steps;

    currentNode = nodes[currentNode][instructions[steps % instructions.length]];
  }
}

// == PART 2 ==

function part2(input) {
  let [instructions, nodes] = input.split("\n\n");

  nodes = Object.fromEntries(nodes.split("\n").map(line => {
    let [, from, L, R] = line.match(/^(\w+) = \((\w+), (\w+)\)$/);
    return [from, {L, R}];
  }));

  let currentNodes = Object.keys(nodes).filter(e => e.endsWith("A"));
  let leastSteps = [];

  for (let steps = 0;; steps++) {
    currentNodes = currentNodes.filter(currentNode => {
      if (currentNode.endsWith("Z")) {
        leastSteps.push(steps);
        return false;
      }
      return true;
    });

    if (currentNodes.length === 0) break;

    currentNodes = currentNodes.map(u => {
      return nodes[u][instructions[steps % instructions.length]];
    })
  }

  // based on pseudocode from https://en.wikipedia.org/wiki/Euclidean_algorithm#Implementations
  function greatestCommonDivisor(a, b) {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  }

  // based on formula from https://en.wikipedia.org/wiki/Least_common_multiple#Using_the_greatest_common_divisor
  function leastCommonMultiple(a, b) {
    return a * b / greatestCommonDivisor(a, b);
  }

  return leastSteps.reduce(leastCommonMultiple);
}

// == ASSERTS ==

console.assert(part1(
`RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`) === 2);
console.assert(part1(
`LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`) === 6);

console.assert(part2(
`LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`) === 6);
