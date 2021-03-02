import './App.css';
import React, { useState } from "react"
import useInterval from "./hooks/useInterval"
import Board from "./components/Board"
import Controls from "./components/Controls"
import { randomizeBoard, iterateBoard } from "./utils/gameOfLife"

const NUM_ROWS = 50
const NUM_COLS = 50
const initialBoard = randomizeBoard(NUM_ROWS, NUM_COLS)

function App() {
  const [board, setBoard] = useState(initialBoard)
  const [isRunning, setIsRunning] = useState(false)

  useInterval(() => {
    iterate();
  }, isRunning ? 200 : null);

  function iterate(){
    const newBoard = iterateBoard(board)
    setBoard(newBoard)
  }

  function reset(){
    const board = randomizeBoard(NUM_ROWS, NUM_COLS)
    setBoard(board)
  }

  function start(){
    iterate()
    setIsRunning(true)
  }

  function stop(){
    setIsRunning(false)
  }

  return (
    <div className="container">
      <h1>Conway's Game of Life</h1>
      <Board cells={board} />
      <Controls isRunning={isRunning} onStart={start} onStop={stop} onReset={reset} />
    </div>
  );
}

export default App;
