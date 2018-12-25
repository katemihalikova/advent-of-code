// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(bot => {
    let [, x, y, z, radius] = bot.match(/^pos=<(-?\d+),(-?\d+),(-?\d+)>, r=(\d+)/).map(Number);
    return {x, y, z, radius};
  });

  let manhattanDistance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);

  let strongestBot = input.reduce((acc, bot) => bot.radius > acc.radius ? bot : acc);
  return input.filter(u => manhattanDistance(u, strongestBot) <= strongestBot.radius).length;
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(bot => {
    let [, x, y, z, radius] = bot.match(/^pos=<(-?\d+),(-?\d+),(-?\d+)>, r=(\d+)/).map(Number);
    return {x, y, z, radius};
  });

  let manhattanDistance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);

  let average = input.reduce((acc, {x, y, z, radius}) => acc + Math.abs(x) + Math.abs(y) + Math.abs(z) + radius, 0) / input.length / 4;
  let granularity = Math.floor(Math.log10(average));
  let originX = 0, originY = 0, originZ = 0;

  for (let decimals = granularity; decimals >= 0; decimals--) {
    let approximateBy = 10 ** decimals;
    let approximatedBots = input.map(({x, y, z, radius}) => {
      x = Math.ceil(x / approximateBy);
      y = Math.ceil(y / approximateBy);
      z = Math.ceil(z / approximateBy);
      radius = Math.ceil(radius / approximateBy);
      return {x, y, z, radius};
    });

    let botsInRadius = {};
    let spread = 15;

    approximatedBots.forEach(bot => {
      for (let x = originX - spread; x <= originX + spread; x++) {
        for (let y = originY - spread; y <= originY + spread; y++) {
          for (let z = originZ - spread; z <= originZ + spread; z++) {
            if (manhattanDistance(bot, {x, y, z}) > bot.radius) continue;
            let coords = `${x},${y},${z}`;
            botsInRadius[coords] = botsInRadius[coords] || 0;
            botsInRadius[coords]++;
          }
        }
      }
    });

    let {coords} = Object.entries(botsInRadius).reduce((acc, [coords, bots]) => {
      let [x, y, z] = coords.split(",").map(Number);
      if (bots > acc.bots) acc = {bots, coords: []};
      if (bots === acc.bots) acc.coords.push({x, y, z});
      return acc;
    }, {bots: 0, coords: []});

    if (decimals === 0) {
      return manhattanDistance(coords[0], {x: 0, y: 0, z: 0});
    }

    let xs = coords.map(({x}) => x);
    let ys = coords.map(({y}) => y);
    let zs = coords.map(({z}) => z);

    originX = (Math.min(...xs) + Math.max(...xs)) / 2 * 10;
    originY = (Math.min(...ys) + Math.max(...ys)) / 2 * 10;
    originZ = (Math.min(...zs) + Math.max(...zs)) / 2 * 10;
  }
}

// == ASSERTS ==

console.assert(part1(`pos=<0,0,0>, r=4
pos=<1,0,0>, r=1
pos=<4,0,0>, r=3
pos=<0,2,0>, r=1
pos=<0,5,0>, r=3
pos=<0,0,3>, r=1
pos=<1,1,1>, r=1
pos=<1,1,2>, r=1
pos=<1,3,1>, r=1`) === 7);

console.assert(part2(`pos=<10,12,12>, r=2
pos=<12,14,12>, r=2
pos=<16,12,12>, r=4
pos=<14,14,14>, r=6
pos=<50,50,50>, r=200
pos=<10,10,10>, r=5`) === 36);
