import React, { Component } from "react";
import { connect } from "react-redux";

import NextBlock from "./NextBlock";

export class SidePanel extends Component {
  render() {
    return (
      <div className="side-panel">
        {/* <div className="score">
          <h2 className="heading">SCORE:</h2>
          <h3 className="num">000000</h3>
        </div> */}
        <div className="lvl">
          <h2 className="heading">LEVEL:</h2>
          <h3 className="num">
            {this.props.level + 1 < 21 ? this.props.level + 1 : "MAX"}
          </h3>
        </div>
        <div className="lines">
          <h2 className="heading">LINES:</h2>
          <h3 className="num">{this.props.lines}</h3>
        </div>
        {/* <NextBlock /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lines: state.lines,
    level: state.level,
  };
};

export default connect(mapStateToProps)(SidePanel);
