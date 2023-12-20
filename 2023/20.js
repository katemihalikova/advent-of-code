// == SHARED ==

function parseModules(input) {
  let modules = input.split("\n").map(line => {
    let [, type, name, destinations] = line.match(/^([%&])?(\w+) -> ((?:\w+, )*\w+)$/);
    destinations = destinations.split(", ");
    return {name, type, destinations};
  });

  for (let module of modules) {
    if (module.type === "&") {
      module.type = "conjunction";
      module.remember = modules
        .filter(({destinations}) => destinations.includes(module.name))
        .reduce((remember, {name}) => ({...remember, [name]: "low"}), {});
    } else if (module.type === "%") {
      module.type = "flip-flop";
      module.state = "off";
    }
  }

  return Object.fromEntries(modules.map(({name, ...rest}) => [name, rest]));
}

// == PART 1 ==

function part1(input) {
  let modules = parseModules(input);

  let lowPulseCount = 0;
  let highPulseCount = 0;

  for (let push = 1; push <= 1000; push++) {
    let pulses = [{source: "button", moduleName: "broadcaster", pulse: "low"}];

    while (pulses.length > 0) {
      pulses = pulses.flatMap(({source, moduleName, pulse}) => {
        if (pulse === "low") lowPulseCount++;
        else highPulseCount++;

        let module = modules[moduleName];

        if (module === undefined) return [];

        if (module.type === "conjunction") {
          module.remember[source] = pulse;
          let nextPulse = {source: moduleName, pulse: Object.values(module.remember).every(val => val === "high") ? "low" : "high"};
          return module.destinations.map(destination => ({...nextPulse, moduleName: destination}));
        }

        if (module.type === "flip-flop") {
          if (pulse === "high") return [];
          module.state = module.state === "on" ? "off" : "on";
          let nextPulse = {source: moduleName, pulse: module.state === "on" ? "high" : "low"};
          return module.destinations.map(destination => ({...nextPulse, moduleName: destination}));
        }

        return module.destinations.map(destination => ({source: moduleName, moduleName: destination, pulse}));
      });
    }
  }

  return lowPulseCount * highPulseCount;
}

// == PART 2 ==

function part2(input) {
  let modules = parseModules(input);

  // Assuming from my input that module connected to "rx" is a conjunction module
  let moduleConnectedToRx = Object.values(modules).find(({destinations}) => destinations.includes("rx"));
  let pushesProducingHigh = Object.fromEntries(Object.keys(moduleConnectedToRx.remember).map(moduleName => [moduleName, undefined]));

  for (let push = 1;; push++) {
    let pulses = [{source: "button", moduleName: "broadcaster", pulse: "low"}];

    while (pulses.length > 0) {
      pulses = pulses.flatMap(({source, moduleName, pulse}) => {
        let module = modules[moduleName];

        if (moduleName === "rx") {
          for (let [connectedModuleName, pushProducingHigh] of Object.entries(pushesProducingHigh)) {
            if (pushProducingHigh === undefined && moduleConnectedToRx.remember[connectedModuleName] === "high") {
              pushesProducingHigh[connectedModuleName] = push;
            }
          }
          return [];
        }

        if (module.type === "conjunction") {
          module.remember[source] = pulse;
          let nextPulse = {source: moduleName, pulse: Object.values(module.remember).every(val => val === "high") ? "low" : "high"};
          return module.destinations.map(destination => ({...nextPulse, moduleName: destination}));
        }

        if (module.type === "flip-flop") {
          if (pulse === "high") return [];
          module.state = module.state === "on" ? "off" : "on";
          let nextPulse = {source: moduleName, pulse: module.state === "on" ? "high" : "low"};
          return module.destinations.map(destination => ({...nextPulse, moduleName: destination}));
        }

        return module.destinations.map(destination => ({source: moduleName, moduleName: destination, pulse}));
      });

      if (Object.values(pushesProducingHigh).every(push => push !== undefined)) {
        // Should be least common multiple, however my input produced only prime numbers
        return Object.values(pushesProducingHigh).reduce((product, push) => product * push, 1);
      }
    }
  }
}

// == ASSERTS ==

console.assert(part1(
`broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`) === 32000000);
console.assert(part1(
`broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`) === 11687500);

// No testing data provided for PART 2
