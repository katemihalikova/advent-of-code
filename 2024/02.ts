// == PART 1 ==

function part1(input: string): number {
  return input
    .split("\n")
    .map(line => line
      .split(" ")
      .map(Number)
      .map((level, _, report) => level * (report[0] > report[1] ? 1 : -1))
    )
    .filter(report => report.slice(0, -1).every((_, index) => (report[index] - report[index + 1] >= 1 && report[index] - report[index + 1] <= 3)))
    .length;
}

// == PART 2 ==

function part2(input: string): number {
  return input
  .split("\n")
  .map(line => line
    .split(" ")
    .map(Number)
    .map((_, skipIndex, report) => [...report.slice(0, skipIndex), ...report.slice(skipIndex + 1)]
      .map((level, _, dampenedReport) => level * (dampenedReport[0] > dampenedReport[1] ? 1 : -1))
    )
  )
  .filter(reports => reports
    .some(report => report.slice(0, -1).every((_, index) => (report[index] - report[index + 1] >= 1 && report[index] - report[index + 1] <= 3)))
  )
  .length;
}

// == ASSERTS ==

console.assert(part1(`\
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`) === 2);

console.assert(part2(`\
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`) === 4);
