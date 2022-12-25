// == PART 1 ==

const snafuToDecimal = {
  "=": -2,
  "-": -1,
  "0": 0,
  "1": 1,
  "2": 2,
}

const decimalToSnafu = {
  "-2": "=",
  "-1": "-",
  "0": "0",
  "1": "1",
  "2": "2",
}

function part1(input) {
  return input
    .split("\n")
    .reduce((acc, number) => {
      [...number]
        .map(digit => snafuToDecimal[digit])
        .reverse()
        .forEach((digit, i) => {
          acc[i] = acc[i] || 0;
          acc[i] += digit;
        });
      return acc;
    }, Array(25).fill(0))
    .reduce((acc, digitSum, i) => {
      digitSum += acc[i];
      let digit = (digitSum + 252) % 5 - 2;
      let overflow = (digitSum - digit) / 5;
      acc[i] = digit;
      acc[i + 1] = overflow;
      return acc;
    }, [0])
    .map(n => decimalToSnafu[n])
    .reverse()
    .join("")
    .replace(/^0+/, "");
}

// == PART 2 ==

// Successfully filled the smoothie blender 🥤 and saved Christmas 🎄

// == ASSERTS ==

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
