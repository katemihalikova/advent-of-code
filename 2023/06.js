// == PART 1 ==

function part1(input) {
  let [times, recordDistances] = input
    .split("\n")
    .map(line => [...line.matchAll(/\d+/g)].map(Number));

  return times.reduce((product, time, i) => {
    let recordDistance = recordDistances[i];

    let recordBeaten = 0;
    for (let hold = 1; hold < time; hold++) {
      if (hold * (time - hold) > recordDistance) {
        recordBeaten++;
      }
    }

    return product * recordBeaten;
  }, 1);
}

// == PART 2 ==

function part2(input) {
  return part1(input.replaceAll(" ", ""));
}

// == ASSERTS ==

console.assert(part1("Time:      7  15   30\nDistance:  9  40  200") === 288);

console.assert(part2("Time:      7  15   30\nDistance:  9  40  200") === 71503);
