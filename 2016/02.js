// == PART 1 ==

function aoc_day2_part1(input) {
  input = input.split("\n").map(e => e.split(""));
  let button = 5;
  let key = {
    L: {"3": 2, "2": 1, "6": 5, "5": 4, "9": 8, "8": 7},
    R: {"1": 2, "2": 3, "4": 5, "5": 6, "7": 8, "8": 9},
    U: {"7": 4, "4": 1, "8": 5, "5": 2, "9": 6, "6": 3},
    D: {"1": 4, "4": 7, "2": 5, "5": 8, "3": 6, "6": 9},
  };

  return input.map(steps => {
    steps.forEach(step => {
      button = key[step][button] || button;
    });
    return button;
  }).join("");
}

// == PART 2 ==

function aoc_day2_part2(input) {
  input = input.split("\n").map(e => e.split(""));
  let button = 5;
  let key = {
    L: {"4": 3, "3": 2, "9": 8, "8": 7, "7": 6, "6": 5, "C": "B", "B": "A"},
    R: {"2": 3, "3": 4, "5": 6, "6": 7, "7": 8, "8": 9, "A": "B", "B": "C"},
    U: {"D": "B", "A": 6, "B": 7, "C": 8, "6": 2, "7": 3, "8": 4, "3": 1},
    D: {"1": 3, "2": 6, "3": 7, "4": 8, "6": "A", "7": "B", "8": "C", "B": "D"},
  };

  return input.map(steps => {
    steps.forEach(step => {
      button = key[step][button] || button;
    });
    return button;
  }).join("");
}

// == ASSERTS ==

console.assert(aoc_day2_part1("ULL\nRRDDD\nLURDL\nUUUUD") === "1985");

console.assert(aoc_day2_part2("ULL\nRRDDD\nLURDL\nUUUUD") === "5DB3");
