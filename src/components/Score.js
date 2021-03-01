import React, { Component } from "react";
import { connect } from "react-redux";

export class Score extends Component {
  render() {
    return (
      <div className="score">
        <h2 className="heading">SCORE:</h2>
        <h3 className="num">000000</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Score);
