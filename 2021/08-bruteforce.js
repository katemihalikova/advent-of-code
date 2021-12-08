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
  input = input
    .split("\n")
    .map(row => row.split(" ").map(pattern => [...pattern].sort().join("")));

  function* permute(string) {
    if (string.length === 0) {
      return yield "";
    }

    for (let char of string) {
      for (let partialPermutation of permute(string.replace(char, ""))) {
        yield char + partialPermutation;
      }
    }
  };

  let permutations = [...permute("abcdefg")];
  let validPatterns = ["012456", "25", "02346", "02356", "1235", "01356", "013456", "025", "0123456", "012356"].map(pattern => [...pattern]);

  return input.reduce((sum, row) => {
    let validDigits = row.slice(0, 10);
    let output = row.slice(11);
    let digits;

    for (let permutation of permutations) {
      let maybeDigits = validPatterns.map(pattern => pattern.map(i => permutation[i]).sort().join(""));

      if (maybeDigits.every(digit => validDigits.includes(digit))) {
        digits = maybeDigits;
        break;
      }
    }

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
