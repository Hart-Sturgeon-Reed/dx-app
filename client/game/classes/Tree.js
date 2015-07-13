tree = function(xpos,ypos){
  var self = this;
    scale = rowHeight;
    options = {
        mass: 1,
        type: 'rectangle',
        sprite: sprites.tint,
        width: scale/2,
        height: scale,
        angle: 0,
        friction: 0.0,
        restitution: 0.7,
        pos: {x:xpos,y:ypos},
        label: 'player',
        tint: '456456'
    };
    Ent.call(this,options);
    
    this.body.self = self;
    this.body.follow = self;
    
    world.add(this.body);
    stage.ents.addChild(this.sprite);
  
}