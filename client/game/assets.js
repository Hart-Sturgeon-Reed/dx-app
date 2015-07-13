startLoading = function(){
PIXI.loader
  .add('tint','/assets/backgrounds/tintSquare.png')
  .add('ball','/assets/sprites/tools/soccerBlack.png')
  .add('ballRed','/assets/sprites/tools/soccerRed.png')
  .add('ballBlue','/assets/sprites/tools/soccerBlue.png')
  .add('ground1','/assets/backgrounds/ground/scene1.jpg')
  .add('ground2','/assets/backgrounds/ground/scene2.jpg')
  .add('ground3','/assets/backgrounds/ground/scene3.jpg')
  .add('ground4','/assets/backgrounds/ground/scene4.jpg')
  .add('cloud1','/assets/backgrounds/clouds/cloud-1.png')
  .add('cloud2','/assets/backgrounds/clouds/cloud-2.png')
  .add('silverMedal','/assets/sprites/collectibles/medal2WithoutShadow.png')
  .add('goldMedal','/assets/sprites/collectibles/medal1WithoutShadow.png')
  .add('finish','/assets/backgrounds/finish.png')
  
  .add('s1landmark','/assets/backgrounds/landmarks/scene1_banffMountain.png')
  .add('s1mid1','/assets/backgrounds/midlayer/scene1_mountain-1.png')
  .add('s1mid2','/assets/backgrounds/midlayer/scene1_mountain-2.png')
  .add('s1tree','/assets/backgrounds/trees/scene1_pine.png')
  .add('s1barrier','/assets/sprites/barriers/scene1_bush.png')
  .add('s1animal','/assets/sprites/barriers/scene1_polarBear.png')
  
  .add('s2landmark','/assets/backgrounds/landmarks/scene2_quebecCastle.png')
  .add('s2mid1','/assets/backgrounds/midlayer/scene2_mountain-1.png')
  .add('s2mid2','/assets/backgrounds/midlayer/scene2_mountain-2.png')
  .add('s2tree','/assets/backgrounds/trees/scene2_pine.png')
  .add('s2barrier','/assets/sprites/barriers/scene2_bush.png')
  .add('s2animal','/assets/sprites/barriers/scene2_moose.png')
  
  .add('s3landmark','/assets/backgrounds/landmarks/scene3_OCAD.png')
  .add('s3mid1','/assets/backgrounds/midlayer/scene3_house-1.png')
  .add('s3mid2','/assets/backgrounds/midlayer/scene3_house-2.png')
  .add('s3tree','/assets/backgrounds/trees/scene3_maple.png')
  .add('s3barrier','/assets/sprites/barriers/scene3_bush.png')
  .add('s3animal','/assets/sprites/barriers/scene3_goose.png')

  .add('s4landmark','/assets/backgrounds/landmarks/scene4_CNTower.png')
  .add('s4mid1','/assets/backgrounds/midlayer/scene4_building-1.png')
  .add('s4mid2','/assets/backgrounds/midlayer/scene4_building-2.png')
  .add('s4tree','/assets/backgrounds/trees/scene4_tree.png')
  .add('s4barrier','/assets/sprites/barriers/scene4_bush.png')
  .add('s4animal','/assets/sprites/barriers/scene4_squirrel.png')

//  .add('stand1','/assets/sprites/player/stand1.png')
//  .add('stand2','/assets/sprites/player/stand2.png')
//  .add('run1','/assets/sprites/player/run1.png')
//  .add('run2','/assets/sprites/player/run2.png')
//  .add('run3','/assets/sprites/player/run3.png')
//  .add('run4','/assets/sprites/player/run4.png')
//  .add('jump1','/assets/sprites/player/jump1.png')
//  .add('jump2','/assets/sprites/player/jump2.png')

  .add('idle1','/assets/sprites/player/new/idle1.png')
  .add('idle2','/assets/sprites/player/new/idle2.png')
  .add('idle3','/assets/sprites/player/new/idle3.png')
  .add('idle4','/assets/sprites/player/new/idle4.png')
  .add('idle5','/assets/sprites/player/new/idle5.png')
  .add('idle6','/assets/sprites/player/new/idle6.png')
  .add('idle7','/assets/sprites/player/new/idle7.png')
  .add('idle8','/assets/sprites/player/new/idle8.png')

  .add('run1','/assets/sprites/player/new/run1.png')
  .add('run2','/assets/sprites/player/new/run2.png')
  .add('run3','/assets/sprites/player/new/run3.png')
  .add('run4','/assets/sprites/player/new/run4.png')
  .add('run5','/assets/sprites/player/new/run5.png')
  .add('run6','/assets/sprites/player/new/run6.png')
  .add('run7','/assets/sprites/player/new/run7.png')
  .add('run8','/assets/sprites/player/new/run8.png')

  .load(assetsLoaded);
}


