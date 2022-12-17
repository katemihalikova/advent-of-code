// == SHARED ==

const rocks = [
  y => [[2,y],[3,y],[4,y],[5,y]],
  y => [[3,y],[2,y+1],[3,y+1],[4,y+1],[3,y+2]],
  y => [[2,y],[3,y],[4,y],[4,y+1],[4,y+2]],
  y => [[2,y],[2,y+1],[2,y+2],[2,y+3]],
  y => [[2,y],[3,y],[2,y+1],[3,y+1]],
];

// == PART 1 ==

function part1(jets) {
  let jetIndex = 0;
  let rockIndex = 0;

  let cave = [Array(7).fill("-")];

  for (let rock = 1; rock <= 2022; rock++) {

    // generate new rock
    let nextRock = rocks[rockIndex++ % rocks.length](cave.length + 3);

    while (true) {
      // apply jet, if possible
      let jetDirection = jets[jetIndex++ % jets.length];
      let pushedRock = nextRock.map(([x,y]) => [x + (jetDirection === ">" ? 1 : -1), y]);

      if (pushedRock.every(([x,y]) => (!cave[y] || !cave[y][x]) && x >= 0 && x < 7)) {
        nextRock = pushedRock;
      }

      // fall down, if possible
      let fallenRock = nextRock.map(([x,y]) => [x, y - 1]);

      if (fallenRock.every(([x,y]) => !cave[y] || !cave[y][x])) {
        nextRock = fallenRock;
      } else {
        nextRock.forEach(([x,y]) => {
          cave[y] = cave[y] || Array(7);
          cave[y][x] = "#";
        });
        break;
      }
    }
  }

  return cave.length - 1;
}

// == PART 2 ==

function part2(jets) {
  let jetIndex = 0;
  let rockIndex = 0;

  let cave = [Array(7).fill("-")];

  let computedHeight = 0;
  let getHeight = () => computedHeight + cave.length - 1;

  let totalRocks = 1000000000000;

  let rockWhenRepeatStarted;
  let heightWhenRepeatStarted;

  // "set" is a fair guess of a minimal number of rocks that are needed for the game to play the same again
  let rocksInRepeatingSet = jets.length * rocks.length;

  // "mega set" is a number of sets after which the game plays exactly the same again; it is a *magical constant* that was manually derived from running the simulation for a decent time
  let setsInMegaSet = jets.length < 100 ? 7 : 349;

  for (let rock = 1; rock <= totalRocks; rock++) {
    // if we are at the end of the first repeating set, ignore it (it might be different because of starting floor) and just save some data for later
    if (rock / rocksInRepeatingSet === 1) {
      rockWhenRepeatStarted = rock;
      heightWhenRepeatStarted = getHeight();
    
    // if this is a follow-up set...
    } else if (rock % rocksInRepeatingSet === 0) {
      let rocksSinceStartOfRepeat = rock - rockWhenRepeatStarted;

      // ...that also wraps up a mega set...
      if (rocksSinceStartOfRepeat % setsInMegaSet === 0) {
        let megaSetRocks = rocksSinceStartOfRepeat;
        let megaSetHeight = getHeight() - heightWhenRepeatStarted;

        // ...then calculate all future megasets instead of actually running them
        let calculatedMegaSetCount = Math.floor((totalRocks - rock) / megaSetRocks);
        rock += calculatedMegaSetCount * megaSetRocks;
        computedHeight += calculatedMegaSetCount * megaSetHeight;
      }
    }

    // generate new rock
    let nextRock = rocks[rockIndex++ % rocks.length](cave.length + 3);

    while (true) {
      // apply jet, if possible
      let jetDirection = jets[jetIndex++ % jets.length];
      let pushedRock = nextRock.map(([x,y]) => [x + (jetDirection === ">" ? 1 : -1), y]);

      if (pushedRock.every(([x,y]) => (!cave[y] || !cave[y][x]) && x >= 0 && x < 7)) {
        nextRock = pushedRock;
      }

      // fall down, if possible
      let fallenRock = nextRock.map(([x,y]) => [x, y - 1]);

      if (fallenRock.every(([x,y]) => !cave[y] || !cave[y][x])) {
        nextRock = fallenRock;
      } else {
        nextRock.forEach(([x,y]) => {
          cave[y] = cave[y] || Array(7);
          cave[y][x] = "#";
        });
        break;
      }
    }

    // fair guess that bottom 100 lines of any 200 lines are safe to remove
    if (cave.length > 200) {
      cave = cave.slice(100);
      computedHeight += 100;
    }
  }

  return getHeight();
}

// == ASSERTS ==

console.assert(part1(">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>") === 3068);

console.assert(part2(">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>") === 1514285714288);
