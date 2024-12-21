// == PARTS 1 & 2 ==

function bothParts(input: string, robotCount: number) {
  let codes = input.split("\n");

  let numeric = [
    ["7","8","9"],
    ["4","5","6"],
    ["1","2","3"],
    [   ,"0","A"],
  ];

  let directional = [
    [   ,"^","A"],
    ["<","v",">"],
  ];

  let cache: Record<string, number> = {};

  function getSequenceLength(originButton: string, targetButton: string, robot = 0): number {
    if (robot > robotCount) return 1;

    let cacheKey = `${originButton},${targetButton},${robot}`;
    if (cache[cacheKey] === undefined) {
      let nextRobot = robot + 1;
      let keypad = robot === 0 ? numeric : directional;

      let originRow = keypad.findIndex(x => x.includes(originButton));
      let originCol = keypad.find(x => x.includes(originButton))!.indexOf(originButton);
      let targetRow = keypad.findIndex(x => x.includes(targetButton));
      let targetCol = keypad.find(x => x.includes(targetButton))!.indexOf(targetButton);

      let possibleLengths = [];

      if (originCol === targetCol && originRow > targetRow) {
        possibleLengths.push(
          getSequenceLength("A", "^", nextRobot) +
          getSequenceLength("^", "^", nextRobot) * (originRow - targetRow - 1) +
          getSequenceLength("^", "A", nextRobot)
        );
      } else if (originCol === targetCol && originRow < targetRow) {
        possibleLengths.push(
          getSequenceLength("A", "v", nextRobot) +
          getSequenceLength("v", "v", nextRobot) * (targetRow - originRow - 1) +
          getSequenceLength("v", "A", nextRobot)
        );
      } else if (originCol > targetCol && originRow === targetRow) {
        possibleLengths.push(
          getSequenceLength("A", "<", nextRobot) +
          getSequenceLength("<", "<", nextRobot) * (originCol - targetCol - 1) +
          getSequenceLength("<", "A", nextRobot)
        );
      } else if (originCol < targetCol && originRow === targetRow) {
        possibleLengths.push(
          getSequenceLength("A", ">", nextRobot) +
          getSequenceLength(">", ">", nextRobot) * (targetCol - originCol - 1) +
          getSequenceLength(">", "A", nextRobot)
        );
      } else if (originCol > targetCol && originRow > targetRow) {
        possibleLengths.push(
          getSequenceLength("A", "^", nextRobot) +
          getSequenceLength("^", "^", nextRobot) * (originRow - targetRow - 1) +
          getSequenceLength("^", "<", nextRobot) +
          getSequenceLength("<", "<", nextRobot) * (originCol - targetCol - 1) +
          getSequenceLength("<", "A", nextRobot)
        );
        if (keypad[originRow][targetCol] !== undefined) possibleLengths.push(
          getSequenceLength("A", "<", nextRobot) +
          getSequenceLength("<", "<", nextRobot) * (originCol - targetCol - 1) +
          getSequenceLength("<", "^", nextRobot) +
          getSequenceLength("^", "^", nextRobot) * (originRow - targetRow - 1) +
          getSequenceLength("^", "A", nextRobot)
        );
      } else if (originCol > targetCol && originRow < targetRow) {
        possibleLengths.push(
          getSequenceLength("A", "v", nextRobot) +
          getSequenceLength("v", "v", nextRobot) * (targetRow - originRow - 1) +
          getSequenceLength("v", "<", nextRobot) +
          getSequenceLength("<", "<", nextRobot) * (originCol - targetCol - 1) +
          getSequenceLength("<", "A", nextRobot)
        );
        if (keypad[originRow][targetCol] !== undefined) possibleLengths.push(
          getSequenceLength("A", "<", nextRobot) +
          getSequenceLength("<", "<", nextRobot) * (originCol - targetCol - 1) +
          getSequenceLength("<", "v", nextRobot) +
          getSequenceLength("v", "v", nextRobot) * (targetRow - originRow - 1) +
          getSequenceLength("v", "A", nextRobot)
        );
      } else if (originCol < targetCol && originRow > targetRow) {
        possibleLengths.push(
          getSequenceLength("A", ">", nextRobot) +
          getSequenceLength(">", ">", nextRobot) * (targetCol - originCol - 1) +
          getSequenceLength(">", "^", nextRobot) +
          getSequenceLength("^", "^", nextRobot) * (originRow - targetRow - 1) +
          getSequenceLength("^", "A", nextRobot)
        );
        if (keypad[targetRow][originCol] !== undefined) possibleLengths.push(
          getSequenceLength("A", "^", nextRobot) +
          getSequenceLength("^", "^", nextRobot) * (originRow - targetRow - 1) +
          getSequenceLength("^", ">", nextRobot) +
          getSequenceLength(">", ">", nextRobot) * (targetCol - originCol - 1) +
          getSequenceLength(">", "A", nextRobot)
        );
      } else if (originCol < targetCol && originRow < targetRow) {
        possibleLengths.push(
          getSequenceLength("A", ">", nextRobot) +
          getSequenceLength(">", ">", nextRobot) * (targetCol - originCol - 1) +
          getSequenceLength(">", "v", nextRobot) +
          getSequenceLength("v", "v", nextRobot) * (targetRow - originRow - 1) +
          getSequenceLength("v", "A", nextRobot)
        );
        if (keypad[targetRow][originCol] !== undefined) possibleLengths.push(
          getSequenceLength("A", "v", nextRobot) +
          getSequenceLength("v", "v", nextRobot) * (targetRow - originRow - 1) +
          getSequenceLength("v", ">", nextRobot) +
          getSequenceLength(">", ">", nextRobot) * (targetCol - originCol - 1) +
          getSequenceLength(">", "A", nextRobot)
        );
      } else {
        possibleLengths.push(1);
      }
      cache[cacheKey] = Math.min(...possibleLengths);
    }

    return cache[cacheKey];
  }

  return codes
    .map(code => Number(code.slice(0, -1)) * [...code].reduce((length, button, index) => length + getSequenceLength(code[index - 1] ?? "A", button), 0))
    .reduce((sum, complexity) => sum + complexity, 0);
}

// == ASSERTS ==

console.assert(bothParts(`\
029A
980A
179A
456A
379A`, 2) === 126384);
