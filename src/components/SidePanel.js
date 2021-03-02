import React, { Component } from "react";

// import Score from "./Score";
import Level from "./Level";
import Lines from "./Lines";
import NextBlock from "./NextBlock";

export class SidePanel extends Component {
  render() {
    return (
      <div className="side-panel">
        {/* <Score /> */}
        <Level />
        <Lines />
        {/* <NextBlock /> */}
      </div>
    );
  }
}

export default SidePanel;
