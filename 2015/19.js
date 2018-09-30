// == PART 1 ==

function part1(input, replacements) {
  replacements = replacements.split("\n").map(replacement => {
    let [from, to] = replacement.split(" => ");
    return {from, to};
  })

  let molecules = new Set();

  replacements.forEach(({from, to}) => {
    input.replace(new RegExp(from, "g"), (_, i) => {
      molecules.add(input.slice(0, i) + to + input.slice(i + from.length));
    })
  });

  return molecules.size;
}

// == PART 2 ==

function part2(input, replacements) {
  replacements = replacements.split("\n").map(replacement => {
    let [to, from] = replacement.split(" => ");
    return {from, to};
  })

  let doStep = (molecule, step) => {
    replacements.forEach(({from, to}) => {
      molecule.replace(from, (_, i) => {
        let newMolecule = molecule.slice(0, i) + to + molecule.slice(i + from.length);
        if (newMolecule === "e") throw step;
        else if (newMolecule.indexOf("e") > -1) return;
        return doStep(newMolecule, step + 1);
      })
    });
  };

  try {
    doStep(input, 1);
  } catch (step) {
    return step;
  }
}

// == ASSERTS ==

console.assert(part1("HOH", "H => HO\nH => OH\nO => HH") === 4);
console.assert(part1("HOHOHO", "H => HO\nH => OH\nO => HH") === 7);

console.assert(part2("HOH", "e => H\ne => O\nH => HO\nH => OH\nO => HH") === 3);
console.assert(part2("HOHOHO", "e => H\ne => O\nH => HO\nH => OH\nO => HH") === 6);
