// == PART 1 ==

function part1(input) {
  let units = [];
  for (let i = 65; i <= 90; i++) {
    let upper = String.fromCharCode(i);
    let lower = upper.toLowerCase();
    units.push(`${upper}${lower}|${lower}${upper}`);
  }

  let regexp = new RegExp(units.join("|"));
  let polymer = input;

  while(true) {
    let result = polymer.replace(regexp, "");
    if (result === polymer) return polymer.length;
    polymer = result;
  }
}

// == PART 2 ==

function part2(input) {
  let units = [];
  for (let i = 65; i <= 90; i++) {
    let upper = String.fromCharCode(i);
    let lower = upper.toLowerCase();
    units.push(`${upper}${lower}|${lower}${upper}`);
  }

  let regexp = new RegExp(units.join("|"));

  let results = units.map(l => {
    let polymer = input.replace(new RegExp(l[0], "ig"), "");

    while(true) {
      let result = polymer.replace(regexp, "");
      if (result === polymer) return polymer.length;
      polymer = result;
    }
  });

  return Math.min(...results);
}

// == ASSERTS ==

console.assert(part1("dabAcCaCBAcCcaDA") === 10);

console.assert(part2("dabAcCaCBAcCcaDA") === 4);
