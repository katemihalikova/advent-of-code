// == PART 1 ==

function part1(input) {
  let [workflows, parts] = input.split("\n\n");

  workflows = workflows
    .split("\n")
    .reduce((acc, line) => {
      let [, name, rules] = line.match(/^(\w+){([^}]+)}$/);
      rules = rules
        .split(",")
        .map(rule => {
          let [, category, operator, value, nextWorkflowName] = rule.match(/^(?:(\w+)([<>])(\d+):)?(\w+)$/);
          value = Number(value);
          return {category, operator, value, nextWorkflowName};
        });
      return {...acc, [name]: rules};
    }, {});

  parts = parts
    .split("\n")
    .map(line => {
      let [, x, m, a, s] = line.match(/^\{x=(\d+),m=(\d+),a=(\d+),s=(\d+)}$/).map(Number);
      return {x, m, a, s};
    });

  function isPartAccepted(part, workflowName) {
    if (workflowName === "A") return true;
    if (workflowName === "R") return false;

    for (let {category, operator, value, nextWorkflowName} of workflows[workflowName]) {
      if (
        (operator === "<" && part[category] < value) ||
        (operator === ">" && part[category] > value) ||
        operator === undefined
      ) {
        return isPartAccepted(part, nextWorkflowName);
      }
    }
  }

  return parts
    .filter(part => isPartAccepted(part, "in"))
    .reduce((sum, {x, m, a, s}) => sum + x + m + a + s, 0);
}

// == PART 2 ==

function part2(input) {
  let [workflows, parts] = input.split("\n\n");

  workflows = workflows
    .split("\n")
    .reduce((acc, line) => {
      let [, name, rules] = line.match(/^(\w+){([^}]+)}$/);
      rules = rules
        .split(",")
        .map(rule => {
          let [, category, operator, value, nextWorkflowName] = rule.match(/^(?:(\w+)([<>])(\d+):)?(\w+)$/);
          value = Number(value);
          return {category, operator, value, nextWorkflowName};
        });
      return {...acc, [name]: rules};
    }, {});

  parts = parts
    .split("\n")
    .map(line => {
      let [, x, m, a, s] = line.match(/^\{x=(\d+),m=(\d+),a=(\d+),s=(\d+)}$/).map(Number);
      return {x, m, a, s};
    });

  let ranges = [
    {x: {from: 1, to: 4000}, m: {from: 1, to: 4000}, a: {from: 1, to: 4000}, s: {from: 1, to: 4000}, workflowName: "in"},
  ];

  while (ranges.some(range => range.workflowName !== "A")) {
    ranges = ranges.flatMap(rangeToProcess => {
      if (rangeToProcess.workflowName === "A") return [rangeToProcess];
      if (rangeToProcess.workflowName === "R") return [];

      return workflows[rangeToProcess.workflowName].map(({category, operator, value, nextWorkflowName}) => {
        let matchedRange = {x: {...rangeToProcess.x}, m: {...rangeToProcess.m}, a: {...rangeToProcess.a}, s: {...rangeToProcess.s}, workflowName: nextWorkflowName};

        if (operator === "<") {
          matchedRange[category].to = Math.min(matchedRange[category].to, value - 1);
          rangeToProcess[category].from = Math.max(rangeToProcess[category].from, value);
        }
        if (operator === ">") {
          matchedRange[category].from = Math.max(matchedRange[category].from, value + 1);
          rangeToProcess[category].to = Math.min(rangeToProcess[category].to, value);
        }

        return matchedRange;
      });
    });
  }

  return ranges.reduce((sum, {x, m, a, s}) => sum + (x.to - x.from + 1) * (m.to - m.from + 1) * (a.to - a.from + 1) * (s.to - s.from + 1), 0);
}

// == ASSERTS ==

const example =
`px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`;

console.assert(part1(example) === 19114);

console.assert(part2(example) === 167409079868000);
