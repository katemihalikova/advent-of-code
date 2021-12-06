// == PART 1 ==

function part1(input, days = 80) {
  let school = input.split(",").map(Number);

  for (let day = 1; day <= days; day++) {
    school = school.flatMap(timer => timer === 0 ? [6, 8] : timer - 1);
  }

  return school.length;
}

// == PART 2 ==

function part2(input, days = 256) {
  input = input.split(",").map(Number);

  let school = Array(9).fill(0);
  input.forEach(timer => school[timer]++);

  for (let day = 1; day <= days; day++) {
    let fishesInDelivery = school.shift();

    school[6] += fishesInDelivery;
    school.push(fishesInDelivery);
  }

  return school.reduce((a, b) => a + b);
}

// == ASSERTS ==

console.assert(part1("3,4,3,1,2", 10) === 12);
console.assert(part1("3,4,3,1,2", 18) === 26);
console.assert(part1("3,4,3,1,2") === 5934);

console.assert(part2("3,4,3,1,2", 10) === 12);
console.assert(part2("3,4,3,1,2", 18) === 26);
console.assert(part2("3,4,3,1,2", 80) === 5934);
console.assert(part2("3,4,3,1,2") === 26984457539);
