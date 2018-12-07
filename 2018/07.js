// == PART 1 ==

function part1(input) {
  let dependencies = {};

  input = input.split("\n").forEach(instruction => {
    let [, before, after] = instruction.match(/^Step (\w) must be finished before step (\w) can begin.$/)

    dependencies[before] = dependencies[before] || [];
    dependencies[after] = dependencies[after] || [];
    dependencies[after].push(before);
  });

  let unfinishedSteps = Object.keys(dependencies).sort();
  let finishedSteps = [];

  while (true) {
    let possibleNextSteps = unfinishedSteps.filter(step => dependencies[step].every(dependencyStep => finishedSteps.includes(dependencyStep)));

    if (possibleNextSteps.length === 0) return finishedSteps.join("");

    let nextStep = possibleNextSteps[0];
    unfinishedSteps = unfinishedSteps.filter(step => step !== nextStep);
    finishedSteps.push(nextStep);
  }
}

// == PART 2 ==

function part2(input, workers = 5, diff = 0) {
  let dependencies = {};

  input = input.split("\n").forEach(instruction => {
    let [, before, after] = instruction.match(/^Step (\w) must be finished before step (\w) can begin.$/)

    dependencies[before] = dependencies[before] || [];
    dependencies[after] = dependencies[after] || [];
    dependencies[after].push(before);
  });

  let unfinishedSteps = Object.keys(dependencies).sort();
  let stepsInProgress = [];
  let finishedSteps = [];

  for (let totalTime = 0;; totalTime++) {
    stepsInProgress = stepsInProgress
      .map(({time, step}) => ({time: time + 1, step}))
      .filter(({time, step}) => {
        if (time < step.charCodeAt(0) - 4 + diff) {
          return true;
        } else {
          finishedSteps.push(step);
          return false;
        }
      });

    let possibleNextSteps = unfinishedSteps.filter(step => dependencies[step].every(dependencyStep => finishedSteps.includes(dependencyStep)));

    if (possibleNextSteps.length === 0 && stepsInProgress.length === 0) return totalTime;

    while (stepsInProgress.length < workers && possibleNextSteps.length > 0) {
      let nextStep = possibleNextSteps.shift();
      unfinishedSteps = unfinishedSteps.filter(step => step !== nextStep);
      stepsInProgress.push({step: nextStep, time: 0});
    }
  }
}

// == ASSERTS ==

console.assert(part1(`Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`) === "CABDFE");

console.assert(part2(`Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`, 2, -60) === 15);
