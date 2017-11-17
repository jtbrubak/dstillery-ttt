import React from 'react';
import ReactDOM from 'react-dom';
import isEqual from 'lodash/isEqual';
import './style.css';

class Board extends React.Component {
  constructor() {
    super();
    this.state = { currentTurn: "X", turnNumber: 1,
      rows: [["", "", ""], ["", "", ""], ["", "", ""]],
      status: "X'S TURN", gameOver: false };
    this.handleClick = this.handleClick.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleClick(row_num, space_num) {
    if (this.occupiedSpace(row_num, space_num) || this.state.gameOver) { return; }
    let newRows = this.state.rows.slice(0);
    newRows[row_num][space_num] = this.state.currentTurn;
    this.setState({ rows: newRows });
    if (this.checkWin()) { this.endGame(this.state.currentTurn); }
    else if (this.state.turnNumber === 9) { this.endGame(null); }
    else { this.changeTurn(); }
  }

  checkWin() {
    const rows = this.state.rows;
    const lines = [[[0,0], [0,1], [0,2]],
                   [[1,0], [1,1], [1,2]],
                   [[2,0], [2,1], [2,2]],
                   [[0,0], [0,1], [0,2]],
                   [[1,0], [1,1], [1,2]],
                   [[2,0], [2,1], [2,2]],
                   [[0,0], [1,1], [2,2]],
                   [[2,0], [1,1], [0,2]]];
    return lines.some((line) => {
      const testLine = [rows[line[0][0]][line[0][1]],
                        rows[line[1][0]][line[1][1]],
                        rows[line[2][0]][line[2][1]]];
      return isEqual(testLine, ["X", "X", "X"]) || isEqual(testLine, ["O", "O", "O"]);
    });
  }

  occupiedSpace(row_num, space_num) {
    const occupied = this.state.rows[row_num][space_num] === "" ? false : true;
    return occupied;
  }

  changeTurn() {
    const nextTurn = this.state.currentTurn === "X" ? "O" : "X";
    const newStatus = nextTurn === "X" ? "X'S TURN" : "O'S TURN";
    const newTurnNumber = this.state.turnNumber + 1;
    this.setState({ currentTurn: nextTurn, turnNumber: newTurnNumber,
      status: newStatus });
  }

  endGame(winner) {
    if (winner) { this.setState({ gameOver: true, status: `${winner} WINS!`}); }
    else { this.setState({ gameOver: true, status: 'TIE GAME!'}); }
  }

  reset() {
    this.setState({ currentTurn: "X", turnNumber: 1, status: "X'S TURN",
      rows: [["", "", ""], ["", "", ""], ["", "", ""]], gameOver: false });
  }

  render() {
    return (
      <main>
        <p>{this.state.status}</p>
        {this.state.rows.map((row, row_num) =>
          <ul key={row_num}>
            {row.map((space, space_num) =>
              <li key={space_num}
                onClick={() => this.handleClick(row_num, space_num)}>
                {space}</li>
            )}
          </ul>
        )}
        <button onClick={this.reset}>Reset</button>
      </main>
    );
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const root = document.getElementById('root');
  ReactDOM.render(<Board/>, root);
});
