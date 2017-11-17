import React from 'react';

class Board extends React.Component {
  constructor() {
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

module.exports = Board;
