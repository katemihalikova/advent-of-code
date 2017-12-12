// == PART 1 ==

function part1(input) {
  let pipes = input
    .split("\n")
    .reduce((pipes, line) => {
      let [, output, inputs] = line.match(/(\d+) <-> (.*)$/);
      return [
        ...pipes,
        ...inputs.split(", ").map(input => ({output, input})),
      ];
    }, []);

  let pipedToZero = ['0'];

  while (true) {
    let newPipesAdded = false;

    pipedToZero.forEach(testedOutput => {
      pipes.forEach(({output, input}) => {
        if (testedOutput !== output) return;
        if (pipedToZero.indexOf(input) > -1) return;

        pipedToZero.push(input);
        newPipesAdded = true;
      });
    });

    if (newPipesAdded === false) break;
  }

  return pipedToZero.length;
}

// == PART 2 ==

function part2(input) {

  let existingIds = new Set();

  let pipes = input
    .split("\n")
    .reduce((pipes, line) => {
      let [, output, inputs] = line.match(/(\d+) <-> (.*)$/);
      existingIds.add(output);
      return [
        ...pipes,
        ...inputs.split(", ").map(input => ({output, input})),
      ];
    }, []);

  let processedIds = [];
  return [...existingIds]
    .reduce((numberOfGroups, id) => {
      if (processedIds.indexOf(id) === -1) {
        let pipedToId = [id];

        while (true) {
          let newPipesAdded = false;

          pipedToId.forEach(testedOutput => {
            pipes.forEach(({output, input}) => {
              if (testedOutput !== output) return;
              if (pipedToId.indexOf(input) > -1) return;

              pipedToId.push(input);
              newPipesAdded = true;
            });
          });

          if (newPipesAdded === false) break;
        }

        processedIds.push(...pipedToId);
        numberOfGroups++;
      }
      return numberOfGroups;
    }, 0);
}

// == ASSERTS ==

console.assert(part1("0 <-> 2\n1 <-> 1\n2 <-> 0, 3, 4\n3 <-> 2, 4\n4 <-> 2, 3, 6\n5 <-> 6\n6 <-> 4, 5") === 6);

console.assert(part2("0 <-> 2\n1 <-> 1\n2 <-> 0, 3, 4\n3 <-> 2, 4\n4 <-> 2, 3, 6\n5 <-> 6\n6 <-> 4, 5") === 2);
