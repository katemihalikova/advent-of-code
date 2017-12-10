<?php

// == PART 1 ==

function part1($input) {
  $list = range(0, 255);
  $pos = 0;
  $skip = 0;

  $input = explode(",", $input);
  $input = array_map("intval", $input);

  foreach ($input as $length) {
    $endPos = ($pos + $length) % count($list);

    if ($length > count($list)) {
      continue;
    } elseif ($length > 0) {
      if ($pos < $endPos) {
        $sublist = array_slice($list, $pos, $endPos - $pos);
        $sublist = array_reverse($sublist);
        $left = array_slice($list, 0, $pos);
        $right = array_slice($list, $endPos);

        $list = array_merge($left, $sublist, $right);
      } else {
        $center = array_slice($list, $endPos, $pos - $endPos);
        $left = array_slice($list, 0, $endPos);
        $right = array_slice($list, $pos);

        $sublist = array_merge($right, $left);
        $sublist = array_reverse($sublist);
        $newLeft = array_slice($sublist, count($right));
        $newRight = array_slice($sublist, 0, count($right));

        $list = array_merge($newLeft, $center, $newRight);
      }
    }

    $pos = ($pos + $length + $skip++) % count($list);
  }

  return $list[0] * $list[1];
}

// == PART 2 ==

function part2($input) {
  $list = range(0, 255);
  $pos = 0;
  $skip = 0;

  $input = $input !== "" ? str_split($input) : [];
  $input = array_map("ord", $input);
  $input = array_merge($input, [17, 31, 73, 47, 23]);

  for ($i = 0; $i < 64; $i++) {
    foreach ($input as $length) {
      $endPos = ($pos + $length) % count($list);

      if ($length > count($list)) {
        continue;
      } elseif ($length > 0) {
        if ($pos < $endPos) {
          $sublist = array_slice($list, $pos, $endPos - $pos);
          $sublist = array_reverse($sublist);
          $left = array_slice($list, 0, $pos);
          $right = array_slice($list, $endPos);

          $list = array_merge($left, $sublist, $right);
        } else {
          $center = array_slice($list, $endPos, $pos - $endPos);
          $left = array_slice($list, 0, $endPos);
          $right = array_slice($list, $pos);

          $sublist = array_merge($right, $left);
          $sublist = array_reverse($sublist);
          $newLeft = array_slice($sublist, count($right));
          $newRight = array_slice($sublist, 0, count($right));

          $list = array_merge($newLeft, $center, $newRight);
        }
      }

      $pos = ($pos + $length + $skip++) % count($list);
    }
  }

  $hash = array_reduce(array_keys($list), function($acc, $i) use ($list) {
    if ($i % 16 === 0) array_push($acc, $list[$i]);
    else $acc[count($acc) - 1] ^= $list[$i];
    return $acc;
  }, []);
  $hash = array_map(function($nr) {return str_pad(dechex($nr), 2, "0", STR_PAD_LEFT);}, $hash);
  return implode("", $hash);
}

// == ASSERTS ==

assert(part1("3,4,1,5") === 2);
assert(part1("50,40,30,20,10,0,50,100,150,200,250") === 57840);

assert(part2("") === "a2582a3a0e66e6e86e3812dcb672a272");
assert(part2("AoC 2017") === "33efeb34ea91902bb2f59c9920caa6cd");
assert(part2("1,2,3") === "3efbe78a8d82f29979031a4aa0b16a9d");
assert(part2("1,2,4") === "63960835bcdc130f0b66d7ff4f6a5a8e");
