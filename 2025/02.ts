// == PART 1 ==

function part1(input: string): number {
  return input
    .split(",")
    .map(range => range.split("-").map(Number))
    .reduce((sum, [firstId, lastId]) => {
      for (let id = firstId; id <= lastId; id++) {
        if (String(id).match(/^(\d+)\1$/)) sum += id;
      }
      return sum;
    }, 0);
}

// == PART 2 ==

function part2(input: string): number {
  return input
    .split(",")
    .map(range => range.split("-").map(Number))
    .reduce((sum, [firstId, lastId]) => {
      for (let id = firstId; id <= lastId; id++) {
        if (String(id).match(/^(\d+)\1+$/)) sum += id;
      }
      return sum;
    }, 0);
}

// == ASSERTS ==

console.assert(part1(`11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`) === 1227775554);

console.assert(part2(`11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`) === 4174379265);
