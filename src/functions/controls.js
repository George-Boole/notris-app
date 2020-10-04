import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../actions";
import {
  mergeMatrices,
  detectHit,
  clearFilledRows,
} from "../functions/matrixFuncs";

export const controls = () => {
  this.props.setActiveBlock(this.props.currentSequenceOfBlocks[0]);

  window.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "KeyA":
      case "ArrowLeft":
      case "Numpad4":
        if (!this.props.paused) {
          e.preventDefault();
          this.props.moveLeft();
          if (this.hitDetected()) this.props.moveRight();
        }
        break;
      case "KeyD":
      case "ArrowRight":
      case "Numpad6":
        if (!this.props.paused) {
          e.preventDefault();
          this.props.moveRight();
          if (this.hitDetected()) this.props.moveLeft();
        }
        break;
      case "KeyS":
      case "ArrowDown":
      case "Numpad5":
      case "Numpad2":
        if (!this.props.paused) {
          e.preventDefault();
          if (softDropping === false) {
            window.addEventListener(
              "keyup",
              (evt) => {
                evt.preventDefault();
                // switch (evt.code) {
                // case "KeyS":
                // case "ArrowDown":
                // case "Numpad5":
                // case "Numpad2":
                //   clearDropInterval();
                //   setDropInterval();
                //   console.log("keyup");
                //   softDropping = false;
                //   break;
                // default:
                // return null;

                clearDropInterval();
                setDropInterval();
                // setSoftDropInterval();
                softDropping = false;
                // }
              },
              {
                once: true,
              }
            );
            clearDropInterval();
            setSoftDropInterval();
            softDropping = true;
          }

          // this.props.moveDown();
          // if (this.hitDetected()) {
          //   this.props.moveUp();
          //   this.props.placeBlock(
          //     mergeMatrices(
          //       this.props.field,
          //       this.props.activeBlock,
          //       this.props.xValue,
          //       this.props.yValue
          //     )
          //   );
          //   this.props.clearRows(clearFilledRows(this.props.field));
          //   if (this.props.indexOfNextBlock > 6)
          //     this.props.getNewSequenceOfBlocks();
          //   this.props.setActiveBlock(
          //     this.props.currentSequenceOfBlocks[this.props.indexOfNextBlock]
          //   );
          // }
          // if (this.hitDetected()) {
          //   setTimeout(alert("GAME OVER"), this.props.dropTimer);
          //   this.props.reset();
          //   clearDropInterval();
          //   setDropInterval();
          //   this.props.setActiveBlock(this.props.currentSequenceOfBlocks[0]);
          // }
        }
        break;
      case "ArrowUp":
      case "KeyE":
      case "Numpad8":
        if (!this.props.paused) {
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
        }
        break;
      case "KeyZ":
      case "KeyW":
      case "Slash":
      case "Numpad7":
      case "NumpadDivide":
        if (!this.props.paused) {
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
        }
        break;
      case "KeyR":
        e.preventDefault();
        this.props.reset();
        clearDropInterval();
        setDropInterval();
        this.props.setActiveBlock(this.props.currentSequenceOfBlocks[0]);
        break;
      case "KeyP":
      case "KeyK":
        if (this.props.paused === false) {
          this.props.pause();
          clearDropInterval();
        } else if (this.props.paused === true) {
          this.props.unpause();
          setDropInterval();
        }
        break;
      default:
        return null;
    }
  });

  let intervalId;
  let softDropping = false;

  const setDropInterval = () => {
    intervalId = setInterval(() => {
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
        clearDropInterval();
        setDropInterval();
        this.props.setActiveBlock(this.props.currentSequenceOfBlocks[0]);
      }
    }, this.props.dropTimer);
  };

  const setSoftDropInterval = () => {
    intervalId = setInterval(() => {
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
        clearDropInterval();
        setDropInterval();
        this.props.setActiveBlock(this.props.currentSequenceOfBlocks[0]);
      }
    }, 50);
  };

  const clearDropInterval = () => {
    clearInterval(intervalId);
  };

  setDropInterval();
};

const mapStateToProps = (state) => {
  return {
    field: state.field,
    activeBlock: state.activeBlock,
    xValue: state.xValue,
    yValue: state.yValue,
    dropTimer: state.dropTimer,
    currentSequenceOfBlocks: state.currentSequenceOfBlocks,
    indexOfNextBlock: state.indexOfNextBlock,
    paused: state.paused,
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
  pause: actions.pause,
  unpause: actions.unpause,
};

export default connect(mapStateToProps, mapDispatchToProps)(controls);
