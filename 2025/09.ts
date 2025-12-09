// == PART 1 ==

function part1(input: string): number {
  return input
    .split("\n")
    .map(line => line.split(",").map(Number))
    .flatMap(([x1, y1], i, tiles) => tiles
      .slice(i + 1)
      .map(([x2, y2]) => (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1))
    )
    .toSorted((area1, area2) => area2 - area1)
    [0];
}

// == PART 2 ==

type Rectangle = {x1: number, y1: number, x2: number, y2: number, area: number};

function part2(input: string): number {
  let borderTiles = new Set<number>();
  let addBorderTile = (x: number, y: number) => borderTiles.add(x * 1000000 + y);
  let hasBorderTile = (x: number, y: number) => borderTiles.has(x * 1000000 + y);
  
  let redTiles = input.split("\n").map(line => line.split(",").map(Number));

  [...redTiles.slice(1), redTiles[0]].forEach(([x1, y1], i) => {
    let [x2, y2] = redTiles[i];
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        addBorderTile(x, y);
      }
    }
  });

  return redTiles.reduce<Rectangle[]>((acc, [x1, y1], i) => {
    for (let [x2, y2] of redTiles.slice(i + 1)) {
      acc.push({
        x1, y1, x2, y2,
        area: (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1),
      });
    }
    return acc;
  }, [])
  .toSorted(({area: area1}, {area: area2}) => area2 - area1)
  .find(({x1, y1, x2, y2}) => {
    let fromX = Math.min(x1, x2) + 1;
    let fromY = Math.min(y1, y2) + 1;
    let toX = Math.max(x1, x2) - 1;
    let toY = Math.max(y1, y2) - 1;
    for (let x = fromX; x <= toX; x++) {
      if (hasBorderTile(x, fromY) || hasBorderTile(x, toY)) {
        return false;
      }
    }
    for (let y = fromY; y <= toY; y++) {
      if (hasBorderTile(fromX, y) || hasBorderTile(toX, y)) {
        return false;
      }
    }
    return true;
  })!
  .area;
}

// == ASSERTS ==

console.assert(part1(`\
7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`) === 50);

console.assert(part2(`\
7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`) === 24);
