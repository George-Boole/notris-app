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
            if (
              this.props.softDropping === false
              // &&
              // this.props.dropTimer !== 50
            ) {
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
                  //   setDropInterval(this.props.dropTimer);
                  //   console.log("keyup");
                  //   this.props.setSoftDroppingTo(false);
                  //   break;
                  // default:
                  // return null;

                  clearDropInterval();
                  setDropInterval(this.props.dropTimer);
                  // setDropInterval(50);
                  this.props.setSoftDroppingTo(false);
                  // }
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
          this.props.clearRows(clearFilledRows(this.props.field));
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
    return <div className="pause-screen">PAUSED</div>;
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
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
