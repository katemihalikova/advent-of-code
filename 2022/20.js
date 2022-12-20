// == SHARED ==

class LinkedList {
  constructor(values) {
    let [firstValue, ...otherValues] = values;
    let node = {value: firstValue};
    this.tail = node;
    node.prev = node;
    node.next = node;
    this.nodes = [node];
    this.length = 1;

    for (let value of otherValues) {
      this.addTail(value);
    }
  }

  addTail(value) {
    let node = {value, prev: this.tail, next: this.tail.next};
    this.length++;
    this.tail.next.prev = node;
    this.tail.next = node;
    this.tail = node;
    this.nodes.push(node);
    return node;
  }

  swapWithNext(node) {
    let swap = node.next;

    node.next = swap.next;
    swap.prev = node.prev;

    swap.next.prev = node;
    swap.next = node;

    node.prev.next = swap;
    node.prev = swap;
  }

  swapWithPrev(node) {
    let swap = node.prev;

    node.prev = swap.prev;
    swap.next = node.next;

    swap.prev.next = node;
    swap.prev = node;

    node.next.prev = swap;
    node.next = swap;
  }
}

function mixFile(file) {
  for (let node of file.nodes) {
    let number = node.value;
    let moves = Math.abs(number) % (file.length - 1);

    for (let move = 0; move < moves; move++) {
      if (number > 0) file.swapWithNext(node);
      else file.swapWithPrev(node);
    }
  }
}

function getCoords(file) {
  let node = file.nodes.find(e => e.value === 0);
  let coords = 0;

  for (let move = 1; move <= 3000; move++) {
    node = node.next;
    if (move % 1000 === 0) coords += node.value;
  }

  return coords;
}

// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(Number);

  let file = new LinkedList(input);

  mixFile(file);

  return getCoords(file);
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(nr => Number(nr) * 811589153);

  let file = new LinkedList(input);

  for (let round = 1; round <= 10; round++) {
    mixFile(file);
  }

  return getCoords(file);
}

// == ASSERTS ==

console.assert(part1("1\n2\n-3\n3\n-2\n0\n4") === 3);

console.assert(part2("1\n2\n-3\n3\n-2\n0\n4") === 1623178306);
