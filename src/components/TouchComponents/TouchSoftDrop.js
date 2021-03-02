import React, { Component } from "react";
import { fireEvent } from "@testing-library/react";

class TouchSoftDrop extends Component {
  render() {
    return (
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
    );
  }
}

export default TouchSoftDrop;
