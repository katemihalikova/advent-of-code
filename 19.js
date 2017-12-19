// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(line => line.split(""));

  let y = 0;
  let x = input[y].findIndex(symbol => symbol !== " ");
  let dir = "D";
  let letters = "";

  let isEmpty = (y, x) => !input[y] || !input[y][x] || input[y][x] === " ";

  while (true) {
    let currentSymbol = input[y][x];

    if (currentSymbol === "+") {
      if (!isEmpty(y + 1, x) && dir !== "U") {
        y += 1;
        dir = "D";
      } else if (!isEmpty(y - 1, x) && dir !== "D") {
        y -= 1;
        dir = "U";
      } else if (!isEmpty(y, x + 1) && dir !== "L") {
        x += 1;
        dir = "R";
      } else if (!isEmpty(y, x - 1) && dir !== "R") {
        x -= 1;
        dir = "L";
      }
    } else {
      if (/[A-Z]+/.test(currentSymbol)) {
        letters += currentSymbol;
      }

      if (
        (dir === "U" && isEmpty(y - 1, x) && isEmpty(y, x + 1) && isEmpty(y, x - 1)) ||
        (dir === "D" && isEmpty(y + 1, x) && isEmpty(y, x + 1) && isEmpty(y, x - 1)) ||
        (dir === "L" && isEmpty(y + 1, x) && isEmpty(y - 1, x) && isEmpty(y, x - 1)) ||
        (dir === "R" && isEmpty(y + 1, x) && isEmpty(y - 1, x) && isEmpty(y, x + 1))
      ) {
        return letters;
      }

      if (dir === "U") y -= 1;
      if (dir === "D") y += 1;
      if (dir === "L") x -= 1;
      if (dir === "R") x += 1;
    }
  }
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(line => line.split(""));

  let y = 0;
  let x = input[y].findIndex(symbol => symbol !== " ");
  let dir = "D";
  let steps = 0;

  let isEmpty = (y, x) => !input[y] || !input[y][x] || input[y][x] === " ";

  while (true) {
    steps++;

    let currentSymbol = input[y][x];

    if (currentSymbol === "+") {
      if (!isEmpty(y + 1, x) && dir !== "U") {
        y += 1;
        dir = "D";
      } else if (!isEmpty(y - 1, x) && dir !== "D") {
        y -= 1;
        dir = "U";
      } else if (!isEmpty(y, x + 1) && dir !== "L") {
        x += 1;
        dir = "R";
      } else if (!isEmpty(y, x - 1) && dir !== "R") {
        x -= 1;
        dir = "L";
      }
    } else {
      if (
        (dir === "U" && isEmpty(y - 1, x) && isEmpty(y, x + 1) && isEmpty(y, x - 1)) ||
        (dir === "D" && isEmpty(y + 1, x) && isEmpty(y, x + 1) && isEmpty(y, x - 1)) ||
        (dir === "L" && isEmpty(y + 1, x) && isEmpty(y - 1, x) && isEmpty(y, x - 1)) ||
        (dir === "R" && isEmpty(y + 1, x) && isEmpty(y - 1, x) && isEmpty(y, x + 1))
      ) {
        return steps;
      }

      if (dir === "U") y -= 1;
      if (dir === "D") y += 1;
      if (dir === "L") x -= 1;
      if (dir === "R") x += 1;
    }
  }
}

// == ASSERTS ==

console.assert(part1("     |          \n     |  +--+    \n     A  |  C    \n F---|----E|--+ \n     |  |  |  D \n     +B-+  +--+ \n                ") === "ABCDEF");

console.assert(part2("     |          \n     |  +--+    \n     A  |  C    \n F---|--|-E---+ \n     |  |  |  D \n     +B-+  +--+ \n                ") === 38);
