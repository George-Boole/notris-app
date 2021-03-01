import React, { Component } from "react";

export class GameOver extends Component {
  render() {
    return (
      <div className="game-over">
        <h3>GAME OVER</h3>
        <span>Press O or Enter to Play Again</span>
      </div>
    );
  }
}

export default GameOver;
