// == PART 1 ==

function part1(input: string): number {
  return input
    .split("\n")
    .map(line => line.match(/^(\w)(\d+)$/)!)
    .map(([, dir, clicks]) => (dir === "L" ? -1 : 1) * Number(clicks))
    .reduce(({position, zeroCount}, clicks) => ({
      position: position + clicks,
      zeroCount: zeroCount + ((position + clicks) % 100 === 0 ? 1 : 0),
    }), {position: 50, zeroCount: 0})
    .zeroCount;
}

// == PART 2 ==

function part2(input: string): number {
  return input
    .split("\n")
    .map(line => line.match(/^(\w)(\d+)$/)!)
    .map(([, dir, clicks]) => (dir === "L" ? -1 : 1) * Number(clicks))
    .reduce(({position, zeroCount}, clicks) => ({
      position: (((position + clicks) % 100) + 100) % 100,
      zeroCount: zeroCount + Math.abs(Math.trunc((position + clicks) / 100)) + (position <= -clicks && position !== 0 ? 1 : 0),
    }), {position: 50, zeroCount: 0})
    .zeroCount;
}

// == ASSERTS ==

console.assert(part1(`\
L68
L30
R248
L5
R60
L55
L1
L99
R14
L82`) === 3);

console.assert(part2(`\
L68
L30
R248
L5
R60
L55
L1
L99
R14
L82`) === 8);
