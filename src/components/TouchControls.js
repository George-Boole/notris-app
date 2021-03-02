import React, { Component } from "react";
import { fireEvent } from "@testing-library/react";
import TouchLeft from "./TouchComponents/TouchLeft";
import TouchRight from "./TouchComponents/TouchRight";
import TouchRotateRight from "./TouchComponents/TouchRotateRight";

export class TouchControls extends Component {
  render() {
    return (
      <div className="touch-controls">
        <TouchLeft />
        <TouchRight />

        <div
          id="soft-drop"
          onTouchStart={() => {
            fireEvent.keyDown(window, {
              key: "ArrowDown",
              code: "ArrowDown",
            });
          }}
          onMouseDown={() => {
            fireEvent.keyDown(window, {
              key: "ArrowDown",
              code: "ArrowDown",
            });
          }}
          onTouchEnd={() => {
            fireEvent.keyUp(window, {
              key: "ArrowDown",
              code: "ArrowDown",
            });
          }}
          onMouseUp={() => {
            fireEvent.keyUp(window, {
              key: "ArrowDown",
              code: "ArrowDown",
            });
          }}
        ></div>
        <div id="hard-drop"></div>

        <div
          id="pause"
          onMouseDown={() => {
            fireEvent.keyDown(window, {
              key: "p",
              code: "KeyP",
            });
          }}
        ></div>
        <div
          id="reset"
          onMouseDown={() => {
            fireEvent.keyDown(window, {
              key: "o",
              code: "KeyO",
            });
          }}
        ></div>

        <div id="rotate-left"></div>
        {/* <div id="rotate-right"></div> */}
        <TouchRotateRight />
      </div>
    );
  }
}

export default TouchControls;
