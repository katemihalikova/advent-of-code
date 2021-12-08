// == PART 1 ==

function part1(input) {
  return input
    .split("\n")
    .flatMap(row => row.split(" ").slice(11))
    .map(pattern => pattern.length)
    .filter(segments => segments <= 4 || segments >= 7)
    .length;
}

// == PART 2 ==

function part2(input) {
  return input
    .split("\n")
    .map(row => row.split(" ").map(pattern => [...pattern].sort()))
    .reduce((sum, row) => {
      let patterns = row.slice(0, 10);
      let output = row.slice(11).map(pattern => pattern.join(""));

      let digits = [];

      digits[1] = patterns.find(pattern => pattern.length === 2);
      digits[7] = patterns.find(pattern => pattern.length === 3);
      digits[4] = patterns.find(pattern => pattern.length === 4);
      digits[8] = patterns.find(pattern => pattern.length === 7);

      digits[6] = patterns.find(pattern => pattern.length === 6 && digits[1].some(segment => !pattern.includes(segment)));
      digits[0] = patterns.find(pattern => pattern.length === 6 && pattern !== digits[6] && digits[4].some(segment => !pattern.includes(segment)));
      digits[9] = patterns.find(pattern => pattern.length === 6 && pattern !== digits[6] && pattern !== digits[0]);

      digits[3] = patterns.find(pattern => pattern.length === 5 && digits[1].every(segment => pattern.includes(segment)));
      digits[5] = patterns.find(pattern => pattern.length === 5 && pattern.every(segment => digits[6].includes(segment)));
      digits[2] = patterns.find(pattern => pattern.length === 5 && pattern !== digits[3] && pattern !== digits[5]);

      digits = digits.map(pattern => pattern.join(""));

      return sum + Number(output.map(pattern => digits.indexOf(pattern)).join(""));
    }, 0);
}

// == ASSERTS ==

console.assert(part1("acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf") === 0);
console.assert(part1(`be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`) === 26);

console.assert(part2("acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf") === 5353);
console.assert(part2(`be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`) === 61229);
