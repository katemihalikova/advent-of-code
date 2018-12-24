// == PART 1 ==

function part1(input) {
  let sortBy = (...cbs) => (a, b) => {
    let cb = cbs.find(cb => cb(a) !== cb(b));
    return cb(b) - cb(a);
  };

  let calcDamage = (from, to) => {
    if (to.immune.indexOf(from.attackType) > -1) return 0;
    let power = from.attackPower * from.units;
    if (to.weak.indexOf(from.attackType) > -1) power *= 2;
    return power;
  }

  let groups = input
    .split("\n\n")
    .map(army => {
      let groups = army.split("\n");
      let type = groups.shift().slice(0, -1);
      return groups.map(line => {
        let [, units, hp, firstAbility, firstType, secondAbility, secondType, attackPower, attackType, initiative] = line.match(/^(\d+) units each with (\d+) hit points(?: \((?:(\w+) to ([\w\s,]+))?(?:; )?(?:(\w+) to ([\w\s,]+))?\))? with an attack that does (\d+) (\w+) damage at initiative (\d+)$/);
        [units, hp, attackPower, initiative] = [units, hp, attackPower, initiative].map(Number);

        firstType = firstType ? firstType.split(", ") : [];
        secondType = secondType ? secondType.split(", ") : [];
        let weak = [], immune = [];
        if (firstAbility === "weak") weak = firstType;
        if (firstAbility === "immune") immune = firstType;
        if (secondAbility === "weak") weak = secondType;
        if (secondAbility === "immune") immune = secondType;
        
        return {type, units, hp, weak, immune, attackPower, attackType, initiative};
      });
    })
    .reduce((acc, groups) => [...acc, ...groups], []);

  for (let i = 0;; i++) {
    // Target selection phase
    groups
      .sort(sortBy(group => group.units * group.attackPower, group => group.initiative))
      .forEach(group => {
        let possibleTargets = groups
          .filter(target => target.type !== group.type && !target.targettedBy)
          .filter(target => calcDamage(group, target) > 0)
          .sort(sortBy(target => calcDamage(group, target), target => target.units * target.attackPower, target => target.initiative));

        if (possibleTargets.length === 0) return;

        let target = possibleTargets[0];
        group.target = target;
        target.targettedBy = group;
      });

    // Attack phase
    groups
      .sort(sortBy(group => group.initiative))
      .forEach(group => {
        let target = group.target;
        if (!target || group.units <= 0) return;

        target.units -= Math.floor(calcDamage(group, target) / target.hp);
      });

    // Cleanup
    groups = groups.filter(group => group.units > 0);
    groups.forEach(group => {
      group.target = undefined;
      group.targettedBy = undefined;
    });

    // Win condition check
    let immunityGroups = groups.filter(group => group.type === "Immune System").length;
    if (immunityGroups === 0 || immunityGroups === groups.length) return groups.reduce((acc, group) => acc + group.units, 0);
  }
}

// == PART 2 ==

function part2(input) {
  let sortBy = (...cbs) => (a, b) => {
    let cb = cbs.find(cb => cb(a) !== cb(b));
    return cb(b) - cb(a);
  };

  let calcDamage = (from, to) => {
    if (to.immune.indexOf(from.attackType) > -1) return 0;
    let power = from.attackPower * from.units;
    if (to.weak.indexOf(from.attackType) > -1) power *= 2;
    return power;
  }

  for (let boost = 0;; boost++) {
    let groups = input
      .split("\n\n")
      .map(army => {
        let groups = army.split("\n");
        let type = groups.shift().slice(0, -1);
        return groups.map(line => {
          let [, units, hp, firstAbility, firstType, secondAbility, secondType, attackPower, attackType, initiative] = line.match(/^(\d+) units each with (\d+) hit points(?: \((?:(\w+) to ([\w\s,]+))?(?:; )?(?:(\w+) to ([\w\s,]+))?\))? with an attack that does (\d+) (\w+) damage at initiative (\d+)$/);
          [units, hp, attackPower, initiative] = [units, hp, attackPower, initiative].map(Number);

          firstType = firstType ? firstType.split(", ") : [];
          secondType = secondType ? secondType.split(", ") : [];
          let weak = [], immune = [];
          if (firstAbility === "weak") weak = firstType;
          if (firstAbility === "immune") immune = firstType;
          if (secondAbility === "weak") weak = secondType;
          if (secondAbility === "immune") immune = secondType;
          
          if (type === "Immune System") attackPower += boost;
      
          return {type, units, hp, weak, immune, attackPower, attackType, initiative};
        });
      })
      .reduce((acc, groups) => [...acc, ...groups], []);

    let previousTotalUnits;
    for (let i = 0;; i++) {
      // Target selection phase
      groups
        .sort(sortBy(group => group.units * group.attackPower, group => group.initiative))
        .forEach(group => {
          let possibleTargets = groups
            .filter(target => target.type !== group.type && !target.targettedBy)
            .filter(target => calcDamage(group, target) > 0)
            .sort(sortBy(target => calcDamage(group, target), target => target.units * target.attackPower, target => target.initiative));

          if (possibleTargets.length === 0) return;

          let target = possibleTargets[0];
          group.target = target;
          target.targettedBy = group;
        });

      // Attack phase
      groups
        .sort(sortBy(group => group.initiative))
        .forEach(group => {
          let target = group.target;
          if (!target || group.units <= 0) return;

          target.units -= Math.floor(calcDamage(group, target) / target.hp);
        });

      // Cleanup
      groups = groups.filter(group => group.units > 0);
      groups.forEach(group => {
        group.target = undefined;
        group.targettedBy = undefined;
      });

      // Win condition check & Tie detection
      let totalUnits = groups.reduce((acc, group) => acc + group.units, 0);
      if (groups.every(group => group.type === "Immune System")) return totalUnits;
      if (previousTotalUnits === totalUnits) break;
      previousTotalUnits = totalUnits;
    }
  }
}

// == ASSERTS ==

console.assert(part1(`Immune System:
17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2
989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3

Infection:
801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1
4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4`) === 5216);

console.assert(part2(`Immune System:
17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2
989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3

Infection:
801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1
4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4`) === 51);
