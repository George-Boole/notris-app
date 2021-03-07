const iBlock = [
  [0, 0, 0, 0],
  [1, 1, 1, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const jBlock = [
  [0, 0, 0],
  [2, 2, 2],
  [0, 0, 2],
];

const lBlock = [
  [0, 0, 0],
  [3, 3, 3],
  [3, 0, 0],
];

const oBlock = [
  [0, 0, 0, 0],
  [0, 4, 4, 0],
  [0, 4, 4, 0],
  [0, 0, 0, 0],
];

const sBlock = [
  [0, 0, 0],
  [0, 5, 5],
  [5, 5, 0],
];

const tBlock = [
  [0, 0, 0],
  [6, 6, 6],
  [0, 6, 0],
];

const zBlock = [
  [0, 0, 0],
  [7, 7, 0],
  [0, 7, 7],
];

const blocks = [iBlock, jBlock, lBlock, oBlock, sBlock, tBlock, zBlock];

// Returns the blocks array, shuffled.
const generateRandomSequenceOfBlocks = () => {
  for (let i = blocks.length - 1; i > 0; i--) {
    const index = Math.floor(Math.random() * i);
    const block = blocks[i];
    blocks[i] = blocks[index];
    blocks[index] = block;
  }
  return blocks;
};

export default {
  iBlock,
  jBlock,
  lBlock,
  oBlock,
  sBlock,
  tBlock,
  zBlock,
  // generateRandomBlock,
  generateRandomSequenceOfBlocks,
};
