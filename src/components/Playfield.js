import React, { Component } from "react";
import { connect } from "react-redux";

import RenderMatrix from "./RenderMatrix";
import PauseScreen from "./PauseScreen";
import GameOver from "./GameOver";
import SidePanel from "./SidePanel";

export class Playfield extends Component {
  renderField() {
    if (!this.props.paused) {
      return (
        <RenderMatrix
          field={this.props.field}
          block={this.props.activeBlock}
          x={this.props.xValue}
          y={this.props.yValue}
        />
      );
    }
    return <PauseScreen />;
  }

  renderGameOver() {
    return <GameOver />;
  }

  render() {
    return (
      <div className="playfield">
        {this.renderField()}
        {this.props.gameOver && this.renderGameOver()}
        <SidePanel />
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
