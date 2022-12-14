// == SHARED ==

function checkOrder(leftPacket, rightPacket) {
  while (true) {
    let left = leftPacket.match(/^(?:\d+|\D)/)[0];
    let right = rightPacket.match(/^(?:\d+|\D)/)[0];

    if (left === right) {
      leftPacket = leftPacket.slice(left.length);
      rightPacket = rightPacket.slice(right.length);
      continue;
    }

    if (Number(left) < Number(right)) return "right";
    if (Number(left) > Number(right)) return "wrong";

    if (left === "]" && right !== "]") return "right";
    if (left !== "]" && right === "]") return "wrong";

    if (left === "[") {
      rightPacket = rightPacket.replace(/^(\d+)/, "[$1]");
    } else if (right === "[") {
      leftPacket = leftPacket.replace(/^(\d+)/, "[$1]");
    }
  }
}

// == PART 1 ==

function part1(input) {
  return input
    .split("\n\n")
    .map(line => line.split("\n"))

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
    .concat(["[[2]]", "[[6]]"])

    .sort((left, right) => checkOrder(left, right) === "wrong" ? 1 : -1);

  return (input.indexOf("[[2]]") + 1) * (input.indexOf("[[6]]") + 1);
}

// == ASSERTS ==

console.assert(checkOrder("[1,1,3,1,1]", "[1,1,5,1,1]") === "right");
console.assert(checkOrder("[[1],[2,3,4]]", "[[1],4]") === "right");
console.assert(checkOrder("[9]", "[[8,7,6]]") === "wrong");
console.assert(checkOrder("[[4,4],4,4]", "[[4,4],4,4,4]") === "right");
console.assert(checkOrder("[7,7,7,7]", "[7,7,7]") === "wrong");
console.assert(checkOrder("[]", "[3]") === "right");
console.assert(checkOrder("[[[]]]", "[[]]") === "wrong");
console.assert(checkOrder("[1,[2,[3,[4,[5,6,7]]]],8,9]", "[1,[2,[3,[4,[5,6,0]]]],8,9]") === "wrong");

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
