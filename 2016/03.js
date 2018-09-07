// == PART 1 ==

function aoc_day3_part1(input) {
  input = input.split("\n").map(e => e.trim().split(/\s+/).map(f => Number(f)));

  return input.sort((a, b) => a - b).filter(e => e[0] + e[1] > e[2]).length;
}

// == PART 2 ==

function aoc_day3_part2(input) {
  input = input.split("\n").map(e => e.trim().split(/\s+/).map(f => Number(f)));

  return input.reduce((res, _, key, arr) => {
    if (key % 3 == 0) {
      for (let i = 0; i < 3; i++) {
        res.push([arr[key][i], arr[key + 1][i], arr[key + 2][i]].sort((a, b) => a - b))
      }
    }
    return res;
  }, []).filter(e => e[0] + e[1] > e[2]).length;
}

// == ASSERTS == (no examples provided, adding my own example)

console.assert(aoc_day3_part1("  566  477  376\n  505  488  365\n   50   18  156") === 2);

console.assert(aoc_day3_part2("  566  477  376\n  505  488  365\n   50   18  156") === 2);
