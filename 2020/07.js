// == PART 1 ==

function part1(input) {
  let bags = input
    .split("\n")
    .reduce((bags, line) => {
      let [, bag, b1, b2, b3, b4] = line.match(/^(.*?) bags contain (?:(?:\d+|no) (.*?) bags?, )?(?:(?:\d+|no) (.*?) bags?, )?(?:(?:\d+|no) (.*?) bags?, )?(?:\d+|no) (.*?) bags?\.$/);
      [b1, b2, b3, b4]
        .filter(Boolean)
        .forEach(b => {
          bags[b] = bags[b] || [];
          bags[b].push(bag);
        });
      return bags;
    }, {});

  function findOuterBags(b) {
    let currentBags = bags[b] || [];
    return [
      ...currentBags,
      ...currentBags.flatMap(findOuterBags),
    ];
  }

  return findOuterBags("shiny gold")
    .filter((bag, index, bags) => bags.indexOf(bag) === index)
    .length;
}

// == PART 2 ==

function part2(input) {
  let bags = input
    .split("\n")
    .reduce((bags, line) => {
      let [, bag, n1, b1, n2, b2, n3, b3, n4, b4] = line.match(/^(.*?) bags contain (?:(\d+|no) (.*?) bags?, )?(?:(\d+|no) (.*?) bags?, )?(?:(\d+|no) (.*?) bags?, )?(\d+|no) (.*?) bags?\.$/);
      [n1, n2, n3, n4] = [n1, n2, n3, n4].map(Number);
      bags[bag] = [[b1, n1], [b2, n2], [b3, n3], [b4, n4]].filter(([b, n]) => b && !Number.isNaN(n));
      return bags;
    }, {});

  function countBags(b) {
    return bags[b].map(([br, pr]) => pr * (1 + countBags(br))).reduce((a, b) => a + b, 0);
  }

  return countBags("shiny gold");
}

// == ASSERTS ==

console.assert(part1(
`light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`
) === 4);

console.assert(part2(
`light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`
) === 32);
console.assert(part2(
`shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`
) === 126);
