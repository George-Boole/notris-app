import React, { Component } from "react";
import { connect } from "react-redux";

import { mergeMatrices } from "../functions/matrixFuncs";

export class NextBlock extends Component {
  renderNextBlock() {
    return mergeMatrices(
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      this.props.activeBlock,
      0,
      0
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

export default connect(mapStateToProps)(NextBlock);
