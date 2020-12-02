// == PART 1 ==

function part1(input) {
  return input
    .split("\n")
    .map(line => {
      let [, from, to, letter, password] = line.match(/^(\d+)-(\d+) (\w): (.+)$/);
      from = Number(from);
      to = Number(to);
      return {from, to, letter, password};
    })

    .filter(({from, to, letter, password}) => {
      let letterCount = password.replace(new RegExp(`[^${letter}]`, "g"), "").length;
      return letterCount >= from && letterCount <= to;
    })
    .length;
}

// == PART 2 ==

function part2(input) {
  return input
    .split("\n")
    .map(line => {
      let [, pos1, pos2, letter, password] = line.match(/^(\d+)-(\d+) (\w): (.+)$/);
      pos1 = Number(pos1) - 1;
      pos2 = Number(pos2) - 1;
      return {pos1, pos2, letter, password};
    })

    .filter(({pos1, pos2, letter, password}) => (password[pos1] === letter) !== (password[pos2] === letter)).length;
}

// == ASSERTS ==

console.assert(part1("1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc") === 2);

console.assert(part2("1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc") === 1);
