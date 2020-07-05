"use strict";

class Player {
  static initialize() {
    this.keyStatus = {
      right: false,
      left: false,
      up: false,
      down: false,
    };

    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 37:
          this.keyStatus.left = true;
          e.preventDefault();
          return false;
        case 38:
          this.keyStatus.up = true;
          e.preventDefault();
          return false;
        case 39:
          this.keyStatus.right = true;
          e.preventDefault();
          return false;
        case 40:
          this.keyStatus.down = true;
          e.preventDefault();
          return false;
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.keyCode) {
        case 37:
          this.keyStatus.left = false;
          e.preventDefault();
          return false;
        case 38:
          this.keyStatus.up = false;
          e.preventDefault();
          return false;
        case 39:
          this.keyStatus.right = false;
          e.preventDefault();
          return false;
        case 40:
          this.keyStatus.down = false;
          e.preventDefault();
          return false;
      }
    });

    this.touchPoint = {
      xs: 0,
      ys: 0,
      xe: 0,
      ye: 0,
    };

    document.addEventListener("touchstart", (e) => {
      this.touchPoint.xs = e.touches[0].clientX;
      this.touchPoint.ys = e.touches[0].clientY;
    });
    document.addEventListener("touchmove", (e) => {
      if (
        Math.abs(e.touches[0].clientX - this.touchPoint.xs) < 20 &&
        Math.abs(e.touches[0].clientY - this.touchPoint.ys) < 20
      ) {
        return;
      }

      this.touchPoint.xe = e.touches[0].clientX;
      this.touchPoint.ye = e.touches[0].clientY;
      const { xs, ys, xe, ye } = this.touchPoint;
      gesture(xs, ys, xe, ye);

      this.touchPoint.xs = this.touchPoint.xe;
      this.touchPoint.ys = this.touchPoint.ye;
    });
    document.addEventListener("touchend", (e) => {
      this.keyStatus.up = false;
      this.keyStatus.down = false;
      this.keyStatus.right = false;
      this.keyStatus.left = false;
    });

    const gesture = (xs, ys, xe, ye) => {
      const horizonDirection = xe - xs;
      const verticalDirection = ye - ys;

      if (Math.abs(horizonDirection) < Math.abs(verticalDirection)) {
        if (verticalDirection < 0) {
          this.keyStatus.up = true;
          this.keyStatus.down = false;
          this.keyStatus.left = false;
          this.keyStatus.right = false;
        } else if (0 <= verticalDirection) {
          this.keyStatus.up = false;
          this.keyStatus.down = true;
          this.keyStatus.left = false;
          this.keyStatus.right = false;
        }
      } else {
        if (horizonDirection < 0) {
          this.keyStatus.up = false;
          this.keyStatus.down = false;
          this.keyStatus.left = true;
          this.keyStatus.right = false;
        } else if (0 <= horizonDirection) {
          this.keyStatus.up = false;
          this.keyStatus.down = false;
          this.keyStatus.left = false;
          this.keyStatus.right = true;
        }
      }
    };
  }

  static createNewPuyo() {
    if (Stage.board[0][2]) {
      return false;
    }
    const puyoColors = Math.max(1, Math.min(5, Config.puyoColors));
    this.centerPuyo = Math.floor(Math.random() * puyoColors) + 1;
    this.movablePuyo = Math.floor(Math.random() * puyoColors) + 1;

    this.centerPuyoElement = PuyoImage.getPuyo(this.centerPuyo);
    this.movablePuyoElement = PuyoImage.getPuyo(this.movablePuyo);
    Stage.stageElement.appendChild(this.centerPuyoElement);
    Stage.stageElement.appendChild(this.movablePuyoElement);

    this.puyoStatus = {
      x: 2,
      y: 1,
      left: 2 * Config.puyoImgWidth,
      top: -1 * Config.puyoImgHeight,
      dx: 0,
      dy: -1,
      rotation: 90,
    };

    this.groundFrame = 0;
    this.setPuyoPosition();
    return true;
  }

  static setPuyoPosition() {
    this.centerPuyo.style.left = this.puyoStatus.left + "px";
    this.centerPuyo.style.top = this.puyoStatus.top + "px";
    const x =
      this.puyoStatus.left +
      Math.cos((this.puyoStatus.rotation * Math.PI) / 100) *
        Config.puyoImgWidth;
    const y =
      this.puyoStatus.top +
      Math.sin((this.puyoStatus.rotation * Math.PI) / 100) *
        Config.puyoImgHeight;
    this.movablePuyoElement.style.left = x + "px";
    this.movablePuyoElement.style.top = y + "px";
  }

  static falling(isDownPressed) {
    let isBlocked = false;
    let x = this.puyoStatus.x;
    let y = this.puyoStatus.y;
    let dx = this.puyoStatus.dx;
    let dy = this.puyoStatus.dy;
    if (
      y + 1 >= Config.stageRows ||
      stage.board[y + 1][x] ||
      (y + dy + 1 >= 0 && (Config.stageRows || Stage.board[y + dy + 1][x + dx]))
    ) {
      isBlocked = true;
    }
    if (!isBlocked) {
      this.puyoStatus.top += Config.playerFallingSpeed;
      if (isDownPressed) {
        this.puyoStatus.top += Config.playerDownSpeed;
      }
      if (Math.floor(this.puyoStatus.top / Congfig.puyoImgHeight) != y) {
        if (isDownPressed) Score.addScore(1);
        y += 1;
        this.puyoStatus.y = y;
        if (
          y + 1 >= Config.stageRows ||
          Stage.board[y + 1][x] ||
          (y + dy + 1 >= 0 &&
            (y + dy + 1 >= Config.stageRows || Stage.board[y + dy + 1][x + dx]))
        ) {
          isBlocked = true;
        }
        if (!isBlocked) {
          this.groundFrame = 0;
          return;
        } else {
          this.puyoStatus.top = y * Config.puyoImgHeight;
          this.groundFrame = 1;
          return;
        }
      } else {
        this.groundFrame = 0;
        return;
      }
    }
    if (this.groundFrame == 0) {
      this.groundFrame = 1;
      return;
    } else {
      this.groundFrame++;
      if (this.groundFrame > Config.playerGroudFrame) {
        return true;
      }
    }
  }

  static playing(frame) {}

  static moving(frame) {}

  static rotating() {}

  static fix() {}

  static batankyu() {
    if (this.keyStatus.up) {
      location.reload();
    }
  }
}
