import React, { Component } from "react";

class PauseScreen extends Component {
  render() {
    return (
      <div className="pause-screen">
        <h3>PAUSED</h3>
        <span>Press P or Enter to Resume</span>
      </div>
    );
  }
}

export default PauseScreen;
