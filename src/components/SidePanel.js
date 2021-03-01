import React, { Component } from "react";
import { connect } from "react-redux";

import { mergeMatrices } from "../functions/matrixFuncs";

export class SidePanel extends Component {
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
      <div className="side-panel">
        <h2 className="lvl">
          LEVEL:
          <h3 className="lvl num">
            {this.props.level + 1 < 21 ? this.props.level + 1 : "MAX"}
          </h3>
        </h2>
        <h2 className="lines">
          LINES:
          <h3 className="lines num">{this.props.lines}</h3>
        </h2>
        <h2 className="next-block">
          NEXT:
          <div className="next-block preview">{this.renderNextBlock()}</div>
        </h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeBlock: state.activeBlock,
    lines: state.lines,
    level: state.level,
  };
};

export default connect(mapStateToProps)(SidePanel);
