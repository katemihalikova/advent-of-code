// == PART 1 ==

function part1(input) {
  const CARD_STRENGTH = "23456789TJQKA";

  return input
    .split("\n")
    .map(line => line.split(" "))
    .map(([hand, bid]) => ({
      handStrength: [...hand].map(card => CARD_STRENGTH.indexOf(card).toString(CARD_STRENGTH.length)).join(""),
      handType: Object.values([...hand].reduce((cardCounts, card) => ({...cardCounts, [card]: (cardCounts[card] ?? 0) + 1}), {}))
      .sort((a, b) => b - a)
      .join(""),
      bid: Number(bid),
    }))
    .sort((a, b) => a.handType.localeCompare(b.handType) || a.handStrength.localeCompare(b.handStrength))
    .reduce((sum, {bid}, index) => sum + (bid * (index + 1)), 0);
}

// == PART 2 ==

function part2(input) {
  const CARD_STRENGTH = "J23456789TQKA";

  return input
    .split("\n")
    .map(line => line.split(" "))
    .map(([hand, bid]) => {
      let cardCounts = [...hand].reduce((cardCounts, card) => ({...cardCounts, [card]: (cardCounts[card] ?? 0) + 1}), {});
      let jCount = cardCounts.J ?? 0;
      delete cardCounts.J;
      let cardTotals = Object.values(cardCounts).sort((a, b) => b - a);
      cardTotals[0] = (cardTotals[0] ?? 0) + jCount;
      let handType = cardTotals.join("");

      return {
        handStrength: [...hand].map(card => CARD_STRENGTH.indexOf(card).toString(CARD_STRENGTH.length)).join(""),
        handType,
        bid: Number(bid),
      };
    })
    .sort((a, b) => a.handType.localeCompare(b.handType) || a.handStrength.localeCompare(b.handStrength))
    .reduce((sum, {bid}, index) => sum + (bid * (index + 1)), 0);
}

// == ASSERTS ==

console.assert(part1(
`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`) === 6440);

console.assert(part2(
`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`) === 5905);
