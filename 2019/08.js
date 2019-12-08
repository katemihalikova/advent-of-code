// == SHARED ==

let splitIntoChunks = (array, chunkSize) => array.reduce((acc, element, index) => {
  if (index % chunkSize === 0) acc.push([]);
  acc[acc.length - 1].push(element);
  return acc;
}, []);

// == PART 1 ==

function part1(input, width = 25, height = 6) {
  input = input.split("").map(Number);

  let layers = splitIntoChunks(input, width * height);
  let layerWithFewestZeros = layers.sort((a, b) => a.filter(pixel => pixel === 0).length - b.filter(pixel => pixel === 0).length).shift();

  return layerWithFewestZeros.filter(pixel => pixel === 1).length * layerWithFewestZeros.filter(pixel => pixel === 2).length
}

// == PART 2 ==

function part2(input, width = 25, height = 6) {
  input = input.split("").map(Number);

  let layers = splitIntoChunks(input, width * height);
  let finalLayer = layers.reduce((acc, layer) => acc.map((pixel, index) => pixel === 2 ? layer[index] : pixel)).map(pixel => pixel === 1 ? "█" : "░");

  return splitIntoChunks(finalLayer, width).map(line => line.join("")).join("\n");
}

// == ASSERTS ==

console.assert(part1("123456789012", 3, 2) === 1);
console.assert(part1("02210011000011221021111022211111", 2, 2) === 4);

console.assert(part2("0222112222120000", 2, 2) === `
░█
█░
`.trim());
console.assert(part2("222222022211222012210102012000112112101010101", 3, 3) === `
░██
█░░
░██
`.trim());
