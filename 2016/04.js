// == PART 1 ==

function aoc_day4_part1(input) {
  input = input.split("\n");
  
  return input.map(e => {
    let [, letters, sector, checksum] = e.match(/^([a-z-]+)-([0-9]+)\[([a-z]{5})\]$/)
    letters = letters.replace(/-/g, "");
    sector = Number(sector);
    return {letters, sector, checksum};
  }).filter(e => {
    let checksum = e.letters.split("").reduce((res, f) => {
      let a = res.find(e => e.letter === f)
      if (!a) {
        a = {letter: f, count: 0}
        res.push(a);
      }
      a.count++;
      return res;
    }, []).sort((a, b) => {
      if (a.count !== b.count) return b.count - a.count;
      if (a.letter > b.letter) return 1;
      if (a.letter < b.letter) return -1;
      return 0;
    }).slice(0, 5).map(e => e.letter).join("");
    return checksum === e.checksum;
  }).reduce((res, e) => res + e.sector, 0);
}

// == PART 2 ==

function aoc_day4_part2(input) {
  input = input.split("\n");
  
  return input.map(e => {
    let [, letters, sector] = e.match(/^([a-z-]+)-([0-9]+)\[([a-z]{5})\]$/)
    sector = Number(sector);
    return {letters: letters.split("").map(l => {
      if (l === "-") return " ";
      return String.fromCharCode((l.charCodeAt(0) - 97 + sector) % 26 + 97);
    }).join(""), sector};
  }).find(e => e.letters.indexOf("north") > -1).sector;
}

// == ASSERTS == (no part 2 example provided, adding my own example)

console.assert(aoc_day4_part1("aaaaa-bbb-z-y-x-123[abxyz]\na-b-c-d-e-f-g-h-987[abcde]\nnot-a-real-room-404[oarel]\ntotally-real-room-200[decoy]") === 1514);

console.assert(aoc_day4_part2("qzmt-zixmtkozy-ivhz-343[zimth]\nsghsoq-ucdgiwqr-iuwexmice-323[chsfb]") === 323);
