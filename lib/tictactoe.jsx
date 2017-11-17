import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class Board extends React.Component {
  constructor() {
    super();
    this.state = { currentTurn: "X", turnNumber: 1,
      rows: [["", "", ""], ["", "", ""], ["", "", ""]] };
    this.onClick = this.onClick.bind(this);
  }

  onClick(row_num, space_num) {
    let newRows = this.state.rows;
    newRows[row_num][space_num] = "x";
    this.setState({ rows: newRows });
  }

  checkStatus(row_num, space_num) {
    
  }

  render() {
    return (
      <main>
        {this.state.rows.map((row, row_num) =>
          <ul>
            {row.map((space, space_num) =>
              <li key={space_num}
                onClick={() => this.onClick(row_num, space_num)}>{space}</li>
            )}
          </ul>
        )}
      </main>
    );
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const root = document.getElementById('root');
  ReactDOM.render(<Board/>, root);
});
