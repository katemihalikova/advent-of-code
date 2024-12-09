// == SHARED ==

function parseFilesystem(input: string): Array<number | undefined> {
  return [...input].flatMap((length, index) => Array(Number(length)).fill(index % 2 === 0 ? Math.floor(index / 2) : undefined));
}

function getFilesystemChecksum(filesystem: Array<number | undefined>): number {
  return filesystem.reduce<number>((checksum, fileId, position) => fileId === undefined ? checksum : checksum + fileId * position, 0);
}

// == PART 1 ==

function part1(input: string): number {
  let filesystem = parseFilesystem(input);

  while (true) {
    let oldIndex = filesystem.findLastIndex(block => block !== undefined);
    let newIndex = filesystem.findIndex(block => block === undefined);
    if (newIndex > oldIndex) break;

    [filesystem[oldIndex], filesystem[newIndex]] = [filesystem[newIndex], filesystem[oldIndex]];
  }

  return getFilesystemChecksum(filesystem);
}

// == PART 2 ==

function part2(input: string): number {
  let filesystem = parseFilesystem(input);

  for (let fileId = Math.floor(input.length / 2); fileId >= 0; fileId--) {
    let oldStartIndex = filesystem.findIndex(block => block === fileId);
    let oldEndIndex = filesystem.findLastIndex(block => block === fileId);
    let length = oldEndIndex - oldStartIndex + 1;
    let newStartIndex = filesystem.findIndex((_, index) => [...filesystem.slice(index, index + length)].every(block => block === undefined));
    if (newStartIndex === -1 || newStartIndex > oldStartIndex) continue;

    for (let i = 0; i < length; i++) {
      [filesystem[oldStartIndex + i], filesystem[newStartIndex + i]] = [filesystem[newStartIndex + i], filesystem[oldStartIndex + i]];
    }
  }

  return getFilesystemChecksum(filesystem);
}

// == ASSERTS ==

console.assert(part1("2333133121414131402") === 1928);

console.assert(part2("2333133121414131402") === 2858);
