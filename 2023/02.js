// == SHARED ==

function parseInput(input) {
  return input
    .split("\n")
    .map(line => {
      let [, id, cubes] = line.match(/^Game (\d+): (.*)$/);
      return {
        id: Number(id),
        cubes: [...cubes.matchAll(/(\d+) (\w+)/g)].map(([, count, color]) => ({count: Number(count), color})),
      };
    });
}

// == PART 1 ==

function part1(input) {
  let MAX_CUBES = {red: 12, green: 13, blue: 14};

  return parseInput(input)
    .filter(({cubes}) => cubes.every(({count, color}) => count <= MAX_CUBES[color]))
    .reduce((sum, {id}) => sum + id, 0);
}

// == PART 2 ==

function part2(input) {
  return parseInput(input)
    .map(({cubes}) => cubes.reduce((maxCounts, {count, color}) => ({...maxCounts, [color]: Math.max(maxCounts[color], count)}), {red: 0, green: 0, blue: 0}))
    .map(({red, green, blue}) => red * green * blue)
    .reduce((sum, power) => sum + power, 0);
}

// == ASSERTS ==

console.assert(part1(
`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`) === 8);

console.assert(part2(
`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`) === 2286);
