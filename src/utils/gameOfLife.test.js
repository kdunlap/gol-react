import { countAliveNeighbors, decideNextGeneration, randomizeBoard, iterateBoard } from "./gameOfLife"

test('countAliveNeighbors throws an error when the board is empty', () => {
  const count = () => {
    countAliveNeighbors([], 0, 0)
  }
  expect(count).toThrow("Board must contain cells")
});

test('countAliveNeighbors throws an error when indexes are out of range', () => {
  const rowOutOfRangeHigh = () => {
    countAliveNeighbors([[0,0,1]], 1, 0)
  }
  const rowOutOfRangeLow = () => {
    countAliveNeighbors([[0,0,1]], -1, 0)
  }
  expect(rowOutOfRangeHigh).toThrow("Out of range board index")
  expect(rowOutOfRangeLow).toThrow("Out of range board index")

  const colOutOfRangeHigh = () => {
    countAliveNeighbors([[0,0,1]], 0, 3)
  }
  const colOutOfRangeLow = () => {
    countAliveNeighbors([[0,0,1]], 0, -1)
  }
  expect(colOutOfRangeHigh).toThrow("Out of range board index")
  expect(colOutOfRangeLow).toThrow("Out of range board index")
});

test('countAliveNeighbors correctly counts neighbors at non-edge cell', () => {
  const board = [
    [0,1,0],
    [1,0,1],
    [0,0,1]
  ]
  const count = countAliveNeighbors(board, 1, 1)
  expect(count).toStrictEqual(4)
});

test('countAliveNeighbors correctly counts neighbors at edge cells', () => {
  const board = [
    [0,1,0],
    [1,0,1],
    [0,0,1]
  ]
  expect(countAliveNeighbors(board, 0, 0)).toStrictEqual(2)
  expect(countAliveNeighbors(board, 0, 1)).toStrictEqual(2)
  expect(countAliveNeighbors(board, 0, 2)).toStrictEqual(2)
  expect(countAliveNeighbors(board, 1, 0)).toStrictEqual(1)
  expect(countAliveNeighbors(board, 1, 2)).toStrictEqual(2)
  expect(countAliveNeighbors(board, 2, 0)).toStrictEqual(1)
  expect(countAliveNeighbors(board, 2, 1)).toStrictEqual(3)
  expect(countAliveNeighbors(board, 2, 2)).toStrictEqual(1)
});

test('decideNextGeneration throws an error when given more than 8 neighbors', () => {
  const tooManyNeighborsAlive = () => {
    decideNextGeneration(true, 9)
  }
  expect(tooManyNeighborsAlive).toThrow("A cell can only have between 0 and 8 alive neighbors")

  const tooManyNeighborsDead = () => {
    decideNextGeneration(false, 9)
  }
  expect(tooManyNeighborsDead).toThrow("A cell can only have between 0 and 8 alive neighbors")
});

test('decideNextGeneration throws an error when given a negative number neighbors', () => {
  const tooManyNeighborsAlive = () => {
    decideNextGeneration(true, -1)
  }
  expect(tooManyNeighborsAlive).toThrow("A cell can only have between 0 and 8 alive neighbors")

  const tooManyNeighborsDead = () => {
    decideNextGeneration(false, -1)
  }
  expect(tooManyNeighborsDead).toThrow("A cell can only have between 0 and 8 alive neighbors")
});

test('decideNextGeneration: Any live cell with fewer than two live neighbours dies, as if by underpopulation.', () => {
  expect(decideNextGeneration(true, 0)).toStrictEqual(0)
  expect(decideNextGeneration(true, 1)).toStrictEqual(0)
});

test('decideNextGeneration: Any live cell with more than three live neighbours dies, as if by overpopulation.', () => {
  expect(decideNextGeneration(true, 4)).toStrictEqual(0)
  expect(decideNextGeneration(true, 8)).toStrictEqual(0)
});

test('decideNextGeneration: Any live cell with two or three live neighbours lives on to the next generation.', () => {
  expect(decideNextGeneration(true, 2)).toStrictEqual(1)
  expect(decideNextGeneration(true, 3)).toStrictEqual(1)
});

test('decideNextGeneration: Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.', () => {
  expect(decideNextGeneration(false, 3)).toStrictEqual(1)
  expect(decideNextGeneration(false, 2)).toStrictEqual(0)
  expect(decideNextGeneration(false, 4)).toStrictEqual(0)
});

test('randomizeBoard generates board of correct size', () => {
  const board = randomizeBoard(5, 5)
  expect(board.length).toStrictEqual(5)
  expect(board[0].length).toStrictEqual(5)
});

test('randomizeBoard generates board populates every cell to either 0 or 1', () => {
  const board = randomizeBoard(5, 5)
  board.forEach(row => {
    row.forEach(cell => expect([0, 1]).toContain(cell))
  })
});

test('iterateBoard generates next iteration', () => {
  const board = [
    [0,1,0],
    [1,0,1],
    [0,0,1]
  ]
  const expectedBoard = [
    [0,1,0],
    [0,0,1],
    [0,1,0]
  ]

  const nextBoard = iterateBoard(board)
  expectedBoard.forEach((row, rowIndex) => {
    row.forEach((expectedCell, colIndex) => expect(nextBoard[rowIndex][colIndex]).toStrictEqual(expectedCell))
  })
})