import React, { Component } from "react";
import { connect } from "react-redux";

// import actions from "../actions";
import GameOver from "./GameOver";
import PauseScreen from "./PauseScreen";
import SidePanel from "./SidePanel";
import RenderMatrix from "./RenderMatrix";

export class Playfield extends Component {
  renderGameOver() {
    return <GameOver />;
  }

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
