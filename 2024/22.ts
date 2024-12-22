// == SHARED ==

function calculateNextSecretNumber(secretNumber: number): number {
  secretNumber = (((secretNumber * 64) ^ secretNumber) >>> 0) % 16777216;
  secretNumber = ((Math.floor(secretNumber / 32) ^ secretNumber) >>> 0) % 16777216;
  secretNumber = (((secretNumber * 2048) ^ secretNumber) >>> 0) % 16777216;
  return secretNumber;
}

// Alternative implementations
function calculateNextSecretNumber_alt1(secretNumber: number): number {
  secretNumber = ((secretNumber << 6) ^ secretNumber) & 0xffffff;
  secretNumber = ((secretNumber >> 5) ^ secretNumber) & 0xffffff;
  secretNumber = ((secretNumber << 11) ^ secretNumber) & 0xffffff;
  return secretNumber;
}

function calculateNextSecretNumber_alt2(secretNumber: number): number {
  return 0x7ff & (secretNumber << 6)
    ^ 0x7ffff & (secretNumber << 1 ^ secretNumber >> 5)
    ^ 0xffffff & (secretNumber ^ secretNumber << 11 ^ secretNumber << 12 ^ secretNumber << 17);
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

console.assert(calculateNextSecretNumber(123) === 15887950);
console.assert(calculateNextSecretNumber(15887950) === 16495136);
console.assert(calculateNextSecretNumber(16495136) === 527345);
console.assert(calculateNextSecretNumber(527345) === 704524);
console.assert(calculateNextSecretNumber(704524) === 1553684);
console.assert(calculateNextSecretNumber(1553684) === 12683156);
console.assert(calculateNextSecretNumber(12683156) === 11100544);
console.assert(calculateNextSecretNumber(11100544) === 12249484);
console.assert(calculateNextSecretNumber(12249484) === 7753432);
console.assert(calculateNextSecretNumber(7753432) === 5908254);

console.assert(calculateNextSecretNumber_alt1(123) === 15887950);
console.assert(calculateNextSecretNumber_alt1(15887950) === 16495136);
console.assert(calculateNextSecretNumber_alt1(16495136) === 527345);
console.assert(calculateNextSecretNumber_alt1(527345) === 704524);
console.assert(calculateNextSecretNumber_alt1(704524) === 1553684);
console.assert(calculateNextSecretNumber_alt1(1553684) === 12683156);
console.assert(calculateNextSecretNumber_alt1(12683156) === 11100544);
console.assert(calculateNextSecretNumber_alt1(11100544) === 12249484);
console.assert(calculateNextSecretNumber_alt1(12249484) === 7753432);
console.assert(calculateNextSecretNumber_alt1(7753432) === 5908254);

console.assert(calculateNextSecretNumber_alt2(123) === 15887950);
console.assert(calculateNextSecretNumber_alt2(15887950) === 16495136);
console.assert(calculateNextSecretNumber_alt2(16495136) === 527345);
console.assert(calculateNextSecretNumber_alt2(527345) === 704524);
console.assert(calculateNextSecretNumber_alt2(704524) === 1553684);
console.assert(calculateNextSecretNumber_alt2(1553684) === 12683156);
console.assert(calculateNextSecretNumber_alt2(12683156) === 11100544);
console.assert(calculateNextSecretNumber_alt2(11100544) === 12249484);
console.assert(calculateNextSecretNumber_alt2(12249484) === 7753432);
console.assert(calculateNextSecretNumber_alt2(7753432) === 5908254);

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
