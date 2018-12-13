// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(row => row.split("").map(cell => {
    if (cell === ">") return {track: "-", train: {direction: "R", intersections: 0}};
    if (cell === "<") return {track: "-", train: {direction: "L", intersections: 0}};
    if (cell === "^") return {track: "|", train: {direction: "U", intersections: 0}};
    if (cell === "v") return {track: "|", train: {direction: "D", intersections: 0}};
    else return {track: cell, train: undefined};
  }));

  while (true) {
    let collision;

    input.some((row, y) => row.some((cell, x) => {
      let {track, train} = cell;

      if (!train || train.movedInThisTick) return;
      train.movedInThisTick = true;

      if (track === "/") {
        if (train.direction === "R") train.direction = "U";
        else if (train.direction === "U") train.direction = "R";
        else if (train.direction === "L") train.direction = "D";
        else train.direction = "L";
      } else if (track === "\\") {
        if (train.direction === "R") train.direction = "D";
        else if (train.direction === "U") train.direction = "L";
        else if (train.direction === "L") train.direction = "U";
        else train.direction = "R";
      } else if (track === "+") {
        if (train.intersections % 3 === 0) { // turn left
          if (train.direction === "R") train.direction = "U";
          else if (train.direction === "U") train.direction = "L";
          else if (train.direction === "L") train.direction = "D";
          else train.direction = "R";
        } else if (train.intersections % 3 === 2) { // turn right
          if (train.direction === "R") train.direction = "D";
          else if (train.direction === "U") train.direction = "R";
          else if (train.direction === "L") train.direction = "U";
          else train.direction = "L";
        }
        train.intersections++;
      }

      let newX = x, newY = y;
      if (train.direction === "U") newY--;
      else if (train.direction === "R") newX++;
      else if (train.direction === "D") newY++;
      else newX--;

      let newCell = input[newY][newX];

      if (newCell.train) {
        collision = `${newX},${newY}`;
        return true;
      } else {
        newCell.train = train;
        cell.train = undefined;
      }
    }));

    if (collision) return collision;

    input.forEach(row => row.forEach(({train}) => {
      if (train) train.movedInThisTick = false;
    }));
  }
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(row => row.split("").map(cell => {
    if (cell === ">") return {track: "-", train: {direction: "R", intersections: 0}};
    if (cell === "<") return {track: "-", train: {direction: "L", intersections: 0}};
    if (cell === "^") return {track: "|", train: {direction: "U", intersections: 0}};
    if (cell === "v") return {track: "|", train: {direction: "D", intersections: 0}};
    else return {track: cell, train: undefined};
  }));

  while (true) {
    input.forEach((row, y) => row.forEach((cell, x) => {
      let {track, train} = cell;

      if (!train || train.movedInThisTick) return;
      train.movedInThisTick = true;

      if (track === "/") {
        if (train.direction === "R") train.direction = "U";
        else if (train.direction === "U") train.direction = "R";
        else if (train.direction === "L") train.direction = "D";
        else train.direction = "L";
      } else if (track === "\\") {
        if (train.direction === "R") train.direction = "D";
        else if (train.direction === "U") train.direction = "L";
        else if (train.direction === "L") train.direction = "U";
        else train.direction = "R";
      } else if (track === "+") {
        if (train.intersections % 3 === 0) { // turn left
          if (train.direction === "R") train.direction = "U";
          else if (train.direction === "U") train.direction = "L";
          else if (train.direction === "L") train.direction = "D";
          else train.direction = "R";
        } else if (train.intersections % 3 === 2) { // turn right
          if (train.direction === "R") train.direction = "D";
          else if (train.direction === "U") train.direction = "R";
          else if (train.direction === "L") train.direction = "U";
          else train.direction = "L";
        }
        train.intersections++;
      }

      let newX = x, newY = y;
      if (train.direction === "U") newY--;
      else if (train.direction === "R") newX++;
      else if (train.direction === "D") newY++;
      else newX--;

      let newCell = input[newY][newX];

      if (newCell.train) {
        newCell.train = undefined;
        cell.train = undefined;
      } else {
        newCell.train = train;
        cell.train = undefined;
      }
    }));

    let trains = [];
    input.forEach((row, y) => row.forEach(({train}, x) => {
      if (train) {
        train.movedInThisTick = false;
        trains.push(`${x},${y}`);
      }
    }));

    if (trains.length === 1) return trains[0];
  }
}

// == ASSERTS ==

console.assert(part1("|\nv\n|\n|\n|\n^\n|") === "0,3");
console.assert(part1("/->-\\        \n|   |  /----\\\n| /-+--+-\\  |\n| | |  | v  |\n\\-+-/  \\-+--/\n  \\------/   ") === "7,3");

console.assert(part2("/>-<\\  \n|   |  \n| /<+-\\\n| | | v\n\\>+</ |\n  |   ^\n  \\<->/") === "6,4");
