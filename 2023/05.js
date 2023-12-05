// == PART 1 ==

function part1(input) {
  let [seedNumbers, ...categoriesMaps] = input.split("\n\n");

  seedNumbers = seedNumbers
    .split(" ")
    .slice(1)
    .map(Number);

  categoriesMaps = categoriesMaps
    .map(block => block
      .split("\n")
      .slice(1)
      .map(line => line
        .split(" ")
        .map(Number)
      )
      .map(([destRangeStart, srcRangeStart, rangeLength]) => ({destRangeStart, srcRangeStart, rangeLength}))
    );

  return categoriesMaps
    .reduce((itemNumbers, maps) => itemNumbers.map(fromItemNumber => {
      let map = maps.find(({srcRangeStart, rangeLength}) => srcRangeStart <= fromItemNumber && srcRangeStart + rangeLength > fromItemNumber);
      return map ? fromItemNumber - map.srcRangeStart + map.destRangeStart : fromItemNumber;
    }), seedNumbers)
    .reduce((minNumber, locationNumber) => Math.min(minNumber, locationNumber), Infinity);
}

// == PART 2 ==

function part2(input) {
  let [seedNumbers, ...categoriesMaps] = input.split("\n\n");

  seedNumbers = [...seedNumbers.matchAll(/(\d+) (\d+)/g)]
    .map(numbers => numbers.map(Number))
    .map(([, start, length]) => ({
      start,
      end: start + length,
    }));

  categoriesMaps = categoriesMaps
    .map(block => block
      .split("\n")
      .slice(1)
      .map(line => line
        .split(" ")
        .map(Number)
      )
      .map(([destStart, srcStart, length]) => ({
        start: srcStart,
        end: srcStart + length,
        diff: destStart - srcStart,
      }))
    );

  return categoriesMaps.reduce((numbers, maps) => {
    return numbers.flatMap(({start, end}) => {
      let nextNumbers = [];

      for (let currentStart = start; currentStart < end;) {
        let map = maps.find(({start, end}) => start <= currentStart && end > currentStart);

        if (!map) {
          let nextStart = maps
            .map(({start}) => start)
            .filter(start => start > currentStart)
            .reduce((minStart, start) => Math.min(minStart, start), Infinity);

          map = {
            start: currentStart,
            end: Math.min(end, nextStart),
            diff: 0,
          };
        }

        let destStart = currentStart + map.diff;
        let destEnd = Math.min(map.end, end) + map.diff;
        nextNumbers.push({start: destStart, end: destEnd});

        currentStart += destEnd - destStart;
      }

      return nextNumbers;
    });
  }, seedNumbers)
  .reduce((minStart, {start}) => Math.min(minStart, start), Infinity);
}

// == ASSERTS ==

const example = 
`seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

console.assert(part1(example) === 35);

console.assert(part2(example) === 46);
