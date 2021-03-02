import React, { Component } from "react";

import Score from "./Score";
import Level from "./Level";
import Lines from "./Lines";
import NextBlockPreview from "./NextBlockPreview";

export class SidePanel extends Component {
  render() {
    return (
      <div className="side-panel">
        <Score />
        <Level />
        <NextBlockPreview />
        <Lines />
      </div>
    );
  }
}

export default SidePanel;
