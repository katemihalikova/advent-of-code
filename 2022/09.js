// == PART 1 ==

function part1(input) {
  input = input
    .split("\n")
    .map(line => line.split(" "))
    .map(([dir, steps]) => ({dir, steps: Number(steps)}));

  let visited = new Set(["0,0"]);

  let head = {x: 0, y: 0};
  let tail = {x: 0, y: 0};

  for (let {dir, steps} of input) {
    for (let step = 0; step < steps; step++) {
      if (dir === "U") head.y--;
      if (dir === "D") head.y++;
      if (dir === "L") head.x--;
      if (dir === "R") head.x++;

      let xDiff = head.x - tail.x;
      let yDiff = head.y - tail.y;

      if (Math.abs(xDiff) > 1) {
        tail.x = tail.x + Math.sign(xDiff);
        tail.y = head.y;
      } else if (Math.abs(yDiff) > 1) {
        tail.x = head.x;
        tail.y = tail.y + Math.sign(yDiff);
      }

      visited.add(`${tail.x},${tail.y}`);
    }
  }

  return visited.size;
}

// == PART 2 ==

function part2(input) {
  input = input
    .split("\n")
    .map(line => line.split(" "))
    .map(([dir, steps]) => ({dir, steps: Number(steps)}));

  let visited = new Set(["0,0"]);

  let head = {x: 0, y: 0};
  let tails = Array(9).fill().map(() => ({x: 0, y: 0}));

  for (let {dir, steps} of input) {
    for (let step = 0; step < steps; step++) {
      if (dir === "U") head.y--;
      if (dir === "D") head.y++;
      if (dir === "L") head.x--;
      if (dir === "R") head.x++;

      tails.forEach((tail, index) => {
        let prev = tails[index - 1] || head;
        let xDiff = prev.x - tail.x;
        let yDiff = prev.y - tail.y;

        if (Math.abs(xDiff) > 1 && Math.abs(yDiff) > 1) {
          tail.x = tail.x + Math.sign(xDiff);
          tail.y = tail.y + Math.sign(yDiff);
        } else if (Math.abs(xDiff) > 1) {
          tail.x = tail.x + Math.sign(xDiff);
          tail.y = prev.y;
        } else if (Math.abs(yDiff) > 1) {
          tail.x = prev.x;
          tail.y = tail.y + Math.sign(yDiff);
        }
      });

      visited.add(`${tails.at(-1).x},${tails.at(-1).y}`);
    }
  }

  return visited.size;
}

// == ASSERTS ==

console.assert(part1(
`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`) === 13);

console.assert(part2(
`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`) === 1);
console.assert(part2(
`R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`) === 36);
