// == CLASSES ==

class SnailfishNumber {
  left;
  right;
  #regular;

  isPair = false;
  get isRegular() {
    return !this.isPair;
  }

  constructor(input, parent = undefined) {
    if (input instanceof SnailfishNumber) {
      input.parent = parent;
      return input;
    }

    if (typeof input === "string") {
      input = eval(input);
    }

    if (Array.isArray(input)) {
      this.isPair = true;
      [this.left, this.right] = input.map(number => new SnailfishNumber(number, this));
    } else {
      this.#regular = Number(input);
    }

    this.parent = parent;
  }

  explode(depth = 1) {
    if (this.isRegular) return false;
    if (depth >= 5 && this.left.isRegular && this.right.isRegular) {
      let newNumber = new SnailfishNumber(0);
      this.replaceItself(newNumber);
  
      newNumber.findRegularNumberOnLeft()?.add(this.left);
      newNumber.findRegularNumberOnRight()?.add(this.right);
  
      return true;
    }
    return this.left.explode(depth + 1) || this.right.explode(depth + 1);
  }
  
  split() {
    if (this.isRegular) {
      if (this < 10) return false;
      let newNumber = new SnailfishNumber([Math.floor(this / 2), Math.ceil(this / 2)]);
      this.replaceItself(newNumber);
  
      return true;
    }
    return this.left.split() || this.right.split();
  }  

  replaceItself(number) {
    number.parent = this.parent;
    if (this.parent.left === this) {
      this.parent.left = number;
    } else {
      this.parent.right = number;
    }
    return number;
  }

  add(number) {
    this.#regular += number;
  }

  findRegularNumberOnLeft() {
    let number = this;

    while (true) {
      if (number.parent === undefined) return undefined;
      let cameFromRight = number.parent.right === number;
      number = number.parent;
      if (cameFromRight) break;
    }

    number = number.left;

    while (number.isPair) {
      number = number.right;
    }

    return number;
  }

  findRegularNumberOnRight() {
    let number = this;

    while (true) {
      if (number.parent === undefined) return undefined;
      let cameFromLeft = number.parent.left === number;
      number = number.parent;
      if (cameFromLeft) break;
    }

    number = number.right;

    while (number.isPair) {
      number = number.left;
    }

    return number;
  }

  getMagnitude() {
    if (this.isRegular) return this.#regular;
    else return 3 * this.left.getMagnitude() + 2 * this.right.getMagnitude();
  }

  valueOf() {
    return this.#regular;
  }

  toString() {
    if (this.isRegular) return String(this.#regular);
    else return `[${this.left.toString()},${this.right.toString()}]`;
  }
}

// == SHARED ==

function sumSnailfishNumbers(a, b) {
  let number = new SnailfishNumber([a, b]);
  original = number;

  while (true) {
    if (number.explode()) continue;
    if (number.split()) continue;
    break;
  }

  return number;
}

// == PART 1 ==

function part1(input) {
  return input.split("\n").reduce(sumSnailfishNumbers).getMagnitude();
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n");

  let maxMagnitude = -Infinity;

  for (let left of input) {
    for (let right of input) {
      if (left === right) continue;

      let magnitude = sumSnailfishNumbers(left, right).getMagnitude();
      if (magnitude > maxMagnitude) maxMagnitude = magnitude;
    }
  }

  return maxMagnitude;
}

// == ASSERTS ==

let explodeHelper = input => {
  let number = new SnailfishNumber(input);
  number.explode();
  return number.toString();
};
console.assert(explodeHelper("[[[[[9,8],1],2],3],4]") === "[[[[0,9],2],3],4]");
console.assert(explodeHelper("[7,[6,[5,[4,[3,2]]]]]") === "[7,[6,[5,[7,0]]]]");
console.assert(explodeHelper("[[6,[5,[4,[3,2]]]],1]") === "[[6,[5,[7,0]]],3]");
console.assert(explodeHelper("[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]") === "[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]");
console.assert(explodeHelper("[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]") === "[[3,[2,[8,0]]],[9,[5,[7,0]]]]");

let splitHelper = input => {
  let number = new SnailfishNumber(input);
  number.split();
  return number.toString();
};
console.assert(splitHelper("[10,0]") === "[[5,5],0]");
console.assert(splitHelper("[11,0]") === "[[5,6],0]");
console.assert(splitHelper("[12,0]") === "[[6,6],0]");

console.assert(sumSnailfishNumbers("[1,2]", "[[3,4],5]").toString() === "[[1,2],[[3,4],5]]");
console.assert(sumSnailfishNumbers("[[[[4,3],4],4],[7,[[8,4],9]]]", "[1,1]").toString() === "[[[[0,7],4],[[7,8],[6,0]]],[8,1]]");

console.assert(["[1,1]", "[2,2]", "[3,3]", "[4,4]"].reduce(sumSnailfishNumbers).toString() === "[[[[1,1],[2,2]],[3,3]],[4,4]]");
console.assert(["[1,1]", "[2,2]", "[3,3]", "[4,4]", "[5,5]"].reduce(sumSnailfishNumbers).toString() === "[[[[3,0],[5,3]],[4,4]],[5,5]]");
console.assert(["[1,1]", "[2,2]", "[3,3]", "[4,4]", "[5,5]", "[6,6]"].reduce(sumSnailfishNumbers).toString() === "[[[[5,0],[7,4]],[5,5]],[6,6]]");
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
].reduce(sumSnailfishNumbers).toString() === "[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]");

console.assert(new SnailfishNumber("[9,1]").getMagnitude() === 29);
console.assert(new SnailfishNumber("[1,9]").getMagnitude() === 21);
console.assert(new SnailfishNumber("[[9,1],[1,9]]").getMagnitude() === 129);
console.assert(new SnailfishNumber("[[1,2],[[3,4],5]]").getMagnitude() === 143);
console.assert(new SnailfishNumber("[[[[0,7],4],[[7,8],[6,0]]],[8,1]]").getMagnitude() === 1384);
console.assert(new SnailfishNumber("[[[[1,1],[2,2]],[3,3]],[4,4]]").getMagnitude() === 445);
console.assert(new SnailfishNumber("[[[[3,0],[5,3]],[4,4]],[5,5]]").getMagnitude() === 791);
console.assert(new SnailfishNumber("[[[[5,0],[7,4]],[5,5]],[6,6]]").getMagnitude() === 1137);
console.assert(new SnailfishNumber("[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]").getMagnitude() === 3488);

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
