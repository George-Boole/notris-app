import React, { Component } from "react";
import { fireEvent } from "@testing-library/react";

export class TouchControls extends Component {
  render() {
    return (
      <div className="touch-controls">
        <div id="move-left"></div>
        <div id="move-right"></div>

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
        <div id="rotate-right"></div>
      </div>
    );
  }
}

export default TouchControls;
