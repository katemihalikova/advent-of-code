// == SHARED ==

let getDimensions (input: string) =
  input
  |> fun input -> input.Split "\n"
  |> Array.map (fun row -> row.Split "x"
                           |> Array.map int)

// == PART 1 ==

let part1 (input: string) =
  input
  |> getDimensions
  |> Array.map (function
                | [| a; b; c |] -> [| a * b; b * c; a * c |]
                                   |> (fun sides -> 2 * Array.sum sides + Array.min sides)
                | _ -> 0)
  |> Array.sum

// == PART 2 ==

let part2 (input: string) =
  input
  |> getDimensions
  |> Array.map (fun dimensions -> 2 * (dimensions |> Array.sort |> Array.take 2 |> Array.sum) + Array.reduce (*) dimensions)
  |> Array.sum

// == ASSERTS ==

let Assert fn param expected = match fn param with actual when expected = actual -> () | actual -> printfn "Fail: %A -> expected %A but got %A" param expected actual

Assert part1 "2x3x4" 58
Assert part1 "1x1x10" 43

Assert part2 "2x3x4" 34
Assert part2 "1x1x10" 14
