// == PART 1 ==

function part1(input) {
  return input.match(/(.)(?!.{0,2}\1)(.)(?!.?\2)(.)(?!\3)/).index + 4;
}

// == PART 2 ==

function part2(input) {
  return input.match(/(.)(?!.{0,12}\1)(.)(?!.{0,11}\2)(.)(?!.{0,10}\3)(.)(?!.{0,9}\4)(.)(?!.{0,8}\5)(.)(?!.{0,7}\6)(.)(?!.{0,6}\7)(.)(?!.{0,5}\8)(.)(?!.{0,4}\9)(.)(?!.{0,3}\10)(.)(?!.{0,2}\11)(.)(?!.?\12)(.)(?!\13)/).index + 14;
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
