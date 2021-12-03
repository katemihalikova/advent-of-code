// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(line => [...line]);

  let gamma = "", epsilon = "";

  for (let i = 0; i < input[0].length; i++) {
    let bits = input.map(nr => nr[i]);
    let ones = bits.filter(bit => bit === "1");

    if (ones.length > bits.length / 2) {
      gamma += "1";
      epsilon += "0";
    } else {
      gamma += "0";
      epsilon += "1";
    }
  }

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(line => [...line]);

  let oxygen = [...input];

  for (let i = 0; i < oxygen[0].length; i++) {
    let bits = oxygen.map(nr => nr[i]);
    let ones = bits.filter(bit => bit === "1");

    if (ones.length >= bits.length / 2) {
      oxygen = oxygen.filter(nr => nr[i] === "1");
    } else {
      oxygen = oxygen.filter(nr => nr[i] === "0");
    }

    if (oxygen.length <= 1) break;
  }

  let co2 = [...input];

  for (let i = 0; i < co2[0].length; i++) {
    let bits = co2.map(nr => nr[i]);
    let ones = bits.filter(bit => bit === "1");

    if (ones.length >= bits.length / 2) {
      co2 = co2.filter(nr => nr[i] === "0");
    } else {
      co2 = co2.filter(nr => nr[i] === "1");
    }
    if (co2.length <= 1) break;
  }

  return parseInt(oxygen[0].join(""), 2) * parseInt(co2[0].join(""), 2);
}

// == ASSERTS ==

console.assert(part1("00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010") === 198);

console.assert(part2("00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010") === 230);
