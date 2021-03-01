import React, { Component } from "react";
import { connect } from "react-redux";

export class Lines extends Component {
  render() {
    return (
      <div className="lines">
        <h2 className="heading">LINES:</h2>
        <h3 className="num">{this.props.lines}</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lines: state.lines,
  };
};

export default connect(mapStateToProps)(Lines);
