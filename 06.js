// == PART 1 ==

function part1(input) {
  input = input.split("\t").map(Number);

  let steps = 0;
  let visited = [input.join(",")];

  while (true) {
    steps++;

    let index = input.indexOf(Math.max(...input));
    let blocks = input[index];
    input[index] = 0;
    for (let i = 1; i <= blocks; i++) input[(index + i) % input.length]++;

    if (visited.indexOf(input.join(",")) > -1) return steps;
    visited.push(input.join(","));
  }
}

// == PART 2 ==

function part2(input) {
  input = input.split("\t").map(Number);

  let steps = 0;
  let visited = [{banks: input.join(","), steps}];

  while (true) {
    steps++;

    let index = input.indexOf(Math.max(...input));
    let blocks = input[index];
    input[index] = 0;
    for (let i = 1; i <= blocks; i++) input[(index + i) % input.length]++;

    let alreadyVisited = visited.find(({banks}) => banks === input.join(","));
    if (alreadyVisited) return steps - alreadyVisited.steps;
    visited.push({banks: input.join(","), steps});
  }
}

// == ASSERTS ==

console.assert(part1("0\t2\t7\t0") === 5);

console.assert(part2("0\t2\t7\t0") === 4);
