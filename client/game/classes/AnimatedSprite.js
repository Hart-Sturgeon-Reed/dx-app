AnimatedSprite = function(sprite,frames,fps){
    this.sprite = sprite;
    this.frames = frames;
    this.anims = [];
    this.defaultFrameRate = fps;
    this.frameRate = this.defaultFrameRate;
    this.frameDelay = 0;
    this.currentAnim = null;
}

AnimatedSprite.prototype = {
    add: function(name,frames,loops,fps,callback){
        this.anims[name] = new Animation(this,name,frames,loops,fps,callback);
    },
    play: function(name,fps){
        this.currentAnim = this.anims[name];
        this.frameRate = this.currentAnim.frameRate;
        this.currentAnim.play();
    },
    stop: function(frame,dur){
        this.sprite.texture = (this.frames[frame]);
        this.currentAnim = null;
    },
    animate: function(){
        if(this.currentAnim==null){return}
        if(this.frameDelay++ > this.currentAnim.frameRate){
            this.frameDelay = 0;
            if(this.currentAnim.hasFrame()){
                this.sprite.texture = (this.frames[this.currentAnim.nextFrame()]);
            }else{
                this.currentAnim.end();
            }
        }
    },
    current: function(){
        return this.currentAnim.name;
    }
};

Animation = function(parent,name,frames,loops,fps,callback){
    this.manager = parent;
    this.name = name;
    this.frames = frames;
    if(loops){this.loops=true;}else{this.loops=false;}
    this.callback = callback;
    if(fps!=null){this.frameRate = fps;}else{this.frameRate = this.manager.defaultFrameRate;}
    this.currentFrame = 0;
    
}

Animation.prototype = {
    hasFrame: function(){
        return this.currentFrame < this.frames.length
    },
    nextFrame: function(){
        var tex = this.frames[this.currentFrame]; 
        this.currentFrame++;
        return tex;
    },
    play: function(){
        //console.log("starting "+this.name);
        this.currentFrame = 0
    },
    end: function(){
        if (this.loops){
            this.play();
        }else{
            if(this.callback != null){
                this.callback();
            }
        }
    }
};