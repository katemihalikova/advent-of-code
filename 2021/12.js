// == CLASSES ==

class Graph {
  #graph = {};

  constructor(edges = []) {
    for (let [v1, v2] of edges) {
      this.#addEdge(v1, v2);
    }
  }

  #addEdge(v1, v2) {
    if (!this.#graph[v1]) this.#graph[v1] = [];
    if (!this.#graph[v2]) this.#graph[v2] = [];

    // edges from start are directed
    if (v2 !== "start") {
      this.#graph[v1].push(v2);
    }
    if (v1 !== "start") {
      this.#graph[v2].push(v1);
    }
  }

  getNeighbours(v) {
    return this.#graph[v];
  }
}

// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(line => line.split("-"));

  let graph = new Graph(input);
  let pathCount = 0;

  let goThroughGraph = (cave, visitedCaves = []) => {
    if (cave === "end") {
      pathCount++;
      return;
    }

    if (cave.toLowerCase() === cave) {
      visitedCaves = [...visitedCaves, cave];
    }

    graph.getNeighbours(cave)
      .filter(nextCave => !visitedCaves.includes(nextCave))
      .forEach(nextCave => goThroughGraph(nextCave, visitedCaves));
  }

  goThroughGraph("start");

  return pathCount;
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(line => line.split("-"));

  let graph = new Graph(input);
  let pathCount = 0;

  let goThroughGraph = (cave, visitedCaves = [], hasVisitedTwice = false) => {
    if (cave === "end") {
      pathCount++;
      return;
    }

    if (cave.toLowerCase() === cave) {
      if (visitedCaves.includes(cave)) {
        hasVisitedTwice = true;
      }
      visitedCaves = [...visitedCaves, cave];
    }

    graph.getNeighbours(cave)
      .filter(nextCave => !hasVisitedTwice || !visitedCaves.includes(nextCave))
      .forEach(nextCave => goThroughGraph(nextCave, visitedCaves, hasVisitedTwice));
  }

  goThroughGraph("start");

  return pathCount;
}

// == ASSERTS ==

console.assert(part1(`start-A\nstart-b\nA-c\nA-b\nb-d\nA-end\nb-end`) === 10);
console.assert(part1(`dc-end\nHN-start\nstart-kj\ndc-start\ndc-HN\nLN-dc\nHN-end\nkj-sa\nkj-HN\nkj-dc`) === 19);
console.assert(part1(`fs-end\nhe-DX\nfs-he\nstart-DX\npj-DX\nend-zg\nzg-sl\nzg-pj\npj-he\nRW-he\nfs-DX\npj-RW\nzg-RW\nstart-pj\nhe-WI\nzg-he\npj-fs\nstart-RW`) === 226);

console.assert(part2(`start-A\nstart-b\nA-c\nA-b\nb-d\nA-end\nb-end`) === 36);
console.assert(part2(`dc-end\nHN-start\nstart-kj\ndc-start\ndc-HN\nLN-dc\nHN-end\nkj-sa\nkj-HN\nkj-dc`) === 103);
console.assert(part2(`fs-end\nhe-DX\nfs-he\nstart-DX\npj-DX\nend-zg\nzg-sl\nzg-pj\npj-he\nRW-he\nfs-DX\npj-RW\nzg-RW\nstart-pj\nhe-WI\nzg-he\npj-fs\nstart-RW`) === 3509);
