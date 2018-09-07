// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(e => e.split("/").map(Number));

  let bridges = [];
  function computeNextBridges(usedComponents, remainingComponents) {
    let nextPort = usedComponents.length > 0 ? usedComponents[usedComponents.length - 1][1] : 0;

    let nextComponents = remainingComponents
      .map((component, index) => [component, index])
      .filter(([[port1, port2]]) => port1 === nextPort || port2 === nextPort);

    if (nextComponents.length > 0) {
      nextComponents.forEach(([nextComponent, nextComponentIndex]) => {

        let currentlyUsedComponent = [...nextComponent];
        if (nextComponent[0] !== nextPort) currentlyUsedComponent.reverse();

        let newRemainingComponents = [...remainingComponents];
        newRemainingComponents.splice(nextComponentIndex, 1);
        computeNextBridges([...usedComponents, currentlyUsedComponent], newRemainingComponents);
      })
    } else {
      bridges.push(usedComponents);
    }
  }

  computeNextBridges([], input);

  return bridges
    .map(bridge => bridge.reduce((acc, [port1, port2]) => acc + port1 + port2, 0))
    .reduce((maxStrength, strength) => strength > maxStrength ? strength : maxStrength, 0);
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(e => e.split("/").map(Number));

  let bridges = [];
  function computeNextBridges(usedComponents, remainingComponents) {
    let nextPort = usedComponents.length > 0 ? usedComponents[usedComponents.length - 1][1] : 0;

    let nextComponents = remainingComponents
      .map((component, index) => [component, index])
      .filter(([[port1, port2]]) => port1 === nextPort || port2 === nextPort);

    if (nextComponents.length > 0) {
      nextComponents.forEach(([nextComponent, nextComponentIndex]) => {

        let currentlyUsedComponent = [...nextComponent];
        if (nextComponent[0] !== nextPort) currentlyUsedComponent.reverse();

        let newRemainingComponents = [...remainingComponents];
        newRemainingComponents.splice(nextComponentIndex, 1);
        computeNextBridges([...usedComponents, currentlyUsedComponent], newRemainingComponents);
      })
    } else {
      bridges.push(usedComponents);
    }
  }

  computeNextBridges([], input);

  let maxBridgeLength = bridges.reduce((maxLen, bridge) => bridge.length > maxLen ? bridge.length : maxLen, 0);
  return bridges
    .filter(bridge => bridge.length === maxBridgeLength)
    .map(bridge => bridge.reduce((acc, [port1, port2]) => acc + port1 + port2, 0))
    .reduce((maxStrength, strength) => strength > maxStrength ? strength : maxStrength, 0);
}

// == ASSERTS ==

console.assert(part1("0/2\n2/2\n2/3\n3/4\n3/5\n0/1\n10/1\n9/10") === 31);

console.assert(part2("0/2\n2/2\n2/3\n3/4\n3/5\n0/1\n10/1\n9/10") === 19);
