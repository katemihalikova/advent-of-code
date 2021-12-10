// == PART 1 ==

function part1(input) {
  return input
    .split("\n")
    .reduce((score, line) => {
      let stack = [];

      for (let char of line) {
        if ("([{<".includes(char)) {
          let matchingChar = {"(": ")", "[": "]", "{": "}", "<": ">"}[char];
          stack.push(matchingChar);
        } else {
          let expectedChar = stack.pop();
          if (char !== expectedChar) {
            score += {")": 3, "]": 57, "}": 1197, ">": 25137}[char];
            break;
          }
        }
      }

      return score;
    }, 0);
}

// == PART 2 ==

function part2(input) {
  let scores = input
    .split("\n")
    .map(line => {
      let stack = [];

      for (let char of line) {
        if ("([{<".includes(char)) {
          let matchingChar = {"(": ")", "[": "]", "{": "}", "<": ">"}[char];
          stack.push(matchingChar);
        } else {
          let expectedChar = stack.pop();
          if (char !== expectedChar) {
            return "corrupted";
          }
        }
      }

      return stack.reduceRight((score, char) => (score * 5) + {")": 1, "]": 2, "}": 3, ">": 4}[char], 0);
    }, 0)
    .filter(score => score !== "corrupted")
    .sort((a, b) => a - b);

  return scores[(scores.length - 1) / 2];
}

// == ASSERTS ==

console.assert(part1("()") === 0);
console.assert(part1("[]") === 0);
console.assert(part1("([])") === 0);
console.assert(part1("{()()()}") === 0);
console.assert(part1("<([{}])>") === 0);
console.assert(part1("[<>({}){}[([])<>]]") === 0);
console.assert(part1("(((((((((())))))))))") === 0);

console.assert(part1("(]") > 0);
console.assert(part1("{()()()>") > 0);
console.assert(part1("(((()))}") > 0);
console.assert(part1("<([]){()}[{}])") > 0);

console.assert(part1("[({(<(())[]>[[{[]{<()<>>\n[(()[<>])]({[<{<<[]>>(\n{([(<{}[<>[]}>{[]{[(<()>\n(((({<>}<{<{<>}{[]{[]{}\n[[<[([]))<([[{}[[()]]]\n[{[{({}]{}}([{[{{{}}([]\n{<[[]]>}<{[{[{[]{()[[[]\n[<(<(<(<{}))><([]([]()\n<{([([[(<>()){}]>(<<{{\n<{([{{}}[<[[[<>{}]]]>[]]") === 26397);

console.assert(part2("[({(<(())[]>[[{[]{<()<>>\n[(()[<>])]({[<{<<[]>>(\n{([(<{}[<>[]}>{[]{[(<()>\n(((({<>}<{<{<>}{[]{[]{}\n[[<[([]))<([[{}[[()]]]\n[{[{({}]{}}([{[{{{}}([]\n{<[[]]>}<{[{[{[]{()[[[]\n[<(<(<(<{}))><([]([]()\n<{([([[(<>()){}]>(<<{{\n<{([{{}}[<[[[<>{}]]]>[]]") === 288957);
