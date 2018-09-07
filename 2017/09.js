// == PART 1 ==

function part1(input) {
  input = input
    .replace(/!./g, "")
    .replace(/<[^>]*>/g, "");

  let groupCount = [];

  while (input.indexOf("{") > -1) {
    input = input.replace(/\{[^{}]*}/, (group, index) => {
      let rank = input.substring(0, index).split("{").length;
      groupCount[rank] = groupCount[rank] || 0;
      groupCount[rank]++;
    });
  }

  return groupCount.reduce((acc, count, rank) => acc + (count * rank), 0);
}

// == PART 2 ==

function part2(input) {
  let garbageLength = 0;

  input
    .replace(/!./g, "")
    .replace(/<([^>]*)>/g, (_, garbage) => garbageLength += garbage.length);

  return garbageLength;
}

// == ASSERTS ==

console.assert(part1("{}") === 1);
console.assert(part1("{{{}}}") === 6);
console.assert(part1("{{},{}}") === 5);
console.assert(part1("{{{},{},{{}}}}") === 16);
console.assert(part1("{<a>,<a>,<a>,<a>}") === 1);
console.assert(part1("{{<ab>},{<ab>},{<ab>},{<ab>}}") === 9);
console.assert(part1("{{<!!>},{<!!>},{<!!>},{<!!>}}") === 9);
console.assert(part1("{{<a!>},{<a!>},{<a!>},{<ab>}}") === 3);

console.assert(part2("<>") === 0);
console.assert(part2("<random characters>") === 17);
console.assert(part2("<<<<>") === 3);
console.assert(part2("<{!>}>") === 2);
console.assert(part2("<!!>") === 0);
console.assert(part2("<!!!>>") === 0);
console.assert(part2("<{o'i!a,<{i<a>") === 10);
