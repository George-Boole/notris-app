import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../actions";
import {
  mergeMatrices,
  detectHit,
  clearFilledRows,
} from "../functions/matrixFuncs";

class App extends Component {
  componentDidMount() {
    this.props.setActiveBlock(this.props.currentSequenceOfBlocks[0]);

    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "KeyA":
        case "ArrowLeft":
        case "Numpad4":
          e.preventDefault();
          this.props.moveLeft();
          if (this.hitDetected()) this.props.moveRight();
          break;
        case "KeyD":
        case "ArrowRight":
        case "Numpad6":
          e.preventDefault();
          this.props.moveRight();
          if (this.hitDetected()) this.props.moveLeft();
          break;
        case "KeyS":
        case "ArrowDown":
        case "Numpad5":
        case "Numpad2":
          e.preventDefault();
          this.props.moveDown();
          if (this.hitDetected()) {
            this.props.moveUp();
            this.props.placeBlock(
              mergeMatrices(
                this.props.field,
                this.props.activeBlock,
                this.props.xValue,
                this.props.yValue
              )
            );
            this.props.clearRows(clearFilledRows(this.props.field));
            if (this.props.indexOfNextBlock > 6)
              this.props.getNewSequenceOfBlocks();
            this.props.setActiveBlock(
              this.props.currentSequenceOfBlocks[this.props.indexOfNextBlock]
            );
          }
          if (this.hitDetected()) {
            setTimeout(alert("GAME OVER"), this.props.dropTimer);
            this.props.reset();
            this.props.setActiveBlock(this.props.currentSequenceOfBlocks[0]);
          }
          break;
        case "ArrowUp":
        case "KeyE":
        case "Numpad8":
          e.preventDefault();
          this.props.rotateRight(this.props.activeBlock);
          if (this.hitDetected()) this.props.moveRight();
          if (this.hitDetected()) {
            this.props.moveLeft();
            this.props.moveLeft();
          }
          if (this.hitDetected() && this.props.activeBlock.length === 4) {
            this.props.moveRight();
            this.props.moveRight();
            this.props.moveRight();
            if (this.hitDetected()) {
              this.props.moveLeft();
              this.props.moveLeft();
              this.props.moveLeft();
              this.props.moveLeft();
            }
            if (this.hitDetected()) {
              this.props.moveRight();
              this.props.moveRight();
              this.props.rotateLeft(this.props.activeBlock);
            }
          } else if (this.hitDetected()) {
            this.props.moveRight();
            this.props.rotateLeft(this.props.activeBlock);
          }
          break;
        case "KeyZ":
        case "KeyW":
        case "Slash":
        case "Numpad7":
        case "NumpadDivide":
          e.preventDefault();
          this.props.rotateLeft(this.props.activeBlock);
          if (this.hitDetected()) this.props.moveRight();
          if (this.hitDetected()) {
            this.props.moveLeft();
            this.props.moveLeft();
          }
          if (this.hitDetected() && this.props.activeBlock.length === 4) {
            this.props.moveRight();
            this.props.moveRight();
            this.props.moveRight();
            if (this.hitDetected()) {
              this.props.moveLeft();
              this.props.moveLeft();
              this.props.moveLeft();
              this.props.moveLeft();
            }
            if (this.hitDetected()) {
              this.props.moveRight();
              this.props.moveRight();
              this.props.rotateRight(this.props.activeBlock);
            }
          } else if (this.hitDetected()) {
            this.props.moveRight();
            this.props.rotateRight(this.props.activeBlock);
          }
          break;
        case "KeyR":
          e.preventDefault();
          this.props.reset();
          this.props.setActiveBlock(this.props.currentSequenceOfBlocks[0]);
          break;
        default:
          return null;
      }
    });

    this.setDropInterval();
  }

  componentDidUpdate() {}

  setDropInterval() {
    setInterval(() => {
      this.props.moveDown();
      if (this.hitDetected()) {
        this.props.moveUp();
        this.props.placeBlock(
          mergeMatrices(
            this.props.field,
            this.props.activeBlock,
            this.props.xValue,
            this.props.yValue
          )
        );
        this.props.clearRows(clearFilledRows(this.props.field));
        if (this.props.indexOfNextBlock > 6)
          this.props.getNewSequenceOfBlocks();
        this.props.setActiveBlock(
          this.props.currentSequenceOfBlocks[this.props.indexOfNextBlock]
        );
      }
      if (this.hitDetected()) {
        setTimeout(alert("GAME OVER"), this.props.dropTimer);
        this.props.reset();
        this.props.setActiveBlock(this.props.currentSequenceOfBlocks[0]);
      }
    }, this.props.dropTimer);
  }

  hitDetected() {
    return detectHit(
      this.props.field,
      this.props.activeBlock,
      this.props.xValue,
      this.props.yValue
    );
  }

  renderField() {
    return mergeMatrices(
      this.props.field,
      this.props.activeBlock,
      this.props.xValue,
      this.props.yValue
    ).map((row, index) => {
      return (
        <div key={index}>
          {row.map((tile, index) => {
            if (tile === 0) {
              return <div className="empty-tile" key={index}></div>;
            }
            if (tile === 1) {
              return (
                <div className="filled-tile" key={index}>
                  <div className="i block"></div>
                </div>
              );
            }
            if (tile === 2) {
              return (
                <div className="filled-tile" key={index}>
                  <div className="j block"></div>
                </div>
              );
            }
            if (tile === 3) {
              return (
                <div className="filled-tile" key={index}>
                  <div className="l block"></div>
                </div>
              );
            }
            if (tile === 4) {
              return (
                <div className="filled-tile" key={index}>
                  <div className="o block"></div>
                </div>
              );
            }
            if (tile === 5) {
              return (
                <div className="filled-tile" key={index}>
                  <div className="s block"></div>
                </div>
              );
            }
            if (tile === 6) {
              return (
                <div className="filled-tile" key={index}>
                  <div className="t block"></div>
                </div>
              );
            }
            return (
              <div className="filled-tile" key={index}>
                <div className="z block"></div>
              </div>
            );
          })}
        </div>
      );
    });
  }

  render() {
    return (
      <>
        {/* <div className="btn">
          <div onClick={() => this.props.reset()}>Reset </div>
          <div onClick={() => this.props.moveLeft()}>Left </div>
          <div onClick={() => this.props.moveRight()}>Right </div>
          <div onClick={() => this.props.moveDown()}>Down </div>
        </div>
        <div onClick={() => this.props.rotateRight(this.props.activeBlock)}>
          RotateRight{" "}
        </div> */}

        <div className="playfield">{this.renderField()}</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    field: state.field,
    activeBlock: state.activeBlock,
    xValue: state.xValue,
    yValue: state.yValue,
    dropTimer: state.dropTimer,
    currentSequenceOfBlocks: state.currentSequenceOfBlocks,
    indexOfNextBlock: state.indexOfNextBlock,
  };
};

const mapDispatchToProps = {
  reset: actions.reset,
  moveLeft: actions.moveLeft,
  moveRight: actions.moveRight,
  moveDown: actions.moveDown,
  moveUp: actions.moveUp,
  rotateRight: actions.rotateRight,
  rotateLeft: actions.rotateLeft,
  placeBlock: actions.placeBlock,
  setDropTimer: actions.setDropTimer,
  clearRows: actions.clearRows,
  setActiveBlock: actions.setActiveBlock,
  getNewSequenceOfBlocks: actions.getNewSequenceOfBlocks,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
