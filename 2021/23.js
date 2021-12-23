// == CLASSES ==

class AmphipodBurrow {
  #hallway = [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY];
  #rooms = {A: [], B: [], C: [], D: []};
  #power = 0;
  #roomSize;

  get power() {
    return this.#power;
  }

  constructor(amphipods = []) {
    amphipods.forEach((amphipod, index) => this.#rooms[AMPHIPOD_LETTERS[index % 4]].unshift(amphipod));
    this.#roomSize = this.#rooms.A.length;
  }

  move([from, to, length]) {
    if (typeof from === "number") { // going into room
      this.#rooms[to].push(to);
      this.#hallway[from] = EMPTY;
      this.#power += (length + this.#roomSize - this.#rooms[to].length) * AMPHIPOD_ENERGY[to];
    } else { // going out of room
      let amphipod = this.#rooms[from].pop();
      this.#hallway[to] = amphipod;
      this.#power += (length + this.#roomSize - this.#rooms[from].length - 1) * AMPHIPOD_ENERGY[amphipod];
    }
  }

  getValidPaths() {
    return AMPHIPOD_LETTERS.flatMap(roomLetter => {
      if (this.#rooms[roomLetter].every(amphipod => amphipod === roomLetter)) { // going into room
        return this.#hallway
          .map((amphipod, hallwayIndex) => [amphipod, hallwayIndex])
          .filter(([amphipod]) => amphipod === roomLetter)
          .map(([, hallwayIndex]) => POSSIBLE_PATHS[roomLetter].find(([index]) => index === hallwayIndex))
          .filter(([,, spacesThatMustBeClear]) => spacesThatMustBeClear.every(this.#isHallwaySpaceEmpty))
          .map(([hallwayIndex, length]) => [hallwayIndex, roomLetter, length]);
      } else { // going out of room
        return POSSIBLE_PATHS[roomLetter]
          .filter(([hallwayIndex,, spacesThatMustBeClear]) => this.#isHallwaySpaceEmpty(hallwayIndex) && spacesThatMustBeClear.every(this.#isHallwaySpaceEmpty))
          .map(([hallwayIndex, length]) => [roomLetter, hallwayIndex, length]);
      }
    });
  }

  isOrganized() {
    return this.#hallway.every(space => space === EMPTY) && Object.entries(this.#rooms).every(([roomLetter, room]) => room.every(amphipod => amphipod === roomLetter));
  }

  clone() {
    let burrow = new AmphipodBurrow();
    burrow.#rooms = {A: [...this.#rooms.A], B: [...this.#rooms.B], C: [...this.#rooms.C], D: [...this.#rooms.D]};
    burrow.#hallway = [...this.#hallway];
    burrow.#power = this.#power;
    burrow.#roomSize = this.#roomSize;
    return burrow;
  }

  #isHallwaySpaceEmpty = index => this.#hallway[index] === EMPTY;

  toString() {
    return [...Object.values(this.#rooms), this.#hallway].map(String).join("|");
  }
}

// == SHARED ==

const AMPHIPOD_LETTERS = ["A", "B", "C", "D"];

const EMPTY = ".";

const AMPHIPOD_ENERGY = {
  A: 1,
  B: 10,
  C: 100,
  D: 1000,
};

const POSSIBLE_PATHS = {
  A: [
    [0, 3, [1]],
    [1, 2, []],
    [2, 2, []],
    [3, 4, [2]],
    [4, 6, [2,3]],
    [5, 8, [2,3,4]],
    [6, 9, [2,3,4,5]],
  ],
  B: [
    [0, 5, [1,2]],
    [1, 4, [2]],
    [2, 2, []],
    [3, 2, []],
    [4, 4, [3]],
    [5, 6, [3,4]],
    [6, 7, [3,4,5]],
  ],
  C: [
    [0, 7, [1,2,3]],
    [1, 6, [2,3]],
    [2, 4, [3]],
    [3, 2, []],
    [4, 2, []],
    [5, 4, [4]],
    [6, 5, [4,5]],
  ],
  D: [
    [0, 9, [1,2,3,4]],
    [1, 8, [2,3,4]],
    [2, 6, [3,4]],
    [3, 4, [4]],
    [4, 2, []],
    [5, 2, []],
    [6, 3, [5]],
  ],
};

function getMinimalEnergyOfOrganizing(burrow) {
  let seenBurrows = {};
  let minPower = Infinity;

  function runIteration(previousBurrow) {
    for (let path of previousBurrow.getValidPaths()) {
      let burrow = previousBurrow.clone();
      burrow.move(path);

      if (burrow in seenBurrows && seenBurrows[burrow] <= burrow.power) continue;
      seenBurrows[burrow] = burrow.power;

      if (burrow.isOrganized()) {
        if (burrow.power < minPower) minPower = burrow.power;
      } else {
        runIteration(burrow);
      }
    }
  }

  runIteration(burrow);

  return minPower;
}

// == PART 1 ==

function part1(input) {
  input = input.match(/\w/g);

  let burrow = new AmphipodBurrow(input);

  return getMinimalEnergyOfOrganizing(burrow);
}

// == PART 2 ==

function part2(input) {
  input = input.match(/\w/g);

  let burrow = new AmphipodBurrow([...input.slice(0, 4), ..."DCBADBAC", ...input.slice(4)]);

  return getMinimalEnergyOfOrganizing(burrow);
}

// == ASSERTS ==

let example = 
`#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########`;

console.assert(part1(example) === 12521);

console.assert(part2(example) === 44169);
