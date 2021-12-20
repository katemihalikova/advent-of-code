// == CLASSES ==

class Image {
  #grid = {};
  #infinitePixel;

  constructor(infinitePixel = ".") {
    this.#infinitePixel = infinitePixel;
  }

  write(x, y, value) {
    this.#grid[y] = this.#grid[y] || {};
    this.#grid[y][x] = value;
  }

  enhance(algorithm) {
    let newImage = new Image(algorithm[this.#infinitePixel === "#" ? 0b111111111 : 0]);
    let {minX, minY, maxX, maxY} = this.#getMinMaxXY();

    for (let x = minX - 1; x <= maxX + 1; x++) {
      for (let y = minY - 1; y <= maxY + 1; y++) {
        let pixelBinary = parseInt(this.#getCenteredSquare(x, y).map(pixel => pixel || this.#infinitePixel).map(pixel => pixel === "#" ? 1 : 0).join(""), 2);
        newImage.write(x, y, algorithm[pixelBinary]);
      }
    }

    return newImage;
  }

  countLitPixels() {
    let {minX, minY, maxX, maxY} = this.#getMinMaxXY();
    let pixels = 0;

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        if (this.#grid[y][x] === "#") pixels++;
      }
    }

    return pixels;
  }

  #getCenteredSquare(x, y) {
    return [
      this.#grid[y-1]?.[x-1],
      this.#grid[y-1]?.[x],
      this.#grid[y-1]?.[x+1],
      this.#grid[y]?.[x-1],
      this.#grid[y]?.[x],
      this.#grid[y]?.[x+1],
      this.#grid[y+1]?.[x-1],
      this.#grid[y+1]?.[x],
      this.#grid[y+1]?.[x+1],
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
  input.forEach((row, y) => row.forEach((pixel, x) => image.write(x, y, pixel)));

  for (let step = 1; step <= steps; step++) {
    image = image.enhance(algorithm);
  }

  return image;
}

// == PART 1 ==

function part1(input) {
  return enhanceImage(input, 2).countLitPixels();
}

// == PART 2 ==

function part2(input) {
  return enhanceImage(input, 50).countLitPixels();
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
