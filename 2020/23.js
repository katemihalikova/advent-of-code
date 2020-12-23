// == SHARED ==

class LinkedList {
  constructor(firstValue) {
    let node = {value: firstValue};
    this.head = node;
    node.prev = node;
    node.next = node;
    this.length = 1;
    this.lookupMap = {
      [firstValue]: node,
    };
  }

  addAfter(prevNode, value) {
    let node = {value, prev: prevNode, next: prevNode.next};
    this.lookupMap[value] = node;
    this.length++;
    prevNode.next.prev = node;
    prevNode.next = node;
    return node;
  }

  addTail(value) {
    return this.addAfter(this.head.prev, value);
  }

  remove(node) {
    if (node === this.head) this.head = node.next;
    [node.prev.next, node.next.prev] = [node.next, node.prev];
    delete this.lookupMap[node.value];
    this.length--;
    return node.next;
  }
}

// == PART 1 ==

function part1(input, rounds = 100) {
  input = input.split("").map(Number);

  let cupCircle = new LinkedList(input[0]);
  input.slice(1).forEach(cup => cupCircle.addTail(cup));

  let currentCup = cupCircle.head;
  let numberOfCups = cupCircle.length;

  for (let round = 1; round <= rounds; round++) {
    let pickedCups = [
      currentCup.next,
      currentCup.next.next,
      currentCup.next.next.next,
    ];
    pickedCups.forEach(cup => cupCircle.remove(cup));

    let destinationCup;
    for (let i = 1; destinationCup === undefined; i++) {
      let destinationCupNumber = currentCup.value - i;
      if (destinationCupNumber <= 0) destinationCupNumber += numberOfCups;
      destinationCup = cupCircle.lookupMap[destinationCupNumber];
    }

    pickedCups.reverse().forEach(cup => cupCircle.addAfter(destinationCup, cup.value));

    currentCup = currentCup.next;
  }

  let node = cupCircle.lookupMap[1].next;
  let output = "";

  while (node.value !== 1) {
    output += node.value;
    node = node.next;
  }

  return output;
}

// == PART 2 ==

function part2(input) {
  input = input.split("").map(Number);

  let cupCircle = new LinkedList(input[0]);
  input.slice(1).forEach(cup => cupCircle.addTail(cup));
  for (let cup = input.length + 1; cup <= 1_000_000; cup++) cupCircle.addTail(cup);

  let currentCup = cupCircle.head;
  let numberOfCups = cupCircle.length;

  for (let round = 1; round <= 10_000_000; round++) {
    let pickedCups = [
      currentCup.next,
      currentCup.next.next,
      currentCup.next.next.next,
    ];
    pickedCups.forEach(cup => cupCircle.remove(cup));

    let destinationCup;
    for (let i = 1; destinationCup === undefined; i++) {
      let destinationCupNumber = currentCup.value - i;
      if (destinationCupNumber <= 0) destinationCupNumber += numberOfCups;
      destinationCup = cupCircle.lookupMap[destinationCupNumber];
    }

    pickedCups.reverse().forEach(cup => cupCircle.addAfter(destinationCup, cup.value));

    currentCup = currentCup.next;
  }

  let cupOne = cupCircle.lookupMap[1];
  return cupOne.next.value * cupOne.next.next.value;
}

// == ASSERTS ==

console.assert(part1("389125467", 10) === "92658374");
console.assert(part1("389125467") === "67384529");

console.assert(part2("389125467") === 149245887792);
