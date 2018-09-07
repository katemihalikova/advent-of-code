// == PART 1+2 ==

function aoc_day15(input) {
  for (let i = 0;; i++) {
    if (input.map(e => (e.position + e.disc + i) % e.positions).filter(e => e !== 0).length === 0) {
      return i;
    }
  }
}

// == ASSERTS ==

console.assert(aoc_day15([{disc: 1, positions: 5, position: 4}, {disc: 2, positions: 2, position: 1}]) === 5);

console.assert(aoc_day15([{disc: 1, positions: 5, position: 4}, {disc: 2, positions: 2, position: 1}, {disc: 3, positions: 11, position: 0}]) === 85);
