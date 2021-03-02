import React from "react";

import { mergeMatrices } from "../functions/matrixFuncs";
import { colorBlock } from "../functions/colorBlock";

const RenderMatrix = ({ field, block, x, y }) => {
  return mergeMatrices(field, block, x, y).map((row, index) => {
    return (
      <div key={index}>
        {row.map((tile, index) => {
          if (tile === 0) {
            return <div className="empty-tile" key={index}></div>;
          } else {
            return (
              <div className="filled-tile" key={index}>
                <div className={colorBlock(tile) + " block"}></div>
              </div>
            );
          }
        })}
      </div>
    );
  });
};

export default RenderMatrix;
