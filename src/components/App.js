import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../actions";
import {
  mergeMatrices,
  detectHit,
  countFilledRows,
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
              setDropInterval(
                // this.props.dropTimer > 50 ?
                50
                // : this.props.dropTimer
              );
              this.props.setSoftDroppingTo(true);
            }
          }
          break;
        case "ArrowUp":
        case "KeyE":
        case "Numpad8":
          if (this.props.paused === false && this.props.gameOver === false) {
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
          this.props.setActiveBlock(this.props.currentSequenceOfBlocks[0]);
          setDropInterval(this.props.dropTimer);
          break;
        case "Enter":
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

  renderGameOver() {
    return (
      <div className="game-over">
        <h3>GAME OVER</h3>
        <span>Press R or Enter to Play Again</span>
      </div>
    );
  }

  renderField() {
    if (!this.props.paused) {
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
    return (
      <div className="pause-screen">
        <h3>PAUSED</h3>
        <span>Press P or Enter to Resume</span>
      </div>
    );
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

        <div className="playfield">
          <div className="side-panel">
            <h2 className="lvl">
              LEVEL:
              <h2 className="lvl num">
                {this.props.level + 1 < 21 ? this.props.level + 1 : "MAX"}
              </h2>
            </h2>
            <h2 className="lines">
              LINES:
              <h2 className="lines num">{this.props.lines}</h2>
            </h2>
          </div>
          {this.props.gameOver && this.renderGameOver()}
          {this.renderField()}
        </div>
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
