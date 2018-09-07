// == PARTS 1 & 2 ==

function bothParts(iterations, input) {
  let rules = input.split("\n").map(e => e.split(" => "));
  let grid = ".#./..#/###".split("/").map(e => e.split(""));

  let flip = matrix => matrix[0].map((_, i) => matrix.map(row => row[i]));
  let reverse = matrix => [...matrix].reverse();
  let getVariants = square => {
    return [
      square,
      flip(square),
      reverse(square),
      flip(reverse(square)),
      reverse(flip(square)),
      flip(reverse(flip(square))),
      reverse(flip(reverse(square))),
      flip(reverse(flip(reverse(square)))),
    ];
  }

  for (let i = 0; i < iterations; i++) {
    let base = grid.length % 2 === 0 ? 2 : 3;
    let newGrid = [];

    for (let y = 0; y < grid.length; y += base) {
      for (let x = 0; x < grid.length; x += base) {
        let originalSquare = grid.slice(y, y + base).map(r => r.slice(x, x + base));
        let variants = getVariants(originalSquare).map(variant => variant.map(row => row.join("")).join("/"));
        let newSquare = rules.find(([from]) => variants.some(variant => variant === from))[1];

        let newY = (y / base) * (base + 1);
        let newX = (x / base) * (base + 1);

        newSquare.split("/").forEach((row, i) => {
          newGrid[newY + i] = newGrid[newY + i] || [];
          row.split("").forEach((value, j) => newGrid[newY + i][newX + j] = value);
        });
      }
    }

    grid = newGrid;
  }

  return grid.map(row => row.join("")).join("").replace(/\./g, "").length;
}

// == ASSERTS ==

console.assert(bothParts(2, "../.# => ##./#../...\n.#./..#/### => #..#/..../..../#..#") === 12);
