// == PART 1 ==

function aoc_day18_part1(input) {
  input = input.split("");

  let floor = [input];

  for (let i = 1; i < 40; i++) {
    floor[i] = [];
    let row = floor[i - 1];

    for (let k = 0; k < input.length; k++) {
      if (
        (row[k - 1] === "^" && row[k] === "^" && row[k + 1] !== "^") ||
        (row[k - 1] === "^" && row[k] !== "^" && row[k + 1] !== "^") ||
        (row[k - 1] !== "^" && row[k] === "^" && row[k + 1] === "^") ||
        (row[k - 1] !== "^" && row[k] !== "^" && row[k + 1] === "^")
      ) {
        floor[i][k] = "^";
      } else {
        floor[i][k] = ".";
      }
    }
  }

  return [].concat(...floor).join("").replace(/[^\.]/g, "").length;
}

// == PART 2 ==

function aoc_day18_part2(input) {
  input = input.split("");

  let count = input.filter(e => e === ".").length;
  let next = input;
  let row;

  for (let i = 1; i < 400000; i++) {
    [next, row] = [[], next];

    for (let k = 0; k < input.length; k++) {
      if (
        (row[k - 1] === "^" && row[k] === "^" && row[k + 1] !== "^") ||
        (row[k - 1] !== "^" && row[k] === "^" && row[k + 1] === "^") ||
        (row[k - 1] === "^" && row[k] !== "^" && row[k + 1] !== "^") ||
        (row[k - 1] !== "^" && row[k] !== "^" && row[k + 1] === "^")
      ) {
        next[k] = "^";
      } else {
        next[k] = ".";
        count++;
      }
    }
  }

  return count;
}

// == ASSERTS ==

console.assert(aoc_day18_part1("..^^.") === 61);

console.assert(aoc_day18_part2("..^^.") === 600001);
