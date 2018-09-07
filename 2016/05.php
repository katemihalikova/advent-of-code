<?php

// == PART 1 ==

function aoc_day5_part1($input) {
  $result = "";

  for ($i = 0;; $i++) {
    $hash = md5($input . $i);
    if (substr($hash, 0, 5) === "00000") $result .= substr($hash, 5, 1);
    if (strlen($result) === 8) return $result;
  }
}

// == PART 2 ==

function aoc_day5_part2($input) {
  $result = [];

  for ($i = 0;; $i++) {
    $hash = md5($input . $i);
    if (substr($hash, 0, 5) === "00000") {
      $position = substr($hash, 5, 1);
      if (is_numeric($position) && $position < 8 && !isset($result[$position])) {
        $result[$position] = substr($hash, 6, 1);
      }
    }
    if (count($result) === 8) break;
  }
  ksort($result);
  return join("", $result);
}

// == ASSERTS ==

assert(aoc_day5_part1("abc") === "18f47a30");

assert(aoc_day5_part2("abc") === "05ace8e3");
