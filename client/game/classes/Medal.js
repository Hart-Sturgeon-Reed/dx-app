Medal = function(type,xpos,ypos){
  var self = this;
  scale = worldWidth/14;
  var sprite, value;
  if(type=='gold'){
    sprite = sprites.goldMedal;
    value = 100;
  }else{
    sprite = sprites.silverMedal;
    value = 15;
  }
  options = {
      mass: 1.1,
      type: 'rectangle',
      sprite: sprite,
      width: scale*0.6716,
      height: scale,
      hitBox: {x:0.7,y:0.8},
      angle: 0,
      friction: 0.3,
      restitution: 0.7,
      pos: {x:xpos,y:ypos},
      label: 'medal',
      treatment: 'dynamic'
  };
  Ent.call(this,options);
  
  this.value = value;
  this.body.self = self;
  this.body.follow = player;
  this.body.parallax = 1;
  
  world.add(this.body);
  stage.collectibles.addChild(this.sprite);
  medals.push(this.body);
}