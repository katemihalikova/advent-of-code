// == SHARED ==

class HexGrid {
  grid = {};

  read(x, y, z) {
    if (z in this.grid && y in this.grid[z] && x in this.grid[z][y]) {
      return this.grid[z][y][x];
    }
  }

  write(x, y, z, value) {
    this.grid[z] = this.grid[z] || {};
    this.grid[z][y] = this.grid[z][y] || {};
    this.grid[z][y][x] = value;
  }

  flip(x, y, z) {
    this.write(x, y, z, !this.read(x, y, z));
  }

  getNumberOfBlackTiles() {
    return Object.values(this.grid)
      .flatMap(block => Object.values(block))
      .flatMap(row => Object.values(row))
      .filter(Boolean)
      .length;
  }

  getMinMaxXYZ() {
    let xs = Object.values(this.grid)
      .flatMap(block => Object.values(block))
      .flatMap(row => Object.keys(row));
    let ys = Object.values(this.grid)
      .flatMap(block => Object.keys(block));
    let zs = Object.keys(this.grid);

    return [
      Math.min(...xs),
      Math.max(...xs),
      Math.min(...ys),
      Math.max(...ys),
      Math.min(...zs),
      Math.max(...zs),
    ];
  }

  getTilesAround(x, y, z) {
    return [
      this.grid[z] && this.grid[z][y+1] && this.grid[z][y+1][x-1],
      this.grid[z] && this.grid[z][y-1] && this.grid[z][y-1][x+1],
      this.grid[z+1] && this.grid[z+1][y-1] && this.grid[z+1][y-1][x],
      this.grid[z+1] && this.grid[z+1][y] && this.grid[z+1][y][x-1],
      this.grid[z-1] && this.grid[z-1][y+1] && this.grid[z-1][y+1][x],
      this.grid[z-1] && this.grid[z-1][y] && this.grid[z-1][y][x+1],
    ].filter(Boolean);
  }

  clone() {
    let grid = new HexGrid();
    grid.grid = JSON.parse(JSON.stringify(this.grid));
    return grid;
  }
}

// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(line => line
    .replace(/se/g, "⇘")
    .replace(/sw/g, "⇙")
    .replace(/ne/g, "⇗")
    .replace(/nw/g, "⇖")
    .replace(/e/g, "⇒")
    .replace(/w/g, "⇐")
    .split(""));

  let grid = new HexGrid();

  for (let path of input) {
    let x = 0, y = 0, z = 0;

    for (let dir of path) {
      if (dir === "⇒" || dir === "⇘") x++;
      if (dir === "⇐" || dir === "⇖") x--;
      if (dir === "⇐" || dir === "⇙") y++;
      if (dir === "⇒" || dir === "⇗") y--;
      if (dir === "⇗" || dir === "⇖") z++;
      if (dir === "⇙" || dir === "⇘") z--;
    }

    grid.flip(x, y, z);
  }

  return grid.getNumberOfBlackTiles();
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(line => line
    .replace(/se/g, "⇘")
    .replace(/sw/g, "⇙")
    .replace(/ne/g, "⇗")
    .replace(/nw/g, "⇖")
    .replace(/e/g, "⇒")
    .replace(/w/g, "⇐")
    .split(""));

  let grid = new HexGrid();

  for (let path of input) {
    let x = 0, y = 0, z = 0;

    for (let dir of path) {
      if (dir === "⇒" || dir === "⇘") x++;
      if (dir === "⇐" || dir === "⇖") x--;
      if (dir === "⇐" || dir === "⇙") y++;
      if (dir === "⇒" || dir === "⇗") y--;
      if (dir === "⇗" || dir === "⇖") z++;
      if (dir === "⇙" || dir === "⇘") z--;
    }

    grid.flip(x, y, z);
  }

  for (let i = 1; i <= 100; i++) {
    let nextGrid = grid.clone();
    let [minX, maxX, minY, maxY, minZ, maxZ] = grid.getMinMaxXYZ();

    for (let x = minX - 1; x <= maxX + 1; x++) {
      for (let y = minY - 1; y <= maxY + 1; y++) {
        for (let z = minZ - 1; z <= maxZ + 1; z++) {
          if (x + y + z !== 0) continue;

          let isBlack = grid.read(x, y, z);
          let around = grid.getTilesAround(x, y, z);

          if (isBlack && (around.length === 0 || around.length > 2)) nextGrid.write(x, y, z, false);
          if (!isBlack && around.length === 2) nextGrid.write(x, y, z, true);
        }
      }
    }

    grid = nextGrid;
  }

  return grid.getNumberOfBlackTiles();
}

// == ASSERTS ==

console.assert(part1(
`sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew`
) === 10);

console.assert(part2(
`sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew`
) === 2208);
