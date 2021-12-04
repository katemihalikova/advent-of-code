// == CLASSES ==

class Board {
  #board;

  constructor(input) {
    this.#board = input.split("\n").map(row => row.trim().split(/\s+/).map(Number));
  }

  markNumber(number) {
    this.#board.forEach(row => row.forEach((_, i) => {
      if (row[i] === number) row[i] = null;
    }));
  }

  isWinning() {
    return this.#board.some(row => row.every(cell => cell === null)) ||
      this.#board[0].some((_, i) => this.#board.every(row => row[i] === null));
  }

  getSumOfRemainingNumbers() {
    return this.#board.flat().filter(Boolean).reduce((s, n) => s + n, 0);
  }
}

// == PART 1 ==

function part1(input) {
  input = input.split("\n\n");

  let drawnNumbers = input.shift().split(",").map(Number);
  let boards = input.map(board => new Board(board));

  for (let drawnNumber of drawnNumbers) {
    for (let board of boards) {
      board.markNumber(drawnNumber);
    }

    for (let board of boards) {
      if (board.isWinning()) {
        return board.getSumOfRemainingNumbers() * drawnNumber;
      }
    }
  }
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n\n");

  let drawnNumbers = input.shift().split(",").map(Number);
  let boards = input.map(board => new Board(board));

  for (let drawnNumber of drawnNumbers) {
    for (let board of boards) {
      board.markNumber(drawnNumber);
    }

    if (boards.length === 1 && boards[0].isWinning()) {
      return boards[0].getSumOfRemainingNumbers() * drawnNumber;
    } else {
      boards = boards.filter(board => !board.isWinning());
    }
  }
}

// == ASSERTS ==

console.assert(part1(`7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`) === 4512);

console.assert(part2(`7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`) === 1924);
