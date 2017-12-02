// == PART 1 ==

let part1 (input:string) =
  input
    |> fun str -> str.Split([|"\n"|], System.StringSplitOptions.None)
    |> Seq.map (fun row ->
      row
        |> fun str -> str.Split([|"\t"|], System.StringSplitOptions.None)
        |> Seq.map int
    )
    |> Seq.fold (fun checksum row -> checksum + Seq.max row - Seq.min row) 0

// == PART 2 ==

let part2 (input:string) =
  input
    |> fun str -> str.Split([|"\n"|], System.StringSplitOptions.None)
    |> Seq.map (fun row ->
      row
        |> fun str -> str.Split([|"\t"|], System.StringSplitOptions.None)
        |> Seq.map int
    )
    |> Seq.fold (fun checksum row ->
      row |> Seq.fold (fun checksum nr1 ->
        row |> Seq.fold (fun checksum nr2 ->
          if nr1 % nr2 = 0 && nr1 / nr2 <> 1
          then checksum + (nr1 / nr2)
          else checksum
        ) checksum
      ) checksum
    ) 0

// == ASSERTS ==

let Assert fn param result = if fn param <> result then printfn "Fail: %A %A" param result

Assert part1 "5\t1\t9\t5\n7\t5\t3\n2\t4\t6\t8" 18

Assert part2 "5\t9\t2\t8\n9\t4\t7\t3\n3\t8\t6\t5" 9
