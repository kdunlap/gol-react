import "./BoardRow.css"
import BoardCell from "./BoardCell"

function BoardRow({ cells }) {
  return (
    <div className="board-row">
      {cells.map((cell, colIndex) =>
        <BoardCell value={cell} key={colIndex} />
      )}
    </div>
  );
}

export default BoardRow;