// == PART 1 ==

function part1(players, turns) {
  class LinkedList {
    constructor(value) {
      let node = {value};
      this.head = node;
      node.prev = node;
      node.next = node;
      this.length = 1;
    }

    addAfter(prevNode, value) {
      let node = {value, prev: prevNode, next: prevNode.next};
      this.length++;
      prevNode.next.prev = node;
      prevNode.next = node;
      return node;
    }

    remove(node) {
      if (node === this.head) this.head = node.next;
      [node.prev.next, node.next.prev] = [node.next, node.prev];
      this.length--;
      return node.next;
    }
  }

  let marbles = new LinkedList(0);
  let points = {};
  let currentMarble = marbles.head;

  for (let i = 1; i <= turns; i++) {
    if (i % 23 === 0) {
      currentMarble = currentMarble.prev.prev.prev.prev.prev.prev.prev;

      points[i % players] = points[i % players] || 0;
      points[i % players] += i;
      points[i % players] += currentMarble.value;

      currentMarble = marbles.remove(currentMarble);
    } else {
      currentMarble = marbles.addAfter(currentMarble.next, i);
    }
  }

  return Math.max(...Object.values(points));
}

// == PART 2 ==

function part2(players, turns) {
  return part1(players, turns * 100);
}

// == ASSERTS ==

console.assert(part1(9, 25) === 32);
console.assert(part1(10, 1618) === 8317);
console.assert(part1(13, 7999) === 146373);
console.assert(part1(17, 1104) === 2764);
console.assert(part1(21, 6111) === 54718);
console.assert(part1(30, 5807) === 37305);

console.assert(part2(13, 80) === 146373);
console.assert(part2(21, 61) === 54718);
console.assert(part2(30, 58) === 37305);
