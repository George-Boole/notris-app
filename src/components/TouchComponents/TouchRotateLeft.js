import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../../actions";
import { detectHit } from "../../functions/matrixFuncs";

class TouchRotateLeft extends Component {
  componentDidMount() {
    const rotateLeft = document.getElementById("rotate-left");
    rotateLeft.addEventListener("mousedown", (e) => {
      if (!this.props.paused) {
        e.preventDefault();
        this.props.rotateLeft(this.props.activeBlock);
        if (this.hitDetected()) this.props.moveRight(1);
        if (this.hitDetected()) {
          this.props.moveLeft(2);
        }
        if (this.hitDetected() && this.props.activeBlock.length === 4) {
          this.props.moveRight(3);
          if (this.hitDetected()) {
            this.props.moveLeft(4);
          }
          if (this.hitDetected()) {
            this.props.moveRight(2);
            this.props.rotateRight(this.props.activeBlock);
          }
        } else if (this.hitDetected()) {
          this.props.moveRight(1);
          this.props.rotateRight(this.props.activeBlock);
        }
      }
    });
  }

  hitDetected() {
    return detectHit(
      this.props.field,
      this.props.activeBlock,
      this.props.xValue,
      this.props.yValue
    );
  }

  render() {
    return <div id="rotate-left"></div>;
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

const mapDispatchToProps = {
  moveLeft: actions.moveLeft,
  moveRight: actions.moveRight,
  rotateRight: actions.rotateRight,
  rotateLeft: actions.rotateLeft,
};

export default connect(mapStateToProps, mapDispatchToProps)(TouchRotateLeft);
