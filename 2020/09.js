// == PART 1 ==

function part1(input, preambleLength = 25) {
  input = input.split("\n").map(Number);

  for (let i = preambleLength; i < input.length; i++) {
    let number = input[i];
    let valid = false;
    let previousNumbers = input.slice(i - preambleLength, i);

    findSum: for (let a of previousNumbers) {
      for (let b of previousNumbers.filter(b => b !== a)) {
        if (a + b === number) {
          valid = true;
          break findSum;
        }
      }
    }

    if (!valid) return number;
  }
}

// == PART 2 ==

function part2(input, pr = 25) {
  let invalidNumber = part1(input, pr);

  input = input.split("\n").map(Number);

  let sum = 0;
  let numbers = [];

  for (let i = 0; i < input.length; i++) {
    let number = input[i];
    
    sum += number;
    numbers.push(number);

    if (sum === invalidNumber && numbers.length > 1) return Math.min(...numbers) + Math.max(...numbers);
    if (sum > invalidNumber) {
      i -= numbers.length - 1;
      sum = 0;
      numbers = [];
    }
  }
}

// == ASSERTS ==

console.assert(part1("20\n22\n24\n4\n3\n17\n14\n11\n5\n8\n9\n1\n6\n2\n13\n7\n15\n18\n23\n19\n16\n25\n21\n10\n12\n26") === undefined);
console.assert(part1("20\n22\n24\n4\n3\n17\n14\n11\n5\n8\n9\n1\n6\n2\n13\n7\n15\n18\n23\n19\n16\n25\n21\n10\n12\n49") === undefined);
console.assert(part1("20\n22\n24\n4\n3\n17\n14\n11\n5\n8\n9\n1\n6\n2\n13\n7\n15\n18\n23\n19\n16\n25\n21\n10\n12\n100") === 100);
console.assert(part1("20\n22\n24\n4\n3\n17\n14\n11\n5\n8\n9\n1\n6\n2\n13\n7\n15\n18\n23\n19\n16\n25\n21\n10\n12\n50") === 50);

console.assert(part1("20\n22\n24\n4\n3\n17\n14\n11\n5\n8\n9\n1\n6\n2\n13\n7\n15\n18\n23\n19\n16\n25\n21\n10\n12\n45\n26") === undefined);
console.assert(part1("20\n22\n24\n4\n3\n17\n14\n11\n5\n8\n9\n1\n6\n2\n13\n7\n15\n18\n23\n19\n16\n25\n21\n10\n12\n45\n65") === 65);
console.assert(part1("20\n22\n24\n4\n3\n17\n14\n11\n5\n8\n9\n1\n6\n2\n13\n7\n15\n18\n23\n19\n16\n25\n21\n10\n12\n45\n64") === undefined);
console.assert(part1("20\n22\n24\n4\n3\n17\n14\n11\n5\n8\n9\n1\n6\n2\n13\n7\n15\n18\n23\n19\n16\n25\n21\n10\n12\n45\n66") === undefined);

console.assert(part1("35\n20\n15\n25\n47\n40\n62\n55\n65\n95\n102\n117\n150\n182\n127\n219\n299\n277\n309\n576", 5) === 127);

console.assert(part2("35\n20\n15\n25\n47\n40\n62\n55\n65\n95\n102\n117\n150\n182\n127\n219\n299\n277\n309\n576", 5) === 62);
