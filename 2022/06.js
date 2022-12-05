// == PART 1 ==

function part1(input) {
  return [...input].findIndex((_, index, array) => new Set(array.slice(index - 4, index)).size === 4);
}

// == PART 2 ==

function part2(input) {
  return [...input].findIndex((_, index, array) => new Set(array.slice(index - 14, index)).size === 14);
}

// == ASSERTS ==

console.assert(part1("mjqjpqmgbljsphdztnvjfqwrcgsmlb") === 7);
console.assert(part1("bvwbjplbgvbhsrlpgdmjqwftvncz") === 5);
console.assert(part1("nppdvjthqldpwncqszvftbrmjlhg") === 6);
console.assert(part1("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg") === 10);
console.assert(part1("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw") === 11);

console.assert(part2("mjqjpqmgbljsphdztnvjfqwrcgsmlb") === 19);
console.assert(part2("bvwbjplbgvbhsrlpgdmjqwftvncz") === 23);
console.assert(part2("nppdvjthqldpwncqszvftbrmjlhg") === 23);
console.assert(part2("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg") === 29);
console.assert(part2("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw") === 26);
