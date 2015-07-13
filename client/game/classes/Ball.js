Ball = function(xpos,ypos,sprite){
  var self = this;
  if(sprite==null){sprite = sprites.soccer;}
  scale = worldHeight/10;
  options = {
      mass: 0.1,
      type: 'circle',
      sprite: sprite,
      radius: scale,
      hitBox: {radius:0.6},
      angle: 0,
      friction: 0.1,
      restitution: 0.5,
      pos: {x:xpos,y:ypos},
      label: 'ball'
  };
  Ent.call(this,options);

  this.body.self = self;
  this.body.follow = player;
  this.body.parallax = 1;

  world.add(this.body);
  stage.ents.addChild(this.sprite);
  balls.push(this.body);
}