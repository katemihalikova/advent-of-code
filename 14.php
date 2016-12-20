<?php

// == PART 1 ==

function aoc_day14_part1($input) {
  $keys = 0;

  for ($i = 0;; $i++) {
    if (preg_match("#(\w)\\1\\1#", md5($input . $i), $matches)) {
      for ($j = 1; $j <= 1000; $j++) {
        if (preg_match("#".$matches[1]."{5}#", md5($input . ($i + $j)))) {
          $keys++;
          break;
        }
      }
      if ($keys === 64) return $i;
    }
  }
}

// == PART 2 ==

function aoc_day14_part2($input) {
  $keys = 0;

  function md5_2017x($input) {
    static $cache = [];
    if (isset($cache[$input])) {
    return $cache[$input];
    }
    $hash = $input;
    for ($i = 1; $i <= 2017; $i++) $hash = md5($hash);
    $cache[$input] = $hash;
    return $hash;
  }

  for ($i = 0;; $i++) {
    if (preg_match("#(\w)\\1\\1#", md5_2017x($input . $i), $matches)) {
      for ($j = 1; $j <= 1000; $j++) {
        if (preg_match("#".$matches[1]."{5}#", md5_2017x($input . ($i + $j)))) {
          $keys++;
          break;
        }
      }
      if ($keys === 64) return $i;
    }
  }
}

// == ASSERTS ==

assert(aoc_day14_part1("abc") === 22728);

assert(aoc_day14_part2("abc") === 22551);
