// == PART 1 ==

function part1(input) {
  let uncompressed = "";
  while (true) {
    input = input.replace(/^([^(])/, (_, start) => {
      uncompressed += start;
      return "";
    });
    input = input.replace(/^\((\d+)x(\d+)\)(.*)$/g, (_, characters, repetitions, restOfString) => {
      uncompressed += restOfString.substr(0, characters).repeat(repetitions);
      return restOfString.substr(characters);
    });

    if (input.length === 0) return uncompressed.length;
  }
}

// == PART 2 ==

function part2(input) {
  while (true) {
    input = input.replace(/\((\d+)x(\d+)\)(.*)$/, (_, characters, repetitions, restOfString) => {
      let repeated = restOfString.substr(0, characters);
      if (repeated.indexOf("(") < 0) {
        repeated = repeated.length;
      }
      return `+[${repeated}]*${repetitions}${restOfString.substr(characters)}`;
    });

    if (input.indexOf("(") < 0) break;
  }

  input = input.replace(/\[/g, "(").replace(/\]/g, ")").replace(/([A-Z]+)/g, letters => `+${letters.length}`);

  return eval(input);
}

// == ASSERTS ==

console.assert(part1("ADVENT") === 6);
console.assert(part1("A(1x5)BC") === 7);
console.assert(part1("(3x3)XYZ") === 9);
console.assert(part1("A(2x2)BCD(2x2)EFG") === 11);
console.assert(part1("(6x1)(1x3)A") === 6);
console.assert(part1("X(8x2)(3x3)ABCY") === 18);

console.assert(part2("(3x3)XYZ") === 9);
console.assert(part2("X(8x2)(3x3)ABCY") === 20);
console.assert(part2("(27x12)(20x12)(13x14)(7x10)(1x12)A") === 241920);
console.assert(part2("(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN") === 445);
