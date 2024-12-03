// == PART 1 ==

function part1(input: string): number {
  return [...input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)]
    .reduce((sum, [, x, y]) => sum + Number(x) * Number(y), 0);
}

// == PART 2 ==

function part2(input: string): number {
  return [...input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)|(do(n't)?)\(\)/g)]
    .reduce<[number, boolean]>(([sum, enabled], [, x, y, doo, dont]) => {
      if (doo) return [sum, !dont];
      if (enabled) sum += Number(x) * Number(y);
      return [sum, enabled];
    }, [0, true])
    [0];
}

function part2_alt(input: string): number {
  return part1(input.replaceAll(/don't\(\).*?(do\(\)|$)/gs, ""));
}

// == ASSERTS ==

console.assert(part1(`xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`) === 161);

console.assert(part2(`xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`) === 48);

console.assert(part2_alt(`xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`) === 48);
