const crypto = require("crypto");

// == ALL POSSIBLE SOLUTIONS ==

function aoc_day17_solutions(input) {
  let solutions = [];

  (function checkRoom(code, x, y) {
    if (x === 4 && y === 4) {
      solutions.push(code);
      return;
    }
    let doors = crypto.createHash("md5").update(input + code).digest("hex").substr(0, 4).replace(/[0-9a]/g, "C").replace(/[b-f]/g, "O");
    if (doors[0] === "O" && y > 1) checkRoom(code + "U", x, y - 1);
    if (doors[1] === "O" && y < 4) checkRoom(code + "D", x, y + 1);
    if (doors[2] === "O" && x > 1) checkRoom(code + "L", x - 1, y);
    if (doors[3] === "O" && x < 4) checkRoom(code + "R", x + 1, y);
  })("", 1, 1);

  return solutions;
}

// == PART 1 ==

function aoc_day17_part1(input) {
  return aoc_day17_solutions(input).sort((a, b) => a.length - b.length)[0];
}

// == PART 2 ==

function aoc_day17_part2(input) {
  return aoc_day17_solutions(input).sort((a, b) => b.length - a.length)[0].length;
}

// == ASSERTS ==

console.assert(aoc_day17_part1("ihgpwlah") === "DDRRRD");
console.assert(aoc_day17_part1("kglvqrro") === "DDUDRLRRUDRD");
console.assert(aoc_day17_part1("ulqzkmiv") === "DRURDRUDDLLDLUURRDULRLDUUDDDRR");

console.assert(aoc_day17_part2("ihgpwlah") === 370);
console.assert(aoc_day17_part2("kglvqrro") === 492);
console.assert(aoc_day17_part2("ulqzkmiv") === 830);
