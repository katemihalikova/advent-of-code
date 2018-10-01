// == PART 1 ==

function part1(input) {
  let codeChars = input.length;
  let actualChars = input.replace(/^"|"$/gm, "").replace(/\\(\\|"|x..)/g, "#").length;
  return codeChars - actualChars;
}

// == PART 2 ==

function part2(input) {
  let codeChars = input.replace(/\n/g, "").length;
  let encodedChars = input.replace(/\\|"|\n/g, "##").length + 2;
  return encodedChars - codeChars;
}

// == ASSERTS ==

console.assert(part1(`""\n"abc"\n"aaa\\"aaa"\n"\\x27"`) === 12);

console.assert(part2(`""\n"abc"\n"aaa\\"aaa"\n"\\x27"`) === 19);
