// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(id => id.split(",").map(Number));

  let manhattanDistance = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]) + Math.abs(a[3] - b[3]);

  let constellations = [[input.shift()]];

  input.forEach(point => {
    let possibleConstellations = constellations.filter(constellation => constellation.some(w => manhattanDistance(w, point) <= 3));

    if (possibleConstellations.length === 0) {
      constellations.push([point]);
    } else {
      constellations = constellations.filter(constellation => !possibleConstellations.includes(constellation));
      constellations.push(possibleConstellations.reduce((acc, constellation) => [...acc, ...constellation], [point]));
    }
  });

  return constellations.length;
}

// == PART 2 ==

// Underflow triggered :)

// == ASSERTS ==

console.assert(part1("0,0,0,0\n3,0,0,0\n0,3,0,0\n0,0,3,0\n0,0,0,3\n0,0,0,6\n9,0,0,0\n12,0,0,0") === 2);
console.assert(part1("-1,2,2,0\n0,0,2,-2\n0,0,0,-2\n-1,2,0,0\n-2,-2,-2,2\n3,0,2,-1\n-1,3,2,2\n-1,0,-1,0\n0,2,1,-2\n3,0,0,0") === 4);
console.assert(part1("1,-1,0,1\n2,0,-1,0\n3,2,-1,0\n0,0,3,1\n0,0,-1,-1\n2,3,-2,0\n-2,2,0,0\n2,-2,0,-1\n1,-1,0,-1\n3,2,0,2") === 3);
console.assert(part1("1,-1,-1,-2\n-2,-2,0,1\n0,2,1,3\n-2,3,-2,1\n0,2,3,-2\n-1,-1,1,-2\n0,-2,-1,0\n-2,2,3,-1\n1,2,2,0\n-1,-2,0,-2") === 8);
