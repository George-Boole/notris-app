export const mergeMatrices = (field, block, x, y) => {
  const newMatrix = field.map((row, yIndex) => {
    return row.map((tile, xIndex) => {
      if (
        xIndex >= x &&
        xIndex < x + block[0].length &&
        yIndex >= y &&
        yIndex < y + block.length &&
        tile === 0
      ) {
        return block[yIndex - y][xIndex - x];
      }

      return tile;
    });
  });

  return newMatrix;
};

export const detectHit = (field, block, x, y) => {
  for (let yIndex = 0; yIndex < block.length; yIndex++) {
    for (let xIndex = 0; xIndex < block[0].length; xIndex++) {
      if (block[yIndex][xIndex] !== 0) {
        if (
          field[y + yIndex] === undefined ||
          field[y + yIndex][x + xIndex] !== 0
        )
          return true;
      }
    }
  }

  return false;
};

export const rotateRight = (block) => {
  let blankRow = [...new Array(block.length)].map((tile) => (tile = 0));

  let blankBlock = [...new Array(block[0].length)].map(
    (row) => (row = blankRow)
  );

  let newBlock = blankBlock.map((row, xIndex) => {
    return row.map((tile, yIndex) => {
      return block[block.length - 1 - yIndex][xIndex];
    });
  });

  return newBlock;
};

export const rotateLeft = (block) => {
  let blankRow = [...new Array(block.length)].map((tile) => (tile = 0));

  let blankBlock = [...new Array(block[0].length)].map(
    (row) => (row = blankRow)
  );

  let newBlock = blankBlock.map((row, xIndex) => {
    return row.map((tile, yIndex) => {
      return block[yIndex][block[0].length - 1 - xIndex];
    });
  });

  return newBlock;
};

export const clearFilledRows = (field) => {
  const emptyRow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let numberOfFilledRows = 0;

  field.forEach((row) => {
    if (!row.includes(0)) {
      numberOfFilledRows++;
    }
  });

  if (numberOfFilledRows === 0) return field;

  let emptyRowsToAdd = new Array(numberOfFilledRows).fill(emptyRow);

  let fieldAfterFilledRowsRemoved = field.filter((row) => row.includes(0));

  let newField = emptyRowsToAdd.concat(fieldAfterFilledRowsRemoved);

  return newField;
};
