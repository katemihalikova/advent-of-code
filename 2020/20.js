// == PART 1 ==

function part1(input) {
  let top = grid => grid[0];
  let left = grid => grid.map(r => r[0]);
  let right = grid => grid.map(r => r[grid.length - 1]);
  let bottom = grid => grid[grid.length - 1];
  let flip = vector => [...vector].reverse();

  let borders = input
    .split("\n\n")
    .reduce((acc, tile) => {
      let id = Number(tile.match(/^Tile (\d+):\n/)[1]);
      let tileGrid = tile.split("\n").slice(1).map(w => w.split(""));

      let tileBorders = [
        top(tileGrid),
        left(tileGrid),
        right(tileGrid),
        bottom(tileGrid),
      ];

      tileBorders.forEach(tileBorder => {
        tileBorder = [tileBorder, flip(tileBorder)].sort()[0];
        acc[tileBorder] = acc[tileBorder] || [];
        acc[tileBorder].push(id)
      })

      return acc;
    }, {});

  return Object.values(borders)
    .filter(ids => ids.length === 1)
    .flat()
    .filter((id, index, ids) => ids.indexOf(id) !== index)
    .reduce((a, b) => a * b, 1);
}

// == ASSERTS ==

console.assert(part1(
`Tile 2311:
..##.#..#.
##..#.....
#...##..#.
####.#...#
##.##.###.
##...#.###
.#.#.#..##
..#....#..
###...#.#.
..###..###

Tile 1951:
#.##...##.
#.####...#
.....#..##
#...######
.##.#....#
.###.#####
###.##.##.
.###....#.
..#.#..#.#
#...##.#..

Tile 1171:
####...##.
#..##.#..#
##.#..#.#.
.###.####.
..###.####
.##....##.
.#...####.
#.##.####.
####..#...
.....##...

Tile 1427:
###.##.#..
.#..#.##..
.#.##.#..#
#.#.#.##.#
....#...##
...##..##.
...#.#####
.#.####.#.
..#..###.#
..##.#..#.

Tile 1489:
##.#.#....
..##...#..
.##..##...
..#...#...
#####...#.
#..#.#.#.#
...#.#.#..
##.#...##.
..##.##.##
###.##.#..

Tile 2473:
#....####.
#..#.##...
#.##..#...
######.#.#
.#...#.#.#
.#########
.###.#..#.
########.#
##...##.#.
..###.#.#.

Tile 2971:
..#.#....#
#...###...
#.#.###...
##.##..#..
.#####..##
.#..####.#
#..#.#..#.
..####.###
..#.#.###.
...#.#.#.#

Tile 2729:
...#.#.#.#
####.#....
..#.#.....
....#..#.#
.##..##.#.
.#.####...
####.#.#..
##.####...
##..#.##..
#.##...##.

Tile 3079:
#.#.#####.
.#..######
..#.......
######....
####.#..#.
.#...#.##.
#.#####.##
..#.###...
..#.......
..#.###...`
) === 20899048083289);
