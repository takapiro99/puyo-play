class Config {}

Config.puyoImgWidth = 40;
Config.puyoImgHeight = 40;

Config.fontHeight = 33;

Config.stageCols = 6;
Config.stageRows = 12;

Config.puyoImgHeight =
  (window.innerHeight - Config.fontHeight) / Config.stageRows;
Config.puyoImgWidth = Config.puyoImgHeight;

Config.stageBackgroundColor = "#EEEEEE";
// Config.scoreBackgroundColor = "#24C0BB";
Config.scoreBackgroundColor = "#AAA";

Config.freeFallingSpeed = 16;
Config.erasePuyoCount = 4;
Config.eraseAnimationDuration = 30;

Config.puyoColors = 4;
Config.playerFallingSpeed = 0.9;
Config.playerDownSpeed = 10;
Config.playerGroundFrame = 20;
Config.playerMoveFrame = 10;
Config.playerRotateFrame = 10;

Config.zenkeshiDuration = 150;
Config.gameOverFrame = 3000;
