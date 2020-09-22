import { combineReducers } from "redux";
import blocks from "../blocks";
import {
  mergeMatrices,
  rotateRight,
  rotateLeft,
} from "../functions/matrixFuncs";

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

const activeBlockReducer = (block = blocks.generateRandomBlock(), action) => {
  switch (action.type) {
    case "BLOCK_SPAWNED":
    case "BLOCK_PLACED":
    case "RESET":
      return blocks.generateRandomBlock();
    case "ROTATE_RIGHT":
      return rotateRight(block);
    case "ROTATE_LEFT":
      return rotateLeft(block);
    default:
      return block;
  }
};

const xValueReducer = (xValue = 3, action) => {
  switch (action.type) {
    case "BLOCK_SPAWNED":
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
    case "BLOCK_SPAWNED":
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

const dropTimerReducer = (dropTimer = 1000, action) => {
  switch (action.type) {
    case "DROP_TIMER_SET":
      return action.payload;
    default:
      return dropTimer;
  }
};

export default combineReducers({
  field: fieldReducer,
  activeBlock: activeBlockReducer,
  xValue: xValueReducer,
  yValue: yValueReducer,
  dropTimer: dropTimerReducer,
});
