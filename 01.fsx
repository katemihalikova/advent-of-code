// == PART 1 ==

let aoc_day1_part1 (input:string) =
  input
    |> fun input -> input.Split([|", "|], System.StringSplitOptions.None)
    |> Seq.fold (fun (direction, x, y) step ->
      let turn = string step.[0]
      let steps = int step.[1..]

      let newDirection = (direction + if turn = "R" then 1 else 3) % 4 // 0u, 1r, 2d, 3l
      let newX =
        if direction = 1 then x + steps
        elif direction = 3 then x - steps
        else x
      let newY =
        if direction = 0 then y + steps
        elif direction = 2 then y - steps
        else y

      (newDirection, newX, newY)
    ) (0, 0, 0)
    |> fun (_, x, y) -> abs x + abs y

let Assert fn param result = if fn param <> result then printfn "Fail: %A %A" param result

Assert aoc_day1_part1 "R2, L3" 5
Assert aoc_day1_part1 "R2, R2, R2" 2
Assert aoc_day1_part1 "R5, L5, R5, R3" 12
