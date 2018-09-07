// == PART 1 & 2 ==

function aoc_day11(floors) {
  let visited = new Map();
  let minLen = Infinity;

  let getElevatorContentVariants = set => set.reduce((results, member, i) => [...results, [member], ...set.slice(i + 1).map(member2 => [member, member2])], []);
  let getFloorsAsString = (floors, ele) => floors.map(e => e.sort().join("/").replace(/(\w)G\/\1M/g, "AA").split("/").sort().join("/")).join(",") + ";" + ele;
  let checkValidity = floors => floors.every(floor => floor.filter(f => f[1] === "G").length === 0 || floor.filter(f => f[1] === "M").every(f => floor.indexOf(f[0] + "G") > -1));

  (function checkNext(steps, floors, elevator) {
    if (steps >= minLen) return;

    let key = getFloorsAsString(floors, elevator);
    if (visited.get(key) && visited.get(key) <= steps) return;
    visited.set(key, steps);

    if (floors.slice(0, -1).every(floor => floor.length === 0)) {
      minLen = steps;
    } else {
      for (let direction of [1, -1]) {
        if (direction === 1 && elevator === 3) continue;
        if (direction === -1 && elevator === 0) continue;

        for (let elevatorContent of getElevatorContentVariants(floors[elevator])) {
          let newFloors = floors.map(e => [...e]);
          newFloors[elevator] = newFloors[elevator].filter(f => elevatorContent.indexOf(f) < 0);
          newFloors[elevator + direction] = [...newFloors[elevator + direction], ...elevatorContent];

          if (checkValidity(newFloors)) {
            checkNext(steps + 1, newFloors, elevator + direction);
          }
        }
      }
    }
  })(0, floors, 0);

  return minLen;
}

// == ASSERTS ==

console.assert(aoc_day11([["HM", "LM"], ["HG"], ["LG"],[]]) === 11);
