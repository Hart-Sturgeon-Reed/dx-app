Animal = function(xpos,ypos){
  var self = this;
  scale = worldWidth/2;
  options = {
      mass: 1.1,
      type: 'rectangle',
      sprite: currentScene.animal,
      width: scale,
      height: scale*0.3622,
      hitBox: {x:0.5,y:0.5},
      angle: 0,
      friction: 0.3,
      restitution: 0.7,
      pos: {x:xpos,y:ypos},
      label: 'animal',
      treatment: 'static'
  };
  Ent.call(this,options);

  this.body.self = self;
  this.body.follow = player;
  this.body.parallax = 1;

  world.add(this.body);
  stage.obstacles.addChild(this.sprite);
  animals.push(this.body);
}