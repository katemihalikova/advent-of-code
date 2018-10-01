const permute = require("permute");

// == PART 1 ==

function part1(input) {
  let happiness = {};

  input.split("\n").forEach(l => {
    let [, from, dir, nr, to] = l.match(/^(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+).$/);
    happiness[from] = happiness[from] || {};
    happiness[from][to] = +nr;
    if (dir === "lose") happiness[from][to] *= -1;
  });

  let people = Object.keys(happiness);
  let maxHappiness = 0;

  do {
    maxHappiness = Math.max(maxHappiness, people
      .map((person, i) => {
        let prev = happiness[person][people[i === 0 ? people.length - 1 : i - 1]];
        let next = happiness[person][people[i === people.length - 1 ? 0 : i + 1]];
        return prev + next;
      })
      .reduce((a, b) => a + b, 0));
  } while(permute(people));

  return maxHappiness;
}

// == PART 2 ==

function part2(input) {
  let happiness = {me: {}};

  input.split("\n").forEach(l => {
    let [, from, dir, nr, to] = l.match(/^(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+).$/);
    happiness[from] = happiness[from] || {};
    happiness[from][to] = +nr;
    if (dir === "lose") happiness[from][to] *= -1;
  });

  let people = Object.keys(happiness);
  let maxHappiness = 0;

  do {
    maxHappiness = Math.max(maxHappiness, people
      .map((person, i) => {
        let prev = happiness[person][people[i === 0 ? people.length - 1 : i - 1]] || 0;
        let next = happiness[person][people[i === people.length - 1 ? 0 : i + 1]] || 0;
        return prev + next;
      })
      .reduce((a, b) => a + b, 0));
  } while(permute(people));

  return maxHappiness;
}

// == ASSERTS ==

console.assert(part1("Alice would gain 54 happiness units by sitting next to Bob.\nAlice would lose 79 happiness units by sitting next to Carol.\nAlice would lose 2 happiness units by sitting next to David.\nBob would gain 83 happiness units by sitting next to Alice.\nBob would lose 7 happiness units by sitting next to Carol.\nBob would lose 63 happiness units by sitting next to David.\nCarol would lose 62 happiness units by sitting next to Alice.\nCarol would gain 60 happiness units by sitting next to Bob.\nCarol would gain 55 happiness units by sitting next to David.\nDavid would gain 46 happiness units by sitting next to Alice.\nDavid would lose 7 happiness units by sitting next to Bob.\nDavid would gain 41 happiness units by sitting next to Carol.") === 330);

console.assert(part2("Alice would gain 54 happiness units by sitting next to Bob.\nAlice would lose 79 happiness units by sitting next to Carol.\nAlice would lose 2 happiness units by sitting next to David.\nBob would gain 83 happiness units by sitting next to Alice.\nBob would lose 7 happiness units by sitting next to Carol.\nBob would lose 63 happiness units by sitting next to David.\nCarol would lose 62 happiness units by sitting next to Alice.\nCarol would gain 60 happiness units by sitting next to Bob.\nCarol would gain 55 happiness units by sitting next to David.\nDavid would gain 46 happiness units by sitting next to Alice.\nDavid would lose 7 happiness units by sitting next to Bob.\nDavid would gain 41 happiness units by sitting next to Carol.") === 286);
