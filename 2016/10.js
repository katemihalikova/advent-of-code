// == PART 1 & 2 ==

function aoc_day10(part, input, findLow, findHigh) {
  input = input.split("\n");

  let bots = {};
  let outputs = {};

  for (row of input) {
    if (row[0] === "v") {
      let [, value, bot] = row.match(/value (\d+) goes to bot (\d+)/);
      bots[bot] = bots[bot] || [];
      bots[bot].push(+value);
    }
  }

  while (true) {
    for (row of input) {
      if (row[0] === "b") {
        let [, from, lowToType, lowTo, highToType, highTo] = row.match(/bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/);
        let bot = bots[from];
        if (!bot || bot.length < 2) continue;
        let [low, high] = bot;
        if (low > high) [low, high] = [high, low];
        if (part === 1 && low === findLow && high === findHigh) return +from;
        bots[from] = [];
        if (lowToType === "bot") {
          bots[lowTo] = bots[lowTo] || [];
          bots[lowTo].push(low);
        } else {
          outputs[lowTo] = low;
        }
        if (highToType === "bot") {
          bots[highTo] = bots[highTo] || [];
          bots[highTo].push(high);
        } else {
          outputs[highTo] = high;
        }
        if (part === 2 && outputs[0] && outputs[1] && outputs[2]) return outputs[0] * outputs[1] * outputs[2];
      }
    }
  }
}

// == ASSERTS ==

console.assert(aoc_day10(1, "value 5 goes to bot 2\nbot 2 gives low to bot 1 and high to bot 0\nvalue 3 goes to bot 1\nbot 1 gives low to output 1 and high to bot 0\nbot 0 gives low to output 2 and high to output 0\nvalue 2 goes to bot 2", 2, 5) === 2);

console.assert(aoc_day10(2, "value 5 goes to bot 2\nbot 2 gives low to bot 1 and high to bot 0\nvalue 3 goes to bot 1\nbot 1 gives low to output 1 and high to bot 0\nbot 0 gives low to output 2 and high to output 0\nvalue 2 goes to bot 2") === 30);
