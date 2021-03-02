import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../../actions";
import { detectHit } from "../../functions/matrixFuncs";

class TouchRight extends Component {
  componentDidMount() {
    const left = document.getElementById("move-right");
    left.addEventListener("mousedown", (e) => {
      if (!this.props.paused) {
        e.preventDefault();
        this.props.moveRight(1);
        if (
          detectHit(
            this.props.field,
            this.props.activeBlock,
            this.props.xValue,
            this.props.yValue
          )
        )
          this.props.moveLeft(1);
      }
    });
  }

  render() {
    return <div id="move-right"></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    field: state.field,
    activeBlock: state.activeBlock,
    xValue: state.xValue,
    yValue: state.yValue,
    paused: state.paused,
  };
};

const mapDispatchToProps = {
  moveLeft: actions.moveLeft,
  moveRight: actions.moveRight,
};

export default connect(mapStateToProps, mapDispatchToProps)(TouchRight);
