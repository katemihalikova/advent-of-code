// == PARTS 1 & 2 ==

function bothParts(input: string, steps: number): number {
  let cache: Record<number, Record<number, number>> = {};

  function calculateStoneCount(step: number, stone: number): number {
    if (step === steps) return 1;

    let result = cache[step]?.[stone];
    if (result === undefined) {
      let stoneDigits = Math.floor(Math.log10(stone) + 1);

      if (stone === 0) {
        result = calculateStoneCount(step + 1, 1);
      } else if (stoneDigits % 2 === 0) {
        let divisor = 10 ** (stoneDigits / 2);
        result = calculateStoneCount(step + 1, Math.floor(stone / divisor)) + calculateStoneCount(step + 1, stone % divisor);
      } else {
        result = calculateStoneCount(step + 1, stone * 2024);
      }

      cache[step] = cache[step] ?? {};
      cache[step][stone] = result;
    }
    return result;
  }

  return input
    .split(" ")
    .map(Number)
    .map(stone => calculateStoneCount(0, stone))
    .reduce((sum, stoneCount) => sum + stoneCount, 0);
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
