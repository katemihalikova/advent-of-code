// == PART 1 ==

function part1(row, column) {
  let getNumberOfIterations = (row, column) => {
    if (row === 1 && column === 1) return 0;
    if (row === 1) return getNumberOfIterations(row, column - 1) + column;
    if (column === 1) return getNumberOfIterations(row - 1, column) + row - 1;
    return getNumberOfIterations(row - 1, column - 1) + 2 * (row - column) + 4 * (column - 1);
  };

  let initialCode = 20151125;
  let code = initialCode;
  let iterations = getNumberOfIterations(row, column);

  for (let i = 1; i <= iterations; i++) {
    code = (code * 252533) % 33554393;

    if (code === initialCode) {
      iterations = iterations % i;
      i = 0;
    }
  }

  return code;
}

// == ASSERTS ==

console.assert(part1(1, 1) === 20151125);
console.assert(part1(1, 2) === 18749137);
console.assert(part1(1, 3) === 17289845);
console.assert(part1(1, 4) === 30943339);
console.assert(part1(1, 5) === 10071777);
console.assert(part1(1, 6) === 33511524);
console.assert(part1(2, 1) === 31916031);
console.assert(part1(2, 2) === 21629792);
console.assert(part1(2, 3) === 16929656);
console.assert(part1(2, 4) === 7726640);
console.assert(part1(2, 5) === 15514188);
console.assert(part1(2, 6) === 4041754);
console.assert(part1(3, 1) === 16080970);
console.assert(part1(3, 2) === 8057251);
console.assert(part1(3, 3) === 1601130);
console.assert(part1(3, 4) === 7981243);
console.assert(part1(3, 5) === 11661866);
console.assert(part1(3, 6) === 16474243);
console.assert(part1(4, 1) === 24592653);
console.assert(part1(4, 2) === 32451966);
console.assert(part1(4, 3) === 21345942);
console.assert(part1(4, 4) === 9380097);
console.assert(part1(4, 5) === 10600672);
console.assert(part1(4, 6) === 31527494);
console.assert(part1(5, 1) === 77061);
console.assert(part1(5, 2) === 17552253);
console.assert(part1(5, 3) === 28094349);
console.assert(part1(5, 4) === 6899651);
console.assert(part1(5, 5) === 9250759);
console.assert(part1(5, 6) === 31663883);
console.assert(part1(6, 1) === 33071741);
console.assert(part1(6, 2) === 6796745);
console.assert(part1(6, 3) === 25397450);
console.assert(part1(6, 4) === 24659492);
console.assert(part1(6, 5) === 1534922);
console.assert(part1(6, 6) === 27995004);
console.assert(part1(7777, 8888) === 28465745);
console.assert(part1(6666, 4321) === 30102871);
