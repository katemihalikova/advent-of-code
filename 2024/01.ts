// == PART 1 ==

function part1(input: string): number {
  let lists = input
    .split("\n")
    .map(line => line.split(/\s+/).map(Number));

  let leftList = lists.map(([left]) => left).sort((a, b) => a - b);
  let rightList = lists.map(([, right]) => right).sort((a, b) => a - b);

  return leftList.reduce((sum, _, index) => sum + Math.abs(leftList[index] - rightList[index]), 0);
}

// == PART 2 ==

function part2(input: string): number {
  let lists = input
    .split("\n")
    .map(line => line.split(/\s+/).map(Number));

  let leftList = lists.map(([left]) => left);
  let rightCounts = lists.reduce<Record<number, number>>((counts, [, right]) => ({...counts, [right]: (counts[right] ?? 0) + 1}), {});

  return leftList.reduce((sum, id) => sum + id * (rightCounts[id] ?? 0), 0);
}

// == ASSERTS ==

console.assert(part1(`\
3   4
4   3
2   5
1   3
3   9
3   3`) === 11);

console.assert(part2(`\
3   4
4   3
2   5
1   3
3   9
3   3`) === 31);
