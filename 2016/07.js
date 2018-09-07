// == PART 1 ==

function aoc_day7_part1(input) {
  input = input.split("\n");
  
  return input
    .filter(e => !e.match(/\[[^[]*(\w)(?!\1)(\w)\2\1[^[]*\]/))
    .filter(e => e.match(/(\w)(?!\1)(\w)\2\1/))
    .length;
}

// == PART 2 ==

function aoc_day7_part2(input) {
  input = input.split("\n");
  
  return input
    .filter(e => 
      e.match(/(\w)(?!\1)(\w)\1(?:[^\[\]]|\[[^\[\]]*\])*\[(?:[^\[\]]|\[[^\[\]]*\])*\2\1\2(?:[^\[\]]|\[[^\[\]]*\])*\]/) ||  
      e.match(/\[(?:[^\[\]]|\[[^\[\]]*\])*(\w)(?!\1)(\w)\1(?:[^\[\]]|\[[^\[\]]*\])*\](?:[^\[\]]|\[[^\[\]]*\])*\2\1\2/)
    )
    .length;
}

// == ASSERTS ==

console.assert(aoc_day7_part1("abba[mnop]qrst\nabcd[bddb]xyyx\naaaa[qwer]tyui\nioxxoj[asdfgh]zxcvbn") === 2);

console.assert(aoc_day7_part2("aba[bab]xyz\nxyx[xyx]xyx\naaa[kek]eke\nzazbz[bzb]cdb") === 3);
