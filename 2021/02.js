// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(line => {
    let [, command, units] = line.match(/^(\w+) (\d+)$/);
    units = Number(units);
    return {command, units};
  });

  let horizontal = input
    .filter(({command}) => command === "forward")
    .reduce((sum, {units}) => sum + units, 0);
  let depth = input
    .filter(({command}) => command !== "forward")
    .reduce((sum, {command, units}) => sum + (command === "down" ? units : -units), 0);

  return horizontal * depth;
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(line => {
    let [, command, units] = line.match(/^(\w+) (\d+)$/);
    units = Number(units);
    return {command, units};
  });

  let {horizontal, depth} = input.reduce(({horizontal, depth, aim}, {command, units}) => {
    if (command === "down") {
      aim += units;
    } else if (command === "up") {
      aim += -units;
    } else {
      horizontal += units;
      depth += aim * units;
    }
    return {horizontal, depth, aim};
  }, {horizontal: 0, depth: 0, aim: 0});

  return horizontal * depth;
}

// == ASSERTS ==

console.assert(part1("forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2") === 150);

console.assert(part2("forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2") === 900);
