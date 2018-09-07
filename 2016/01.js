// == PART 1 ==

function aoc_day1_part1(input) {
  input = input.split(", ");
  var direction = 0; // 0u, 1r, 2d, 3l
  var position = [0, 0];

  input.forEach(function(step) {
    var turn = step[0], steps = +step.substr(1);

    direction += 4;
    if (turn === "L") direction--;
    if (turn === "R") direction++;
    direction %= 4;

    if (direction === 0) position[1] += steps;
    if (direction === 1) position[0] += steps;
    if (direction === 2) position[1] -= steps;
    if (direction === 3) position[0] -= steps;

  });
  
  return Math.abs(position[0]) + Math.abs(position[1]);
}

// == PART 2 ==

function aoc_day1_part2(input) {
  input = input.split(", ");
  var direction = 0; // 0u, 1r, 2d, 3l
  var position = [0, 0];
  var visited = ["0,0"];
  var visitedTwice = [];

  input.forEach(step => {
    let turn = step[0], steps = +step.substr(1);

    direction += 4;
    if (turn === "L") direction--;
    if (turn === "R") direction++;
    direction %= 4;

    for (let i = 1; i <= steps; i++) {
      if (direction === 0) position[1] += 1;
      if (direction === 1) position[0] += 1;
      if (direction === 2) position[1] -= 1;
      if (direction === 3) position[0] -= 1;

      if (visited.find(p => p[0] === position[0] && p[1] === position[1])) visitedTwice.push([...position]);
      visited.push([...position]);
    }
  });

  return Math.abs(visitedTwice[0][0]) + Math.abs(visitedTwice[0][1]);
}

// == ASSERTS ==

console.assert(aoc_day1_part1("R2, L3") === 5);
console.assert(aoc_day1_part1("R2, R2, R2") === 2);
console.assert(aoc_day1_part1("R5, L5, R5, R3") === 12);

console.assert(aoc_day1_part2("R8, R4, R4, R8") === 4);
