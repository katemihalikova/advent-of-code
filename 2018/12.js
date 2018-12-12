// == PART 1 ==

function part1(input1, input2) {
  input1 = [...input1];
  input2 = input2.split("\n").map(note => {
    let [, from, to] = note.match(/^([.#]{5}) => ([.#])$/);
    return {from, to};
  });

  let pots = Object.assign({}, input1);
  let firstPotWithPlant = input1.indexOf("#");
  let lastPotWithPlant = input1.lastIndexOf("#");

  for (let generation = 1; generation <= 20; generation++) {
    let newPots = {};

    pots[firstPotWithPlant - 4] = pots[firstPotWithPlant - 3] = pots[firstPotWithPlant - 2] = pots[firstPotWithPlant - 1] =
    pots[lastPotWithPlant + 1] = pots[lastPotWithPlant + 2] = pots[lastPotWithPlant + 3] = pots[lastPotWithPlant + 4] = ".";

    let lastPot = lastPotWithPlant + 2;
    for (let i = firstPotWithPlant - 2; i <= lastPot; i++) {
      let stateAround = pots[i - 2] + pots[i - 1] + pots[i] + pots[i + 1] + pots[i + 2];
      let note = input2.find(note => note.from === stateAround);
      
      let newState = note ? note.to : ".";
      newPots[i] = newState;

      if (newState === "#" && firstPotWithPlant > i) firstPotWithPlant = i;
      if (newState === "." && firstPotWithPlant === i) firstPotWithPlant++;
      if (newState === "#" && lastPotWithPlant < i) lastPotWithPlant = i;
      if (newState === "." && lastPotWithPlant === i) {
        for (let j = i;; j--) {
          if (newPots[j] === "#") {
            lastPotWithPlant = j;
            break;
          }
        }
      }
    }

    pots = newPots;
  }

  return Object.entries(pots).reduce((sum, [key, state]) => sum + (state === "#" ? +key : 0), 0);
}

// == PART 2 ==

function part2(input1, input2) {
  input1 = [...input1];
  input2 = input2.split("\n").map(note => {
    let [, from, to] = note.match(/^([.#]{5}) => ([.#])$/);
    return {from, to};
  });

  let pots = Object.assign({}, input1);
  let firstPotWithPlant = input1.indexOf("#");
  let lastPotWithPlant = input1.lastIndexOf("#");

  for (let generation = 1;; generation++) {
    let newPots = {};

    pots[firstPotWithPlant - 4] = pots[firstPotWithPlant - 3] = pots[firstPotWithPlant - 2] = pots[firstPotWithPlant - 1] =
    pots[lastPotWithPlant + 1] = pots[lastPotWithPlant + 2] = pots[lastPotWithPlant + 3] = pots[lastPotWithPlant + 4] = ".";

    let newFirstPotWithPlant = firstPotWithPlant;
    let newLastPotWithPlant = lastPotWithPlant;
    for (let i = firstPotWithPlant - 2; i <= lastPotWithPlant + 2; i++) {
      let stateAround = pots[i - 2] + pots[i - 1] + pots[i] + pots[i + 1] + pots[i + 2];
      let note = input2.find(note => note.from === stateAround);
      
      let newState = note ? note.to : ".";
      newPots[i] = newState;

      if (newState === "#" && newFirstPotWithPlant > i) newFirstPotWithPlant = i;
      if (newState === "." && newFirstPotWithPlant === i) newFirstPotWithPlant++;
      if (newState === "#" && newLastPotWithPlant < i) newLastPotWithPlant = i;
      if (newState === "." && newLastPotWithPlant === i) {
        for (let j = i;; j--) {
          if (newPots[j] === "#") {
            newLastPotWithPlant = j;
            break;
          }
        }
      }
    }

    let potsHaveSamePattern = true;
    let diff = newFirstPotWithPlant - firstPotWithPlant;
    for (let i = firstPotWithPlant; i <= lastPotWithPlant; i++) {
      if (pots[i] !== newPots[i + diff]) {
        potsHaveSamePattern = false;
        break;
      }
    }

    if (potsHaveSamePattern) {
      let generationDiff = 50000000000 - generation;
      return Object.entries(newPots).reduce((sum, [key, state]) => sum + (state === "#" ? Number(key) + generationDiff : 0), 0);
    }

    pots = newPots;
    firstPotWithPlant = newFirstPotWithPlant;
    lastPotWithPlant = newLastPotWithPlant;
  }
}

// == ASSERTS ==

console.assert(part1(`#..#.#..##......###...###`, `...## => #\n..#.. => #\n.#... => #\n.#.#. => #\n.#.## => #\n.##.. => #\n.#### => #\n#.#.# => #\n#.### => #\n##.#. => #\n##.## => #\n###.. => #\n###.# => #\n####. => #`) === 325);

console.assert(part2(`#..#.#..##......###...###`, `...## => #\n..#.. => #\n.#... => #\n.#.#. => #\n.#.## => #\n.##.. => #\n.#### => #\n#.#.# => #\n#.### => #\n##.#. => #\n##.## => #\n###.. => #\n###.# => #\n####. => #`) === 999999999374);
