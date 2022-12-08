// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(line => [...line].map(Number));

  let visibleTrees = 0;

  input.forEach((row, y) => row.forEach((cell, x) => {
    let col = input.map(row => row[x]);

    let isVisible = row.slice(0, x).every(r => r < cell)
      || row.slice(x + 1).every(r => r < cell)
      || col.slice(0, y).every(r => r < cell)
      || col.slice(y + 1).every(r => r < cell);

    if (isVisible) visibleTrees++;
  }));

  return visibleTrees;
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(line => [...line].map(Number));

  let maxScenicScore = 0;

  input.forEach((row, y) => row.forEach((cell, x) => {
    let col = input.map(row => row[x]);

    let getViewingDistance = view => (view.findIndex(r => r >= cell) + 1) || view.length;

    let left = getViewingDistance(row.slice(0, x).reverse());
    let right = getViewingDistance(row.slice(x + 1));
    let top = getViewingDistance(col.slice(0, y).reverse());
    let bottom = getViewingDistance(col.slice(y + 1));

    maxScenicScore = Math.max(maxScenicScore, left * right * top * bottom);
  }));

  return maxScenicScore;
}

// == ASSERTS ==

console.assert(part1(
`30373
25512
65332
33549
35390`) === 21);

console.assert(part2(
`30373
25512
65332
33549
35390`) === 8);
