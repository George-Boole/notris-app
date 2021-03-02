import React, { Component } from "react";
import { connect } from "react-redux";

import Playfield from "./components/Playfield";
import KeyBindings from "./components/KeyBindings";
import TouchControls from "./components/TouchControls";

import actions from "./actions";
import {
  mergeMatrices,
  detectHit,
  countFilledRows,
  clearFilledRows,
} from "./functions/matrixFuncs";

class App extends Component {
  componentDidMount() {
    this.props.setActiveBlock(this.props.currentSequenceOfBlocks[0]);

    const left = document.getElementById("move-left");
    left.addEventListener("mousedown", (e) => {
      if (!this.props.paused) {
        e.preventDefault();
        this.props.moveLeft(1);
        if (this.hitDetected()) this.props.moveRight(1);
      }
    });

    const right = document.getElementById("move-right");
    right.addEventListener("mousedown", (e) => {
      if (!this.props.paused) {
        e.preventDefault();
        this.props.moveRight(1);
        if (this.hitDetected()) this.props.moveLeft(1);
      }
    });

    // const softDrop = document.getElementById("soft-drop");
    // softDrop.addEventListener("touchstart", (e) => {
    //   if (this.props.paused === false && this.props.gameOver === false) {
    //     e.preventDefault();
    //     if (this.props.softDropping === false) {
    //       clearDropInterval();
    //       setDropInterval(50);
    //       this.props.setSoftDroppingTo(true);
    //     }
    //   }
    // });

    const hardDrop = document.getElementById("hard-drop");
    hardDrop.addEventListener("mousedown", (e) => {
      if (this.props.paused === false && this.props.gameOver === false) {
        e.preventDefault();
        while (!this.hitDetected()) {
          this.props.moveDown();
        }
        this.props.moveUp();
        clearDropInterval();
        setDropInterval(this.props.dropTimer);
      }
    });

    const rotateLeft = document.getElementById("rotate-left");
    rotateLeft.addEventListener("mousedown", (e) => {
      if (!this.props.paused) {
        e.preventDefault();
        this.props.rotateLeft(this.props.activeBlock);
        if (this.hitDetected()) this.props.moveRight(1);
        if (this.hitDetected()) {
          this.props.moveLeft(2);
        }
        if (this.hitDetected() && this.props.activeBlock.length === 4) {
          this.props.moveRight(3);
          if (this.hitDetected()) {
            this.props.moveLeft(4);
          }
          if (this.hitDetected()) {
            this.props.moveRight(2);
            this.props.rotateRight(this.props.activeBlock);
          }
        } else if (this.hitDetected()) {
          this.props.moveRight(1);
          this.props.rotateRight(this.props.activeBlock);
        }
      }
    });

    const rotateRight = document.getElementById("rotate-right");
    rotateRight.addEventListener("mousedown", (e) => {
      if (this.props.paused === false && this.props.gameOver === false) {
        e.preventDefault();
        this.props.rotateRight(this.props.activeBlock);
        if (this.hitDetected()) this.props.moveRight(1);
        if (this.hitDetected()) {
          this.props.moveLeft(2);
        }
        if (this.hitDetected() && this.props.activeBlock.length === 4) {
          this.props.moveRight(3);
          if (this.hitDetected()) {
            this.props.moveLeft(4);
          }
          if (this.hitDetected()) {
            this.props.moveRight(2);
            this.props.rotateLeft(this.props.activeBlock);
          }
        } else if (this.hitDetected()) {
          this.props.moveRight(1);
          this.props.rotateLeft(this.props.activeBlock);
        }
      }
    });

    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "KeyA":
        case "ArrowLeft":
        case "Numpad4":
          if (!this.props.paused) {
            e.preventDefault();
            this.props.moveLeft(1);
            if (this.hitDetected()) this.props.moveRight(1);
          }
          break;
        case "KeyD":
        case "ArrowRight":
        case "Numpad6":
          if (!this.props.paused) {
            e.preventDefault();
            this.props.moveRight(1);
            if (this.hitDetected()) this.props.moveLeft(1);
          }
          break;
        case "KeyS":
        case "ArrowDown":
        case "Numpad5":
        case "Numpad2":
          if (this.props.paused === false && this.props.gameOver === false) {
            e.preventDefault();
            if (this.props.softDropping === false) {
              window.addEventListener(
                "keyup",
                (evt) => {
                  evt.preventDefault();
                  clearDropInterval();
                  setDropInterval(this.props.dropTimer);
                  this.props.setSoftDroppingTo(false);
                },
                {
                  once: true,
                }
              );
              clearDropInterval();
              setDropInterval(50);
              this.props.setSoftDroppingTo(true);
            }
          }
          break;
        case "Space":
        case "Numpad9":
        case "NumpadAdd":
        case "Numpad0":
        case "ShiftRight":
          if (this.props.paused === false && this.props.gameOver === false) {
            e.preventDefault();
            while (!this.hitDetected()) {
              this.props.moveDown();
            }
            this.props.moveUp();
            clearDropInterval();
            setDropInterval(this.props.dropTimer);
          }
          break;
        case "ArrowUp":
        case "KeyX":
        case "KeyE":
        case "Numpad8":
          if (this.props.paused === false && this.props.gameOver === false) {
            e.preventDefault();
            this.props.rotateRight(this.props.activeBlock);
            if (this.hitDetected()) this.props.moveRight(1);
            if (this.hitDetected()) {
              this.props.moveLeft(2);
            }
            if (this.hitDetected() && this.props.activeBlock.length === 4) {
              this.props.moveRight(3);
              if (this.hitDetected()) {
                this.props.moveLeft(4);
              }
              if (this.hitDetected()) {
                this.props.moveRight(2);
                this.props.rotateLeft(this.props.activeBlock);
              }
            } else if (this.hitDetected()) {
              this.props.moveRight(1);
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
            if (this.hitDetected()) this.props.moveRight(1);
            if (this.hitDetected()) {
              this.props.moveLeft(2);
            }
            if (this.hitDetected() && this.props.activeBlock.length === 4) {
              this.props.moveRight(3);
              if (this.hitDetected()) {
                this.props.moveLeft(4);
              }
              if (this.hitDetected()) {
                this.props.moveRight(2);
                this.props.rotateRight(this.props.activeBlock);
              }
            } else if (this.hitDetected()) {
              this.props.moveRight(1);
              this.props.rotateRight(this.props.activeBlock);
            }
          }
          break;
        case "KeyO":
          e.preventDefault();
          this.props.reset();
          clearDropInterval();
          this.props.setActiveBlock(this.props.currentSequenceOfBlocks[0]);
          setDropInterval(this.props.dropTimer);
          break;
        case "Enter":
        case "NumpadEnter":
          if (this.props.gameOver) {
            e.preventDefault();
            this.props.reset();
            clearDropInterval();
            this.props.setActiveBlock(this.props.currentSequenceOfBlocks[0]);
            setDropInterval(this.props.dropTimer);
          }
          if (this.props.paused) {
            e.preventDefault();
            this.props.unpause();
            clearDropInterval();
            setDropInterval(this.props.dropTimer);
          }
          break;
        case "KeyP":
        case "KeyK":
          if (!this.props.gameOver) {
            if (!this.props.paused) {
              this.props.pause();
              clearDropInterval();
            } else {
              this.props.unpause();
              clearDropInterval();
              setDropInterval(this.props.dropTimer);
            }
          }
          break;
        default:
          return null;
      }
    });

    const dropRateTable = [
      887,
      820,
      753,
      686,
      619,
      552,
      469,
      368,
      285,
      184,
      167,
      151,
      134,
      117,
      100,
      92,
      83,
      75,
      67,
      58,
      50,
    ];

    let intervalId;

    const setDropInterval = (dropRate) => {
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
          this.props.addToLines(countFilledRows(this.props.field));
          this.props.clearRows(clearFilledRows(this.props.field));
          this.props.setLevel(
            Math.floor(this.props.lines / 10) < 20
              ? Math.floor(this.props.lines / 10)
              : 20
          );
          this.props.setDropTimer(dropRateTable[this.props.level]);
          clearDropInterval();
          setDropInterval(this.props.dropTimer);
          if (this.props.indexOfNextBlock > 6)
            this.props.getNewSequenceOfBlocks();
          this.props.setActiveBlock(
            this.props.currentSequenceOfBlocks[this.props.indexOfNextBlock]
          );
        }
        if (this.hitDetected()) {
          this.props.setGameOverTo(true);
          clearDropInterval();
        }
      }, dropRate);
    };

    const clearDropInterval = () => {
      clearInterval(intervalId);
    };

    setDropInterval(this.props.dropTimer);
  }

  hitDetected() {
    return detectHit(
      this.props.field,
      this.props.activeBlock,
      this.props.xValue,
      this.props.yValue
    );
  }

  render() {
    return (
      <>
        <Playfield />
        <KeyBindings />
        <TouchControls />
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
    paused: state.paused,
    softDropping: state.softDropping,
    gameOver: state.gameOver,
    lines: state.lines,
    level: state.level,
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
  setSoftDroppingTo: actions.setSoftDroppingTo,
  setGameOverTo: actions.setGameOverTo,
  addToLines: actions.addToLines,
  setLevel: actions.setLevel,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
