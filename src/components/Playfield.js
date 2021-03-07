import React, { Component } from "react";
import { connect } from "react-redux";

import RenderMatrix from "./RenderMatrix";
import PauseScreen from "./PauseScreen";
import GameOver from "./GameOver";
import SidePanel from "./SidePanel";

import { dropRateTable } from "../resources/dropRateTable";

import actions from "../actions";
import {
  mergeMatrices,
  detectHit,
  countFilledRows,
  clearFilledRows,
} from "../functions/matrixFuncs";
// import { rotateRightHandler } from "../functions/rotateRightHandler";

export class Playfield extends Component {
  componentDidMount() {
    this.props.setActiveBlock(this.props.currentSequenceOfBlocks[0]);

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
                  clearInterval(dropIntervalId);
                  setDropInterval(this.props.dropTimer);
                  this.props.setSoftDroppingTo(false);
                },
                {
                  once: true,
                }
              );
              clearInterval(dropIntervalId);
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
          }
          break;
        case "ArrowUp":
        case "KeyX":
        case "KeyE":
        case "Numpad8":
          // rotateRightHandler(this.props, e);

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
          clearInterval(dropIntervalId);
          this.props.setActiveBlock(this.props.currentSequenceOfBlocks[0]);
          setDropInterval(this.props.dropTimer);
          break;
        case "Enter":
        case "NumpadEnter":
          if (this.props.gameOver) {
            e.preventDefault();
            this.props.reset();
            clearInterval(dropIntervalId);
            this.props.setActiveBlock(this.props.currentSequenceOfBlocks[0]);
            setDropInterval(this.props.dropTimer);
          }
          if (this.props.paused) {
            e.preventDefault();
            this.props.unpause();
            clearInterval(dropIntervalId);
            setDropInterval(this.props.dropTimer);
          }
          break;
        case "KeyP":
        case "KeyK":
          if (!this.props.gameOver) {
            if (!this.props.paused) {
              this.props.pause();
              clearInterval(dropIntervalId);
            } else {
              this.props.unpause();
              clearInterval(dropIntervalId);
              setDropInterval(this.props.dropTimer);
            }
          }
          break;
        default:
          return null;
      }
    });

    let dropIntervalId;

    const setDropInterval = (dropRate) => {
      dropIntervalId = setInterval(() => {
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
          clearInterval(dropIntervalId);
          setDropInterval(this.props.dropTimer);
          if (this.props.indexOfNextBlock > 6)
            this.props.getNewSequenceOfBlocks();
          this.props.setActiveBlock(
            this.props.currentSequenceOfBlocks[this.props.indexOfNextBlock]
          );
        }
        if (this.hitDetected()) {
          this.props.setGameOverTo(true);
          clearInterval(dropIntervalId);
        }
      }, dropRate);
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

  renderField() {
    if (!this.props.paused) {
      return (
        <RenderMatrix
          field={this.props.field}
          block={this.props.activeBlock}
          x={this.props.xValue}
          y={this.props.yValue}
        />
      );
    }
    return <PauseScreen />;
  }

  renderGameOver() {
    return <GameOver />;
  }

  render() {
    return (
      <div className="playfield">
        {this.renderField()}
        {this.props.gameOver && this.renderGameOver()}
        <SidePanel />
      </div>
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
    // dropIntervalId: state.dropIntervalId,
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
  // setDropIntervalId: actions.setDropIntervalId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Playfield);
