import React, { Component } from "react";
import { fireEvent } from "@testing-library/react";
import TouchLeft from "./TouchComponents/TouchLeft";
import TouchRight from "./TouchComponents/TouchRight";
import TouchSoftDrop from "./TouchComponents/TouchSoftDrop";
// import TouchHardDrop from "./TouchComponents/TouchHardDrop";
import TouchRotateLeft from "./TouchComponents/TouchRotateLeft";
import TouchRotateRight from "./TouchComponents/TouchRotateRight";

export class TouchControls extends Component {
  render() {
    return (
      <div className="touch-controls">
        <TouchLeft />
        <TouchRight />

        <TouchSoftDrop />
        {/* <div
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
        ></div> */}
        <div id="hard-drop"></div>
        {/* <TouchHardDrop /> */}

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

        <TouchRotateLeft />
        <TouchRotateRight />
      </div>
    );
  }
}

export default TouchControls;
