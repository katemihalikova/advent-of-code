// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(row => row.split("\t"));

  return input.reduce((checksum, row) => checksum + Math.max(...row) - Math.min(...row), 0);
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(row => row.split("\t"));

  return input.reduce((checksum, row) => {
    row.forEach(nr1 => {
      row.forEach(nr2 => {
        let div = nr1 / nr2;
        if (Math.floor(div) === div && div !== 1) {
          checksum += div;
        }
      })
    })
    return checksum;
  }, 0);
}

// == ASSERTS ==

console.assert(part1("5\t1\t9\t5\n7\t5\t3\n2\t4\t6\t8") === 18);

console.assert(part2("5\t9\t2\t8\n9\t4\t7\t3\n3\t8\t6\t5") === 9);
