// == PART 1 ==

function part1(input) {
  input = input.split("\n");
  let arrivalToBusStation = Number(input[0]);
  let busIntervals = input[1].split(",").map(Number).filter(Boolean);

  let busToTake = busIntervals
    .map(interval => ({interval, nextDeparture: Math.ceil(arrivalToBusStation / interval) * interval}))
    .reduce((earliestBus, bus) => bus.nextDeparture < earliestBus.nextDeparture ? bus : earliestBus);

  return busToTake.interval * (busToTake.nextDeparture - arrivalToBusStation);
}

// == PART 2a: Solution via Wolfram Aplha (puzzle solution is "integer solution" for n = 0) ==

function part2_quick(input) {
  let equations = input.split("\n")[1].split(",")
    .map((n, i) => [n, i])
    .filter(([n]) => n !== "x")
    .map(([n, i]) => `x mod ${n} = ${n - ((i % n) === 0 ? n : (i % n))}`);

  return `https://www.wolframalpha.com/input/?i=${encodeURIComponent(equations.join("; "))}`;
}

// == PART 2b: Coded solution ==

function part2(input) {
  // based on pseudocode from https://en.wikipedia.org/wiki/Extended_Euclidean_algorithm#Pseudocode
  function getBézoutCoefficients(a, b) {
    let [old_r, r] = [a, b];
    let [old_s, s] = [1n, 0n];
    let [old_t, t] = [0n, 1n];

    while (r !== 0n) {
      let quotient = old_r / r;
      [old_r, r] = [r, old_r - quotient * r];
      [old_s, s] = [s, old_s - quotient * s];
      [old_t, t] = [t, old_t - quotient * t];
    }

    return [old_s, old_t];
  }

  // based on pseudocode from https://www.omnicalculator.com/math/chinese-remainder by Maciej Kowalski
  function getRemainderUsingChineseRemainderTheorem(equations) {
    let aᵢ = equations.map(([a]) => a);
    let nᵢ = equations.map(([, n]) => n);
    let N = nᵢ.reduce((a, b) => a * b);
    let mᵢ = nᵢ.map(n => N / n);
    let vᵢ = mᵢ.map((m, i) => getBézoutCoefficients(nᵢ[i], m)[1]);
    let eᵢ = mᵢ.map((m, i) => vᵢ[i] * m);
    let x = eᵢ.map((e, i) => aᵢ[i] * e).reduce((a, b) => a + b);
    return ((x % N) + N) % N;
  }

  let equations = input.split("\n")[1].split(",")
    .map((n, i) => [n, i])
    .filter(([n]) => n !== "x")
    .map(([n, i]) => [BigInt(n - (i % n) || n), BigInt(n)]);

  return getRemainderUsingChineseRemainderTheorem(equations);
}

// == ASSERTS ==

console.assert(part1("939\n7,13,x,x,59,x,31,19") === 295);

console.assert(part2_quick("939\n7,13,x,x,59,x,31,19") === "https://www.wolframalpha.com/input/?i=x%20mod%207%20%3D%200%3B%20x%20mod%2013%20%3D%2012%3B%20x%20mod%2059%20%3D%2055%3B%20x%20mod%2031%20%3D%2025%3B%20x%20mod%2019%20%3D%2012");
console.assert(part2_quick("\n17,x,13,19") === "https://www.wolframalpha.com/input/?i=x%20mod%2017%20%3D%200%3B%20x%20mod%2013%20%3D%2011%3B%20x%20mod%2019%20%3D%2016");
console.assert(part2_quick("\n67,7,59,61") === "https://www.wolframalpha.com/input/?i=x%20mod%2067%20%3D%200%3B%20x%20mod%207%20%3D%206%3B%20x%20mod%2059%20%3D%2057%3B%20x%20mod%2061%20%3D%2058");
console.assert(part2_quick("\n67,x,7,59,61") === "https://www.wolframalpha.com/input/?i=x%20mod%2067%20%3D%200%3B%20x%20mod%207%20%3D%205%3B%20x%20mod%2059%20%3D%2056%3B%20x%20mod%2061%20%3D%2057");
console.assert(part2_quick("\n67,7,x,59,61") === "https://www.wolframalpha.com/input/?i=x%20mod%2067%20%3D%200%3B%20x%20mod%207%20%3D%206%3B%20x%20mod%2059%20%3D%2056%3B%20x%20mod%2061%20%3D%2057");
console.assert(part2_quick("\n1789,37,47,1889") === "https://www.wolframalpha.com/input/?i=x%20mod%201789%20%3D%200%3B%20x%20mod%2037%20%3D%2036%3B%20x%20mod%2047%20%3D%2045%3B%20x%20mod%201889%20%3D%201886");

console.assert(part2("939\n7,13,x,x,59,x,31,19") === 1068781n);
console.assert(part2("\n17,x,13,19") === 3417n);
console.assert(part2("\n67,7,59,61") === 754018n);
console.assert(part2("\n67,x,7,59,61") === 779210n);
console.assert(part2("\n67,7,x,59,61") === 1261476n);
console.assert(part2("\n1789,37,47,1889") === 1202161486n);
