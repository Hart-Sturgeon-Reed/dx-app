//Constants
  GRV = {
      zero: 0,
      wisp: 0.00004,
      micro: 0.0001,
      low:0.0004,
      mobile: 0.00056,
      moon:0.0007,
      normal:0.0014,
      earth:0.0016,
      heavy:0.0018,
      lead:0.0024
  }
  colors = {
      white: '0xFFFFFF',
      gray: '0x727272',
      black: '0x000000',
      red: '0xFE2506',
      orange: '0xFE9208',
      ltOrange: '0xFED59B',
      yellow: '0xFFC102',
      green: '0x009E2E',
      teal: '0xC8FDFE',
      blue: '0x268ECB',
      deepBlue: '0x114FFF',
      dkBlue: '0x14546f',
      indigo: '0x2F2F66',
      purple: '0x6B54A2'
  };
paused = false;
gravityStrength = GRV.moon;

courseLength = 40;

numBushes = 16;
numAnimals = 4;

numSilver = 20;
numGold = 6;

scaleFactor = 0.3;
mobileMod = 0.5;

ballsScored = 0;

debug = false;

var currentScene, dev, timer, startTime;
