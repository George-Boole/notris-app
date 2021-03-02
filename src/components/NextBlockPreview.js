import React, { Component } from "react";
import { connect } from "react-redux";

import RenderMatrix from "./RenderMatrix";

export class NextBlockPreview extends Component {
  renderNextBlock() {
    return (
      <RenderMatrix
        field={[
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ]}
        block={this.props.activeBlock}
        x={0}
        y={0}
      />
    );
  }

  render() {
    return (
      <div className="next-block">
        <h2 className="heading">NEXT:</h2>
        <div className="preview">{this.renderNextBlock()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeBlock: state.activeBlock,
  };
};

export default connect(mapStateToProps)(NextBlockPreview);
