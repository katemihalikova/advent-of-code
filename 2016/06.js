// == PART 1 ==

function aoc_day6_part1(input) {
  input = input.split("\n").map(e => e.split(""));
  
  return input.reduce((res, e) => {
    e.forEach((f,p) => {
      res[p] = res[p] || {};
      res[p][f] = res[p][f] || 0;
      res[p][f]++;
    });
    return res;
  }, []).map(e => {
    return Object.keys(e).reduce((res, key) => {
      if (e[key] > res[1]) return [key, e[key]];
      return res;
    }, ["", 0]);
  }).map(res => res[0]).join("");
}

// == PART 2 ==

function aoc_day6_part2(input) {
  input = input.split("\n").map(e => e.split(""));
  
  return input.reduce((res, e) => {
    e.forEach((f,p) => {
      res[p] = res[p] || {};
      res[p][f] = res[p][f] || 0;
      res[p][f]++;
    });
    return res;
  }, []).map(e => {
    return Object.keys(e).reduce((res, key) => {
      if (e[key] < res[1]) return [key, e[key]];
      return res;
    }, ["", Infinity]);
  }).map(res => res[0]).join("");
}

// == ASSERTS ==

console.assert(aoc_day6_part1("eedadn\ndrvtee\neandsr\nraavrd\natevrs\ntsrnev\nsdttsa\nrasrtv\nnssdts\nntnada\nsvetve\ntesnvt\nvntsnd\nvrdear\ndvrsen\nenarar") === "easter");

console.assert(aoc_day6_part2("eedadn\ndrvtee\neandsr\nraavrd\natevrs\ntsrnev\nsdttsa\nrasrtv\nnssdts\nntnada\nsvetve\ntesnvt\nvntsnd\nvrdear\ndvrsen\nenarar") === "advent");
