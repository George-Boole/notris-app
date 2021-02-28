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

const reset = () => {
  return {
    type: RESET,
  };
};

const moveLeft = () => {
  return {
    type: MOVE_LEFT,
  };
};

const moveRight = () => {
  return {
    type: MOVE_RIGHT,
  };
};

const moveDown = () => {
  return {
    type: MOVE_DOWN,
  };
};

const moveUp = () => {
  return {
    type: MOVE_UP,
  };
};

const rotateRight = () => {
  return {
    type: ROTATE_RIGHT,
  };
};

const rotateLeft = () => {
  return {
    type: ROTATE_LEFT,
  };
};

const placeBlock = (field) => {
  return {
    type: BLOCK_PLACED,
    payload: field,
  };
};

const setDropTimer = (dropTime) => {
  return {
    type: DROP_TIMER_SET,
    payload: dropTime,
  };
};

const clearRows = (field) => {
  return {
    type: ROWS_CLEARED,
    payload: field,
  };
};

const setActiveBlock = (block) => {
  return {
    type: SET_ACTIVE_BLOCK,
    payload: block,
  };
};

const getNewSequenceOfBlocks = () => {
  return {
    type: NEW_SEQUENCE,
  };
};

const pause = () => {
  return {
    type: PAUSE,
  };
};

const unpause = () => {
  return {
    type: UNPAUSE,
  };
};

const setSoftDroppingTo = (softDropping) => {
  return {
    type: SET_SOFT_DROP,
    payload: softDropping,
  };
};

const setGameOverTo = (gameOver) => {
  return {
    type: SET_GAME_OVER,
    payload: gameOver,
  };
};

const addToLines = (number) => {
  return {
    type: ADD_TO_LINES,
    payload: number,
  };
};

const setLevel = (level) => {
  return {
    type: SET_LEVEL,
    payload: level,
  };
};

export default {
  reset,
  moveLeft,
  moveRight,
  moveDown,
  moveUp,
  rotateRight,
  rotateLeft,
  placeBlock,
  setDropTimer,
  clearRows,
  setActiveBlock,
  getNewSequenceOfBlocks,
  pause,
  unpause,
  setSoftDroppingTo,
  setGameOverTo,
  addToLines,
  setLevel,
};
