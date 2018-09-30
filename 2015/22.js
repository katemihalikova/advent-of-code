// == PART 1 ==

function part1(hpBoss, damageBoss) {
  let spells = [
    {name: "Magic Missile", cost: 53, instant: true, onCast: s => s.hpBoss -= 4},
    {name: "Drain", cost: 73, instant: true, onCast: s => {s.hpPlayer += 2; s.hpBoss -= 2}},
    {name: "Shield", cost: 113, timer: 6, onStart: s => s.armorPlayer += 7, onEnd: s => s.armorPlayer -= 7},
    {name: "Poison", cost: 173, timer: 6, onTurn: s => s.hpBoss -= 3},
    {name: "Recharge", cost: 229, timer: 5, onTurn: s => s.manaPlayer += 101},
  ];

  let minManaCost = Infinity;

  function processRound(s) {
    s = {...s};
    s.effects = s.effects
      .map(e => {
        e.onTurn && e.onTurn(s);
        return {...e, timer: e.timer - 1};
      })
      .filter(e => {
        if (e.timer === 0) {
          e.onEnd && e.onEnd(s);
          return false;
        }
        return true;
      });

    if (isSomeoneDead(s)) return;

    if (s.active === "player") {
      spells.forEach(spell => (s => {
        if (s.effects.find(e => e.name === spell.name)) return;
        if (s.manaPlayer < spell.cost) return;
        
        s.manaPlayer -= spell.cost;
        s.manaUsed += spell.cost;

        if (s.manaUsed > minManaCost) return;
  
        if (spell.instant) {
          spell.onCast(s);
        } else {
          spell.onStart && spell.onStart(s);
          s.effects.push({...spell});
        }
  
        if (isSomeoneDead(s)) return;

        s.active = "boss";
        processRound(s);
      })({...s, effects: s.effects.map(e => ({...e}))}));
    } else {
      s.hpPlayer -= Math.max(s.damageBoss - s.armorPlayer, 1);
      if (isSomeoneDead(s)) return;

      s.active = "player";
      processRound(s);
    }
  }

  function isSomeoneDead(s) {
    if (s.hpBoss <= 0) {
      minManaCost = Math.min(minManaCost, s.manaUsed);
    }
    return s.hpBoss <= 0 || s.hpPlayer <= 0;
  }

  processRound({active: "player", hpBoss, damageBoss, hpPlayer: 50, manaPlayer: 500, armorPlayer: 0, manaUsed: 0, effects: []});

  return minManaCost;
}

// == PART 2 ==

function part2(hpBoss, damageBoss) {
  let spells = [
    {name: "Magic Missile", cost: 53, instant: true, onCast: s => s.hpBoss -= 4},
    {name: "Drain", cost: 73, instant: true, onCast: s => {s.hpPlayer += 2; s.hpBoss -= 2}},
    {name: "Shield", cost: 113, timer: 6, onStart: s => s.armorPlayer += 7, onEnd: s => s.armorPlayer -= 7},
    {name: "Poison", cost: 173, timer: 6, onTurn: s => s.hpBoss -= 3},
    {name: "Recharge", cost: 229, timer: 5, onTurn: s => s.manaPlayer += 101},
  ];

  let minManaCost = Infinity;

  function processRound(s) {
    s = {...s};
    s.effects = s.effects
      .map(e => {
        e.onTurn && e.onTurn(s);
        return {...e, timer: e.timer - 1};
      })
      .filter(e => {
        if (e.timer === 0) {
          e.onEnd && e.onEnd(s);
          return false;
        }
        return true;
      });

    if (isSomeoneDead(s)) return;

    if (s.active === "player") {
      s.hpPlayer--;
      if (isSomeoneDead(s)) return;

      spells.forEach(spell => (s => {
        if (s.effects.find(e => e.name === spell.name)) return;
        if (s.manaPlayer < spell.cost) return;
        
        s.manaPlayer -= spell.cost;
        s.manaUsed += spell.cost;

        if (s.manaUsed > minManaCost) return;
  
        if (spell.instant) {
          spell.onCast(s);
        } else {
          spell.onStart && spell.onStart(s);
          s.effects.push({...spell});
        }
  
        if (isSomeoneDead(s)) return;

        s.active = "boss";
        processRound(s);
      })({...s, effects: s.effects.map(e => ({...e}))}));
    } else {
      s.hpPlayer -= Math.max(s.damageBoss - s.armorPlayer, 1);
      if (isSomeoneDead(s)) return;

      s.active = "player";
      processRound(s);
    }
  }

  function isSomeoneDead(s) {
    if (s.hpBoss <= 0) {
      minManaCost = Math.min(minManaCost, s.manaUsed);
    }
    return s.hpBoss <= 0 || s.hpPlayer <= 0;
  }

  processRound({active: "player", hpBoss, damageBoss, hpPlayer: 50, manaPlayer: 500, armorPlayer: 0, manaUsed: 0, effects: []});

  return minManaCost;
}

// == ASSERTS ==

console.assert(part1(13, 8) === 212);
console.assert(part1(39, 9) === 734);
console.assert(part2(13, 8) === 212);
console.assert(part2(39, 9) === 754);
