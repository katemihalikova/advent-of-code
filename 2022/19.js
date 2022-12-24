// == SHARED ==

function simulateBlueprint(blueprint, steps, rankFn, sliceCount) {
  let currentStates = [{...blueprint, ore: 0, clay: 0, obsidian: 0, geode: 0, oreRobots: 1, clayRobots: 0, obsidianRobots: 0, geodeRobots: 0}];

  for (let step = 1; step <= steps; step++) {
    let nextStates = [];

    for (let state of currentStates) {
      let canBuildOreRobot = state.ore >= state.oreRobotOreCost && state.oreRobots < Math.max(state.oreRobotOreCost, state.clayRobotOreCost, state.obsidianRobotOreCost, state.geodeRobotOreCost);
      let canBuildClayRobot = state.ore >= state.clayRobotOreCost && state.clayRobots < state.obsidianRobotClayCost;
      let canBuildObsidianRobot = state.ore >= state.obsidianRobotOreCost && state.clay >= state.obsidianRobotClayCost && state.obsidianRobots < state.geodeRobotObsidianCost;
      let canBuildGeodeRobot = state.ore >= state.geodeRobotOreCost && state.obsidian >= state.geodeRobotObsidianCost;

      state = {...state};
      state.ore += state.oreRobots;
      state.clay += state.clayRobots;
      state.obsidian += state.obsidianRobots;
      state.geode += state.geodeRobots;

      nextStates.push(state);

      if (canBuildOreRobot) {
        let newState = {...state};
        newState.ore -= newState.oreRobotOreCost;
        newState.oreRobots++;
        nextStates.push(newState);
      }
      if (canBuildClayRobot) {
        let newState = {...state};
        newState.ore -= newState.clayRobotOreCost;
        newState.clayRobots++;
        nextStates.push(newState);
      }
      if (canBuildObsidianRobot) {
        let newState = {...state};
        newState.ore -= newState.obsidianRobotOreCost;
        newState.clay -= newState.obsidianRobotClayCost;
        newState.obsidianRobots++;
        nextStates.push(newState);
      }
      if (canBuildGeodeRobot) {
        let newState = {...state};
        newState.ore -= newState.geodeRobotOreCost;
        newState.obsidian -= newState.geodeRobotObsidianCost;
        newState.geodeRobots++;
        nextStates.push(newState);
      }
    }

    nextStates = nextStates
      .sort((a, b) => rankFn(b) - rankFn(a))
      .slice(0, sliceCount);

    currentStates = nextStates;
  }

  return currentStates.reduce((maxGeode, state) => Math.max(maxGeode, state.geode), 0);
}

Array.prototype.sum = function() {
  return this.reduce((acc, el) => acc + el, 0);
}

Array.prototype.product = function() {
  return this.reduce((acc, el) => acc * el, 1);
}

// == PART 1 ==

function part1(input) {
  return input
  .split("\n")
  .map(line => {
    let [, id, oreRobotOreCost, clayRobotOreCost, obsidianRobotOreCost, obsidianRobotClayCost, geodeRobotOreCost, geodeRobotObsidianCost] =
      line.match(/^Blueprint (\d+): Each ore robot costs (\d+) ore. Each clay robot costs (\d+) ore. Each obsidian robot costs (\d+) ore and (\d+) clay. Each geode robot costs (\d+) ore and (\d+) obsidian.$/).map(Number);
    return {id, oreRobotOreCost, clayRobotOreCost, obsidianRobotOreCost, obsidianRobotClayCost, geodeRobotOreCost, geodeRobotObsidianCost};
  })

  .map(blueprint => blueprint.id * simulateBlueprint(blueprint, 24, b => 1e6 * b.geodeRobots + 1e4 * b.obsidianRobots + 1e2 * b.clayRobots + b.oreRobots, 300000))
  .sum();
}

// == PART 2 ==

function part2(input) {
  return input
    .split("\n")
    .map(line => {
      let [, id, oreRobotOreCost, clayRobotOreCost, obsidianRobotOreCost, obsidianRobotClayCost, geodeRobotOreCost, geodeRobotObsidianCost] =
        line.match(/^Blueprint (\d+): Each ore robot costs (\d+) ore. Each clay robot costs (\d+) ore. Each obsidian robot costs (\d+) ore and (\d+) clay. Each geode robot costs (\d+) ore and (\d+) obsidian.$/).map(Number);
      return {id, oreRobotOreCost, clayRobotOreCost, obsidianRobotOreCost, obsidianRobotClayCost, geodeRobotOreCost, geodeRobotObsidianCost};
    })

    .slice(0, 3)
    .map(blueprint => simulateBlueprint(blueprint, 32, b => b.oreRobots - Math.max(b.oreRobotOreCost, b.clayRobotOreCost, b.obsidianRobotOreCost, b.geodeRobotOreCost) + b.clayRobots - b.clayRobotOreCost + b.obsidianRobots - b.geodeRobotObsidianCost + b.geodeRobots * 10 + b.geode, 10000))
    .product();
}

// == ASSERTS ==

let exampleBlueprints =
`Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`;

console.assert(part1(exampleBlueprints) === 33);

console.assert(part2(exampleBlueprints) === 56 * 62);
