function Particle(system,pool){
    var self = this;
    this.pool = pool;
    this.sprite = new PIXI.Sprite(system.particleSprite);
    this.sprite.anchor = {
        x: 0.5,
        y: 0.5
    };
    this.new = true;
    this.sprite.blendMode = PIXI.blendModes.SCREEN;
    this.sprite.tint = system.particleTint;
    var scale = range(system.particleSize.min,system.particleSize.max);
    this.sprite.width = scale;
    this.sprite.height = scale;
    this.opacity = system.particleOpacity;
    this.sprite.alpha = this.opacity;
    
    this.currentSprite = system.particleSprite;
    
    this.lifespan = system.particleLifespan;
    this.gravity = system.gravity;
    this.age = 0;
    
    this.vx = equalDist(system.particleSpeed);
    this.vy = equalDist(system.particleSpeed);
    
    this.generateSprite = function(){
        this.sprite.setTexture(system.particleSprite);
        this.sprite.tint = system.particleTint;
        this.currentSprite = system.particleSprite;
    };
    this.update = function(){
        if(this.age>this.lifespan){
            this.dead = true;
        }else if(this.sprite.visible){
            //console.log(this.vy);
            this.age++;
            this.sprite.alpha = (1 - this.age/this.lifespan)*self.opacity;
            this.sprite.position.x += this.vx;
            this.sprite.position.y += this.vy;
            this.sprite.position.y += this.gravity;
        }
    };
    this.reset = function(){
        this.new = false;
        this.sprite.visible = false;
        this.age = 0;
        this.sprite.alpha = self.opacity;
        this.dead = false;
    };
    this.init = function(){
        if(this.currentSprite != system.particleSprite || this.sprite.tint != system.particleTint){
            this.generateSprite();
        }
        this.sprite.visible = true;
        this.lifespan = system.particleLifespan;
        this.gravity = system.gravity;
        this.vx = equalDist(system.particleSpeed);
        this.vy = equalDist(system.particleSpeed);
        
    };
    this.setPosition = function(xPos,yPos){
        this.sprite.position = {x:xPos + equalDist(system.particleSpread),y:yPos + equalDist(system.particleSpread)};
    }
}