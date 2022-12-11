// == PART 1 ==

function part1(input) {
  let monkeys = input
    .split("\n\n")
    .map(line => {
      let [, number, items, opSign, opArgNumber, opArgString, divisable, throwToIfTrue, throwToIfFalse] = line.match(/^Monkey (\d+):\nStarting items: ([\d, ]+)\nOperation: new = old (.) (?:(\d+)|(\w+))\nTest: divisible by (\d+)\n  If true: throw to monkey (\d+)\n  If false: throw to monkey (\d+)$/);
      return {
        number: Number(number),
        items: items.split(", ").map(Number),
        opSign,
        opArgNumber: Number(opArgNumber),
        opArgString,
        divisable: Number(divisable),
        throwToIfTrue: Number(throwToIfTrue),
        throwToIfFalse: Number(throwToIfFalse),
        inspected: 0,
      };
    });

  for (let round = 1; round <= 20; round++) {
    for (let monkey of monkeys) {
      let {items, opSign, opArgNumber, opArgString, divisable, throwToIfTrue, throwToIfFalse} = monkey;

      for (let worry of items) {

        if (opSign === "+") worry += opArgString ? worry : opArgNumber;
        if (opSign === "*") worry *= opArgString ? worry : opArgNumber;

        worry = Math.floor(worry / 3);

        let throwTo = worry % divisable === 0 ? throwToIfTrue : throwToIfFalse;
        monkeys.find(({number}) => number === throwTo).items.push(worry);

        monkey.inspected++;
      }

      items.length = 0;
    }
  }

  let totals = monkeys.map(e => e.inspected).sort((a, b) => b - a);
  return totals[0] * totals[1];
}

// == PART 2 ==

function part2(input) {
  let monkeys = input
    .split("\n\n")
    .map(line => {
      let [, number, items, opSign, opArgNumber, opArgString, divisable, throwToIfTrue, throwToIfFalse] = line.match(/^Monkey (\d+):\nStarting items: ([\d, ]+)\nOperation: new = old (.) (?:(\d+)|(\w+))\nTest: divisible by (\d+)\n  If true: throw to monkey (\d+)\n  If false: throw to monkey (\d+)$/);
      return {
        number: Number(number),
        items: items.split(", ").map(Number),
        opSign,
        opArgNumber: Number(opArgNumber),
        opArgString,
        divisable: Number(divisable),
        throwToIfTrue: Number(throwToIfTrue),
        throwToIfFalse: Number(throwToIfFalse),
        inspected: 0,
      };
    });

  let safeDivisable = monkeys.map(({divisable}) => divisable).reduce((a, b) => a * b);

  for (let round = 1; round <= 10000; round++) {
    for (let monkey of monkeys) {
      let {items, opSign, opArgNumber, opArgString, divisable, throwToIfTrue, throwToIfFalse} = monkey;

      for (let worry of items) {

        if (opSign === "+") worry += opArgString ? worry : opArgNumber;
        if (opSign === "*") worry *= opArgString ? worry : opArgNumber;

        worry %= safeDivisable;

        monkeys.find(({number}) => number === (worry % divisable === 0 ? throwToIfTrue : throwToIfFalse)).items.push(worry);

        monkey.inspected++;
      }

      items.length = 0;
    }
  }

  let totals = monkeys.map(e => e.inspected).sort((a, b) => b - a);
  return totals[0] * totals[1];
}

// == ASSERTS ==

let exampleMonkeys =
`Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

console.assert(part1(exampleMonkeys) === 10605);

console.assert(part2(exampleMonkeys) === 2713310158);
