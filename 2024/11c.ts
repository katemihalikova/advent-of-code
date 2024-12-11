// == PARTS 1 & 2 ==

function bothParts(input: string, blinks: number): number {
  let stones = new Map(input.split(" ").map(Number).map(stone => [stone, 1]));

  function addStones(stone: number, count: number): void {
    stones.set(stone, (stones.get(stone) ?? 0) + count);
  }

  for (let blink = 1; blink <= blinks; blink++) {
    let prevStones = stones;
    stones = new Map();

    for (let [stone, count] of prevStones) {
      let stoneDigits = Math.floor(Math.log10(stone) + 1);

      if (stone === 0) {
        addStones(1, count);
      } else if (stoneDigits % 2 === 0) {
        let divisor = 10 ** (stoneDigits / 2);
        addStones(Math.floor(stone / divisor), count);
        addStones(stone % divisor, count);
      } else {
        addStones(stone * 2024, count);
      }
    }
  }

  return [...stones.values()].reduce((sum, stoneCount) => sum + stoneCount, 0);
}

// == ASSERTS ==

console.assert(bothParts("0 1 10 99 999", 1) === 7);
console.assert(bothParts("125 17", 1) === 3);
console.assert(bothParts("125 17", 2) === 4);
console.assert(bothParts("125 17", 3) === 5);
console.assert(bothParts("125 17", 4) === 9);
console.assert(bothParts("125 17", 5) === 13);
console.assert(bothParts("125 17", 6) === 22);
console.assert(bothParts("125 17", 25) === 55312);
