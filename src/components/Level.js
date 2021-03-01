import React, { Component } from "react";
import { connect } from "react-redux";

export class Level extends Component {
  render() {
    return (
      <div className="level">
        <h2 className="heading">LEVEL:</h2>
        <h3 className="num">
          {this.props.level + 1 < 21 ? this.props.level + 1 : "MAX"}
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    level: state.level,
  };
};

export default connect(mapStateToProps)(Level);
