// == PART 1 ==

function part1(input) {
  let board = [3, 7];
  let elf1 = 0;
  let elf2 = 1;

  while (true) {
    let recipe1 = board[elf1];
    let recipe2 = board[elf2];
    let newRecipe = recipe1 + recipe2;

    if (newRecipe >= 10) {
      board.push(Math.floor(newRecipe / 10));
      if (board.length === input + 10) return board.slice(-10).join("");
    }

    board.push(newRecipe % 10);
    if (board.length === input + 10) return board.slice(-10).join("");

    elf1 = (elf1 + recipe1 + 1) % board.length;
    elf2 = (elf2 + recipe2 + 1) % board.length;
  }
}

// == PART 2 ==

function part2(input) {
  let board = [3, 7];
  let elf1 = 0;
  let elf2 = 1;

  let recipeFound = () => {
    if (board.length < input.length) return;
    if (board[board.length - 1].toString() !== input[input.length - 1]) return;
    // return board.slice(-input.length).join("") === input;

    let lastRecipes = "";
    for (let j = 1; j <= input.length; j++) {
      lastRecipes = board[board.length - j].toString() + lastRecipes;
    }

    if (lastRecipes === input) return true;
  };

  while (true) {
    let recipe1 = board[elf1];
    let recipe2 = board[elf2];
    let newRecipe = recipe1 + recipe2;

    if (newRecipe >= 10) {
      board.push(Math.floor(newRecipe / 10));
      if (recipeFound()) return board.length - input.length;
    }

    board.push(newRecipe % 10);
    if (recipeFound()) return board.length - input.length;

    elf1 = (elf1 + recipe1 + 1) % board.length;
    elf2 = (elf2 + recipe2 + 1) % board.length;
  }
}

// == ASSERTS ==

console.assert(part1(9) === "5158916779");
console.assert(part1(5) === "0124515891");
console.assert(part1(18) === "9251071085");
console.assert(part1(2018) === "5941429882");

console.assert(part2("51589") === 9);
console.assert(part2("01245") === 5);
console.assert(part2("92510") === 18);
console.assert(part2("59414") === 2018);
