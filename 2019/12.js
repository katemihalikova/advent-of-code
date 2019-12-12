// == PART 1 ==

function part1(input, steps = 1000) {
  let state = input.split("\n").map(line => {
    let [, x, y, z] = line.match(/^<x=(-?\d+), y=(-?\d+), z=(-?\d+)>$/).map(Number);
    return {x, y, z, vx: 0, vy: 0, vz: 0};
  });

  for (let step = 1; step <= steps; step++) {
    let nextState = state.map(moon => ({...moon}));

    state.forEach((moon, moonIndex) => {
      state.forEach(otherMoon => {
        if (moon === otherMoon) return;
        if (moon.x < otherMoon.x) nextState[moonIndex].vx++;
        else if (moon.x > otherMoon.x) nextState[moonIndex].vx--;
        if (moon.y < otherMoon.y) nextState[moonIndex].vy++;
        else if (moon.y > otherMoon.y) nextState[moonIndex].vy--;
        if (moon.z < otherMoon.z) nextState[moonIndex].vz++;
        else if (moon.z > otherMoon.z) nextState[moonIndex].vz--;
      })
    });

    nextState.forEach(moon => {
      moon.x += moon.vx;
      moon.y += moon.vy;
      moon.z += moon.vz;
    });

    state = nextState;
  }

  return state.reduce((acc, moon) => acc + (Math.abs(moon.x) + Math.abs(moon.y) + Math.abs(moon.z)) * (Math.abs(moon.vx) + Math.abs(moon.vy) + Math.abs(moon.vz)), 0);
}

// == PART 2 ==

function part2(input) {
  let initialState = input.split("\n").map(line => {
    let [, x, y, z] = line.match(/^<x=(-?\d+), y=(-?\d+), z=(-?\d+)>$/).map(Number);
    return {x, y, z, vx: 0, vy: 0, vz: 0};
  });

  let result = ['x', 'y', 'z']
    .map(axis => {
      let state = initialState.map(moon => ({pos: moon[axis], vel: moon[`v${axis}`]}));

      for (let step = 1; step < 300000; step++) {
        let nextState = state.map(moon => ({...moon}));
    
        state.forEach((moon, moonIndex) => {
          state.forEach(otherMoon => {
            if (moon === otherMoon) return;
            if (moon.pos < otherMoon.pos) nextState[moonIndex].vel++;
            else if (moon.pos > otherMoon.pos) nextState[moonIndex].vel--;
          })
        });
    
        nextState.forEach(moon => {
          moon.pos += moon.vel;
        })

        state = nextState;

        if (state.every((moon, moonIndex) => moon.pos === initialState[moonIndex][axis] && moon.vel === initialState[moonIndex][`v${axis}`])) {
          return step;
        }
      }
    })
    .map(number => {
      let factors = {};
      for (let prime = 2; prime <= Math.sqrt(number); prime++) {
        if (number % prime === 0) {
          factors[prime] = factors[prime] || 0;
          factors[prime]++;
          number /= prime;
          prime = 1;
        }
      }

      factors[number] = factors[number] || 0;
      factors[number]++;
      return factors;
    })
    .reduce((acc, factors) => {
      Object.entries(factors).forEach(([prime, power]) => {
        if (!acc[prime] || power > acc[prime]) {
          acc[prime] = power;
        }
      });
      return acc;
    });

  return Object.entries(result).reduce((acc, [prime, power]) => acc * (prime ** power), 1);
}

// == ASSERTS ==

console.assert(part1("<x=-1, y=0, z=2>\n<x=2, y=-10, z=-7>\n<x=4, y=-8, z=8>\n<x=3, y=5, z=-1>", 10) === 179);
console.assert(part1("<x=-8, y=-10, z=0>\n<x=5, y=5, z=10>\n<x=2, y=-7, z=3>\n<x=9, y=-8, z=-3>", 100) === 1940);

console.assert(part2("<x=-1, y=0, z=2>\n<x=2, y=-10, z=-7>\n<x=4, y=-8, z=8>\n<x=3, y=5, z=-1>") === 2772);
console.assert(part2("<x=-8, y=-10, z=0>\n<x=5, y=5, z=10>\n<x=2, y=-7, z=3>\n<x=9, y=-8, z=-3>") === 4686774924);
