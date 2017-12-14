const knotHash = require("./10").part2;

// == PART 1 ==

function part1(input) {
  return [...Array(128).keys()]
    .map(row => {
      let hash = knotHash(`${input}-${row}`);
      let binary = "";
      for (let i = 0; i < 8; i++) {
        binary += ("0".repeat(16) + parseInt(hash.substr(i * 4, 4), 16).toString(2)).substr(-16);
      }
      return binary;
    })
    .join("")
    .replace(/0/g, "")
    .length;
}

// == PART 2 ==

function part2(input) {
  let disk = [...Array(128).keys()]
    .map(row => {
      let hash = knotHash(`${input}-${row}`);
      let binary = "";
      for (let i = 0; i < 8; i++) {
        binary += ("0".repeat(16) + parseInt(hash.substr(i * 4, 4), 16).toString(2)).substr(-16);
      }
      return binary;
    })
    .map(row => row
      .split("")
      .map(col => ({
        full: col === "1",
        regions: new Set(),
      }))
    );

  let existingRegions = new Set();

  disk.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (!cell.full) return;

      let fullCellsAround = [
        disk[y][x + 1],
        disk[y][x - 1],
        disk[y - 1] && disk[y - 1][x],
        disk[y + 1] && disk[y + 1][x],
      ].filter(c => c && c.full);

      if (fullCellsAround.some(c => c.regions.size > 0)) {
        fullCellsAround.forEach(c => c.regions.forEach(r => cell.regions.add(r)));
      } else {
        let newRegion = Symbol();
        cell.regions.add(newRegion);
        existingRegions.add(newRegion);
      }
    });
  });

  outerLoop: while(true) {
    for (let row of disk) {
      for (let cell of row) {
        if (cell.regions.size > 1) {
          let regionsToRemove = [...cell.regions];
          let regionToAdd = regionsToRemove.shift();

          for (let row of disk) {
            for (let cell of row) {
              if (regionsToRemove.some(r => cell.regions.has(r))) {
                regionsToRemove.forEach(r => cell.regions.delete(r));
                cell.regions.add(regionToAdd);
              }
            }
          }

          regionsToRemove.forEach(r => existingRegions.delete(r));

          continue outerLoop;
        }
      }
    }
    break;
  }

  return existingRegions.size;
}

// == ASSERTS ==

console.assert(part1("flqrgnkx") === 8108);

console.assert(part2("flqrgnkx") === 1242);
