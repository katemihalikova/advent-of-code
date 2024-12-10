// == TYPES ==

type Map = number[][];

interface Position {
  height: number;
  row: number;
  col: number;
}

// == SHARED ==

function getMap(input: string): Map {
  return input
    .split("\n")
    .map(line => [...line].map(Number));
}

function getTrailheads(map: Map): Position[] {
  return map
    .flatMap((line, row) => line
      .map((height, col) => ({height, col, row}))
      .filter(({height}) => height === 0)
    );
}

function getPositionsOfHeightAround(map: Map, wantedHeight: number, row: number, col: number): Position[] {
  return [
    [row + 1, col],
    [row - 1, col],
    [row, col + 1],
    [row, col - 1],
  ]
    .map(([row, col]) => ({height: map[row]?.[col], row, col}))
    .filter(({height}) => height === wantedHeight);
}

function getSummitsOfAllTrails(map: Map, trailhead: Position): Position[] {
  let positions = [trailhead];
  for (let nextHeight = 1; nextHeight <= 9; nextHeight++) {
    positions = positions.flatMap(({row, col}) => getPositionsOfHeightAround(map, nextHeight, row, col));
  }
  return positions;
}

// == PART 1 ==

function part1(input: string): number {
  let map = getMap(input);
  return getTrailheads(map).reduce((sum, position) => sum + new Set(getSummitsOfAllTrails(map, position).map(({row, col}) => `${row},${col}`)).size, 0);
}

// == PART 2 ==

function part2(input: string): number {
  let map = getMap(input);
  return getTrailheads(map).reduce((sum, position) => sum + getSummitsOfAllTrails(map, position).length, 0);
}

// == ASSERTS ==

console.assert(part1(`\
0123
1234
8765
9876`) === 1);
console.assert(part1(`\
...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9`) === 2);
console.assert(part1(`\
..90..9
...1.98
...2..7
6543456
765.987
876....
987....`) === 4);
console.assert(part1(`\
10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01`) === 3);
console.assert(part1(`\
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`) === 36);

console.assert(part2(`\
.....0.
..4321.
..5..2.
..6543.
..7..4.
..8765.
..9....`) === 3);
console.assert(part2(`\
..90..9
...1.98
...2..7
6543456
765.987
876....
987....`) === 13);
console.assert(part2(`\
012345
123456
234567
345678
4.6789
56789.`) === 227);
console.assert(part2(`\
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`) === 81);
