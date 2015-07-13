Bush = function(xpos,ypos){
  var self = this;
  scale = worldWidth/5;
  options = {
      mass: 1.1,
      type: 'rectangle',
      sprite: currentScene.barrier,
      width: scale,
      height: scale*0.42,
      hitBox: {x:0.5,y:0.5},
      angle: 0,
      friction: 0.3,
      restitution: 0.7,
      pos: {x:xpos,y:ypos},
      label: 'bush',
      treatment: 'static'
  };
  Ent.call(this,options);

  this.body.self = self;
  this.body.follow = player;
  this.body.parallax = 1;

  world.add(this.body);
  stage.obstacles.addChild(this.sprite);
  bushes.push(this.body);
}