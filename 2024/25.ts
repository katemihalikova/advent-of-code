// == PART 1 ==

function part1(input: string): number {
  return input
    .split("\n\n")
    .map(block => block
      .split("\n")
      .map(line => [...line])
    )
    .map(schema => schema[0]
      .map((_, colIndex) => schema
        .map(row => row[colIndex])
      )
    )
    .map<[number[], boolean]>(schema => [
      schema.map(col => col
        .filter(cell => cell === "#").length - 1,
      ),
      schema.every(col => col[0] === "#"),
    ])
    .reduce((count, [schemaA, isLockA], index, schemas) => count + schemas
      .slice(0, index)
      .filter(([schemaB, isLockB]) => isLockA !== isLockB && schemaA.every((_, i) => schemaA[i] + schemaB[i] <= 5))
      .length, 0
    );
}

// == PART 2 ==

// Successfully delivered the chronicle 📕 and saved Christmas 🎄

// == ASSERTS ==

console.assert(part1(`\
#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`) === 3);
