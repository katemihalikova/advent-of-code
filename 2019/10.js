// == SHARED ==

function processAsteroids(input) {
  input = input.split("\n").map(line => line.split(""));

  let asteroids = input.reduce((acc, row, y) => {
    row.forEach((ast, x) => {
      if (ast === "#") acc.push({x, y});
    });
    return acc;
  }, []);

  asteroids.forEach(asteroid => {
    asteroid.asteroidsInSight = asteroids.filter(checkedAsteroid => {
      if (checkedAsteroid === asteroid) return false;

      let inclination = getInclination(asteroid, checkedAsteroid);
      let quadrant = getQuadrant(asteroid, checkedAsteroid);
      let distance = getDistance(asteroid, checkedAsteroid);

      return asteroids.every(collisionAsteroid => {
        if (collisionAsteroid === asteroid || collisionAsteroid === checkedAsteroid) return true;

        let inclinationWithCollision = getInclination(asteroid, collisionAsteroid);
        let quadrantWithCollision = getQuadrant(asteroid, collisionAsteroid);
        let distanceWithCollision = getDistance(asteroid, collisionAsteroid);
        
        // comparing inclination and quadrant is 15× faster than computing arctangent and comparing angles
        return inclination !== inclinationWithCollision || quadrant !== quadrantWithCollision || distance < distanceWithCollision;
      });
    }).length;
  });

  asteroids.reduce((bestAsteroid, asteroid) => asteroid.asteroidsInSight > bestAsteroid.asteroidsInSight ? asteroid : bestAsteroid).isIMS = true;

  return asteroids;
}

function getInclination({x: x1, y: y1}, {x: x2, y: y2}) {
  let dx = x1 - x2, dy = y1 - y2;
  return Math.abs(dx / dy);
}

function getQuadrant({x: x1, y: y1}, {x: x2, y: y2}) {
  let dx = x1 - x2, dy = y1 - y2;
  if (dx <= 0 && dy > 0) return 'TR';
  if (dx < 0 && dy <= 0) return 'BR';
  if (dx >= 0 && dy < 0) return 'BL';
  return 'TL';
}

function getAngle({x: x1, y: y1}, {x: x2, y: y2}) {
  let dx = x1 - x2, dy = y1 - y2;
  let angle = (Math.atan2(dx, -dy) + Math.PI) % (2 * Math.PI);
  return angle.toFixed(10);
}

function getDistance({x: x1, y: y1}, {x: x2, y: y2}) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

// == PART 1 ==

function part1(input) {
  return processAsteroids(input)
    .find(({isIMS}) => isIMS)
    .asteroidsInSight;
}

// == PART 2 ==

function part2(input, lookingFor = 200) {
  let asteroids = processAsteroids(input);
  let IMS = asteroids.find(({isIMS}) => isIMS);
  asteroids = asteroids.filter(({isIMS}) => !isIMS);

  asteroids.forEach(asteroid => {
    asteroid.angle = getAngle(IMS, asteroid);
    asteroid.distance = getDistance(IMS, asteroid);
  });

  let groupedAsteroids = asteroids.reduce((acc, asteroid) => {
    acc[asteroid.angle] = acc[asteroid.angle] || [];
    acc[asteroid.angle].push(asteroid);
    return acc;
  }, {})
  groupedAsteroids = Object.keys(groupedAsteroids)
    .sort((a, b) => a - b)
    .map(group => groupedAsteroids[group].sort((a, b) => a.distance - b.distance));

  for (let counter = 0; counter < asteroids.length;) {
    for (let group of groupedAsteroids) {
      let asteroid = group.shift();
      if (asteroid) {
        counter++;
        if (counter === lookingFor) return asteroid.x * 100 + asteroid.y;
      }
    }
  }
}

// == ASSERTS ==

let map1 = `
.#..#
.....
#####
....#
...##
`.trim();
console.assert(part1(map1) === 8);

let map2 = `
......#.#.
#..#.#....
..#######.
.#.#.###..
.#..#.....
..#....#.#
#..#....#.
.##.#..###
##...#..#.
.#....####
`.trim();
console.assert(part1(map2) === 33);

let map3 = `
#.#...#.#.
.###....#.
.#....#...
##.#.#.#.#
....#.#.#.
.##..###.#
..#...##..
..##....##
......#...
.####.###.
`.trim();
console.assert(part1(map3) === 35);

let map4 = `
.#..#..###
####.###.#
....###.#.
..###.##.#
##.##.#.#.
....###..#
..#.#..#.#
#..#.#.###
.##...##.#
.....#.#..
`.trim();
console.assert(part1(map4) === 41);

let map5 = `
.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##
`.trim();
console.assert(part1(map5) === 210);

let map6 = `
.#....#####...#..
##...##.#####..##
##...#...#.#####.
..#.....#...###..
..#.#.....#....##
`.trim(); // 8,3
console.assert(part2(map6, 1) === 801);
console.assert(part2(map6, 2) === 900);
console.assert(part2(map6, 3) === 901);
console.assert(part2(map6, 4) === 1000);
console.assert(part2(map6, 5) === 902);
console.assert(part2(map6, 6) === 1101);
console.assert(part2(map6, 7) === 1201);
console.assert(part2(map6, 8) === 1102);
console.assert(part2(map6, 9) === 1501);
console.assert(part2(map6, 10) === 1202);
console.assert(part2(map6, 11) === 1302);
console.assert(part2(map6, 12) === 1402);
console.assert(part2(map6, 13) === 1502);
console.assert(part2(map6, 14) === 1203);
console.assert(part2(map6, 15) === 1604);
console.assert(part2(map6, 16) === 1504);
console.assert(part2(map6, 17) === 1004);
console.assert(part2(map6, 18) === 404);
console.assert(part2(map6, 19) === 204);
console.assert(part2(map6, 20) === 203);
console.assert(part2(map6, 21) === 2);
console.assert(part2(map6, 22) === 102);
console.assert(part2(map6, 23) === 1);
console.assert(part2(map6, 24) === 101);
console.assert(part2(map6, 25) === 502);
console.assert(part2(map6, 26) === 100);
console.assert(part2(map6, 27) === 501);
console.assert(part2(map6, 28) === 601);
console.assert(part2(map6, 29) === 600);
console.assert(part2(map6, 30) === 700);
console.assert(part2(map6, 31) === 800);
console.assert(part2(map6, 32) === 1001);
console.assert(part2(map6, 33) === 1400);
console.assert(part2(map6, 34) === 1601);
console.assert(part2(map6, 35) === 1303);
console.assert(part2(map6, 36) === 1403);

console.assert(part2(map5, 1) === 1112);
console.assert(part2(map5, 2) === 1201);
console.assert(part2(map5, 3) === 1202);
console.assert(part2(map5, 10) === 1208);
console.assert(part2(map5, 20) === 1600);
console.assert(part2(map5, 50) === 1609);
console.assert(part2(map5, 100) === 1016);
console.assert(part2(map5, 199) === 906);
console.assert(part2(map5, 200) === 802);
console.assert(part2(map5, 201) === 1009);
console.assert(part2(map5, 299) === 1101);
