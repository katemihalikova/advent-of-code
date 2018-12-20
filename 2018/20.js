// == PART 1 ==

function part1(input) {
  input = input.replace(/[$^]/g, "");

  let oppositeDir = {N: "S", S: "N", E: "W", W: "E"};
  let nodes = {
    "0,0": {dist: 0},
  };

  let processGroup = (regex, x, y) => {
    if (regex[0] === "(" || regex[0] === "|") {
      let parens = 0, start = 1, i = start, end, options = [];
      for (let i = start;; i++) {
        if (regex[i] === "(") {
          parens++;
        } else if (parens > 0 && regex[i] === ")") {
          parens--;
        } else if (parens === 0 && regex[i] === "|") {
          options.push([start, i]);
          start = i + 1;
        } else if (parens === 0 && regex[i] === ")") {
          options.push([start, i]);
          end = i + 1;
          break;
        }
      }

      let restOfRegex = regex.slice(end);
      options.forEach(([start, end]) => {
        let newRegex = regex.slice(start, end) + restOfRegex;
        return processGroup(newRegex, x, y);
      });
    }

    let dir = regex[0];
    let newX = x;
    let newY = y;
    if (dir === "N") newY--;
    else if (dir === "E") newX++;
    else if (dir === "S") newY++;
    else if (dir === "W") newX--;

    let oldNode = nodes[`${x},${y}`];
    let newNode = nodes[`${newX},${newY}`] || (nodes[`${newX},${newY}`] = {});

    if (oldNode[dir]) return;

    oldNode[dir] = newNode;
    newNode[oppositeDir[dir]] = oldNode;

    if (regex.length <= 1) return;
    return processGroup(regex.slice(1), newX, newY);
  }

  processGroup(input, 0, 0);

  let prevNodes = new Set([nodes["0,0"]]);
  while (true) {
    let nextNodes = new Set();

    prevNodes.forEach(node => {
      ["N", "W", "S", "E"].forEach(dir => {
        if (node[dir] && node[dir].dist === undefined) {
          node[dir].dist = node.dist + 1;
          nextNodes.add(node[dir]);
        }
      })
    })

    if (nextNodes.size === 0) return prevNodes.values().next().value.dist;
    prevNodes = nextNodes;
  }
}

// == PART 2 ==

function part2(input) {
  input = input.replace(/[$^]/g, "");

  let oppositeDir = {N: "S", S: "N", E: "W", W: "E"};
  let nodes = {
    "0,0": {dist: 0},
  };

  let processGroup = (regex, x, y) => {
    if (regex[0] === "(" || regex[0] === "|") {
      let parens = 0, start = 1, i = start, end, options = [];
      for (let i = start;; i++) {
        if (regex[i] === "(") {
          parens++;
        } else if (parens > 0 && regex[i] === ")") {
          parens--;
        } else if (parens === 0 && regex[i] === "|") {
          options.push([start, i]);
          start = i + 1;
        } else if (parens === 0 && regex[i] === ")") {
          options.push([start, i]);
          end = i + 1;
          break;
        }
      }

      let restOfRegex = regex.slice(end);
      options.forEach(([start, end]) => {
        let newRegex = regex.slice(start, end) + restOfRegex;
        return processGroup(newRegex, x, y);
      });
    }

    let dir = regex[0];
    let newX = x;
    let newY = y;
    if (dir === "N") newY--;
    else if (dir === "E") newX++;
    else if (dir === "S") newY++;
    else if (dir === "W") newX--;

    let oldNode = nodes[`${x},${y}`];
    let newNode = nodes[`${newX},${newY}`] || (nodes[`${newX},${newY}`] = {});

    if (oldNode[dir]) return;

    oldNode[dir] = newNode;
    newNode[oppositeDir[dir]] = oldNode;

    if (regex.length <= 1) return;
    return processGroup(regex.slice(1), newX, newY);
  }

  processGroup(input, 0, 0);

  let prevNodes = new Set([nodes["0,0"]]);
  while (true) {
    let nextNodes = new Set();

    prevNodes.forEach(node => {
      ["N", "W", "S", "E"].forEach(dir => {
        if (node[dir] && node[dir].dist === undefined) {
          node[dir].dist = node.dist + 1;
          nextNodes.add(node[dir]);
        }
      })
    })

    if (nextNodes.size === 0) break;
    prevNodes = nextNodes;
  }

  return Object.values(nodes).filter(n => n.dist >= 1000).length;
}

// == ASSERTS ==

console.assert(part1(`^WNE$`) === 3);
console.assert(part1(`^ENWWW(NEEE|SSE(EE|N))$`) === 10);
console.assert(part1(`^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$`) === 18);
console.assert(part1(`^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$`) === 23);
console.assert(part1(`^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$`) === 31);
console.assert(part1(`^${"(N|E)".repeat(1000)}$`) === 1000);

console.assert(part2(`^WNE$`) === 0);
console.assert(part2(`^${"(N|E)".repeat(1000)}$`) === 1001);
