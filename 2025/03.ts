// == PARTS 1 & 2 ==

function bothParts(input: string, batteries: 2 | 12): number {
  let banks = input.split("\n").map(line => line.split(""));
  let jumpsAllowed = banks[0].length - batteries;

  return banks
    .map(bank => {
      let joltage = "";
      let jumpsLeft = jumpsAllowed;
      for (let i = 0; i < bank.length; i++) {
        let subbank = bank.slice(i, i + jumpsLeft + 1);
        let maxBattery = subbank.toSorted().at(-1)!;
        let jumps = subbank.indexOf(maxBattery);

        joltage += maxBattery;
        i += jumps;
        jumpsLeft -= jumps;

        if (joltage.length === batteries) break;
      }
      return joltage;
    })
    .map(Number)
    .reduce((sum, joltage) => sum + joltage, 0);
}

// == ASSERTS ==

console.assert(bothParts(`\
987654321111111
811111111111119
234234234234278
818181911112111`, 2) === 357);

console.assert(bothParts(`\
987654321111111
811111111111119
234234234234278
818181911112111`, 12) === 3121910778619);
