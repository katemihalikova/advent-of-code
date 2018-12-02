// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(id => id.split(""));

  let {twice, thrice} = input.reduce(({twice, thrice}, letters) => {
    let appearedTwice = letters.some(letter => letters.filter(l => l === letter).length === 2);
    let appearedThrice = letters.some(letter => letters.filter(l => l === letter).length === 3);

    if (appearedTwice) twice++;
    if (appearedThrice) thrice++;

    return {twice, thrice};
  }, {twice: 0, thrice: 0});

  return twice * thrice;
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(id => id.split(""));

  for (let id of input) {
    for (let comparedId of input) {
      let matches = id.filter((letter, i) => letter === comparedId[i]);
      if (matches.length === id.length - 1) return matches.join("");
    }
  }
}

// == ASSERTS ==

console.assert(part1("abcdef\nbababc\nabbcde\nabcccd\naabcdd\nabcdee\nababab") === 12);

console.assert(part2("abcde\nfghij\nklmno\npqrst\nfguij\naxcye\nwvxyz") === "fgij");
