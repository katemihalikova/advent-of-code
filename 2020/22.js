// == PART 1 ==

function part1(input) {
  let decks = input.split("\n\n").map(e => e.split("\n").slice(1).map(Number));

  while (true) {
    let drawnPlayer0 = decks[0].shift();
    let drawnPlayer1 = decks[1].shift();

    let winner = drawnPlayer0 > drawnPlayer1 ? 0 : 1;
    decks[winner].push(...(winner === 0 ? [drawnPlayer0, drawnPlayer1] : [drawnPlayer1, drawnPlayer0]));

    if (decks.some(deck => deck.length === 0)) {
      return decks
        .find(deck => deck.length > 0)
        .map((card, index, deck) => card * (deck.length - index))
        .reduce((acc, value) => acc + value);
    }
  }
}

// == PART 2 ==

function part2(input) {
  let decks = input.split("\n\n").map(e => e.split("\n").slice(1).map(Number));

  function play(decks) {
    let seenStates = new Set();

    while (true) {
      let state = JSON.stringify(decks);
      if (seenStates.has(state)) {
        return 0;
      }
      seenStates.add(state);

      let drawnPlayer0 = decks[0].shift();
      let drawnPlayer1 = decks[1].shift();

      let winner;
      if (decks[0].length >= drawnPlayer0 && decks[1].length >= drawnPlayer1) {
        let deckCopies = [
          decks[0].slice(0, drawnPlayer0),
          decks[1].slice(0, drawnPlayer1),
        ];
        winner = play(deckCopies);
      } else {
        winner = drawnPlayer0 > drawnPlayer1 ? 0 : 1;
      }

      decks[winner].push(...(winner === 0 ? [drawnPlayer0, drawnPlayer1] : [drawnPlayer1, drawnPlayer0]));

      if (decks.some(deck => deck.length === 0)) return decks[0].length === 0 ? 1 : 0;
    }
  }

  play(decks);

  return decks
    .find(deck => deck.length > 0)
    .map((card, index, deck) => card * (deck.length - index))
    .reduce((acc, value) => acc + value);
}

// == ASSERTS ==

console.assert(part1(
`Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`
) === 306);

console.assert(part2(
`Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`
) === 291);
