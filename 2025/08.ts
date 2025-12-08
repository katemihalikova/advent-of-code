// == SHARED ==

type Box = {x: number, y: number, z: number, circuit: number};
type Connection = {distance: number, boxes: [Box, Box]};

// == PART 1 ==

function part1(input: string, maxConnections: number): number {
  let boxes = input
    .split("\n")
    .map(line => line.split(",").map(Number))
    .map<Box>(([x, y, z], index) => ({x, y, z, circuit: index}));

  let connections = boxes.reduce<Connection[]>((acc, box1, i) => {
    for (let box2 of boxes.slice(i + 1)) {
      acc.push({
        distance: Math.sqrt((box1.x - box2.x) ** 2 + (box1.y - box2.y) ** 2 + (box1.z - box2.z) ** 2),
        boxes: [box1, box2],
      });
    }
    return acc;
  }, [])
  .toSorted(({distance: distance1}, {distance: distance2}) => distance1 - distance2)
  .slice(0, maxConnections);

  for (let {boxes: [{circuit: circuit1}, {circuit: circuit2}]} of connections) {
    for (let box of boxes.filter(({circuit}) => circuit === circuit1)) {
      box.circuit = circuit2;
    }
  }

  return boxes
    .reduce<Map<number, number>>((sizes, {circuit}) => sizes.set(circuit, (sizes.get(circuit) ?? 0) + 1), new Map())
    .values()
    .toArray()
    .toSorted((a, b) => b - a)
    .slice(0, 3)
    .reduce((product, size) => product * size, 1);
}

// == PART 2 ==

function part2(input: string): number {
  let boxes = input
    .split("\n")
    .map(line => line.split(",").map(Number))
    .map<Box>(([x, y, z], index) => ({x, y, z, circuit: index}));

  let connections = boxes.reduce<Connection[]>((acc, box1, i) => {
    for (let box2 of boxes.slice(i + 1)) {
      acc.push({
        distance: Math.sqrt((box1.x - box2.x) ** 2 + (box1.y - box2.y) ** 2 + (box1.z - box2.z) ** 2),
        boxes: [box1, box2],
      });
    }
    return acc;
  }, [])
  .toSorted(({distance: distance1}, {distance: distance2}) => distance1 - distance2);

  for (let {boxes: [{x: x1, circuit: circuit1}, {x: x2, circuit: circuit2}]} of connections) {
    for (let box of boxes.filter(({circuit}) => circuit === circuit1)) {
      box.circuit = circuit2;
      if (boxes.every(({circuit}) => circuit === boxes[0].circuit)) return x1 * x2;
    }
  }

  throw "unreachable";
}

// == ASSERTS ==

console.assert(part1(`\
162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`, 10) === 40);

console.assert(part2(`\
162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`) === 25272);
