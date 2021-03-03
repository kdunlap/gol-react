

// board is 2d array [ row1 => [ col1, col2, ...], row2 => [...], ...]
export function countAliveNeighbors(board, row, col){
  let totalAlive = 0

  // handle empty array
  if(board.length === 0){
    throw new Error("Board must contain cells")
  }

  // out of range indexes
  if(row < 0 || col < 0 || row > board.length - 1 || col > board[0].length - 1){
    throw new Error("Out of range board index")
  }

  const rowEndIndex = board.length - 1
  const colEndIndex = board[0].length - 1

  let rowIndex
  let colIndex

  // top left
  rowIndex = row > 0 ? row - 1 : rowEndIndex
  colIndex = col > 0 ? col - 1 : colEndIndex
  totalAlive += board[rowIndex][colIndex]

  // top
  rowIndex = row > 0 ? row - 1 : rowEndIndex
  colIndex = col
  totalAlive += board[rowIndex][colIndex]

  // top right
  rowIndex = row > 0 ? row - 1 : rowEndIndex
  colIndex = col < colEndIndex ? col + 1 : 0
  totalAlive += board[rowIndex][colIndex]

  // right
  rowIndex = row
  colIndex = col < colEndIndex ? col + 1 : 0
  totalAlive += board[rowIndex][colIndex]

  // bottom right
  rowIndex = row < rowEndIndex ? row + 1 : 0
  colIndex = col < colEndIndex ? col + 1 : 0
  totalAlive += board[rowIndex][colIndex]

  // bottom
  rowIndex = row < rowEndIndex ? row + 1 : 0
  colIndex = col
  totalAlive += board[rowIndex][colIndex]

  // bottom left
  rowIndex = row < rowEndIndex ? row + 1 : 0
  colIndex = col > 0 ? col - 1 : colEndIndex
  totalAlive += board[rowIndex][colIndex]

  // left
  rowIndex = row
  colIndex = col > 0 ? col - 1 : colEndIndex
  totalAlive += board[rowIndex][colIndex]

  return totalAlive
}

export function decideNextGeneration(isAlive, aliveNeighbors){
  if(aliveNeighbors < 0 || aliveNeighbors > 8){
    throw new Error("A cell can only have between 0 and 8 alive neighbors")
  }

  if(isAlive){

    // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    if(aliveNeighbors < 2){
      return 0
    }

    // Any live cell with more than three live neighbours dies, as if by overpopulation.
    else if(aliveNeighbors > 3){
      return 0
    }

    // Any live cell with two or three live neighbours lives on to the next generation.
    else{
      return 1
    }
  }

  // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  else if(aliveNeighbors === 3){
    return 1
  }

  // cell is dead and does not have exactly 3 live neighbors
  else{
    return 0
  }
}

// initialize each cell with a random 0 or 1
export function randomizeBoard(numRows, numCols){
  const board = []
  for(let i = 0; i < numRows; i++){
    const row = []
    for(let j = 0; j < numCols; j++){
      row[j] = Math.round(Math.random())
    }
    board[i] = row
  }
  return board
}

export function iterateBoard(board){
  // copy board
  const newBoard = board.map((row) => [...row])

  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const aliveNeighbors = countAliveNeighbors(board, rowIndex, colIndex)
      newBoard[rowIndex][colIndex] = decideNextGeneration(cell === 1, aliveNeighbors)
    })
  })

  return newBoard
}