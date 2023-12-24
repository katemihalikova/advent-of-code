import { init } from 'z3-solver';

// == PART 1 ==

function part1(input, min = 200000000000000, max = 400000000000000) {
  return input
    .split("\n")
    .map(line => line.split(/[^\d-]+/).map(Number))
    .reduce((count, [px1, py1,, vx1, vy1], index, hailstones) => {
      return count + hailstones
        .slice(index + 1)
        .filter(([px2, py2,, vx2, vy2]) => {
          // ax + by + c = 0
          let a1 = vy1, b1 = -vx1, c1 = vx1 * py1 - vy1 * px1;
          let a2 = vy2, b2 = -vx2, c2 = vx2 * py2 - vy2 * px2;

          let delta = a1 * b2 - a2 * b1;
          if (Math.abs(delta) < Number.EPSILON) return false;

          let x = (b1 * c2 - b2 * c1) / delta;
          let y = (a2 * c1 - a1 * c2) / delta;

          return x >= min && y >= min && x <= max && y <= max &&
            Math.sign(vx1) === Math.sign(x - px1) && Math.sign(vx2) === Math.sign(x - px2) &&
            Math.sign(vy1) === Math.sign(y - py1) && Math.sign(vy2) === Math.sign(y - py2);
        })
        .length;
    }, 0);
}

// == PART 2 ==

async function part2(input) {
  let hailstones = input
    .split("\n")
    .map(line => line.split(/[^\d-]+/).map(Number));

  const { Context } = await init();
  const { Solver, Real } = new Context("main");
  const solver = new Solver();

  // rock
  let pxᵣ = Real.const("pxᵣ");
  let pyᵣ = Real.const("pyᵣ");
  let pzᵣ = Real.const("pzᵣ");
  let vxᵣ = Real.const("vxᵣ");
  let vyᵣ = Real.const("vyᵣ");
  let vzᵣ = Real.const("vzᵣ");

  hailstones.forEach(([pxᵢ, pyᵢ, pzᵢ, vxᵢ, vyᵢ, vzᵢ], i) => {
    let tᵢ = Real.const(`t${i}`);
    solver.add(pxᵣ.add(tᵢ.mul(vxᵣ)).eq(tᵢ.mul(vxᵢ).add(pxᵢ)));
    solver.add(pyᵣ.add(tᵢ.mul(vyᵣ)).eq(tᵢ.mul(vyᵢ).add(pyᵢ)));
    solver.add(pzᵣ.add(tᵢ.mul(vzᵣ)).eq(tᵢ.mul(vzᵢ).add(pzᵢ)));
    solver.add(tᵢ.gt(0));
  });

  await solver.check();

  return solver.model()
    .eval(pxᵣ.add(pyᵣ).add(pzᵣ))
    .asNumber();
}

// == ASSERTS ==

const example =
`19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3`;

console.assert(part1(example, 7, 27) === 2);

console.assert(await part2(example) === 47);

// https://github.com/Z3Prover/z3/issues/6512
process.exit();
