// == PART 1 ==

function part1(input) {
  let buffer = [0];
  let position = 0;

  for (let newValue = 1; newValue <= 2017; newValue++) {
    position = ((position + input) % buffer.length) + 1;
    buffer.splice(position, 0, newValue);
  }

  return buffer[position + 1];
}

// == PART 2 ==

function part2(input) {
  let position = 0;
  let valueAfterZero = 0;

  for (let newValue = 1; newValue <= 50e6; newValue++) {
    position = ((position + input) % newValue) + 1;
    if (position === 1) valueAfterZero = newValue;
  }

  return valueAfterZero;
}

// == ASSERTS ==

console.assert(part1(3) === 638);

console.assert(part2(3) === 1222153);
