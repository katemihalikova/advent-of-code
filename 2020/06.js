// == PART 1 ==

function part1(input) {
  return input
    .split("\n\n")
    .map(block => block
      .replace(/\n/g, '')
      .split("")
      .filter((letter, index, array) => array.indexOf(letter) === index)
      .length
    )
    .reduce((a, b) => a + b);
}

// == PART 2 ==

function part2(input) {
  return input
    .split("\n\n")
    .map(block => block
      .split("\n")
      .map(person => person.split(""))
    )
    .map(block => block[0].filter(answer => block.every(person => person.includes(answer))).length)
    .reduce((a, b) => a + b);
}

// == ASSERTS ==

console.assert(part1("abc\n\na\nb\nc\n\nab\nac\n\na\na\na\na\n\nb") === 11);

console.assert(part2("abc\n\na\nb\nc\n\nab\nac\n\na\na\na\na\n\nb") === 6);
