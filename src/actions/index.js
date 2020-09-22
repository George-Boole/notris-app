const reset = () => {
  return {
    type: "RESET",
  };
};

const moveLeft = () => {
  return {
    type: "MOVE_LEFT",
  };
};

const moveRight = () => {
  return {
    type: "MOVE_RIGHT",
  };
};

const moveDown = () => {
  return {
    type: "MOVE_DOWN",
  };
};

const moveUp = () => {
  return {
    type: "MOVE_UP",
  };
};

const rotateRight = () => {
  return {
    type: "ROTATE_RIGHT",
  };
};

const rotateLeft = () => {
  return {
    type: "ROTATE_LEFT",
  };
};

const placeBlock = (field) => {
  return {
    type: "BLOCK_PLACED",
    payload: field,
  };
};

const setDropTimer = (dropTime) => {
  return {
    type: "DROP_TIMER_SET",
    payload: dropTime,
  };
};

const clearRows = (field) => {
  return {
    type: "ROWS-CLEARED",
    payload: field,
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
};
