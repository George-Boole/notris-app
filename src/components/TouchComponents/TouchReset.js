import React, { Component } from "react";
import { fireEvent } from "@testing-library/react";

class TouchReset extends Component {
  render() {
    return (
      <div
        id="reset"
        onMouseDown={() => {
          fireEvent.keyDown(window, {
            key: "o",
            code: "KeyO",
          });
        }}
      ></div>
    );
  }
}

export default TouchReset;
