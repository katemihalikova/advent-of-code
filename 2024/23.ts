// == SHARED ==

class Graph {
  #edges: Record<string, Set<string>> = {};

  constructor(edges: [string, string][]) {
    for (let [left, right] of edges) {
      this.#edges[left] = this.#edges[left] ?? new Set();
      this.#edges[left].add(right);
      this.#edges[right] = this.#edges[right] ?? new Set();
      this.#edges[right].add(left);
    }
  }

  getVertices(): string[] {
    return Object.keys(this.#edges);
  }

  hasEdge(left: string, right: string): boolean {
    return left in this.#edges && this.#edges[left].has(right);
  }
}

// == PART 1 ==

function part1(input: string): number {
  let connections = input
    .split("\n")
    .map(line => line.split("-") as [string, string]);

  let network = new Graph(connections);
  let computers = network.getVertices();

  let computerGroups = computers.map(computer => [computer]);

  for (let count = 1; count < 3; count++) {
    computerGroups = computerGroups
      .flatMap(group => computers
        .slice(computers.indexOf(group.at(-1)!) + 1)
        .filter(left => group.every(right => network.hasEdge(left, right)))
        .map(computer => [...group, computer])
      );
  }

  return computerGroups
    .filter(group => group.some(computer => computer.startsWith("t")))
    .length;
}

// == PART 2 ==

function part2(input: string): string {
  let connections = input
    .split("\n")
    .map(line => line.split("-") as [string, string]);

  let network = new Graph(connections);
  let computers = network.getVertices();

  let computerGroups = computers.map(computer => [computer]);

  while (true) {
    let previousGroups = computerGroups;
    computerGroups = computerGroups
      .flatMap(group => computers
        .slice(computers.indexOf(group.at(-1)!) + 1)
        .filter(left => group.every(right => network.hasEdge(left, right)))
        .map(computer => [...group, computer])
      );
    if (computerGroups.length === 0) return previousGroups[0].toSorted().join(",");
  }
}

// == ASSERTS ==

let example = `\
kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`;

console.assert(part1(example) === 7);

console.assert(part2(example) === "co,de,ka,ta");
