// == SHARED ==

Array.prototype.transpose = function() {
  return this[0].map((_, i) => this.map(row => row[i]));
}

// == PART 1 ==

function part1(input) {
  let [stacks, steps] = input.split("\n\n");

  stacks = stacks
    .split("\n")
    .slice(0, -1)
    .map(line => [...line].filter((_, index) => index % 4 === 1))
    .reverse()
    .transpose()
    .map(stack => stack.filter(crate => crate !== " " && crate !== undefined));

  steps = steps
    .split("\n")
    .map(line => {
      let [, count, from, to] = line.match(/^move (\d+) from (\d+) to (\d+)$/).map(Number);
      return {count, from, to};
    });

  for (let {count, from, to} of steps) {
    for (let i = 1; i <= count; i++) {
      stacks[to - 1].push(stacks[from - 1].pop());
    }
  }

  return stacks
    .map(stack => stack.at(-1))
    .join("");
}

// == PART 2 ==

function part2(input) {
  let [stacks, steps] = input.split("\n\n");

  stacks = stacks
    .split("\n")
    .slice(0, -1)
    .map(line => [...line].filter((_, index) => index % 4 === 1))
    .reverse()
    .transpose()
    .map(stack => stack.filter(crate => crate !== " " && crate !== undefined));

  steps = steps
    .split("\n")
    .map(line => {
      let [, count, from, to] = line.match(/^move (\d+) from (\d+) to (\d+)$/).map(Number);
      return {count, from, to};
    });

  for (let {count, from, to} of steps) {
    stacks[to - 1].push(...stacks[from - 1].splice(-count));
  }

  return stacks
    .map(stack => stack.at(-1))
    .join("");
}

// == ASSERTS ==

console.assert(part1(
`    [D]
[N] [C]
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`) === "CMZ");

console.assert(part2(
`    [D]
[N] [C]
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`) === "MCD");
