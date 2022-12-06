// == SHARED ==

Array.prototype.sum = function() {
  return this.reduce((acc, el) => acc + el, 0);
}

function getDirSizes(input) {
  input = input
    .split("\n$ ")
    .slice(1)
    .map(cmd => cmd.split("\n"));

  let PARENT = Symbol();
  let root = {};
  let currentDir = root;
  let dirs = [root];

  for (let [command, ...outputLines] of input) {
    if (command === "ls") {
      for (let outputLine of outputLines) {
        let [sizeOrDir, name] = outputLine.split(" ");
        if (sizeOrDir === "dir") {
          currentDir[name] = {[PARENT]: currentDir};
          dirs.push(currentDir[name]);
        } else {
          currentDir[name] = {size: Number(sizeOrDir)};
        }
      }
    } else {
      let [, dir] = command.split(" ");
      if (dir === "..") currentDir = currentDir[PARENT];
      else currentDir = currentDir[dir];
    }
  }

  function getSize(dir) {
    return Object.values(dir)
      .map(child => PARENT in child ? getSize(child) : child.size)
      .sum();
  }

  return dirs.map(getSize);
}

// == PART 1 ==

function part1(input) {
  return getDirSizes(input)
    .filter(size => size <= 100000)
    .sum();
}

// == PART 2 ==

function part2(input) {
  let [occupiedSpace, ...dirSizes] = getDirSizes(input);

  let totalSpace = 70000000;
  let neededSpace = 30000000;
  let missingSpace = occupiedSpace + neededSpace - totalSpace;

  return dirSizes
    .sort((a, b) => a - b)
    .find(size => size >= missingSpace);
}

// == ASSERTS ==

console.assert(part1(
`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`) === 95437);

console.assert(part2(
`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`) === 24933642);
