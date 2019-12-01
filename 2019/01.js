// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(Number);

  return input.reduce((acc, mass) => acc + Math.floor(mass / 3) - 2, 0);
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(Number);

  let getFuelForMass = mass => {
    let fuel = Math.floor(mass / 3) - 2;
    if (fuel <= 0) return 0;
    return fuel + getFuelForMass(fuel);
  }

  return input.reduce((acc, mass) => acc + getFuelForMass(mass), 0);
}

// == ASSERTS ==

console.assert(part1("12") === 2);
console.assert(part1("14") === 2);
console.assert(part1("1969") === 654);
console.assert(part1("100756") === 33583);
console.assert(part1("1969\n100756") === 654 + 33583);

console.assert(part2("14") === 2);
console.assert(part2("1969") === 966);
console.assert(part2("100756") === 50346);
console.assert(part2("1969\n100756") === 966 + 50346);
