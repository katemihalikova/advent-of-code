// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(e => e.split("-").map(Number)).sort((e, f) => e[0] - f[0]);

  let previousLargest = 0;

  for (let i = 0; i < input.length; i++) {
    if (i > 0) previousLargest = Math.max(previousLargest, input[i - 1][1]);

    if (input[i][0] > previousLargest + 1) return previousLargest + 1;
  }
}

// == PART 2 ==

function part2(input) {
  return input
    .split("\n")
    .map(line => line.split("-").map(Number))
    .map(([from, to]) => ({from, to}))
    .sort((a, b) => a.from - b.from)

    .reduce((acc, {from, to}) => {
      if (acc.length === 0) return [{from, to}];

      let prev = acc[acc.length - 1];
      if (prev.to < to) {
        if (prev.to >= from - 1) {
          prev.to = to;
        } else {
          acc.push({from, to});
        }
      }
      return acc;
    }, [])

    .reduce((acc, {from, to}, i, arr) => {
      if (i === 0 && from > 0) acc.push({from: -1, to: from});
      if (i > 0) acc.push({from: arr[i - 1].to, to: from});
      if (i === arr.length - 1 && to < 0xFFFFFFFF) acc.push({from: to, to: 0x100000000});
      return acc;
    }, [])

    .reduce((acc, {from, to}) => acc + to - from - 1, 0);
}

// == ASSERTS ==

console.assert(part1("5-8\n0-2\n4-7") === 3);

console.assert(part2("5-8\n0-2\n4-7") === 0x100000000 - 8);
