// == SHARED ==

const NOT_VISITED_SPACE = -1;
const CORRUPTED_SPACE = -2;

function calculateStepsToExit(fallingBytes: [number, number][], memorySize: number): number {
  let memory: number[][] = Array.from({length: memorySize + 1}, () => Array(memorySize + 1).fill(NOT_VISITED_SPACE));
  for (let [x, y] of fallingBytes) memory[y][x] = CORRUPTED_SPACE;

  let currentBytes: [number, number][] = [[0, 0]];
  memory[0][0] = 0;

  for (let steps = 1; currentBytes.length > 0; steps++) {
    let nextBytes: [number, number][] = [];

    for (let [x, y] of currentBytes) {
      [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ]
        .filter(([x, y]) => memory[y]?.[x] === NOT_VISITED_SPACE)
        .forEach(([x, y]) => {
          memory[y][x] = steps;
          nextBytes.push([x, y]);
        });
    }

    currentBytes = nextBytes;
  }

  return memory[memorySize][memorySize];
}

// == PART 1 ==

function part1(input: string, memorySize: number = 70, bytesCount: number = 1024): number {
  let fallingBytes = input.split("\n").map(line => line.split(",").map(Number) as [number, number]);

  return calculateStepsToExit(fallingBytes.slice(0, bytesCount), memorySize);
}

// == PART 2 ==

function part2(input: string, memorySize: number = 70): string {
  let fallingBytes = input.split("\n").map(line => line.split(",").map(Number) as [number, number]);

  for (let bytesCount = 1;; bytesCount++) {
    if (calculateStepsToExit(fallingBytes.slice(0, bytesCount), memorySize) === NOT_VISITED_SPACE) return fallingBytes[bytesCount - 1].join(",");
  }
}

// == ASSERTS ==

console.assert(part1("5,4\n4,2\n4,5\n3,0\n2,1\n6,3\n2,4\n1,5\n0,6\n3,3\n2,6\n5,1\n1,2\n5,5\n2,5\n6,5\n1,4\n0,4\n6,4\n1,1\n6,1\n1,0\n0,5\n1,6\n2,0", 6, 12) === 22);

console.assert(part2("5,4\n4,2\n4,5\n3,0\n2,1\n6,3\n2,4\n1,5\n0,6\n3,3\n2,6\n5,1\n1,2\n5,5\n2,5\n6,5\n1,4\n0,4\n6,4\n1,1\n6,1\n1,0\n0,5\n1,6\n2,0", 6) === "6,1");
