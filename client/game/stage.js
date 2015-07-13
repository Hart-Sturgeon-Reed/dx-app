setupStage = function(renderer){
  stage = renderer.stage;
  
  rowHeight = worldHeight/10;
  
  var assets = window.assets;
  parallax = [];
  
  //Game layers
  addLayer('background');
  addParallaxLayer('landmarks', 0.017);
  addParallaxLayer('parallax', 0.12);
  addParallaxLayer('clouds', 0.16);
  addLayer('ground');
  addParallaxLayer('finish',1);
  addParallaxLayer('trees', 0.9);
  addLayer('collectibles');
  addLayer('ents');
  addLayer('obstacles');
  addLayer('foreground');
  addLayer('ui');
  
  scenes = {
    1:scene1,
    2:scene2,
    3:scene3,
    4:scene4
  };
  
  var sky = new Tint('cdeaff',worldWidth,worldHeight);
  stage.background.addChild(sky);
  
  stage.landmarks.offset.x = worldWidth*0.98;
  
  setStage(1);
}

function setStage(scene){
  currentScene = scenes[scene];
  createParallax();
  createGround(scene);
}

function addLayer(layerName){
  var newLayer = new PIXI. Container();
  stage[layerName] = newLayer;
  stage.addChild(newLayer);
}

function addParallaxLayer(layerName,parallaxRate){
  var newLayer = new PIXI.Container();
  
  newLayer.scroll = parallaxRate;
  newLayer.offset = {x:0};
  newLayer.update = function(){
    this.position.x = this.offset.x - (player.body.state.pos.x - (worldWidth/2)) * this.scroll;
  }
  
  stage[layerName] = newLayer;
  stage.addChild(newLayer);
  parallax.push(newLayer);
}

function createParallax() {
  var landmark = new PIXI.Sprite(currentScene.landmark);
  var scale = worldHeight*0.5;
  landmark.anchor = {x:0.5,y:1};
  landmark.width = scale*2.9056;
  landmark.height = scale;
  landmark.position.y = worldHeight/2;
  stage.landmarks.addChild(landmark);
}

function createGround(stageNum){
  var assets = window.assets;
  var groundTint,edgeTex;
  switch(stageNum){
    case 1:
      groundTint = 'f8f8f8';
      edgeTex = assets.sprites.ground1;
      break;
    case 2:
      groundTint = 'd8f5d5';
      edgeTex = assets.sprites.ground2;
      break;
    case 3:
      groundTint = 'f5f3b9';
      edgeTex = assets.sprites.ground3;
      break;
    case 4:
      groundTint = 'e2e2e2';
      edgeTex = assets.sprites.ground4;
      break;
    default:
      console.log('that is not a stage number');
  }
  
  var ground = new Tint(groundTint,worldWidth,worldHeight/2);
  ground.position.y = worldHeight/2;
  stage.ground.addChild(ground);
  
  var groundEdge = new PIXI.Sprite(edgeTex);
  groundEdge.width = worldWidth;
  groundEdge.height = worldHeight/10;
  groundEdge.position.y = worldHeight * 0.9;
  stage.ground.addChild(groundEdge);
  
  var finish = new PIXI.Sprite(sprites.finish);
  finish.height = worldHeight/2.5;
  finish.width = finish.height*0.409711;
  finish.position.y = worldHeight/2;
  finish.position.x = worldWidth*(courseLength-0.4);
  stage.finish.addChild(finish);
}

function Tint(hexColor, width, height){
  var square = new PIXI.Sprite(sprites.tint);
  square.tint = '0x'+hexColor;
  square.width = width;
  square.height = height;
  
  return square;
}