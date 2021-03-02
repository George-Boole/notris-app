import React, { Component } from "react";
import TouchLeft from "./TouchComponents/TouchLeft";
import TouchRight from "./TouchComponents/TouchRight";
import TouchHardDrop from "./TouchComponents/TouchHardDrop";
import TouchSoftDrop from "./TouchComponents/TouchSoftDrop";
import TouchReset from "./TouchComponents/TouchReset";
import TouchPause from "./TouchComponents/TouchPause";
import TouchRotateRight from "./TouchComponents/TouchRotateRight";
import TouchRotateLeft from "./TouchComponents/TouchRotateLeft";

export class TouchControls extends Component {
  render() {
    return (
      <div className="touch-controls">
        <TouchLeft />
        <TouchRight />
        <TouchHardDrop />
        <TouchSoftDrop />

        <TouchReset />

        <TouchPause />

        <TouchRotateRight />
        <TouchRotateLeft />
      </div>
    );
  }
}

export default TouchControls;
