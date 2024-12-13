// == PARTS 1 & 2 ==

function part(part: 1 | 2, input: string): number {
  return input
    .split("\n\n")
    .map(block => {
      let [, ax, ay, bx, by, tx, ty] = block.match(/^Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)$/)!.map(Number);
      if (part === 2) {
        tx += 10000000000000;
        ty += 10000000000000;
      }
      return {ax, ay, bx, by, tx, ty};
    })
    .reduce((sum, {ax, ay, bx, by, tx, ty}) => {
      let a = (ty * bx - tx * by) / (ay * bx - ax * by);
      let b = (ty - ay * a) / by;
      if (a % 1 === 0 && b % 1 === 0) sum += 3 * a + b;
      return sum;
    }, 0);
}

// == ASSERTS ==

console.assert(part(1, `\
Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`) === 480);

// No testing data provided for PART 2
