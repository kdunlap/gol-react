import "./Controls.css"

function Controls({ isRunning, onStart, onStop, onReset }) {
  return (
    <div className="game-controls">
      <button onClick={onReset} disabled={isRunning}>Randomize</button>
      {isRunning
        ? <button onClick={onStop}>Stop</button>
        : <button onClick={onStart}>Start</button>
      }
    </div>
  );
}

export default Controls;