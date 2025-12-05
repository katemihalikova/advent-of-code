// == PART 1 ==

function part1(input: string): number {
  let [rawRanges, rawIngredients] = input.split("\n\n");
  let ranges = rawRanges.split("\n").map(line => line.split("-").map(Number));

  return rawIngredients
    .split("\n")
    .map(Number)
    .filter(ingredient => ranges.some(([from, to]) => ingredient >= from && ingredient <= to))
    .length;
}

// == PART 2 ==

function part2(input: string): number {
  return input
    .split("\n\n")
    [0]
    .split("\n")
    .map(line => line.split("-").map(Number))
    .sort(([fromA],[fromB]) => fromA - fromB)
    .reduce<[number, number][]>((result, [from, to], index) => {
      if (index === 0 || result.at(-1)![1] < from - 1) result.push([from, to]);
      else if (to > result.at(-1)![1]) result.at(-1)![1] = to;
      return result;
    }, [])
    .reduce((sum, [from, to]) => sum + to - from + 1, 0);
}

// == ASSERTS ==

console.assert(part1(`\
3-5
10-14
16-20
12-18

1
5
8
11
17
32`) === 3);

console.assert(part2(`\
3-5
10-14
16-20
12-18`) === 14);
