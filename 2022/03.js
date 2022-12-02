// == SHARED ==

Array.prototype.chunkify = function(length) {
  return this.reduce((acc, element, index) => {
    if (index % length === 0) acc.push([]);
    acc[acc.length - 1].push(element);
    return acc;
  }, []);
}

Array.prototype.sum = function() {
  return this.reduce((acc, el) => acc + el, 0);
}

const priorities = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

// == PART 1 ==

function part1(input) {
  return input
    .split("\n")
    .map(line => [line.slice(0, line.length / 2), line.slice(line.length / 2)])

    .map(([leftCompartment, rightCompartment]) => [...leftCompartment].find(itemInLeft => rightCompartment.includes(itemInLeft)))

    .map(item => priorities.indexOf(item))
    .sum();
}

// == PART 2 ==

function part2(input) {
  return input
    .split("\n")
    .chunkify(3)

    .map(elfs => [...elfs[0]].find(maybeToken => elfs.every(elf => elf.includes(maybeToken))))

    .map(item => priorities.indexOf(item))
    .sum();
}

// == ASSERTS ==

console.assert(part1(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`) === 157);

console.assert(part2(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`) === 70);
