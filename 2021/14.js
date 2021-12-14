// == SHARED ==

function incrementKey(obj, key, value = 1) {
  obj[key] = obj[key] || 0;
  obj[key] += value;
}

// == PART 1 ==

function part1(input, steps = 10) {
  input = input.split("\n\n");

  let polymer = input[0];
  let rules = input[1].split("\n").reduce((acc, line) => {
    let [, from, to] = line.match(/^(\w\w) -> (\w)$/);
    acc[from] = acc[from] || {};
    acc[from] = to;
    return acc;
  }, {});

  for (let step = 1; step <= steps; step++) {
    let nextPolymer = "";

    for (let i = 0; i < polymer.length - 1; i++) {
      let a = polymer[i], b = polymer[i + 1];
      nextPolymer += a;
      nextPolymer += rules[a + b];
    }

    nextPolymer += polymer.at(-1);
    polymer = nextPolymer;
  }

  let elementCounts = Object.values([...polymer].reduce((acc, element) => {
    incrementKey(acc, element);
    return acc;
  }, {}));

  return Math.max(...elementCounts) - Math.min(...elementCounts);
}

// == PART 2 ==

function part2(input, steps = 40) {
  input = input.split("\n\n");

  let polymer = input[0];
  let rules = input[1].split("\n").reduce((acc, line) => {
    let [, from, to] = line.match(/^(\w\w) -> (\w)$/);
    acc[from] = acc[from] || {};
    acc[from] = to;
    return acc;
  }, {});

  let pairsCounter = {};
  for (let i = 0; i < polymer.length - 1; i++) {
    incrementKey(pairsCounter, polymer[i] + polymer[i + 1]);
  }

  for (let step = 1; step <= steps; step++) {
    let nextPairsCounter = {};

    for (let [pair, count] of Object.entries(pairsCounter)) {
      let newElement = rules[pair];
      incrementKey(nextPairsCounter, pair[0] + newElement, count);
      incrementKey(nextPairsCounter, newElement + pair[1], count);
    }

    pairsCounter = nextPairsCounter;
  }

  let elementsCounter = Object.entries(pairsCounter).reduce((acc, [pair, count]) => {
    incrementKey(acc, pair[0], count);
    return acc;
  }, {[polymer.at(-1)]: 1});

  let elementCounts = Object.values(elementsCounter);

  return Math.max(...elementCounts) - Math.min(...elementCounts);
}

// == ASSERTS ==

let example = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

console.assert(part1(example, 1) === 1);
console.assert(part1(example, 2) === 5);
console.assert(part1(example, 3) === 7);
console.assert(part1(example, 4) === 18);
console.assert(part1(example) === 1588);

console.assert(part2(example, 1) === 1);
console.assert(part2(example, 2) === 5);
console.assert(part2(example, 3) === 7);
console.assert(part2(example, 4) === 18);
console.assert(part2(example, 10) === 1588);
console.assert(part2(example) === 2188189693529);
