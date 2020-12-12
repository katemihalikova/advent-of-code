// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(line => {
    let [, direction, distanceOrAngle] = line.match(/^(\w)(\d+)$/);
    distanceOrAngle = Number(distanceOrAngle);
    return {direction, distanceOrAngle};
  });

  let x = 0, y = 0, facingDirection = "E";
  let leftTurnDirections = ["E", "N", "W", "S", "E", "N", "W"];
  let rightTurnDirections = ["E", "S", "W", "N", "E", "S", "W"];

  input.forEach(({direction, distanceOrAngle}) => {
    if (direction === "L") facingDirection = leftTurnDirections.slice(leftTurnDirections.indexOf(facingDirection))[distanceOrAngle / 90];
    if (direction === "R") facingDirection = rightTurnDirections.slice(rightTurnDirections.indexOf(facingDirection))[distanceOrAngle / 90];
    if (direction === "F") direction = facingDirection;
    if (direction === "N") y += distanceOrAngle;
    if (direction === "S") y -= distanceOrAngle;
    if (direction === "E") x += distanceOrAngle;
    if (direction === "W") x -= distanceOrAngle;
  })

  return Math.abs(x) + Math.abs(y);
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(line => {
    let [, direction, distanceOrAngle] = line.match(/^(\w)(\d+)$/);
    distanceOrAngle = Number(distanceOrAngle);
    return {direction, distanceOrAngle};
  });

  let x = 0, y = 0, wx = 10, wy = 1;

  input.forEach(({direction, distanceOrAngle}) => {
    if (direction === "L") {
      for (let i = 1; i <= distanceOrAngle / 90; i++) [wx, wy] = [-wy, wx];
    }
    if (direction === "R") {
      for (let i = 1; i <= distanceOrAngle / 90; i++) [wx, wy] = [wy, -wx];
    }
    if (direction === "F") {
      x += distanceOrAngle * wx;
      y += distanceOrAngle * wy;
    }
    if (direction === "N") wy += distanceOrAngle;
    if (direction === "S") wy -= distanceOrAngle;
    if (direction === "E") wx += distanceOrAngle;
    if (direction === "W") wx -= distanceOrAngle;
  })

  return Math.abs(x) + Math.abs(y);
}

// == ASSERTS ==

console.assert(part1("F10\nN3\nF7\nR90\nF11") === 25);
console.assert(part2("F10\nN3\nF7\nR90\nF11") === 286);
