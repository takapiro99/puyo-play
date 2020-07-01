class Stage {
  static initialize() {
    const stageElement = document.getElementById("stage");
    stageElement.style.width = Config.puyoImgWidth * Config.stageCols + "px";
    stageElement.style.height = Config.puyoImgHeight * Config.stageRows + "px";
    stageElement.style.backgroundColor = Config.stageBackgroudColor;
    this.stageElement = stageElement;

    const zenkeshiImage = document.getElementById("zenkeshi");
    zenkeshiImage.width = Config.puyoImgWidth * 6;
    zenkeshiImage.style.position = "absolute";
    zenkeshiImage.style.display = "none";
    this.zenkeshiImage = zenkeshiImage;
    stageElement.appendChild(zenkeshiImage);

    const scoreElement = document.getElementById("score");
    scoreElement.style.backgroundColor = Config.scoreBackGroundColor;
    scoreElement.style.top = Config.puyoImgHeight * Config.stageRows + "px";
    scoreElement.style.width = Config.puyoImgWidth * Config.stageCols + "px";
    scoreElement.style.height = Config.fontHeight + "px";

    this.board = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];
    let puyoCount = 0;
    for (let y = 0; y < Config.stageRows; y++) {
      const line = this.board[y] || (this.board[y] = []);
      for (let x = 0; x < Config.stageCols; x++) {
        const puyo = line[x];
        if (puyo >= 1 && puyo <= 5) {
          this.setPuyo(x, y, puyo);
          puyoCount++;
        } else {
          line[x] = null;
        }
      }
    }
    this.puyoCount = puyoCount;
  }

  static setPuyo() {}

  static checkFall() {}

  static fall() {}

  static checkErase() {}

  static erasing() {}

  static showZenkeshi() {}

  static hideZenkeshi() {}
}

Stage.fallingPuyoList = [];
Stage.erasingPuyoInfoList = [];
