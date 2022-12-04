// == PART 1 ==

function part1(input) {
  return input
    .split("\n").map(line => line.split(/\D/).map(Number))
  
    .filter(([start1, end1, start2, end2]) => (start2 >= start1 && end2 <= end1) || (start2 <= start1 && end2 >= end1))
    .length;
}

// == PART 2 ==

function part2(input) {
  return input
    .split("\n")
    .map(line => line.split(/\D/).map(Number))

    .filter(([start1, end1, start2, end2]) => end1 >= start2 && start1 <= end2)
    .length;
}

// == ASSERTS ==

console.assert(part1(`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`) === 2);

console.assert(part2(`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`) === 4);
