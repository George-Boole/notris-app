import React, { Component } from "react";
import { fireEvent } from "@testing-library/react";

class TouchPause extends Component {
  render() {
    return (
      <div
        id="pause"
        onMouseDown={() => {
          fireEvent.keyDown(window, {
            key: "p",
            code: "KeyP",
          });
        }}
      ></div>
    );
  }
}

export default TouchPause;
