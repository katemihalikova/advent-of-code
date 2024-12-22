// == SHARED ==

function calculateNextSecretNumber(secretNumber: number): number {
  secretNumber = (((secretNumber * 64) ^ secretNumber) >>> 0) % 16777216;
  secretNumber = ((Math.floor(secretNumber / 32) ^ secretNumber) >>> 0) % 16777216;
  secretNumber = (((secretNumber * 2048) ^ secretNumber) >>> 0) % 16777216;
  return secretNumber;
}

// == PART 1 ==

function part1(input: string): number {
  let secretNumbers = input
    .split("\n")
    .map(Number);

  for (let step = 1; step <= 2000; step++) {
    secretNumbers = secretNumbers.map(calculateNextSecretNumber);
  }

  return secretNumbers.reduce((sum, secretNumber) => sum + secretNumber, 0);
}

// == PART 2 ==

function part2(input: string): number {
  let secretNumbers = input
    .split("\n")
    .map(Number);

  let prices: number[][] = secretNumbers.map(secretNumber => [secretNumber % 10]);
  let diffs: number[][] = secretNumbers.map(() => []);

  for (let step = 0; step <= 2000; step++) {
    secretNumbers = secretNumbers.map((prevSecretNumber, buyerIndex) => {
      let newSecretNumber = calculateNextSecretNumber(prevSecretNumber)
      prices[buyerIndex].push(newSecretNumber % 10);
      diffs[buyerIndex].push((newSecretNumber % 10) - (prevSecretNumber % 10));
      return newSecretNumber;
    })
  }

  let bananasPerSequence: Record<string, number> = {};
  
  diffs.forEach((buyerDiffs, buyerIndex) => {
    let seenSequences = new Set();
    buyerDiffs.slice(0, -4).forEach((_, step) => {
      let sequence = buyerDiffs.slice(step, step + 4).join(",");
      if (!seenSequences.has(sequence)) {
        seenSequences.add(sequence);
        bananasPerSequence[sequence] = bananasPerSequence[sequence] ?? 0;
        bananasPerSequence[sequence] += prices[buyerIndex][step + 4];
      }
    });
  });

  return Object.values(bananasPerSequence).reduce((max, bananas) => Math.max(max, bananas), -Infinity);
}

// == ASSERTS ==

console.assert(part1(`\
1
10
100
2024`) === 37327623);

console.assert(part2(`\
1
2
3
2024`) === 23);
