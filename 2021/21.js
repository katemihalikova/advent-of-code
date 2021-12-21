// == PART 1 ==

function part1(input) {
  let position = input.split("\n").map(line => Number(line.split(": ")[1]));
  let score = [0, 0];

  let rollCount = 0;
  let deterministicDie = 0;
  let rollDie = () => {
    deterministicDie = (deterministicDie + 1) % 100 || 100;
    rollCount++;
    return deterministicDie;
  }

  while (true) {
    for (let player = 0; player <= 1; player++) {
      let roll = rollDie() + rollDie() + rollDie();
      let newPosition = (position[player] + roll) % 10 || 10;
      position[player] = newPosition;
      score[player] += newPosition;

      if (score[player] >= 1000) {
        return rollCount * score[1 - player];
      }
    }
  }
}

// == PART 2 ==

function part2(input) {
  let position = input.split("\n").map(line => Number(line.split(": ")[1]));
  let score = [0, 0];
  let winCount = [0, 0];

  let rollCounts = [
    [3, 1], // 111
    [4, 3], // 112 121 211
    [5, 6], // 113 122 131 212 221 311
    [6, 7], // 123 132 213 222 231 312 321
    [7, 6], // 133 223 232 313 322 331
    [8, 3], // 233 323 332
    [9, 1], // 333
  ];

  let processNextRoll = (previousPosition, previousScore, player, multiplier = 1) => {
    for (let [roll, rollCount] of rollCounts) {
      let position = [...previousPosition];
      let score = [...previousScore];

      let newPosition = (position[player] + roll) % 10 || 10;
      position[player] = newPosition;
      score[player] += newPosition;

      if (score[player] >= 21) {
        winCount[player] += multiplier * rollCount;
      } else {
        processNextRoll(position, score, 1 - player, multiplier * rollCount);
      }
    }
  };

  processNextRoll(position, score, 0);

  return Math.max(...winCount);
}

// == ASSERTS ==

console.assert(part1("Player 1 starting position: 4\nPlayer 2 starting position: 8") === 739785);

console.assert(part2("Player 1 starting position: 4\nPlayer 2 starting position: 8") === 444356092776315);
