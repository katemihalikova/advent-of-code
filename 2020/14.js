// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(line => {
    let [, mask, address, value] = line.match(/^(?:mask = ([X01]+)|mem\[(\d+)\] = (\d+))$/);
    address = Number(address);
    value = Number(value);
    return {mask, address, value};
  });

  let memory = {};
  let activeMask;

  input.forEach(({mask, address, value}) => {
    if (mask) {
      activeMask = mask;
    } else {
      let maskedValue = value
        .toString(2)
        .padStart(36, "0")
        .split("")
        .map((bit, i) => {
          let maskBit = activeMask[i];
          if (maskBit === "X") return bit;
          else return maskBit;
        })
        .join("");
      memory[address] = parseInt(maskedValue, 2);
    }
  });

  return Object.values(memory).reduce((a, b) => a + b);
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(line => {
    let [, mask, address, value] = line.match(/^(?:mask = ([X01]+)|mem\[(\d+)\] = (\d+))$/);
    address = Number(address);
    value = Number(value);
    return {mask, address, value};
  });

  function replaceFloatingBits(value) {
    if (value.indexOf("X") === -1) return [value];
    return [
      ...replaceFloatingBits(value.replace("X", "0")),
      ...replaceFloatingBits(value.replace("X", "1")),
    ];
  }

  let memory = {};
  let activeMask;

  input.forEach(({mask, address, value}) => {
    if (mask) {
      activeMask = mask;
    } else {
      let maskedAddress = address
        .toString(2)
        .padStart(36, "0")
        .split("")
        .map((bit, i) => {
          let maskBit = activeMask[i];
          if (maskBit === "0") return bit;
          else return maskBit;
        })
        .join("");

      replaceFloatingBits(maskedAddress)
        .map(address => parseInt(address, 2))
        .forEach(address => memory[address] = value);
    }
  });

  return Object.values(memory).reduce((a, b) => a + b);
}

// == ASSERTS ==

console.assert(part1(
`mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`
) === 165);
console.assert(part2(
`mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`
) === 208);
