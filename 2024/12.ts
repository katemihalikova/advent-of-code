// == PART 1 ==

function part1(input: string): number {
  interface PlotInConstruction {
    crop: string;
    region?: number;
    perimeter?: number;
  }
  type Plot = Required<PlotInConstruction>;

  let garden = input.split("\n").map(line => [...line].map(crop => ({crop} as Plot)));

  function getPlotsAround(currRow: number, currCol: number) {
    return [
      [currRow + 1, currCol],
      [currRow - 1, currCol],
      [currRow, currCol + 1],
      [currRow, currCol - 1],
    ]
      .map(([row, col]) => ({plot: garden[row]?.[col] as PlotInConstruction | undefined, row, col}));
  }

  function stakeOutRegion(currRow: number, currCol: number, region: number) {
    let currCrop = garden[currRow][currCol].crop;
    return getPlotsAround(currRow, currCol)
      .filter(({plot}) => plot && plot.crop === currCrop && plot.region === undefined)
      .forEach(({plot, row, col}) => {
        plot!.region = region;
        stakeOutRegion(row, col, region);
      });
  }

  let regionCounter = 0;
  garden.forEach((line, row) => line.forEach((plot: PlotInConstruction, col) => {
    plot.perimeter = getPlotsAround(row, col)
      .filter(({plot: adjacentPlot}) => !adjacentPlot || adjacentPlot.crop !== plot.crop)
      .length;

    if (plot.region === undefined) {
      plot.region = regionCounter++;
      stakeOutRegion(row, col, plot.region);
    }
  }));

  return garden
    .reduce<Array<{area: number, perimeter: number}>>((regions, line) => {
      line.forEach(({region, perimeter}) => {
        regions[region] = regions[region] ?? {area: 0, perimeter: 0};
        regions[region].area += 1;
        regions[region].perimeter += perimeter;
      });
      return regions;
    }, [])
    .reduce((sum, {area, perimeter}) => sum + (area * perimeter), 0);
}

// == PART 2 ==

function part2(input: string): number {
  interface PlotInConstruction {
    crop: string;
    region?: number;
    sides?: [number | false, number | false, number | false, number | false];
  }
  type Plot = Required<PlotInConstruction>;

  let garden = input.split("\n").map(line => [...line].map(crop => ({crop} as Plot)));

  function getPlotsAround(currRow: number, currCol: number) {
    return [
      [currRow + 1, currCol],
      [currRow - 1, currCol],
      [currRow, currCol + 1],
      [currRow, currCol - 1],
    ]
      .map(([row, col]) => ({plot: garden[row]?.[col] as PlotInConstruction | undefined, row, col}));
  }

  function stakeOutRegion(currRow: number, currCol: number, region: number) {
    let currCrop = garden[currRow][currCol].crop;
    return getPlotsAround(currRow, currCol)
      .filter(({plot}) => plot && plot.crop === currCrop && plot.region === undefined)
      .forEach(({plot, row, col}) => {
        plot!.region = region;
        stakeOutRegion(row, col, region);
      });
  }

  let regionCounter = 0;
  let sideCounter = 0;
  garden.forEach((line, row) => line.forEach((plot: PlotInConstruction, col) => {
    if (plot.region === undefined) {
      plot.region = regionCounter++;
      stakeOutRegion(row, col, plot.region);
    }

    plot.sides = [
      [garden[row - 1]?.[col], garden[row][col - 1]],
      [garden[row + 1]?.[col], garden[row][col - 1]],
      [garden[row][col - 1], garden[row - 1]?.[col]],
      [garden[row][col + 1], garden[row - 1]?.[col]],
    ].map(([frontPlot, sidePlot], sideIndex) => 
      (frontPlot?.crop === plot.crop) ? false :
      (sidePlot?.crop === plot.crop && sidePlot.sides[sideIndex] !== false) ? sidePlot.sides[sideIndex] :
      sideCounter++
    ) as Plot["sides"];
  }));

  return garden
    .reduce<Array<{area: number, sides: Set<number>}>>((regions, line) => {
      line.forEach(({region, sides}) => {
        regions[region] = regions[region] ?? {area: 0, sides: new Set()};
        regions[region].area += 1;
        sides
          .filter(side => side !== false)
          .forEach(side => regions[region].sides.add(side));
      });
      return regions;
    }, [])
    .reduce((sum, {area, sides}) => sum + (area * sides.size), 0);
}

// == ASSERTS ==

console.assert(part1(`\
AAAA
BBCD
BBCC
EEEC`) === 140);
console.assert(part1(`\
OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`) === 772);
console.assert(part1(`\
RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`) === 1930);

console.assert(part2(`\
AAAA
BBCD
BBCC
EEEC`) === 80);
console.assert(part2(`\
OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`) === 436);
console.assert(part2(`\
EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`) === 236);
console.assert(part2(`\
AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`) === 368);
console.assert(part2(`\
RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`) === 1206);
