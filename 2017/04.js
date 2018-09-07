// == PART 1 ==

function part1(input) {
  return input
    .split("\n")
    .filter(phrase => {
      let words = phrase.split(" ");
      let uniqueWords = {};
      words.forEach(word => uniqueWords[word] = true);
      return words.length === Object.keys(uniqueWords).length;
    })
    .length
}

// == PART 2 ==

function part2(input) {
  return input
    .split("\n")
    .filter(phrase => {
      let words = phrase.split(" ").map(word => word.split("").sort().join(""));
      let uniqueWords = {};
      words.forEach(word => uniqueWords[word] = true);
      return words.length === Object.keys(uniqueWords).length;
    })
    .length
}

// == ASSERTS ==

console.assert(part1("aa bb cc dd ee\naa bb cc dd aa\naa bb cc dd aaa") === 2);

console.assert(part2("abcde fghij\nabcde xyz ecdab\na ab abc abd abf abj\niiii oiii ooii oooi oooo\noiii ioii iioi iiio") === 3);
