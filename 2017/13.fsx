// == PART 1 ==

let part1 (input:string) =
  input |> fun str -> str.Split([|"\n"|], System.StringSplitOptions.None)
        |> Seq.map (fun line ->
          line.Split([|": "|], System.StringSplitOptions.None)
            |> Array.map int
            |> (fun parts -> (parts.[0], parts.[1]))
        )
        |> Seq.fold (fun severity (depth, range) -> severity + (if depth % ((range - 1) * 2) = 0 then depth * range else 0)) 0

// == PART 2 ==

let part2 (input:string) =
  let data = input |> fun str -> str.Split([|"\n"|], System.StringSplitOptions.None)
                   |> Seq.map (fun line ->
                     line.Split([|": "|], System.StringSplitOptions.None)
                       |> Array.map int
                       |> (fun parts -> (parts.[0], parts.[1]))
                   )
  let rec loop delay = if data |> Seq.forall (fun (depth, range) -> (depth + delay) % ((range - 1) * 2) <> 0) then delay else loop (delay + 1)
  loop(0)

// == ASSERTS ==

let Assert fn param result = if fn param <> result then printfn "Fail: %A %A" param result

Assert part1 "0: 3\n1: 2\n4: 4\n6: 4" 24

Assert part2 "0: 3\n1: 2\n4: 4\n6: 4" 10
