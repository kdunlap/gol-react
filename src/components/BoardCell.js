import "./BoardCell.css"

function BoardCell({ value }) {
  return (
    <div className="board-cell" style={{ backgroundColor: value === 1 ? '#3366cc' : 'transparent' }} />
  );
}

export default BoardCell;