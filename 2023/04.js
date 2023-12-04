// == PART 1 ==

function part1(input) {
  return input
    .split("\n")
    .map(line => {
      let [, winningNumbers, myNumbers] = line.match(/^Card +\d+:\s+((?:\d+\s+)+)\|((?:\s+\d+)+)$/).map(numbers => numbers.trim().split(/\s+/g).map(Number));
      return {winningNumbers, myNumbers};
    })

    .map(({winningNumbers, myNumbers}) => {
      let matchCount = myNumbers.filter(f => winningNumbers.includes(f)).length;
      return matchCount > 0 ? 2 ** (matchCount - 1) : 0;
    })

    .reduce((total, points) => total + points, 0);
}

// == PART 2 ==

function part2(input) {
  return input
    .split("\n")
    .map(line => {
      let [, winningNumbers, myNumbers] = line.match(/^Card +\d+:\s+((?:\d+\s+)+)\|((?:\s+\d+)+)$/).map(numbers => numbers.trim().split(/\s+/g).map(Number));
      return {winningNumbers, myNumbers, cardCount: 1};
    })

    .map(({winningNumbers, myNumbers, cardCount}, index, cards) => {
      let matchCount = myNumbers.filter(f => winningNumbers.includes(f)).length;
      for (let i = 1; i <= matchCount && index + i < cards.length; i++) {
        cards[index + i].cardCount += cardCount;
      }
      return cardCount;
    })

    .reduce((total, count) => total + count, 0);
}

// == ASSERTS ==

console.assert(part1(
`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`) === 13);

console.assert(part2(
`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`) === 30);
