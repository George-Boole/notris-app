import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../../actions";
import { detectHit } from "../../functions/matrixFuncs";

class TouchRotateRight extends Component {
  componentDidMount() {
    const rotateRight = document.getElementById("rotate-right");
    rotateRight.addEventListener("mousedown", (e) => {
      if (this.props.paused === false && this.props.gameOver === false) {
        e.preventDefault();
        this.props.rotateRight(this.props.activeBlock);
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
            this.props.rotateLeft(this.props.activeBlock);
          }
        } else if (this.hitDetected()) {
          this.props.moveRight(1);
          this.props.rotateLeft(this.props.activeBlock);
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
    return <div id="rotate-right"></div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(TouchRotateRight);
