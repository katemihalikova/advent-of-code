// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(id => id.split(")")).reduce((tree, [orbitedObject, object]) => ({...tree, [object]: orbitedObject}), {});

  let checksum = 0;

  for (let object in input) {
    while(object) {
      object = input[object];
      object && checksum++;
    }
  }

  return checksum;
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(id => id.split(")")).reduce((tree, [orbitedObject, object]) => ({...tree, [object]: orbitedObject}), {});

  let youPath = [];
  let sanPath = [];

  let object = 'YOU';
  while(object) {
    object = input[object];
    youPath.push(object);
  }

  object = 'SAN';
  while(!youPath.includes(object)) {
    object = input[object];
    sanPath.push(object);
  }

  return sanPath.length + youPath.indexOf(object) - 1;
}

// == ASSERTS ==

console.assert(part1("COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L") === 42);

console.assert(part2("COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L\nK)YOU\nI)SAN") === 4);