assetsLoaded = function(loader,resources){

  console.log('assets loaded');
  
sprites = {
  tint: resources.tint.texture,
  soccer: PIXI.Texture.fromImage('/assets/sprites/tools/soccerBlack.png'),
  soccerRed: PIXI.Texture.fromImage('/assets/sprites/tools/soccerRed.png'),
  soccerBlue: PIXI.Texture.fromImage('/assets/sprites/tools/soccerBlue.png'),
  ground1: PIXI.Texture.fromImage('/assets/backgrounds/ground/scene1.jpg'),
  ground2: PIXI.Texture.fromImage('/assets/backgrounds/ground/scene2.jpg'),
  ground3: PIXI.Texture.fromImage('/assets/backgrounds/ground/scene3.jpg'),
  ground4: PIXI.Texture.fromImage('/assets/backgrounds/ground/scene4.jpg'),
  cloud1: PIXI.Texture.fromImage('/assets/backgrounds/clouds/cloud-1.png'),
  cloud2: PIXI.Texture.fromImage('/assets/backgrounds/clouds/cloud-2.png'),
  silverMedal: PIXI.Texture.fromImage('/assets/sprites/collectibles/medal2WithoutShadow.png'),
  goldMedal: PIXI.Texture.fromImage('/assets/sprites/collectibles/medal1WithoutShadow.png'),
  finish: PIXI.Texture.fromImage('/assets/backgrounds/finish.png')
};

scene1 = {
  landmark: PIXI.Texture.fromImage('/assets/backgrounds/landmarks/scene1_banffMountain.png'),
  mid1: PIXI.Texture.fromImage('/assets/backgrounds/midlayer/scene1_mountain-1.png'),
  mid2: PIXI.Texture.fromImage('/assets/backgrounds/midlayer/scene1_mountain-2.png'),
  tree: PIXI.Texture.fromImage('/assets/backgrounds/trees/tree1WithoutShadow.png'),
  barrier: PIXI.Texture.fromImage('/assets/sprites/barriers/scene1_bush.png'),
  animal: PIXI.Texture.fromImage('/assets/sprites/barriers/scene1_polarBear.png')
};

scene2 = {
  landmark: PIXI.Texture.fromImage('/assets/backgrounds/landmarks/scene2_quebecCastle.png'),
  mid1: PIXI.Texture.fromImage('/assets/backgrounds/midlayer/scene2_mountain-1.png'),
  mid2: PIXI.Texture.fromImage('/assets/backgrounds/midlayer/scene2_mountain-2.png'),
  tree: PIXI.Texture.fromImage('/assets/backgrounds/trees/tree2WithoutShadow.png'),
  barrier: PIXI.Texture.fromImage('/assets/sprites/barriers/scene2_bush.png'),
  animal: PIXI.Texture.fromImage('/assets/sprites/barriers/scene2_moose.png')
};

scene3 = {
  landmark: PIXI.Texture.fromImage('/assets/backgrounds/landmarks/scene3_OCAD.png'),
  mid1: PIXI.Texture.fromImage('/assets/backgrounds/midlayer/scene3_house-1.png'),
  mid2: PIXI.Texture.fromImage('/assets/backgrounds/midlayer/scene3_house-2.png'),
  tree: PIXI.Texture.fromImage('/assets/backgrounds/trees/tree3WithoutShadow.png'),
  barrier: PIXI.Texture.fromImage('/assets/sprites/barriers/scene3_bush.png'),
  animal: PIXI.Texture.fromImage('/assets/sprites/barriers/scene3_goose.png')
};

scene4 = {
  landmark: PIXI.Texture.fromImage('/assets/backgrounds/landmarks/scene4_CNTower.png'),
  mid1: PIXI.Texture.fromImage('/assets/backgrounds/midlayer/scene4_building-1.png'),
  mid2: PIXI.Texture.fromImage('/assets/backgrounds/midlayer/scene4_building-2.png'),
  tree: PIXI.Texture.fromImage('/assets/backgrounds/trees/tree4WithoutShadow.png'),
  barrier: PIXI.Texture.fromImage('/assets/sprites/barriers/scene4_bush.png'),
  animal: PIXI.Texture.fromImage('/assets/sprites/barriers/scene4_squirrel.png')
};
  
playerTex = {
  idle1: PIXI.Texture.fromImage('/assets/sprites/player/new/idle1.png'),
  idle2: PIXI.Texture.fromImage('/assets/sprites/player/new/idle2.png'),
  idle3: PIXI.Texture.fromImage('/assets/sprites/player/new/idle3.png'),
  idle4: PIXI.Texture.fromImage('/assets/sprites/player/new/idle4.png'),
  idle5: PIXI.Texture.fromImage('/assets/sprites/player/new/idle5.png'),
  idle6: PIXI.Texture.fromImage('/assets/sprites/player/new/idle6.png'),
  idle7: PIXI.Texture.fromImage('/assets/sprites/player/new/idle7.png'),
  idle8: PIXI.Texture.fromImage('/assets/sprites/player/new/idle8.png'),
  
  run1: PIXI.Texture.fromImage('/assets/sprites/player/new/run1.png'),
  run2: PIXI.Texture.fromImage('/assets/sprites/player/new/run2.png'),
  run3: PIXI.Texture.fromImage('/assets/sprites/player/new/run3.png'),
  run4: PIXI.Texture.fromImage('/assets/sprites/player/new/run4.png'),
  run5: PIXI.Texture.fromImage('/assets/sprites/player/new/run5.png'),
  run6: PIXI.Texture.fromImage('/assets/sprites/player/new/run6.png'),
  run7: PIXI.Texture.fromImage('/assets/sprites/player/new/run7.png'),
  run8: PIXI.Texture.fromImage('/assets/sprites/player/new/run8.png')
}
  
  window.assets = {
    'sprites': sprites,
    'scene1': scene1,
    'scene2': scene2,
    'scene3': scene3,
    'scene4': scene4
  }
  
  console.log('all assets processed');
  startBuilding();
  
}