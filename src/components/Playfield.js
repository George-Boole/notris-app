import React, { Component } from "react";
import { connect } from "react-redux";

// import actions from "../actions";
import { mergeMatrices } from "../functions/matrixFuncs";
import SidePanel from "./SidePanel";

export class Playfield extends Component {
  renderGameOver() {
    return (
      <div className="game-over">
        <h3>GAME OVER</h3>
        <span>Press O or Enter to Play Again</span>
      </div>
    );
  }

  renderField() {
    if (!this.props.paused) {
      return mergeMatrices(
        this.props.field,
        this.props.activeBlock,
        this.props.xValue,
        this.props.yValue
      ).map((row, index) => {
        return (
          <div key={index}>
            {row.map((tile, index) => {
              if (tile === 0) {
                return <div className="empty-tile" key={index}></div>;
              }
              if (tile === 1) {
                return (
                  <div className="filled-tile" key={index}>
                    <div className="i block"></div>
                  </div>
                );
              }
              if (tile === 2) {
                return (
                  <div className="filled-tile" key={index}>
                    <div className="j block"></div>
                  </div>
                );
              }
              if (tile === 3) {
                return (
                  <div className="filled-tile" key={index}>
                    <div className="l block"></div>
                  </div>
                );
              }
              if (tile === 4) {
                return (
                  <div className="filled-tile" key={index}>
                    <div className="o block"></div>
                  </div>
                );
              }
              if (tile === 5) {
                return (
                  <div className="filled-tile" key={index}>
                    <div className="s block"></div>
                  </div>
                );
              }
              if (tile === 6) {
                return (
                  <div className="filled-tile" key={index}>
                    <div className="t block"></div>
                  </div>
                );
              }
              return (
                <div className="filled-tile" key={index}>
                  <div className="z block"></div>
                </div>
              );
            })}
          </div>
        );
      });
    }
    return (
      <div className="pause-screen">
        <h3>PAUSED</h3>
        <span>Press P or Enter to Resume</span>
      </div>
    );
  }

  render() {
    return (
      <div className="playfield">
        <SidePanel />
        {this.props.gameOver && this.renderGameOver()}
        {this.renderField()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    field: state.field,
    activeBlock: state.activeBlock,
    xValue: state.xValue,
    yValue: state.yValue,
    paused: state.paused,
    gameOver: state.gameOver,
  };
};

export default connect(mapStateToProps)(Playfield);
