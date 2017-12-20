// == PART 1 ==

function part1(input) {
  return input
    .split("\n")
    .map(line => line.match(/a=<([\d-]+),([\d-]+),([\d-]+)>/).map(Number).slice(1))
    .reduce(([lowestAcceleration, lowestAccIndex], [ax, ay, az], index) => {
      let acceleration = Math.abs(ax) + Math.abs(ay) + Math.abs(az);
      if (acceleration < lowestAcceleration) return [acceleration, index];
      return [lowestAcceleration, lowestAccIndex];
    }, [Infinity])[1];
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(line => {
    let [, px, py, pz, vx, vy, vz, ax, ay, az] = line.match(/p=<([\d-]+),([\d-]+),([\d-]+)>, v=<([\d-]+),([\d-]+),([\d-]+)>, a=<([\d-]+),([\d-]+),([\d-]+)>/).map(Number);
    return {px, py, pz, vx, vy, vz, ax, ay, az};
  });

  for (let ticksFromLastCollision = 1; ticksFromLastCollision < 100; ticksFromLastCollision++) {
    input.forEach(particle => {
      particle.vx += particle.ax;
      particle.vy += particle.ay;
      particle.vz += particle.az;
      particle.px += particle.vx;
      particle.py += particle.vy;
      particle.pz += particle.vz;
    });

    input.forEach((particle, index) => {
      let collidedParticle = input.find(({destroyed, px, py, pz}, anotherIndex) => !destroyed && particle.px === px && particle.py === py && particle.pz === pz && index !== anotherIndex);

      if (collidedParticle) {
        particle.destroyed = true;
        collidedParticle.destroyed = true;
        ticksFromLastCollision = 0;
      }
    });

    if (ticksFromLastCollision === 0) {
      input = input.filter(({destroyed}) => !destroyed);
    }
  }

  return input.length;
}

// == ASSERTS ==

console.assert(part1("p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>\np=<4,0,0>, v=<0,0,0>, a=<-2,0,0>") === 0);

console.assert(part2("p=<-6,0,0>, v=<3,0,0>, a=<0,0,0>\np=<-4,0,0>, v=<2,0,0>, a=<0,0,0>\np=<-2,0,0>, v=<1,0,0>, a=<0,0,0>\np=<3,0,0>, v=<-1,0,0>, a=<0,0,0>") === 1);
