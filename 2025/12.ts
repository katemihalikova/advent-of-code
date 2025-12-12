// == PART 1 ==

function part1(input: string): number {
  // polygon packer not required for actual puzzle input

  let parts = input.split("\n\n");
  let presentSizes = parts.slice(0, -1).map(part => part.replaceAll(/[^#]/g, "").length);

  return parts
    .at(-1)!
    .split("\n")
    .map(e => e.split(/:? |x/).map(Number)).map(([width, height, ...presentCounts]) => {
      return [width * height, presentCounts.reduce((sum, count, index) => sum + count * presentSizes[index], 0)]
    })
    .filter(([area, cells]) => area >= cells)
    .length;
}

// == PART 2 ==

// Successfully decorated the North Pole 🎉 and saved Christmas 🎄

// == ASSERTS ==

console.assert(part1(`\
0:
###
#..
###

1:
###
.#.
###

4x4: 2 0
4x4: 2 1`) === 1);
