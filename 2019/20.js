// == SHARED ==

class Grid {
  grid = {};

  read(x, y) {
    if (y in this.grid && x in this.grid[y]) {
      return this.grid[y][x];
    }
  }

  write(x, y, value) {
    this.grid[y] = this.grid[y] || {};
    this.grid[y][x] = value;
  }

  getThingsAround(x, y) {
    return [
      this.grid[y][x - 1],
      this.grid[y][x + 1],
      this.grid[y - 1] && this.grid[y - 1][x],
      this.grid[y + 1] && this.grid[y + 1][x],
    ];
  }

  getAsFlatArray() {
    return Object.values(this.grid).flatMap(row => Object.values(row));
  }
}

let isLetter = char => char >= "A" && char <= "Z";

// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(line => line.split(""));

  let grid = new Grid();

  input.forEach((row, y) => row.forEach((cell, x) => {
    if (grid.read(x, y)) return;
    if (cell === "." || cell === "#") grid.write(x, y, {x, y, type: cell});

    if (isLetter(cell)) {
      if (isLetter(input[y][x+1])) {
        let doors = cell + input[y][x+1];
        if (input[y][x+2] === ".") {
          grid.write(x+2, y, {x: x+2, y, type: ".", doors});
        } else if (input[y][x-1] === ".") {
          grid.write(x-1, y, {x: x-1, y, type: ".", doors});
        }
      } else if (input[y+1] && isLetter(input[y+1][x])) {
        let doors = cell + input[y+1][x];
        if (input[y+2] && input[y+2][x] === ".") {
          grid.write(x, y+2, {x, y: y+2, type: ".", doors});
        } else if (input[y-1] && input[y-1][x] === ".") {
          grid.write(x, y-1, {x, y: y-1, type: ".", doors});
        }
      }
    }
  }));

  let entrance = grid.getAsFlatArray().find(e => e && e.doors === "AA");
  let exit = grid.getAsFlatArray().find(e => e && e.doors === "ZZ");

  let currentCells = [entrance];

  for (let distance = 1;; distance++) {
    currentCells.forEach(cell => cell.visited = true);

    let nextCells = [...new Set(currentCells.flatMap(({x, y}) => grid.getThingsAround(x, y)))]
      .filter(cell => cell && cell.type === "." && !cell.visited);

    if (nextCells.includes(exit)) return distance;

    let nextPortals = currentCells
      .filter(({doors}) => doors && doors !== "AA")
      .map(portal => grid.getAsFlatArray().find(otherPortal => otherPortal && otherPortal !== portal && otherPortal.doors === portal.doors))
      .filter(({visited}) => !visited);

    currentCells = [...nextCells, ...nextPortals];
  }
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(line => line.split(""));

  let levels = {};
  let getLevel = level => {
    if (level in levels) return levels[level];

    let grid = new Grid();
  
    input.forEach((row, y) => row.forEach((cell, x) => {
      if (grid.read(x, y)) return;
      if (cell === "." || cell === "#") grid.write(x, y, {x, y, type: cell, level});
  
      if (isLetter(cell)) {
        if (isLetter(input[y][x+1])) {
          let doors = cell + input[y][x+1];
          if (input[y][x+2] === ".") {
            grid.write(x+2, y, {x: x+2, y, type: ".", doors, level, dir: x < row.length / 2 ? "out" : "in"});
          } else if (input[y][x-1] === ".") {
            grid.write(x-1, y, {x: x-1, y, type: ".", doors, level, dir: x < row.length / 2 ? "in" : "out"});
          }
        } else if (input[y+1] && isLetter(input[y+1][x])) {
          let doors = cell + input[y+1][x];
          if (input[y+2] && input[y+2][x] === ".") {
            grid.write(x, y+2, {x, y: y+2, type: ".", doors, level, dir: y < input.length / 2 ? "out" : "in"});
          } else if (input[y-1] && input[y-1][x] === ".") {
            grid.write(x, y-1, {x, y: y-1, type: ".", doors, level, dir: y < input.length / 2 ? "in" : "out"});
          }
        }
      }
    }));
  
    levels[level] = grid;
    return grid;
  };

  let levelZero = getLevel(0).getAsFlatArray();
  let entrance = levelZero.find(cell => cell.doors === "AA");
  let exit = levelZero.find(cell => cell.doors === "ZZ");

  let currentCells = [entrance];

  for (let distance = 1;; distance++) {
    currentCells.forEach(cell => cell.visited = true);

    let nextCells = [...new Set(currentCells.flatMap(({level, x, y}) => getLevel(level).getThingsAround(x, y)))]
      .filter(cell => cell && cell.type === "." && !cell.visited);

    if (nextCells.includes(exit)) return distance;

    let nextPortals = currentCells
      .filter(({doors, level, dir}) =>
        doors &&
        doors !== "AA" &&
        !(doors === "ZZ" && level > 0) &&
        !(dir === "in" && level > 30) &&
        !(dir === "out" && level === 0)
      )
      .map(portal => {
        let {x, y} = getLevel(portal.level).getAsFlatArray().find(otherPortal => otherPortal !== portal && otherPortal.doors === portal.doors)
        return getLevel(portal.level + (portal.dir === "in" ? 1 : -1)).read(x, y);
      })
      .filter(({visited}) => !visited);

    currentCells = [...nextCells, ...nextPortals];

    if (currentCells.length === 0) return undefined;
  }
}

