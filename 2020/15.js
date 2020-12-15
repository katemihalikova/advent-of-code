// == PARTS 1 & 2 ==

function parts1_2(input, part) {
  input = input.split(",").map(Number);

  let history = new Map();
  input.slice(0, -1).forEach((nr, i) => history.set(nr, i + 1));
  let previous = input[input.length - 1];

  for (let i = input.length; i < (part === 1 ? 2020 : 30000000); i++) {
    let next;
    if (!history.has(previous)) {
      next = 0
    } else {
      next = i - history.get(previous);
    }

    history.set(previous, i);
    previous = next;
  }

  return previous;
}

// == ASSERTS ==

console.assert(parts1_2("0,3,6", 1) === 436);
console.assert(parts1_2("1,3,2", 1) === 1);
console.assert(parts1_2("2,1,3", 1) === 10);
console.assert(parts1_2("1,2,3", 1) === 27);
console.assert(parts1_2("2,3,1", 1) === 78);
console.assert(parts1_2("3,2,1", 1) === 438);
console.assert(parts1_2("3,1,2", 1) === 1836);

console.assert(parts1_2("0,3,6", 2) === 175594);
console.assert(parts1_2("1,3,2", 2) === 2578);
console.assert(parts1_2("2,1,3", 2) === 3544142);
console.assert(parts1_2("1,2,3", 2) === 261214);
console.assert(parts1_2("2,3,1", 2) === 6895259);
console.assert(parts1_2("3,2,1", 2) === 18);
console.assert(parts1_2("3,1,2", 2) === 362);
