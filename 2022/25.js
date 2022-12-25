// == SHARED ==

Array.prototype.sum = function() {
  return this.reduce((acc, el) => acc + el, 0);
}

// == PART 1 ==

const snafuToDecimal = {
  "=": -2,
  "-": -1,
  "0": 0,
  "1": 1,
  "2": 2,
}

const snafuIncrement = {
  "=": "-",
  "-": "0",
  "0": "1",
  "1": "2",
  "2": "=",
}

function convertToDecimal(number) {
  return [...number]
    .reverse()
    .reduce((acc, digit, power) => acc + snafuToDecimal[digit] * (5 ** power), 0);
}

function convertToSnafu(number) {
  return ["0", ...number.toString(5)]
    .reduce((acc, n, i) => {
      if (i === 0) return [n];
      if (n === "3" || n === "4") {
        n = {3: "=", 4: "-"}[n];
        (function overflow(array, i) {
          array[i] = snafuIncrement[array[i]];
          if (array[i] === "=") overflow(array, i - 1);
        })(acc, i - 1);
      }
      acc.push(n);
      return acc;
    }, [])
    .join("")
    .replace(/^0/, "");
}

function part1(input) {
  return convertToSnafu(
    input
      .split("\n")
      .map(convertToDecimal)
      .sum()
  );
}

// == PART 2 ==

// Successfully filled the smoothie blender 🥤 and saved Christmas 🎄

// == ASSERTS ==

console.assert(convertToDecimal("1") === 1);
console.assert(convertToDecimal("2") === 2);
console.assert(convertToDecimal("1=") === 3);
console.assert(convertToDecimal("1-") === 4);
console.assert(convertToDecimal("10") === 5);
console.assert(convertToDecimal("11") === 6);
console.assert(convertToDecimal("12") === 7);
console.assert(convertToDecimal("2=") === 8);
console.assert(convertToDecimal("2-") === 9);
console.assert(convertToDecimal("20") === 10);
console.assert(convertToDecimal("1=0") === 15);
console.assert(convertToDecimal("1-0") === 20);
console.assert(convertToDecimal("1=11-2") === 2022);
console.assert(convertToDecimal("1-0---0") === 12345);
console.assert(convertToDecimal("1121-1110-1=0") === 314159265);

console.assert(convertToSnafu(1) === "1");
console.assert(convertToSnafu(2) === "2");
console.assert(convertToSnafu(3) === "1=");
console.assert(convertToSnafu(4) === "1-");
console.assert(convertToSnafu(5) === "10");
console.assert(convertToSnafu(6) === "11");
console.assert(convertToSnafu(7) === "12");
console.assert(convertToSnafu(8) === "2=");
console.assert(convertToSnafu(9) === "2-");
console.assert(convertToSnafu(10) === "20");
console.assert(convertToSnafu(15) === "1=0");
console.assert(convertToSnafu(20) === "1-0");
console.assert(convertToSnafu(2022) === "1=11-2");
console.assert(convertToSnafu(12345) === "1-0---0");
console.assert(convertToSnafu(314159265) === "1121-1110-1=0");

console.assert(convertToDecimal("1=-0-2") === 1747);
console.assert(convertToDecimal("12111") === 906);
console.assert(convertToDecimal("2=0=") === 198);
console.assert(convertToDecimal("21") === 11);
console.assert(convertToDecimal("2=01") === 201);
console.assert(convertToDecimal("111") === 31);
console.assert(convertToDecimal("20012") === 1257);
console.assert(convertToDecimal("112") === 32);
console.assert(convertToDecimal("1=-1=") === 353);
console.assert(convertToDecimal("1-12") === 107);
console.assert(convertToDecimal("12") === 7);
console.assert(convertToDecimal("1=") === 3);
console.assert(convertToDecimal("122") === 37);

console.assert(convertToSnafu(1747) === "1=-0-2");
console.assert(convertToSnafu(906) === "12111");
console.assert(convertToSnafu(198) === "2=0=");
console.assert(convertToSnafu(11) === "21");
console.assert(convertToSnafu(201) === "2=01");
console.assert(convertToSnafu(31) === "111");
console.assert(convertToSnafu(1257) === "20012");
console.assert(convertToSnafu(32) === "112");
console.assert(convertToSnafu(353) === "1=-1=");
console.assert(convertToSnafu(107) === "1-12");
console.assert(convertToSnafu(7) === "12");
console.assert(convertToSnafu(3) === "1=");
console.assert(convertToSnafu(37) === "122");

console.assert(convertToDecimal("2=-01") === 976);

console.assert(part1(`\
1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`) === "2=-1=0");
