// == PART 1 ==

function part1(input, total = 16) {
  return input
    .split(",")
    .map(dance => {
      let [, move, firstParam, secondParam] = dance.match(/(\w)([^/]+)(?:\/([^/]+))?/);
      return {move, firstParam, secondParam};
    })
    .reduce((programs, {move, firstParam, secondParam}) => {
      if (move === "s") {

        return [...programs.slice(programs.length - firstParam), ...programs.slice(0, programs.length - firstParam)];

      } else if (move === "p") {

        return programs.map(program => {
          if (program === firstParam) return secondParam;
          if (program === secondParam) return firstParam;
          return program;
        });

      } else if (move === "x") {

        [programs[firstParam], programs[secondParam]] = [programs[secondParam], programs[firstParam]];
        return programs;

      }
    }, [...Array(total).keys()].map(nr => (nr + 10).toString(36)))
    .join("");
}

// == PART 2 ==

function part2(input, total = 16) {
  input = input.split(",").map(e => {
    let [, move, firstParam, secondParam] = e.match(/(\w)([^/]+)(?:\/([^/]+))?/);
    return {move, firstParam, secondParam};
  });

  let programs = [...Array(total).keys()].map(nr => (nr + 10).toString(36));
  let originalOrder = programs.join("");

  for (let i = 1; i <= 1e9; i++) {
    input.forEach(({move, firstParam, secondParam}) => {
      if (move === "s") {

        programs = [...programs.slice(programs.length - firstParam), ...programs.slice(0, programs.length - firstParam)];

      } else if (move === "p") {

        programs = programs.map(program => {
          if (program === firstParam) return secondParam;
          if (program === secondParam) return firstParam;
          return program;
        });

      } else if (move === "x") {

        [programs[firstParam], programs[secondParam]] = [programs[secondParam], programs[firstParam]];

      }
    });

    if (programs.join("") === originalOrder) {
      i = 1e9 - (1e9 % i);
    }
  }

  return programs.join("");
}

// == ASSERTS ==

console.assert(part1("s1,x3/4,pe/b", 5) === "baedc");
console.assert(part1("s1,x3/4,pe/b") === "paedcbfghijklmno");

console.assert(part2("s1,x3/4,pe/b", 5) === "abcde");
console.assert(part2("s1,x3/4,pe/b") === "ghidjklmnopabcef");
