// == SHARED ==

function holidayAsciiStringHelper(string) {
  let currentValue = 0;

  for (let char of string) {
    currentValue += char.codePointAt(0);
    currentValue *= 17;
    currentValue %= 256;
  }

  return currentValue;
}

// == PART 1 ==

function part1(input) {
  return input
    .split(",")
    .map(holidayAsciiStringHelper)
    .reduce((sum, n) => sum + n, 0);
}

// == PART 2 ==

function part2(input) {
  let initializationSequence = input
    .split(",")
    .map(line => {
      let [, label, operation, focalLength] = line.match(/^(\w+)([-=])(\d+)?$/);
      focalLength = Number(focalLength);
      return {label, operation, focalLength};
    });

  let boxes = Array(256).fill().map(() => ({}));

  for (let {label, operation, focalLength} of initializationSequence) {
    let box = holidayAsciiStringHelper(label);
    if (operation === "-") {
      delete boxes[box][label];
    } else {
      boxes[box][label] = focalLength;
    }
  }

  return boxes
    .flatMap((box, boxNumber) => Object.values(box).map((focalLength, slotNumber) => (boxNumber + 1) * (slotNumber + 1) * focalLength))
    .reduce((sum, n) => sum + n, 0);
}

// == ASSERTS ==

console.assert(holidayAsciiStringHelper("HASH") === 52);
console.assert(holidayAsciiStringHelper("rn=1") === 30);
console.assert(holidayAsciiStringHelper("cm-") === 253);
console.assert(holidayAsciiStringHelper("qp=3") === 97);
console.assert(holidayAsciiStringHelper("cm=2") === 47);
console.assert(holidayAsciiStringHelper("qp-") === 14);
console.assert(holidayAsciiStringHelper("pc=4") === 180);
console.assert(holidayAsciiStringHelper("ot=9") === 9);
console.assert(holidayAsciiStringHelper("ab=5") === 197);
console.assert(holidayAsciiStringHelper("pc-") === 48);
console.assert(holidayAsciiStringHelper("pc=6") === 214);
console.assert(holidayAsciiStringHelper("ot=7") === 231);

console.assert(part1("rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7") === 1320);

console.assert(part2("rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7") === 145);
