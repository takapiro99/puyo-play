"use strict";

window.addEventListener("load", () => {
  initialize();
  loop();
});

let mode;
let frame;
let combinationCount;

const initialize = () => {
  PuyoImage.initialize();
  Stage.initialize();
  Player.initialize();
  Score.initialize();
  mode = "start";
  frame = 0;
  console.log("initialized!");
};

const loop = () => {
  console.log(mode);
  switch (mode) {
    case "start":
      mode = "checkfall";
      break;
    case "checkfall":
      if (Stage.checkFall()) mode = "fall";
      else mode = "checkErase";
      break;
    case "fall":
      if (!Stage.fall()) mode = "checkErase";
      break;
    case "checkErase":
      const eraseInfo = Stage.checkErase();
      if (eraseInfo) {
        mode = "erasing";
        combinationCount++;
        Score.calculateScore(
          combinationCount,
          eraseInfo.piece,
          eraseInfo.color
        );
        Stage.hideZenkeshi();
      } else {
        if (Stage.puyoCount === 0 && combinationCount > 0) Stage.showZenkeshi();
        combinationCount = 0;
        mode = "newPuyo";
      }
      break;
    case "erasing":
      if (!Stage.erasing(frame)) {
        mode = "checkFall";
      }
      break;
    case "newPuyo":
      if (!Player.createNewPuyo) mode = "gameOver";
      else mode = "Playing";
      break;
    case "playing":
      const action = Player.playing(frame);
      mode = "action"; // playing, moving, rotating, fixのどれか
      break;
    case "moving":
      if (!Player.moving(frame)) mode = "playing";
      break;
    case "rotating":
      if (!Player.rotating(frame)) mode = "player";
      break;
    case "fix":
      Player.fix();
      mode = "checkFall";
      break;
    case "gameOver":
      PuyoImage.prepareBatankyu(frame);
      mode = "batankyu";
    case "batankyu":
      PuyoImage.batankyu(frame);
      Player.batankyu();
      break;
  }
  frame++;
  requestAnimationFrame(loop);
};
