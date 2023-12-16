// == SHARED ==

function countEnergizedTiles(layout, start) {
  let beams = [start];
  let visitedTiles = {
    U: new Set(),
    D: new Set(),
    L: new Set(),
    R: new Set(),
    any: new Set(),
  };

  while (beams.length > 0) {
    beams = beams.flatMap(({dir, x, y}) => {
      if (dir === "U") y--;
      if (dir === "D") y++;
      if (dir === "L") x--;
      if (dir === "R") x++;

      let tile = layout[y]?.[x];
      if (!tile) return [];

      let key = `${x}/${y}`;
      if (visitedTiles[dir].has(key)) return [];
      visitedTiles[dir].add(key);
      visitedTiles.any.add(key);

      if (tile === "-" && ["U", "D"].includes(dir)) return [{dir: "L", x, y}, {dir: "R", x, y}];
      if (tile === "|" && ["L", "R"].includes(dir)) return [{dir: "U", x, y}, {dir: "D", x, y}];

      if (tile === "\\" && dir === "U") return {dir: "L", x, y};
      if (tile === "\\" && dir === "D") return {dir: "R", x, y};
      if (tile === "\\" && dir === "L") return {dir: "U", x, y};
      if (tile === "\\" && dir === "R") return {dir: "D", x, y};

      if (tile === "/" && dir === "U") return {dir: "R", x, y};
      if (tile === "/" && dir === "D") return {dir: "L", x, y};
      if (tile === "/" && dir === "L") return {dir: "D", x, y};
      if (tile === "/" && dir === "R") return {dir: "U", x, y};

      return {dir, x, y};
    });
  }

  return visitedTiles.any.size;
}

// == PART 1 ==

function part1(input) {
  let layout = input.split("\n").map(line => [...line]);

  return countEnergizedTiles(layout, {dir: "R", x: -1, y: 0});
}

// == PART 2 ==

function part2(input) {
  let layout = input.split("\n").map(line => [...line]);

  return [
    ...layout.map((_, y) => ({dir: "R", x: -1, y})),
    ...layout.map((_, y) => ({dir: "L", x: layout[0].length, y})),
    ...layout[0].map((_, x) => ({dir: "D", x, y: -1})),
    ...layout[0].map((_, x) => ({dir: "U", x, y: layout.length})),
  ].reduce((max, start) => Math.max(max, countEnergizedTiles(layout, start)), 0);
}

// == ASSERTS ==

const example =
`.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`;

console.assert(part1(example) === 46);

console.assert(part2(example) === 51);
