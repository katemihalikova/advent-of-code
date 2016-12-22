// == PART 1 ==

function aoc_day21_part1(input, pwd) {
  input = input.split("\n").map(e => e.split(" "));
  pwd = [...pwd];

  input.forEach(e => {
    if (e[0] === "swap" && e[1] === "position") {
      [pwd[e[2]], pwd[e[5]]] = [pwd[e[5]], pwd[e[2]]];
    }

    if (e[0] === "swap" && e[1] === "letter") {
      pwd = pwd.map(l => {
        if (l === e[2]) return e[5];
        if (l === e[5]) return e[2];
        return l;
      });
    }

    if (e[0] === "rotate") {
      let steps;
      if (e[1] === "based") {
        steps = pwd.findIndex(l => l === e[6]);
        steps += steps >= 4 ? 2 : 1;
      } else {
        steps = e[2];
      }
      steps %= pwd.length;
      steps *= e[1] === "left" ? 1 : -1;
      pwd = [...pwd.slice(steps), ...pwd.slice(0, steps)];
    }

    if (e[0] === "reverse") {
      pwd = [...pwd.slice(0, +e[2]), ...pwd.slice(+e[2], +e[4] + 1).reverse(), ...pwd.slice(+e[4] + 1)];
    }

    if (e[0] === "move") {
      if (+e[2] < +e[5]) {
        pwd = [...pwd.slice(0, +e[2]), ...pwd.slice(+e[2] + 1, +e[5] + 1), pwd[+e[2]], ...pwd.slice(+e[5] + 1)];
      } else {
        pwd = [...pwd.slice(0, +e[5]), pwd[+e[2]], ...pwd.slice(+e[5], +e[2]), ...pwd.slice(+e[2] + 1)];
      }
    }
  });

  return pwd.join("");
}

// == PART 2 ==

function aoc_day21_part2(input, pwd) {
  input = input.split("\n").map(e => e.split(" "));
  pwd = [...pwd];

  input.reverse().forEach(e => {
    if (e[0] === "swap" && e[1] === "position") {
      [pwd[e[2]], pwd[e[5]]] = [pwd[e[5]], pwd[e[2]]];
    }

    if (e[0] === "swap" && e[1] === "letter") {
      pwd = pwd.map(l => {
        if (l === e[2]) return e[5];
        if (l === e[5]) return e[2];
        return l;
      });
    }

    if (e[0] === "rotate" && e[1] === "based") {
      let newIndex = pwd.findIndex(l => l === e[6]);
      while(true) {
        pwd = [...pwd.slice(1), ...pwd.slice(0, 1)];
        let currIndex = pwd.findIndex(l => l === e[6]);
        let steps = currIndex + (currIndex >= 4 ? 2 : 1);
        if (newIndex === (currIndex + steps) % pwd.length) break;
      }
    }
    if (e[0] === "rotate" && e[1] !== "based") {
      steps = e[2];
      steps *= e[1] === "left" ? -1 : 1;
      pwd = [...pwd.slice(steps), ...pwd.slice(0, steps)];
    }

    if (e[0] === "reverse") {
      pwd = [...pwd.slice(0, +e[2]), ...pwd.slice(+e[2], +e[4] + 1).reverse(), ...pwd.slice(+e[4] + 1)];
    }

    if (e[0] === "move") {
      if (+e[5] < +e[2]) {
        pwd = [...pwd.slice(0, +e[5]), ...pwd.slice(+e[5] + 1, +e[2] + 1), pwd[+e[5]], ...pwd.slice(+e[2] + 1)];
      } else {
        pwd = [...pwd.slice(0, +e[2]), pwd[+e[5]], ...pwd.slice(+e[2], +e[5]), ...pwd.slice(+e[5] + 1)];
      }
    }
  });

  return pwd.join("");
}

// == ASSERTS ==

console.assert(aoc_day21_part1("swap position 4 with position 0\nswap letter d with letter b\nreverse positions 0 through 4\nrotate left 1 step\nmove position 1 to position 4\nmove position 3 to position 0\nrotate based on position of letter b\nrotate based on position of letter d", "abcde") === "decab");

console.assert(aoc_day21_part2("swap position 4 with position 0\nswap letter d with letter b\nreverse positions 0 through 4\nrotate left 1 step\nmove position 1 to position 4\nmove position 3 to position 0\nrotate based on position of letter b\nrotate based on position of letter d", "decab") === "abcde");
