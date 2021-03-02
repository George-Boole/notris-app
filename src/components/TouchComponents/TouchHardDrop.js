import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../../actions";
// import { detectHit } from "../../functions/matrixFuncs";

class TouchHardDrop extends Component {
  // componentDidMount() {
  //   const hardDrop = document.getElementById("hard-drop");
  //   hardDrop.addEventListener("mousedown", (e) => {
  //     if (this.props.paused === false && this.props.gameOver === false) {
  //       e.preventDefault();
  //       while (
  //         !detectHit(
  //           this.props.field,
  //           this.props.activeBlock,
  //           this.props.xValue,
  //           this.props.yValue
  //         )
  //       ) {
  //         this.props.moveDown();
  //       }
  //       this.props.moveUp();
  //       clearDropInterval();
  //       setDropInterval(this.props.dropTimer);
  //     }
  //   });
  // }

  render() {
    return <div id="hard-drop"></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    field: state.field,
    activeBlock: state.activeBlock,
    xValue: state.xValue,
    yValue: state.yValue,
    paused: state.paused,
    gameOver: state.paused,
  };
};

const mapDispatchToProps = {
  moveDown: actions.moveDown,
  moveUp: actions.moveUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(TouchHardDrop);
