import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../actions";
import {
  mergeMatrices,
  detectHit,
  rotateRight,
  rotateLeft,
  clearFilledRows,
} from "../functions/matrixFuncs";

import blocks from "../blocks";

class App extends Component {
  componentDidMount() {
    window.addEventListener("keydown", (e) => {
      // if (e.defaultPrevented) {
      //   return;
      // }

      switch (e.code) {
        case "KeyA":
        case "ArrowLeft":
          this.props.moveLeft();
          if (this.hitDetected()) this.props.moveRight();
          break;
        case "KeyD":
        case "ArrowRight":
          this.props.moveRight();
          if (this.hitDetected()) this.props.moveLeft();
          break;
        case "KeyS":
        case "ArrowDown":
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
          }
          if (this.hitDetected()) {
            setTimeout(alert("GAME OVER"), this.props.dropTimer);
            this.props.reset();
          }
          break;
        case "ArrowUp":
        case "KeyE":
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
        // case "KeyW":
        //   this.props.moveUp();
        //   if (this.hitDetected()) this.props.moveDown();
        //   break;
        case "KeyR":
          this.props.reset();
          // if (this.props.activeBlock.length === 2) {
          //   this.props.moveRight();
          //   this.props.moveDown();
          // }
          break;
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
      }
      if (this.hitDetected()) {
        setTimeout(alert("GAME OVER"), this.props.dropTimer);
        this.props.reset();
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
    // setTimeout(() => {
    //   this.props.moveDown();
    //   if (this.hitDetected()) {
    //     this.props.moveUp();
    //     this.props.placeBlock(
    //       mergeMatrices(
    //         this.props.field,
    //         this.props.activeBlock,
    //         this.props.xValue,
    //         this.props.yValue
    //       )
    //     );
    //   }

    //   // this.props.setDropTimer(this.props.dropTimer);
    // }, this.props.dropTimer);

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
              return <div className="filled-tile i-block" key={index}></div>;
            }
            if (tile === 2) {
              return <div className="filled-tile j-block" key={index}></div>;
            }
            if (tile === 3) {
              return <div className="filled-tile l-block" key={index}></div>;
            }
            if (tile === 4) {
              return <div className="filled-tile o-block" key={index}></div>;
            }
            if (tile === 5) {
              return <div className="filled-tile s-block" key={index}></div>;
            }
            if (tile === 6) {
              return <div className="filled-tile t-block" key={index}></div>;
            }
            if (tile === 7) {
              return <div className="filled-tile z-block" key={index}></div>;
            }
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
        <div onClick={() => this.props.spawnBlock()}>SpawnBlock </div>
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
  };
};

const mapDispatchToProps = {
  spawnBlock: actions.spawnBlock,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
