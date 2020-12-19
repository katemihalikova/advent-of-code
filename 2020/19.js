// == PART 1 ==

function part1(input) {
  input = input.split("\n\n");

  let rules = input[0]
    .split("\n")
    .reduce((acc, line) => {
      let letterMatch = line.match(/^(\d+): "(\w)"$/);
      if (letterMatch) {
        let [, ruleNr, letter] = letterMatch;
        acc[ruleNr] = letter;
      } else {
        let [, ruleNr, ruleVariants] = line.match(/^(\d+): (.+)$/);
        let rules = ruleVariants.split(" | ").map(rule => rule.split(" "));
        acc[ruleNr] = rules;
      }
      return acc;
    }, {});

  function isValid(message, ruleNr = 0) {
    let rule = rules[ruleNr];
    if (typeof rule === "string") return message.startsWith(rule) ? rule : false;

    let consumed;
    return rule.some(ruleParts => {
      let remaining = message;
      consumed = "";
      for (let rulePart of ruleParts) {
        let valid = isValid(remaining, rulePart);
        if (valid) {
          consumed += valid;
          remaining = remaining.slice(valid.length);
        } else {
          return false;
        }
      }
      return true;
    }) ? consumed : false;
  }

  return input[1]
    .split("\n")
    .filter(message => {
      if (!rules[8] || rules[8].length === 1) {
        // part 1
        return isValid(message) === message;
      } else {
        // part 2
        for (let i = 1; i < message.length - 1; i++) {
          let a = message.slice(0, i)
          let b = message.slice(i);
          if (isValid(a, 8) === a && isValid(b, 11) === b) return true;
        }
        return false;
      }
    })
    .length;
}

// == PART 2 ==

function part2(input) {
  input = input
    .replace("8: 42", "8: 42 8 | 42")
    .replace("11: 42 31", "11: 42 11 31 | 42 31");

    return part1(input);
}

// == ASSERTS ==

console.assert(part1(
`0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb`
) === 2);
console.assert(part1(
`42: 9 14 | 10 1
9: 14 27 | 1 26
10: 23 14 | 28 1
1: "a"
11: 42 31
5: 1 14 | 15 1
19: 14 1 | 14 14
12: 24 14 | 19 1
16: 15 1 | 14 14
31: 14 17 | 1 13
6: 14 14 | 1 14
2: 1 24 | 14 4
0: 8 11
13: 14 3 | 1 12
15: 1 | 14
17: 14 2 | 1 7
23: 25 1 | 22 14
28: 16 1
4: 1 1
20: 14 14 | 1 15
3: 5 14 | 16 1
27: 1 6 | 14 18
14: "b"
21: 14 1 | 1 14
25: 1 1 | 1 14
22: 14 14
8: 42
26: 14 22 | 1 20
18: 15 15
7: 14 5 | 1 21
24: 14 1

bbabbbbaabaabba
babbbbaabbbbbabbbbbbaabaaabaaa
aaabbbbbbaaaabaababaabababbabaaabbababababaaa
bbbbbbbaaaabbbbaaabbabaaa
bbbababbbbaaaaaaaabbababaaababaabab
ababaaaaaabaaab
ababaaaaabbbaba
baabbaaaabbaaaababbaababb
abbbbabbbbaaaababbbbbbaaaababb
aaaaabbaabaaaaababaa
aaaabbaabbaaaaaaabbbabbbaaabbaabaaa
aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba`
) === 3);

console.assert(part2(
`42: 9 14 | 10 1
9: 14 27 | 1 26
10: 23 14 | 28 1
1: "a"
11: 42 31
5: 1 14 | 15 1
19: 14 1 | 14 14
12: 24 14 | 19 1
16: 15 1 | 14 14
31: 14 17 | 1 13
6: 14 14 | 1 14
2: 1 24 | 14 4
0: 8 11
13: 14 3 | 1 12
15: 1 | 14
17: 14 2 | 1 7
23: 25 1 | 22 14
28: 16 1
4: 1 1
20: 14 14 | 1 15
3: 5 14 | 16 1
27: 1 6 | 14 18
14: "b"
21: 14 1 | 1 14
25: 1 1 | 1 14
22: 14 14
8: 42
26: 14 22 | 1 20
18: 15 15
7: 14 5 | 1 21
24: 14 1

bbabbbbaabaabba
babbbbaabbbbbabbbbbbaabaaabaaa
aaabbbbbbaaaabaababaabababbabaaabbababababaaa
bbbbbbbaaaabbbbaaabbabaaa
bbbababbbbaaaaaaaabbababaaababaabab
ababaaaaaabaaab
ababaaaaabbbaba
baabbaaaabbaaaababbaababb
abbbbabbbbaaaababbbbbbaaaababb
aaaaabbaabaaaaababaa
aaaabbaabbaaaaaaabbbabbbaaabbaabaaa
aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba`
) === 12);
