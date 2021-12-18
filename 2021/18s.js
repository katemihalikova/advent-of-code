// == SHARED ==

function sumSnailfishNumbers(a, b) {
  let number = `[${a},${b}]`;

  outer: while (true) {
    let prevPos;
    let depth = 0;

    for (let i = 0; i < number.length; i++) {
      if (number[i] === "[") depth++;
      if (number[i] === "]") depth--;

      if (/^\D\d+/.test(number.slice(i - 1))) prevPos = i;

      let isRegularPair = /^\[\d+,\d+]/.test(number.slice(i));

      if (depth >= 5 && isRegularPair) { // regular pair explodes

        let left = number.slice(i + 1).match(/\d+/)[0];
        let right = number.slice(i + 2 + left.length).match(/\d+/)[0];

        // replace next number, if any
        let nextMatch = number.slice(i + 2 + left.length + right.length).match(/\d+/);
        if (nextMatch) {
          let newNext = Number(nextMatch[0]) + Number(right);
          number = number.slice(0, i + 2 + left.length + right.length + nextMatch.index)
            + newNext
            + number.slice(i + 2 + left.length + right.length + nextMatch.index + nextMatch[0].length);
        }
        
        // replace exploded pair with zero
        number = number.slice(0, i) + "0" + number.slice(i + 3 + left.length + right.length);

        // replace previous number, if any
        if (prevPos !== undefined) {
          let oldPrevious = number.slice(prevPos).match(/\d+/)[0];
          let newPrevious = Number(oldPrevious) + Number(left);
          number = number.slice(0, prevPos)
            + newPrevious
            + number.slice(prevPos+oldPrevious.length);
        }

        continue outer;
      }
    }

    let splitMatch = number.match(/\d{2,}/);
    if (splitMatch) { // regular number splits
      let old = Number(splitMatch[0]);
      number = number.slice(0, splitMatch.index)
        + `[${Math.floor(old / 2)},${Math.ceil(old / 2)}]`
        + number.slice(splitMatch.index + splitMatch[0].length);

      continue;
    }

    break;
  }

  return number;
}

// using RegExp
function getSnailfishMagnitude(number) {
  while (number[0] === "[") {
    number = number.replace(/\[(\d+),(\d+)]/, (_, left, right) => 3 * Number(left) + 2 * Number(right));
  }
  return Number(number);
}

// // using eval
// function getSnailfishMagnitude(number) {
//   if (typeof number === "string") number = eval(number);
//   if (Array.isArray(number)) return 3 * getSnailfishMagnitude(number[0]) + 2 * getSnailfishMagnitude(number[1]);
//   return number;
// }

// == PART 1 ==

function part1(input) {
  input = input.split("\n");

  let sum = input.reduce(sumSnailfishNumbers);
  return getSnailfishMagnitude(sum);
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n");

  let maxMagnitude = -Infinity;

  for (let left of input) {
    for (let right of input) {
      if (left === right) continue;

      let magnitude = getSnailfishMagnitude(sumSnailfishNumbers(left, right));
      if (magnitude > maxMagnitude) maxMagnitude = magnitude;
    }
  }

  return maxMagnitude;
}

// == ASSERTS ==

console.assert(sumSnailfishNumbers("[1,2]", "[[3,4],5]") === "[[1,2],[[3,4],5]]");
console.assert(sumSnailfishNumbers("[[[[4,3],4],4],[7,[[8,4],9]]]", "[1,1]") === "[[[[0,7],4],[[7,8],[6,0]]],[8,1]]");

console.assert(["[1,1]", "[2,2]", "[3,3]", "[4,4]"].reduce(sumSnailfishNumbers) === "[[[[1,1],[2,2]],[3,3]],[4,4]]");
console.assert(["[1,1]", "[2,2]", "[3,3]", "[4,4]", "[5,5]"].reduce(sumSnailfishNumbers) === "[[[[3,0],[5,3]],[4,4]],[5,5]]");
console.assert(["[1,1]", "[2,2]", "[3,3]", "[4,4]", "[5,5]", "[6,6]"].reduce(sumSnailfishNumbers) === "[[[[5,0],[7,4]],[5,5]],[6,6]]");
console.assert([
  "[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]",
  "[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]",
  "[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]",
  "[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]",
  "[7,[5,[[3,8],[1,4]]]]",
  "[[2,[2,2]],[8,[8,1]]]",
  "[2,9]",
  "[1,[[[9,3],9],[[9,0],[0,7]]]]",
  "[[[5,[7,4]],7],1]",
  "[[[[4,2],2],6],[8,7]]",
].reduce(sumSnailfishNumbers) === "[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]");

console.assert(getSnailfishMagnitude("[9,1]") === 29);
console.assert(getSnailfishMagnitude("[1,9]") === 21);
console.assert(getSnailfishMagnitude("[[9,1],[1,9]]") === 129);
console.assert(getSnailfishMagnitude("[[1,2],[[3,4],5]]") === 143);
console.assert(getSnailfishMagnitude("[[[[0,7],4],[[7,8],[6,0]]],[8,1]]") === 1384);
console.assert(getSnailfishMagnitude("[[[[1,1],[2,2]],[3,3]],[4,4]]") === 445);
console.assert(getSnailfishMagnitude("[[[[3,0],[5,3]],[4,4]],[5,5]]") === 791);
console.assert(getSnailfishMagnitude("[[[[5,0],[7,4]],[5,5]],[6,6]]") === 1137);
console.assert(getSnailfishMagnitude("[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]") === 3488);

console.assert(part1(`[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`) === 4140);

console.assert(part2(`[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`) === 3993);
