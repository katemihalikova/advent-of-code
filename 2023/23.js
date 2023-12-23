// == PART 1 ==

function part1(input) {
  let trailMap = input
    .split("\n")
    .map(line => [...line]);

  // walk the maze using BFS, using the last found solution as the answer

  let walkers = [{x: 1, y: 0, visited: new Set()}];
  let END_X = trailMap[0].length - 2;
  let END_Y = trailMap.length - 1;
  let maxSteps;

  for (let step = 0; walkers.length > 0; step++) {
    walkers = walkers.flatMap(({x, y, visited}) => {
      if (x === END_X && y === END_Y) {
        maxSteps = step;
        return [];
      }

      visited = new Set([...visited, `${x},${y}`]);

      let nextWalkers = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ].map(([x, y]) => {
        let trailMark = trailMap[y]?.[x];
        if (!trailMark || trailMark === "#") return;
        if (visited.has(`${x},${y}`)) return;
        return {x, y, visited};
      })

      let trailMark = trailMap[y]?.[x];
      if (trailMark === ">") nextWalkers = [nextWalkers[0]];
      else if (trailMark === "<") nextWalkers = [nextWalkers[1]];
      else if (trailMark === "v") nextWalkers = [nextWalkers[2]];
      else if (trailMark === "^") nextWalkers = [nextWalkers[3]];

      return nextWalkers.filter(walker => walker !== undefined);
    });
  }

  return maxSteps;
}

// == PART 2 ==

function part2(input) {
  let trailMap = input
    .split("\n")
    .map(line => [...line]);

  // prepare list of intersections (including start and end) in the maze

  let intersections = [];

  trailMap.forEach((row, y) => row.forEach((trail, x) => {
    if (trail === "#") return;

    let isIntersection = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ]
      .map(([x, y]) => trailMap[y]?.[x])
      .filter(trailMark => trailMark !== "#" && trailMark !== undefined)
      .length !== 2;

    if (isIntersection) {
      intersections.push([x, y]);
    }
  }));

  let coordsToIntersections = intersections.reduce((acc, [x, y], index) => ({...acc, [x]: {...(acc[x] ?? {}), [y]: String(index)}}), {});

  // walk between all intersections using BFS, constructing a weighted graph

  let walkers = intersections.map(([x, y]) => ({currentX: x, currentY: y, startX: x, startY: y}));
  let edges = {};

  for (let steps = 0; walkers.length > 0; steps++) {
    walkers = walkers.flatMap(({previousX, previousY, currentX, currentY, startX, startY}) => {
      if (steps > 0 && intersections.some(([intersectionX, intersectionY]) => intersectionX === currentX && intersectionY === currentY)) {
        let fromVertex = coordsToIntersections[startX][startY];
        let toVertex = coordsToIntersections[currentX][currentY];
        edges[fromVertex] = edges[fromVertex] || {};
        edges[fromVertex][toVertex] = Math.max(edges[fromVertex][toVertex] ?? 0, steps);
        return [];
      }

      return [
        [currentX + 1, currentY],
        [currentX - 1, currentY],
        [currentX, currentY + 1],
        [currentX, currentY - 1],
      ]
        .map(([nextX, nextY]) => {
          let trailMark = trailMap[nextY]?.[nextX];
          if (!trailMark || trailMark === "#") return;
          if (previousX === nextX && previousY === nextY) return;
          return {
            previousX: currentX,
            previousY: currentY,
            currentX: nextX,
            currentY: nextY,
            startX,
            startY,
          };
        })
        .filter(walker => walker !== undefined);
    });
  }

  // walk through the whole weighted graph using DFS

  let START_VERTEX = coordsToIntersections[1][0];
  let END_VERTEX = coordsToIntersections[trailMap[0].length - 2][trailMap.length - 1];

  let maxSteps = 0;

  function walkGraph(vertex, visitedVertices, steps) {
    if (vertex === END_VERTEX) {
      if (steps > maxSteps) maxSteps = steps;
      return;
    }

    visitedVertices = new Set([...visitedVertices, vertex]);

    for (let [nextVertex, addedSteps] of Object.entries(edges[vertex])) {
      if (visitedVertices.has(nextVertex)) continue;
      walkGraph(nextVertex, visitedVertices, steps + addedSteps);
    }
  }

  walkGraph(START_VERTEX, new Set(), 0);

  return maxSteps;
}

// == ASSERTS ==

let example =
`#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#`;

console.assert(part1(example) === 94);

console.assert(part2(example) === 154);
