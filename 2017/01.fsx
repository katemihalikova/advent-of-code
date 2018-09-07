open System.Text.RegularExpressions

// == PART 1 ==

let part1 (input:string) =
  let mutable checksum = 0

  for nr in (Regex.Matches(input + string input.[0], "(.)(?=\1)")) do
    checksum <- (nr |> string |> int) + checksum

  checksum

// == PART 2 ==

let part2 (input:string) =
  input
    |> fun str -> str.Substring (str.Length / 2)
    |> Seq.mapi (fun index nr -> (index, nr))
    |> Seq.fold (fun checksum (index, nr) ->
      if input.[index] = nr
      then (nr |> string |> int) * 2 + checksum
      else checksum
    ) 0

// == ASSERTS ==

let Assert fn param result = if fn param <> result then printfn "Fail: %A %A" param result

Assert part1 "1122" 3
Assert part1 "1111" 4
Assert part1 "1234" 0
Assert part1 "91212129" 9

Assert part2 "1212" 6
Assert part2 "1221" 0
Assert part2 "123425" 4
Assert part2 "123123" 12
Assert part2 "12131415" 4
