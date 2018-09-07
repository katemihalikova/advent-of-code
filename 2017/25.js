// == PART 1 ==

function part1(input) {
  let currentState = input.match(/Begin in state (\w+)./)[1];
  let position = 0;
  let iterations = Number(input.match(/Perform a diagnostic checksum after (\d+) steps./)[1]);
  let tape = new Set();

  let states = input
    .split("\n\n")
    .slice(1)
    .reduce((states, definition) => {
      let [, stateName] = definition.match(/In state (\w+):/);
      let [, valueIfZero, moveIfZero, nextStateIfZero] = definition.match(/If the current value is 0:\s+- Write the value (0|1).\s+- Move one slot to the (left|right).\s+- Continue with state (\w+)./);
      let [, valueIfOne, moveIfOne, nextStateIfOne] = definition.match(/If the current value is 1:\s+- Write the value (0|1).\s+- Move one slot to the (left|right).\s+- Continue with state (\w+)./);

      states.set(stateName, () => {
        let [value, move, nextState] = tape.has(position) ? [valueIfOne, moveIfOne, nextStateIfOne] : [valueIfZero, moveIfZero, nextStateIfZero];
        if (value === "1") tape.add(position);
        else tape.delete(position);
        position += move === "left" ? -1 : 1;
        currentState = nextState;
      });
      return states;
    }, new Map());

  for (let i = 0; i < iterations; i++) {
    states.get(currentState)();
  }

  return tape.size;
}

// == ASSERTS ==

console.assert(part1(`Begin in state A.
Perform a diagnostic checksum after 6 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.

In state B:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.`) === 3);
