// == PART 1 ==

function part1(input) {
  input = JSON.parse(input);

  function getSum(value) {
    if (typeof value === "string") return 0;
    if (typeof value === "number") return value;
    if (!Array.isArray(value)) value = Object.values(value);
    return value.reduce((sum, prop) => sum + getSum(prop), 0);
  }

  return getSum(input);
}

// == PART 2 ==

function part2(input) {
  input = JSON.parse(input);

  function getSum(value) {
    if (typeof value === "string") return 0;
    if (typeof value === "number") return value;
    if (!Array.isArray(value)) {
      value = Object.values(value);
      if (value.indexOf("red") > -1) return 0;
    }
    return value.reduce((sum, prop) => sum + getSum(prop), 0);
  }

  return getSum(input);
}

// == ASSERTS ==

console.assert(part1(`[1,2,3]`) === 6);
console.assert(part1(`{"a":2,"b":4}`) === 6);
console.assert(part1(`[[[3]]]`) === 3);
console.assert(part1(`{"a":{"b":4},"c":-1}`) === 3);
console.assert(part1(`{"a":[-1,1]}`) === 0);
console.assert(part1(`[-1,{"a":1}]`) === 0);
console.assert(part1(`[]`) === 0);
console.assert(part1(`{}`) === 0);

console.assert(part2(`[1,2,3]`) === 6);
console.assert(part2(`[1,{"c":"red","b":2},3]`) === 4);
console.assert(part2(`{"d":"red","e":[1,2,3,4],"f":5}`) === 0);
console.assert(part2(`[1,"red",5]`) === 6);
