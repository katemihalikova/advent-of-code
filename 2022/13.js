// == SHARED ==

function checkOrder(left, right) {
  if (Array.isArray(left) && !Array.isArray(right)) {
    right = [right];
  } else if (!Array.isArray(left) && Array.isArray(right)) {
    left = [left];
  }

  if (Array.isArray(left)) {
    for (let i = 0;; i++) {
      if (i === left.length && i === right.length) {
        return "undecided";
      } else if (i === left.length) {
        return "right";
      } else if (i === right.length) {
        return "wrong";
      } else {
        let res = checkOrder(left[i], right[i])
        if (res === "undecided") continue;
        return res;
      }
    }
  } else {
    if (left === right) return "undecided";
    else if (left < right) return "right";
    else return "wrong";
  }
}

// == PART 1 ==

function part1(input) {
  return input
    .split("\n\n")
    .map(line => line.split("\n").map(JSON.parse))

    .reduce((acc, [left, right], i) => {
      if (checkOrder(left, right) === "right") {
        acc += i + 1;
      }
      return acc;
    }, 0);
}

// == PART 2 ==

function part2(input) {
  input = input
    .split(/\n+/)
    .map(JSON.parse)
    .concat([[[2]], [[6]]])

    .sort((left, right) => checkOrder(left, right) === "wrong" ? 1 : -1);

  let divider1 = input.findIndex(packet => packet.length === 1 && packet[0].length === 1 && packet[0][0] === 2) + 1;
  let divider2 = input.findIndex(packet => packet.length === 1 && packet[0].length === 1 && packet[0][0] === 6) + 1;
  return divider1 * divider2;
}

// == ASSERTS ==

console.assert(checkOrder([1,1,3,1,1], [1,1,5,1,1]) === "right");
console.assert(checkOrder([[1],[2,3,4]], [[1],4]) === "right");
console.assert(checkOrder([9], [[8,7,6]]) === "wrong");
console.assert(checkOrder([[4,4],4,4], [[4,4],4,4,4]) === "right");
console.assert(checkOrder([7,7,7,7], [7,7,7]) === "wrong");
console.assert(checkOrder([], [3]) === "right");
console.assert(checkOrder([[[]]], [[]]) === "wrong");
console.assert(checkOrder([1,[2,[3,[4,[5,6,7]]]],8,9], [1,[2,[3,[4,[5,6,0]]]],8,9]) === "wrong");

console.assert(part1(
`[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`) === 13);

console.assert(part2(
`[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`) === 140);
