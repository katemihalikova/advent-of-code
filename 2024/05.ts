// == PART 1 ==

function part1(input: string): number {
  let [rulesInput, manualsInput] = input.split("\n\n");

  let rules = rulesInput
    .split("\n")
    .map(line => line.split("|").map(Number))
    .map(([leftPage, rightPage]) => ({leftPage, rightPage}));

  return manualsInput
    .split("\n")
    .map(line => line.split(",").map(Number))
    .filter(pages => rules
      .map(({leftPage, rightPage}) => [pages.indexOf(leftPage), pages.indexOf(rightPage)])
      .every(([leftIndex, rightIndex]) => rightIndex === -1 || leftIndex < rightIndex)
    )
    .reduce((acc, pages) => acc + pages[(pages.length - 1) / 2], 0);
}

// == PART 2 ==

function part2(input: string): number {
  let [rulesInput, manualsInput] = input.split("\n\n");

  let rules = rulesInput
    .split("\n")
    .map(line => line.split("|").map(Number))
    .map(([leftPage, rightPage]) => ({leftPage, rightPage}));

  return manualsInput
    .split("\n")
    .map(line => line.split(",").map(Number))
    .filter(pages => rules
      .map(({leftPage, rightPage}) => [pages.indexOf(leftPage), pages.indexOf(rightPage)])
      .some(([leftIndex, rightIndex]) => rightIndex !== -1 && leftIndex > rightIndex)
    )
    // Depending on input data, the comparator function might not be transitive, thus breaking the toSorted contract.
    // However, the actual AoC input makes sure it is transitive by providing all combinations of pages that appear in input.
    .map(pages => pages.toSorted((page1, page2) => {
      if (rules.some(({leftPage, rightPage}) => page1 === rightPage && page2 === leftPage)) return 1;
      if (rules.some(({leftPage, rightPage}) => page1 === leftPage && page2 === rightPage)) return -1;
      return 0;
    }))
    .reduce((acc, pages) => acc + pages[(pages.length - 1) / 2], 0);
}

// == ASSERTS ==

let example = `\
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

console.assert(part1(example) === 143);

console.assert(part2(example) === 123);
