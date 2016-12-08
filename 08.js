// == PART 1 ==

function aoc_day8_part1(input) {
  input = input.split("\n");

  let displayWidth = 7, displayHeight = 3;
  let display = ("/" + " ".repeat(displayWidth)).repeat(displayHeight).substr(1).split("/").map(e => e.split(""));

  input.forEach(instruction => {
    let parts = instruction.split(" ");
    if (parts[0] === "rect") {
      let [cols, rows] = parts[1].split("x").map(Number);
      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          display[row][col] = "█";
        }
      }
    } else if (parts[0] === "rotate" && parts[1] === "row") {
      let row = +parts[2].split("=")[1], by = -parts[4];
      display[row] = display[row].slice(by).concat(display[row].slice(0, by));
    } else if (parts[0] === "rotate" && parts[1] === "column") {
      let col = +parts[2].split("=")[1], by = -parts[4];
      let colData = display.map(e => e[col]);
      colData = colData.slice(by).concat(colData.slice(0, by));
      display.forEach((e, key) => e[col] = colData[key]);
    }
  })

  return display.map(e => e.join("")).join("").replace(/\s/g, "").length;
}

// == PART 2 ==

function aoc_day8_part2(input) {
  input = input.split("\n");

  let displayWidth = 7, displayHeight = 3;
  let display = ("/" + " ".repeat(displayWidth)).repeat(displayHeight).substr(1).split("/").map(e => e.split(""));

  input.forEach(instruction => {
    let parts = instruction.split(" ");
    if (parts[0] === "rect") {
      let [cols, rows] = parts[1].split("x").map(Number);
      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          display[row][col] = "█";
        }
      }
    } else if (parts[0] === "rotate" && parts[1] === "row") {
      let row = +parts[2].split("=")[1], by = -parts[4];
      display[row] = display[row].slice(by).concat(display[row].slice(0, by));
    } else if (parts[0] === "rotate" && parts[1] === "column") {
      let col = +parts[2].split("=")[1], by = -parts[4];
      let colData = display.map(e => e[col]);
      colData = colData.slice(by).concat(colData.slice(0, by));
      display.forEach((e, key) => e[col] = colData[key]);
    }
  })

  return display.map(e => e.join("")).join("\n");
}

// == ASSERTS ==

console.assert(aoc_day8_part1("rect 3x2\nrotate column x=1 by 1\nrotate row y=0 by 4\nrotate column x=1 by 1") === 6);

console.assert(aoc_day8_part2("rect 3x2\nrotate column x=1 by 1\nrotate row y=0 by 4\nrotate column x=1 by 1") === " █  █ █\n█ █    \n █     ");
