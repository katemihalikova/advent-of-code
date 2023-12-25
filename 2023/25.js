require("regenerator-runtime/runtime");

// == PART 1 ==

function part1(input) {
  let wires = input
    .split("\n")
    .flatMap(line => {
      let [start, ...ends] = line.split(/\W+/);
      return ends.map(end => [start, end]);
    });

  const { mincut } = require("@graph-algorithm/minimum-cut");
  let wiresToCut = [...mincut(wires)];

  wires = wires.filter(wire => wiresToCut.every(wireToCut => new Set([...wire, ...wireToCut]).size > 2));

  let allComponents = new Set(wires.flat());
  let groupedComponents = new Set();

  function dfs(vertex, visited) {
    visited.add(vertex);

    for (let [v1, v2] of wires) {
      if (vertex === v1 && !visited.has(v2)) dfs(v2, visited);
      else if (vertex === v2 && !visited.has(v1)) dfs(v1, visited);
    }
  }
  dfs(wires[0][0], groupedComponents);

  return groupedComponents.size * (allComponents.size - groupedComponents.size);
}

// == PART 2 ==

// Successfully pushed the big red button 🔴 and saved Christmas 🎄

// == ASSERTS ==

console.assert(part1(`\
jqt: rhn xhk nvd
rsh: frs pzl lsr
xhk: hfx
cmg: qnr nvd lhk bvb
rhn: xhk bvb hfx
bvb: xhk hfx
pzl: lsr hfx nvd
qnr: nvd
ntq: jqt hfx bvb xhk
nvd: lhk
lsr: lhk
rzs: qnr cmg lsr rsh
frs: qnr lhk lsr`) === 54);
