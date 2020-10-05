import { combineReducers } from "redux";
import blocks from "../blocks";
import { rotateRight, rotateLeft } from "../functions/matrixFuncs";

const emptyField = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const fieldReducer = (field = emptyField, action) => {
  switch (action.type) {
    case "RESET":
      return emptyField;
    case "ROWS-CLEARED":
    case "BLOCK_PLACED":
      return action.payload;
    default:
      return field;
  }
};

const activeBlockReducer = (block = blocks.iBlock, action) => {
  switch (action.type) {
    case "ROTATE_RIGHT":
      return rotateRight(block);
    case "ROTATE_LEFT":
      return rotateLeft(block);
    case "SET_ACTIVE_BLOCK":
      return action.payload;
    default:
      return block;
  }
};

const xValueReducer = (xValue = 3, action) => {
  switch (action.type) {
    case "BLOCK_PLACED":
    case "RESET":
      return 3;
    case "MOVE_LEFT":
      return xValue - 1;
    case "MOVE_RIGHT":
      return xValue + 1;
    default:
      return xValue;
  }
};

const yValueReducer = (yValue = 0, action) => {
  switch (action.type) {
    case "BLOCK_PLACED":
    case "RESET":
      return 0;
    case "MOVE_DOWN":
      return yValue + 1;
    case "MOVE_UP":
      return yValue - 1;
    default:
      return yValue;
  }
};

const dropTimerReducer = (dropTimer = 887, action) => {
  switch (action.type) {
    case "DROP_TIMER_SET":
      return action.payload;
    case "RESET":
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
    case "NEW_SEQUENCE":
    case "RESET":
      return blocks.generateRandomSequenceOfBlocks();
    default:
      return currentSequenceOfBlocks;
  }
};

const indexOfNextBlockReducer = (indexOfNextBlock = 0, action) => {
  switch (action.type) {
    case "NEW_SEQUENCE":
    case "RESET":
      return 0;
    case "BLOCK_PLACED":
      return indexOfNextBlock + 1;
    default:
      return indexOfNextBlock;
  }
};

const pausedReducer = (paused = false, action) => {
  switch (action.type) {
    case "PAUSE":
      return true;
    case "UNPAUSE":
    case "RESET":
      return false;
    default:
      return paused;
  }
};

const startLevel = 0;

const softDroppingReducer = (softDropping = false, action) => {
  switch (action.type) {
    case "SET_SOFT_DROP":
      return action.payload;
    case "RESET":
      return false;
    default:
      return softDropping;
  }
};

const gameOverReducer = (gameOver = false, action) => {
  switch (action.type) {
    case "SET_GAME_OVER":
      return action.payload;
    case "RESET":
      return false;
    default:
      return gameOver;
  }
};

const levelReducer = (level = startLevel, action) => {
  switch (action.type) {
    case "LEVEL_UP":
      return level < 20 ? level + action.payload : "FINAL";
    case "RESET":
      return startLevel;
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
  level: levelReducer,
});
