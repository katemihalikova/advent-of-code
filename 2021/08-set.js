// == POLYFILL ==
// https://github.com/tc39/proposal-set-methods

Set.prototype.isSupersetOf = Set.prototype.isSupersetOf || function(set) {
  return [...set].every(value => this.has(value));
}

Set.prototype.isSubsetOf = Set.prototype.isSubsetOf || function(set) {
  return set.isSupersetOf(this);
}

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
    .map(row => row.split(" ").map(pattern => new Set(pattern)))
    .reduce((sum, row) => {
      let patterns = row.slice(0, 10);
      let output = row.slice(11);

      let digits = [];

      digits[1] = patterns.find(pattern => pattern.size === 2);
      digits[7] = patterns.find(pattern => pattern.size === 3);
      digits[4] = patterns.find(pattern => pattern.size === 4);
      digits[8] = patterns.find(pattern => pattern.size === 7);

      digits[6] = patterns.find(pattern => pattern.size === 6 && !pattern.isSupersetOf(digits[1]));
      digits[9] = patterns.find(pattern => pattern.size === 6 && pattern.isSupersetOf(digits[4]));
      digits[0] = patterns.find(pattern => pattern.size === 6 && pattern !== digits[6] && pattern !== digits[9]);

      digits[3] = patterns.find(pattern => pattern.size === 5 && pattern.isSupersetOf(digits[1]));
      digits[5] = patterns.find(pattern => pattern.size === 5 && pattern.isSubsetOf(digits[6]));
      digits[2] = patterns.find(pattern => pattern.size === 5 && pattern !== digits[3] && pattern !== digits[5]);

      let outputDigits = output.map(pattern => digits.findIndex(digit => pattern.isSupersetOf(digit) && pattern.isSubsetOf(digit)));
      return sum + Number(outputDigits.join(""));
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
