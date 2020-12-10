// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(Number);
  input = [...input, 0, Math.max(...input) + 3].sort((a, b) => a - b);

  let ones = 0;
  let threes = 0;

  for (let i = 1; i < input.length; i++) {
    if (input[i] - input[i - 1] === 1) ones++;
    if (input[i] - input[i - 1] === 3) threes++;
  }

  return ones * threes;
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(Number);
  input = [...input, 0, Math.max(...input) + 3].sort((a, b) => a - b);

  segments = [];

  for (let i = 0; i < input.length;) {
    // all sets considered for combinations are separated by a jump of 3 jolts, there is no 2 jolts jump
    let segment = 1;
    while (input[i + segment] - input[i + segment - 1] === 1) segment++;
    segments.push(segment);
    i += segment;
  }

  let trib = n => n === 0 ? 0 : n < 3 ? 1 : trib(n - 1) + trib(n - 2) + trib(n - 3);

  return segments.map(trib).reduce((a, b) => a * b);
}

// == ASSERTS ==

console.assert(part1("16\n10\n15\n5\n1\n11\n7\n19\n6\n12\n4") === 7 * 5);
console.assert(part1("28\n33\n18\n42\n31\n14\n46\n20\n48\n47\n24\n23\n49\n45\n19\n38\n39\n11\n1\n32\n25\n35\n8\n17\n7\n9\n4\n2\n34\n10\n3") === 22 * 10);

console.assert(part2("16\n10\n15\n5\n1\n11\n7\n19\n6\n12\n4") === 8);
console.assert(part2("28\n33\n18\n42\n31\n14\n46\n20\n48\n47\n24\n23\n49\n45\n19\n38\n39\n11\n1\n32\n25\n35\n8\n17\n7\n9\n4\n2\n34\n10\n3") === 19208);
