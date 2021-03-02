import "./Board.css"
import BoardRow from "./BoardRow"

function Board({ cells }) {
  return (
    <div className="game-board">
      {cells.map((cells, rowIndex) =>
        <BoardRow cells={cells} key={rowIndex} />
      )}
    </div>
  );
}

export default Board;