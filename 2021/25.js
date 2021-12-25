// == PART 1 ==

function part1(input) {
  let seaCucumbers = input.split("\n");

  let transpose = array => [...array[0]].map((_, i) => array.map(row => row[i]).join(""));
  let moveRow = seaCucumber => rowBeforeMove => {
    let centerSpaces = rowBeforeMove.slice(0,-1);
    let borderSpace = rowBeforeMove.at(-1);

    let extendedRowBeforeMove = borderSpace + centerSpaces + borderSpace.replace(seaCucumber, "#");
    let extendedRowAfterMove = extendedRowBeforeMove.replace(new RegExp(`${seaCucumber}\\.`, 'g'), `.${seaCucumber}`);
    let rowAfterMove = extendedRowAfterMove.slice(1).replace("#", extendedRowAfterMove.at(0));

    return rowAfterMove;
  };

  for (let step = 1;; step++) {
    let stateBefore = seaCucumbers.toString();

    seaCucumbers = seaCucumbers.map(moveRow(">"));
    seaCucumbers = transpose(seaCucumbers);
    seaCucumbers = seaCucumbers.map(moveRow("v"));
    seaCucumbers = transpose(seaCucumbers);

    let stateAfter = seaCucumbers.toString();
    if (stateBefore === stateAfter) return step;
  }
}

// == PART 2 ==

// Successfully started the sleight 🛷 and saved Christmas 🎄

// == ASSERTS ==

console.assert(part1(
`v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`) === 58);
