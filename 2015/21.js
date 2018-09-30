// == PART 1 ==

function part1(hpBoss, damageBoss, armorBoss) {
  let weapons = [
    {cost: 8, damage: 4, armor: 0},
    {cost: 10, damage: 5, armor: 0},
    {cost: 25, damage: 6, armor: 0},
    {cost: 40, damage: 7, armor: 0},
    {cost: 74, damage: 8, armor: 0},
  ];
  let armors = [
    {cost: 0, damage: 0, armor: 0},
    {cost: 13, damage: 0, armor: 1},
    {cost: 31, damage: 0, armor: 2},
    {cost: 53, damage: 0, armor: 3},
    {cost: 75, damage: 0, armor: 4},
    {cost: 102, damage: 0, armor: 5},
  ];
  let rings = [
    {cost: 0, damage: 0, armor: 0},
    {cost: 25, damage: 1, armor: 0},
    {cost: 50, damage: 2, armor: 0},
    {cost: 100, damage: 3, armor: 0},
    {cost: 20, damage: 0, armor: 1},
    {cost: 40, damage: 0, armor: 2},
    {cost: 80, damage: 0, armor: 3},
  ];

  return weapons
    .reduce((results, weapon) => {
      armors.forEach(armor => {
        rings.forEach(ring1 => {
          rings.forEach(ring2 => {
            if (ring1 === ring2 && ring1.cost > 0) return;

            let cost = weapon.cost + armor.cost + ring1.cost + ring2.cost;

            let damagePlayer = weapon.damage + ring1.damage + ring2.damage;
            let armorPlayer = armor.armor + ring1.armor + ring2.armor;

            let currentHpPlayer = 100;
            let currentHpBoss = hpBoss;

            while (currentHpPlayer > 0 && currentHpBoss > 0) {
              currentHpBoss -= Math.max(damagePlayer - armorBoss, 1);
              currentHpPlayer -= Math.max(damageBoss - armorPlayer, 1);
            }

            let won = currentHpBoss <= 0;

            results.push({cost, won, weapon, armor, ring1, ring2});
          });
        });
      });
      return results;
    }, [])
    .filter(({won}) => won)
    .reduce((minCost, {cost}) => Math.min(cost, minCost), Infinity);
}

// == PART 2 ==

function part2(hpBoss, damageBoss, armorBoss) {
  let weapons = [
    {cost: 8, damage: 4, armor: 0},
    {cost: 10, damage: 5, armor: 0},
    {cost: 25, damage: 6, armor: 0},
    {cost: 40, damage: 7, armor: 0},
    {cost: 74, damage: 8, armor: 0},
  ];
  let armors = [
    {cost: 0, damage: 0, armor: 0},
    {cost: 13, damage: 0, armor: 1},
    {cost: 31, damage: 0, armor: 2},
    {cost: 53, damage: 0, armor: 3},
    {cost: 75, damage: 0, armor: 4},
    {cost: 102, damage: 0, armor: 5},
  ];
  let rings = [
    {cost: 0, damage: 0, armor: 0},
    {cost: 25, damage: 1, armor: 0},
    {cost: 50, damage: 2, armor: 0},
    {cost: 100, damage: 3, armor: 0},
    {cost: 20, damage: 0, armor: 1},
    {cost: 40, damage: 0, armor: 2},
    {cost: 80, damage: 0, armor: 3},
  ];

  return weapons
    .reduce((results, weapon) => {
      armors.forEach(armor => {
        rings.forEach(ring1 => {
          rings.forEach(ring2 => {
            if (ring1 === ring2 && ring1.cost > 0) return;

            let cost = weapon.cost + armor.cost + ring1.cost + ring2.cost;

            let damagePlayer = weapon.damage + ring1.damage + ring2.damage;
            let armorPlayer = armor.armor + ring1.armor + ring2.armor;

            let currentHpPlayer = 100;
            let currentHpBoss = hpBoss;

            while (currentHpPlayer > 0 && currentHpBoss > 0) {
              currentHpBoss -= Math.max(damagePlayer - armorBoss, 1);
              currentHpPlayer -= Math.max(damageBoss - armorPlayer, 1);
            }

            let won = currentHpBoss <= 0;

            results.push({cost, won, weapon, armor, ring1, ring2});
          });
        });
      });
      return results;
    }, [])
    .filter(({won}) => !won)
    .reduce((maxCost, {cost}) => Math.max(cost, maxCost), -Infinity);
}

// == ASSERTS ==

console.assert(part1(100, 7, 2) === 71);
console.assert(part2(100, 7, 2) === 133);
