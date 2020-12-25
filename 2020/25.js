// == PART 1 ==

function part1(input) {
  let [publicKeyA, publicKeyB] = input.split("\n").map(Number);

  let result = 1;
  let iterations = 1;
  for (;; iterations++) {
    result = (result * 7) % 20201227;
    if (result === publicKeyA) break;
  }

  let encryptionKey = 1;
  for (let j = 1; j <= iterations; j++) {
    encryptionKey = (encryptionKey * publicKeyB) % 20201227;
  }

  return encryptionKey;
}

// == PART 2 ==

// Paid the deposit :)

// == ASSERTS ==

console.assert(part1("5764801\n17807724") === 14897079);
console.assert(part1("5764801\n17807724") === 14897079);
