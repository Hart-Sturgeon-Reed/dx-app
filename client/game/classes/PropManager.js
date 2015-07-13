PropManager = function(){
    var self = this;
    var trees;
    
    this.init = function(){
      trees = new Prop(currentScene.tree,{min:worldHeight*0.55,max:worldHeight*0.7},null,'trees',0.9,8,100);
      cloud1 = new Prop(sprites.cloud1,{min:worldHeight*0.2,max:worldHeight*0.45},worldWidth*0.3,'clouds',0.99,1,100);
      cloud2 = new Prop(sprites.cloud2,{min:worldHeight*0.12,max:worldHeight*0.4},worldWidth*0.1,'clouds',0.97,4,100);
      mid1 = new Prop(currentScene.mid1,{min:worldHeight*0.5,max:worldHeight*0.5},worldWidth*0.6,'parallax',0.99,4,100,{width:worldWidth * 0.6,ratio:0.08926});
      mid2 = new Prop(currentScene.mid2,{min:worldHeight*0.51,max:worldHeight*0.51},worldWidth*0.6,'parallax',0.99,2,100,{width:worldWidth * 0.4,ratio:0.12464});
    }
    this.update = function(){
      trees.update();
      cloud1.update();
      cloud2.update();
      mid1.update();
      mid2.update();
    }
    this.init();
}

Prop = function(sprite,yPos,minOffset,layer,frequency,init,max,dim){
    var self = this;
    this.sprite = sprite;
    this.yPos = yPos;
    this.layer = layer;
    this.frequency = frequency;
    this.max = max;
    this.props = [];
    var nextOffset = (Math.random()*worldWidth);
    if(minOffset==null){minOffset = worldWidth/4}
    
    this.newProp = function(){
        var np = new PIXI.Sprite(self.sprite);
        np.anchor = {x:0.5,y:1};
        if(dim==null){
          np.width *= scaleFactor;
          np.height *= scaleFactor;
        }else{
          np.width = dim.width;
          np.height = dim.width*dim.ratio;
        }
        np.offscreen = false;
        np.position.x = nextOffset;
        np.position.y = range(self.yPos.min,self.yPos.max);
        nextOffset += minOffset + (Math.random()*worldWidth)
        self.props.push(np);
        stage[self.layer].addChild(np);
        return np;
    }
    
    this.update = function(){
        if(
          nextOffset<worldWidth*(courseLength-2) && 
          Math.random()>self.frequency && 
          nextOffset-player.body.state.pos.x<worldWidth)
        {
            self.newProp();
        }
    }
    
    for (var i=0;i<init;i++){
        self.newProp();
    }
}