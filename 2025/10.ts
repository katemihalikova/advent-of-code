import { init } from 'z3-solver';

// == PART 1 ==

async function part1(input: string): Promise<number> {
  let { Context } = await init();

  let machines = input
    .split("\n")
    .map(line => ({
      indicators: line.match(/\[(.+?)\]/)![1].split("").map(button => button === "#"),
      buttons: line.matchAll(/\((.+?)\)/g).toArray().map(([, match]) => match.split(",").map(Number)),
    }));

  let pressesPerMachine = await Promise.all(machines.map(async ({indicators, buttons}, id) => {
    let { Optimize, Int } = Context(`machine${id}`);
    let optimizer = new Optimize();

    let buttonVariables = buttons.map((_, position) => Int.const(`button${position}`));

    for (let buttonVariable of buttonVariables) {
      optimizer.add(buttonVariable.ge(0));
    }

    indicators.forEach((wantedIndicator, index) => {
      optimizer.add(buttonVariables
        .filter((_, position) => buttons[position].includes(index))
        .reduce((expression, variable) => expression.add(variable), Int.val(0))
        .mod(Int.val(2))
        .eq(Int.val(wantedIndicator ? 1 : 0))
      );
    });

    optimizer.minimize(buttonVariables.reduce((expression, variable) => expression.add(variable), Int.val(0)));

    if (await optimizer.check() !== "sat") throw `Solution not found for machine ${id}.`;

    let model = optimizer.model();
    return buttonVariables
      .map(variable => Number(model.get(variable).sexpr()))
      .reduce((sum, value) => sum + value, 0);
  }));

  return pressesPerMachine.reduce((totalPresses, presses) => totalPresses + presses, 0);
}

// == PART 2 ==

async function part2(input: string): Promise<number> {
  let { Context } = await init();

  let machines = input
    .split("\n")
    .map(line => ({
      joltageLevels: line.match(/\{(.+?)\}/)![1].split(",").map(Number),
      buttons: line.matchAll(/\((.+?)\)/g).toArray().map(([, match]) => match.split(",").map(Number)),
    }));

  let pressesPerMachine = await Promise.all(machines.map(async ({joltageLevels, buttons}, id) => {
    let { Optimize, Int } = Context(`machine${id}`);
    let optimizer = new Optimize();

    let buttonVariables = buttons.map((_, position) => Int.const(`button${position}`));

    for (let buttonVariable of buttonVariables) {
      optimizer.add(buttonVariable.ge(0));
    }

    joltageLevels.forEach((wantedJoltageLevel, index) => {
      optimizer.add(buttonVariables
        .filter((_, position) => buttons[position].includes(index))
        .reduce((expression, variable) => expression.add(variable), Int.val(0))
        .eq(Int.val(wantedJoltageLevel))
      );
    });

    optimizer.minimize(buttonVariables.reduce((expression, variable) => expression.add(variable), Int.val(0)));

    if (await optimizer.check() !== "sat") throw `Solution not found for machine ${id}.`;

    let model = optimizer.model();
    return buttonVariables
      .map(variable => Number(model.get(variable).sexpr()))
      .reduce((sum, value) => sum + value, 0);
  }));

  return pressesPerMachine.reduce((totalPresses, presses) => totalPresses + presses, 0);
}

// == ASSERTS ==

console.assert(await part1(`\
[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`) === 7);

console.assert(await part2(`\
[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`) === 33);
