

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

  const totalRows = board.length - 1
  const totalCols = board[0].length - 1

  // top left
  if(row > 0 && col > 0) {
    totalAlive += board[row - 1][col - 1]
  }

  // top
  if(row > 0) {
    totalAlive += board[row - 1][col]
  }

  // top right
  if(row > 0 && col < totalCols) {
    totalAlive += board[row - 1][col + 1]
  }

  // right
  if(col < totalCols){
    totalAlive += board[row][col + 1]
  }

  // bottom right
  if(row < totalRows && col < totalCols) {
    totalAlive += board[row + 1][col + 1]
  }

  // bottom
  if(row < totalRows) {
    totalAlive += board[row + 1][col]
  }

  // bottom left
  if(row < totalRows && col > 0) {
    totalAlive += board[row + 1][col - 1]
  }

  // left
  if(col > 0){
    totalAlive += board[row][col - 1]
  }

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
      // has 2 or 3 neighbors
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


export function tick(board){
  const nextGen = [...board]

  board.forEach((row, y) => {
    row.forEach((cell, x) => {
        const aliveNeighbors = countAliveNeighbors(board, x, y)
        nextGen[y][x] = decideNextGeneration(cell === 1, aliveNeighbors)
    })
  })

  return nextGen
}