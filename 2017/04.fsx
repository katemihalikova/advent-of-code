// == PART 1 ==

let part1 (input:string) =
  input |> fun str -> str.Split([|"\n"|], System.StringSplitOptions.None)
        |> Seq.filter (fun phrase ->
          let words = phrase.Split([|" "|], System.StringSplitOptions.None)
          let uniqueWords = Seq.distinct words
          Seq.length words = Seq.length uniqueWords
        )
        |> Seq.length

// == PART 2 ==

let part2 (input:string) =
  input |> fun str -> str.Split([|"\n"|], System.StringSplitOptions.None)
        |> Seq.filter (fun phrase ->
          let words = phrase |> fun str -> str.Split([|" "|], System.StringSplitOptions.None)
                             |> Seq.map (fun word ->
                               word |> Seq.toList
                                    |> Seq.sort
                                    |> Seq.fold (fun str char -> str + (string char)) ""
                             )
          let uniqueWords = Seq.distinct words
          Seq.length words = Seq.length uniqueWords
        )
        |> Seq.length

// == ASSERTS ==

let Assert fn param result = if fn param <> result then printfn "Fail: %A %A" param result

Assert part1 "aa bb cc dd ee\naa bb cc dd aa\naa bb cc dd aaa" 2

Assert part2 "abcde fghij\nabcde xyz ecdab\na ab abc abd abf abj\niiii oiii ooii oooi oooo\noiii ioii iioi iiio" 3