// == ASSERTS ==

let maze1 = `
         A           
         A           
  #######.#########  
  #######.........#  
  #######.#######.#  
  #######.#######.#  
  #######.#######.#  
  #####  B    ###.#  
BC...##  C    ###.#  
  ##.##       ###.#  
  ##...DE  F  ###.#  
  #####    G  ###.#  
  #########.#####.#  
DE..#######...###.#  
  #.#########.###.#  
FG..#########.....#  
  ###########.#####  
             Z       
             Z       `;
console.assert(part1(maze1) === 23);

let maze2 = `
                   A               
                   A               
  #################.#############  
  #.#...#...................#.#.#  
  #.#.#.###.###.###.#########.#.#  
  #.#.#.......#...#.....#.#.#...#  
  #.#########.###.#####.#.#.###.#  
  #.............#.#.....#.......#  
  ###.###########.###.#####.#.#.#  
  #.....#        A   C    #.#.#.#  
  #######        S   P    #####.#  
  #.#...#                 #......VT
  #.#.#.#                 #.#####  
  #...#.#               YN....#.#  
  #.###.#                 #####.#  
DI....#.#                 #.....#  
  #####.#                 #.###.#  
ZZ......#               QG....#..AS
  ###.###                 #######  
JO..#.#.#                 #.....#  
  #.#.#.#                 ###.#.#  
  #...#..DI             BU....#..LF
  #####.#                 #.#####  
YN......#               VT..#....QG
  #.###.#                 #.###.#  
  #.#...#                 #.....#  
  ###.###    J L     J    #.#.###  
  #.....#    O F     P    #.#...#  
  #.###.#####.#.#####.#####.###.#  
  #...#.#.#...#.....#.....#.#...#  
  #.#####.###.###.#.#.#########.#  
  #...#.#.....#...#.#.#.#.....#.#  
  #.###.#####.###.###.#.#.#######  
  #.#.........#...#.............#  
  #########.###.###.#############  
           B   J   C               
           U   P   P               `;
console.assert(part1(maze2) === 58);

console.assert(part2(maze1) === 26);
console.assert(part2(maze2) === undefined);

let maze3 = `
             Z L X W       C                 
             Z P Q B       K                 
  ###########.#.#.#.#######.###############  
  #...#.......#.#.......#.#.......#.#.#...#  
  ###.#.#.#.#.#.#.#.###.#.#.#######.#.#.###  
  #.#...#.#.#...#.#.#...#...#...#.#.......#  
  #.###.#######.###.###.#.###.###.#.#######  
  #...#.......#.#...#...#.............#...#  
  #.#########.#######.#.#######.#######.###  
  #...#.#    F       R I       Z    #.#.#.#  
  #.###.#    D       E C       H    #.#.#.#  
  #.#...#                           #...#.#  
  #.###.#                           #.###.#  
  #.#....OA                       WB..#.#..ZH
  #.###.#                           #.#.#.#  
CJ......#                           #.....#  
  #######                           #######  
  #.#....CK                         #......IC
  #.###.#                           #.###.#  
  #.....#                           #...#.#  
  ###.###                           #.#.#.#  
XF....#.#                         RF..#.#.#  
  #####.#                           #######  
  #......CJ                       NM..#...#  
  ###.#.#                           #.###.#  
RE....#.#                           #......RF
  ###.###        X   X       L      #.#.#.#  
  #.....#        F   Q       P      #.#.#.#  
  ###.###########.###.#######.#########.###  
  #.....#...#.....#.......#...#.....#.#...#  
  #####.#.###.#######.#######.###.###.#.#.#  
  #.......#.......#.#.#.#.#...#...#...#.#.#  
  #####.###.#####.#.#.#.#.###.###.#.###.###  
  #.......#.....#.#...#...............#...#  
  #############.#.#.###.###################  
               A O F   N                     
               A A D   M                     `;
console.assert(part2(maze3) === 396);
