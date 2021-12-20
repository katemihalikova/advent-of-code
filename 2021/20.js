// == CLASSES ==

class Image {
  #grid = {};

  write(x, y, value) {
    this.#grid[y] = this.#grid[y] || {};
    this.#grid[y][x] = value;
  }

  enhance(algorithm) {
    let newImage = new Image();
    let {minX, minY, maxX, maxY} = this.#getMinMaxXY();

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        let pixelBinary = parseInt(this.#getCenteredSquare(x, y).map(pixel => pixel === "#" ? 1 : 0).join(""), 2);
        newImage.write(x, y, algorithm[pixelBinary]);
      }
    }

    return newImage;
  }

  countLitPixels(steps) {
    let {minX, minY, maxX, maxY} = this.#getMinMaxXY();
    let pixels = 0;

    for (let y = minY + steps; y <= maxY - steps; y++) {
      for (let x = minX + steps; x <= maxX - steps; x++) {
        if (this.#grid[y][x] === "#") pixels++;
      }
    }

    return pixels;
  }

  #getCenteredSquare(x, y) {
    return [
      this.#grid[y-1] && this.#grid[y-1][x-1],
      this.#grid[y-1] && this.#grid[y-1][x],
      this.#grid[y-1] && this.#grid[y-1][x+1],
      this.#grid[y] && this.#grid[y][x-1],
      this.#grid[y] && this.#grid[y][x],
      this.#grid[y] && this.#grid[y][x+1],
      this.#grid[y+1] && this.#grid[y+1][x-1],
      this.#grid[y+1] && this.#grid[y+1][x],
      this.#grid[y+1] && this.#grid[y+1][x+1],
    ];
  }

  #getMinMaxXY() {
    let ys = Object.keys(this.#grid);
    let minY = Math.min(...ys);
    let maxY = Math.max(...ys);
    let xs = Object.values(this.#grid).reduce((acc, row) => new Set([...acc, ...Object.keys(row)]), []);
    let minX = Math.min(...xs);
    let maxX = Math.max(...xs);

    return {minX, minY, maxX, maxY};
  }
}

// == SHARED ==

function enhanceImage(input, steps) {
  input = input.split("\n\n");

  let algorithm = input[0];
  input = input[1].split("\n").map(line => [...line]);

  let image = new Image();
  input.forEach((r, y) => r.forEach((v, x) => image.write(x, y, v)));

  image.write(-2 * steps, -2 * steps, ".");
  image.write(input[0].length - 1 + 2 * steps, input.length - 1 + 2 * steps, ".");

  for (let step = 1; step <= steps; step++) {
    image = image.enhance(algorithm);
  }

  return image.countLitPixels(steps);
}

// == PART 1 ==

function part1(input) {
  return enhanceImage(input, 2);
}

// == PART 2 ==

function part2(input) {
  return enhanceImage(input, 50);
}

// == ASSERTS ==

let example = `..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###`;

console.assert(part1(example) === 35);

console.assert(part2(example) === 3351);
