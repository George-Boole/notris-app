import { combineReducers } from "redux";
import blocks from "../resources/blocks";
import { rotateRight, rotateLeft } from "../functions/matrixFuncs";
import {
  RESET,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_DOWN,
  MOVE_UP,
  ROTATE_RIGHT,
  ROTATE_LEFT,
  BLOCK_PLACED,
  DROP_TIMER_SET,
  ROWS_CLEARED,
  SET_ACTIVE_BLOCK,
  NEW_SEQUENCE,
  PAUSE,
  UNPAUSE,
  SET_SOFT_DROP,
  SET_GAME_OVER,
  ADD_TO_LINES,
  SET_LEVEL,
} from "../constants/constants";

const blankRow = [...new Array(10)].map((tile) => (tile = 0));
const emptyField = [...new Array(18)].map((row) => (row = blankRow));

// const emptyField = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// ];

const fieldReducer = (field = emptyField, action) => {
  switch (action.type) {
    case RESET:
      return emptyField;
    case ROWS_CLEARED:
    case BLOCK_PLACED:
      return action.payload;
    default:
      return field;
  }
};

const activeBlockReducer = (block = blocks.iBlock, action) => {
  switch (action.type) {
    case ROTATE_RIGHT:
      return rotateRight(block);
    case ROTATE_LEFT:
      return rotateLeft(block);
    case SET_ACTIVE_BLOCK:
      return action.payload;
    default:
      return block;
  }
};

const xValueReducer = (xValue = 3, action) => {
  switch (action.type) {
    case BLOCK_PLACED:
    case RESET:
      return 3;
    case MOVE_LEFT:
      return xValue - 1;
    case MOVE_RIGHT:
      return xValue + 1;
    default:
      return xValue;
  }
};

const yValueReducer = (yValue = 0, action) => {
  switch (action.type) {
    case BLOCK_PLACED:
    case RESET:
      return 0;
    case MOVE_DOWN:
      return yValue + 1;
    case MOVE_UP:
      return yValue - 1;
    default:
      return yValue;
  }
};

const dropTimerReducer = (dropTimer = 887, action) => {
  switch (action.type) {
    case DROP_TIMER_SET:
      return action.payload;
    case RESET:
      return 887;
    default:
      return dropTimer;
  }
};

const currentSequenceOfBlocksReducer = (
  currentSequenceOfBlocks = blocks.generateRandomSequenceOfBlocks(),
  action
) => {
  switch (action.type) {
    case NEW_SEQUENCE:
    case RESET:
      return blocks.generateRandomSequenceOfBlocks();
    default:
      return currentSequenceOfBlocks;
  }
};

const indexOfNextBlockReducer = (indexOfNextBlock = 0, action) => {
  switch (action.type) {
    case NEW_SEQUENCE:
    case RESET:
      return 0;
    case BLOCK_PLACED:
      return indexOfNextBlock + 1;
    default:
      return indexOfNextBlock;
  }
};

const pausedReducer = (paused = false, action) => {
  switch (action.type) {
    case PAUSE:
      return true;
    case UNPAUSE:
    case RESET:
      return false;
    default:
      return paused;
  }
};

const softDroppingReducer = (softDropping = false, action) => {
  switch (action.type) {
    case SET_SOFT_DROP:
      return action.payload;
    case RESET:
      return false;
    default:
      return softDropping;
  }
};

const gameOverReducer = (gameOver = false, action) => {
  switch (action.type) {
    case SET_GAME_OVER:
      return action.payload;
    case RESET:
      return false;
    default:
      return gameOver;
  }
};

const linesReducer = (lines = 0, action) => {
  switch (action.type) {
    case ADD_TO_LINES:
      return lines + action.payload;
    case RESET:
      return 0;
    default:
      return lines;
  }
};

const levelReducer = (level = 0, action) => {
  switch (action.type) {
    case SET_LEVEL:
      return action.payload;
    case RESET:
      return 0;
    default:
      return level;
  }
};

export default combineReducers({
  field: fieldReducer,
  activeBlock: activeBlockReducer,
  xValue: xValueReducer,
  yValue: yValueReducer,
  dropTimer: dropTimerReducer,
  currentSequenceOfBlocks: currentSequenceOfBlocksReducer,
  indexOfNextBlock: indexOfNextBlockReducer,
  paused: pausedReducer,
  softDropping: softDroppingReducer,
  gameOver: gameOverReducer,
  lines: linesReducer,
  level: levelReducer,
});
