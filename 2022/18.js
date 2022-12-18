// == SHARED ==

function cubeToNumbers(cube) {
  return cube.split(",").map(Number);
}

function getCubesAround(cube) {
  let [x, y, z] = cubeToNumbers(cube);
  return [
    `${x + 1},${y},${z}`,
    `${x - 1},${y},${z}`,
    `${x},${y + 1},${z}`,
    `${x},${y - 1},${z}`,
    `${x},${y},${z + 1}`,
    `${x},${y},${z - 1}`,
  ];
}

// == PART 1 ==

function part1(input) {
  return input
    .split("\n")
    .reduce((acc, cube, _, cubes) => acc + getCubesAround(cube)
      .filter(cubeAround => !cubes.includes(cubeAround))
      .length,
    0);
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n");

  let inputAsNumbers = input.map(cubeToNumbers);
  let minX = Math.min(...inputAsNumbers.map(p => p[0]));
  let maxX = Math.max(...inputAsNumbers.map(p => p[0]));
  let minY = Math.min(...inputAsNumbers.map(p => p[1]));
  let maxY = Math.max(...inputAsNumbers.map(p => p[1]));
  let minZ = Math.min(...inputAsNumbers.map(p => p[2]));
  let maxZ = Math.max(...inputAsNumbers.map(p => p[2]));

  let emptyCubesInside = new Set;

  function isOutside(coords) {
    if (input.includes(coords) || emptyCubesInside.has(coords)) return false;

    let cubesToCheckNow = new Set([coords]);
    let visitedCubes = new Set;

    while(true) {
      let cubesToCheckNext = new Set;

      for (let cube of cubesToCheckNow) {
        visitedCubes.add(cube);

        for (let cubeAround of getCubesAround(cube)) {
          if (!input.includes(cubeAround) && !visitedCubes.has(cubeAround)) {
            cubesToCheckNext.add(cubeAround);
          }
        }
      }

      if (cubesToCheckNext.size === 0) {
        visitedCubes.forEach(cube => emptyCubesInside.add(cube));
        return false;
      }

      if ([...cubesToCheckNext].map(cubeToNumbers).some(([x,y,z]) => {
        return x < minX || x > maxX || y < minY || y > maxY || z < minZ || z > maxZ;
      })) {
        return true;
      }

      cubesToCheckNow = cubesToCheckNext;
    }
  }

  return input.reduce((acc, cube) => acc + getCubesAround(cube)
    .filter(isOutside)
    .length,
  0);
}

// == ASSERTS ==

console.assert(part1("2,2,2\n1,2,2\n3,2,2\n2,1,2\n2,3,2\n2,2,1\n2,2,3\n2,2,4\n2,2,6\n1,2,5\n3,2,5\n2,1,5\n2,3,5") === 64);

console.assert(part2("2,2,2\n1,2,2\n3,2,2\n2,1,2\n2,3,2\n2,2,1\n2,2,3\n2,2,4\n2,2,6\n1,2,5\n3,2,5\n2,1,5\n2,3,5") === 58);
