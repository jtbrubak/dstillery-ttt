import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class Board extends React.Component {
  constructor() {
    super();
    this.state = { currentTurn: "X", turnNumber: 1,
      rows: [["", "", ""], ["", "", ""], ["", "", ""]] };

  }

  render() {
    return (
      <main>
        {this.state.rows.map((row) =>
          <ul>
            {row.map((space) =>
              <li>{space}</li>
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
