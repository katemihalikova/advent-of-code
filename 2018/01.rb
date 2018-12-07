require "set"
require "test/unit"
include Test::Unit::Assertions

# == PART 1 ==

def part1(input)
  input.split("\n").map(&:to_i).reduce(:+)
end

# == PART 2 ==

def part2(input)
  input = input.split("\n").map(&:to_i)

  frequency = 0;
  reached = Set[frequency]

  input.cycle do |change|
    frequency += change
    return frequency if reached.include? frequency
    reached.add frequency
  end
end

# == ASSERTS ==

assert_equal(part1("+1\n-2\n+3\n+1"), 3);
assert_equal(part1("+1\n+1\n+1"), 3);
assert_equal(part1("+1\n+1\n-2"), 0);
assert_equal(part1("-1\n-2\n-3"), -6);

assert_equal(part2("+1\n-2\n+3\n+1"), 2);
assert_equal(part2("+1\n-1"), 0);
assert_equal(part2("+3\n+3\n+4\n-2\n-4"), 10);
assert_equal(part2("-6\n+3\n+8\n+5\n-6"), 5);
assert_equal(part2("+7\n+7\n-2\n-7\n-4"), 14);
