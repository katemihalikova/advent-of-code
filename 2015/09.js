const permute = require("permute");

// == PART 1 ==

function part1(input) {
  let distances = {};

  input.split("\n").forEach(l => {
    let [, from, to, distance] = l.match(/^(\w+) to (\w+) = (\d+)$/);
    distances[from] = distances[from] || {};
    distances[to] = distances[to] || {};
    distances[from][to] = +distance;
    distances[to][from] = +distance;
  });

  let places = Object.keys(distances).sort();
  let minDistance = Infinity;

  do {
    minDistance = Math.min(minDistance, places
      .map((place, i) => i > 0 ? distances[place][places[i - 1]] : 0)
      .reduce((a, b) => a + b, 0));
  } while(permute(places));


  return minDistance;
}

// == PART 2 ==

function part2(input) {
  let distances = {};

  input.split("\n").forEach(l => {
    let [, from, to, distance] = l.match(/^(\w+) to (\w+) = (\d+)$/);
    distances[from] = distances[from] || {};
    distances[to] = distances[to] || {};
    distances[from][to] = +distance;
    distances[to][from] = +distance;
  });

  let places = Object.keys(distances).sort();
  let maxDistance = 0;

  do {
    maxDistance = Math.max(maxDistance, places
      .map((place, i) => i > 0 ? distances[place][places[i - 1]] : 0)
      .reduce((a, b) => a + b, 0));
  } while(permute(places));

  return maxDistance;
}

// == ASSERTS ==

console.assert(part1("London to Dublin = 464\nLondon to Belfast = 518\nDublin to Belfast = 141") === 605);

console.assert(part2("London to Dublin = 464\nLondon to Belfast = 518\nDublin to Belfast = 141") === 982);
