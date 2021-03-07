import { detectHit } from "./matrixFuncs";

export const rotateRightHandler = (props, e) => {
  let hitDetected = () => {
    return detectHit(
      props.field,
      props.activeBlock,
      props.xValue,
      props.yValue
    );
  };

  if (props.paused === false && props.gameOver === false) {
    e.preventDefault();
    props.rotateRight(props.activeBlock);
    if (hitDetected()) {
      console.log("hit once");
      props.moveRight(1);
    }
    if (hitDetected()) {
      console.log("hit twice");
      props.moveLeft(2);
    }
    if (hitDetected() && props.activeBlock.length === 4) {
      console.log("hit 3 times");
      props.moveRight(3);
      if (hitDetected()) {
        console.log("hit 4 times");
        props.moveLeft(4);
      }
      if (hitDetected()) {
        console.log("hit 5 times");
        props.moveRight(2);
        props.rotateLeft(props.activeBlock);
        console.log("reset");
      }
    } else if (hitDetected()) {
      console.log("hit 3 times");
      props.moveRight(1);
      props.rotateLeft(props.activeBlock);
      console.log("reset");
    }
  }
};
