// == PART 1 ==

function part1(input) {
  let list = [...Array(256).keys()];
  let pos = 0;
  let skip = 0;

  input
    .split(",")
    .map(Number)
    .forEach(length => {
      let endPos = (pos + length) % list.length;

      if (length > list.length) {
        return
      } else if (length > 0) {
        if (pos < endPos) {
          let sublist = list.slice(pos, endPos).reverse();
          let left = list.slice(0, pos);
          let right = list.slice(endPos);

          list = [...left, ...sublist, ...right];
        } else {
          let center = list.slice(endPos, pos);
          let left = list.slice(0, endPos);
          let right = list.slice(pos);

          let sublist = [...right, ...left].reverse();
          let newLeft = sublist.slice(right.length);
          let newRight = sublist.slice(0, right.length);

          list = [...newLeft, ...center, ...newRight];
        }
      }

      pos = (pos + length + skip++) % list.length;
    });

  return list[0] * list[1];
}

// == PART 2 ==

function part2(input) {
  let list = [...Array(256).keys()];
  let pos = 0;
  let skip = 0;

  let lengths = [...input.split("").map(char => char.charCodeAt(0)), 17, 31, 73, 47, 23];

  for (let i = 0; i < 64; i++) {
    lengths.forEach(length => {
      let endPos = (pos + length) % list.length;

      if (length > list.length) {
        return
      } else if (length > 0) {
        if (pos < endPos) {
          let sublist = list.slice(pos, endPos).reverse();
          let left = list.slice(0, pos);
          let right = list.slice(endPos);

          list = [...left, ...sublist, ...right];
        } else {
          let center = list.slice(endPos, pos);
          let left = list.slice(0, endPos);
          let right = list.slice(pos);

          let sublist = [...right, ...left].reverse();
          let newLeft = sublist.slice(right.length);
          let newRight = sublist.slice(0, right.length);

          list = [...newLeft, ...center, ...newRight];
        }
      }

      pos = (pos + length + skip++) % list.length;
    });
  }

  return list
    .reduce((acc, nr, i) => {
      if (i % 16 === 0) acc.push(nr);
      else acc[acc.length - 1] ^= nr;
      return acc;
    }, [])
    .map(nr => (nr < 16 ? "0" : "") + nr.toString(16))
    .join("");
}

// == ASSERTS ==

console.assert(part1("3,4,1,5") === 2);
console.assert(part1("50,40,30,20,10,0,50,100,150,200,250") === 57840);

console.assert(part2("") === "a2582a3a0e66e6e86e3812dcb672a272");
console.assert(part2("AoC 2017") === "33efeb34ea91902bb2f59c9920caa6cd");
console.assert(part2("1,2,3") === "3efbe78a8d82f29979031a4aa0b16a9d");
console.assert(part2("1,2,4") === "63960835bcdc130f0b66d7ff4f6a5a8e");
