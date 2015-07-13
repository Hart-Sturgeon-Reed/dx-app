Player = function(xpos,ypos){
  var self = this;
  
  var logging = false; //Enable or disable information about player state
  
  scale = worldHeight/4;
  options = {
      mass: 1,
      type: 'rectangle',
      sprite: playerTex.stand1,
      width: scale*0.7692,
      height: scale,
      hitBox: {x:0.5,y:0.8},
      angle: 0,
      friction: 0.0,
      restitution: 0.7,
      pos: {x:xpos,y:ypos},
      label: 'player'
  };
  Ent.call(this,options);

  this.body.self = self;
  this.body.follow = self;

  //Animations
  var runFrames = ['run1','run2','run3','run4','run5','run6','run7','run8'];
  this.anim = new AnimatedSprite(this.sprite,playerTex,4);
  this.anim.add('idle',['idle1','idle2','idle3','idle4','idle5','idle6','idle7','idle8'],true);
  this.anim.add('walk',runFrames,true,18);
  this.anim.add('run',runFrames,true,8);
  this.anim.add('sprint',runFrames,true,4);
  this.anim.add('jump',['run4'],true);

  this.anim.play('run');

  world.add(this.body);
  stage.ents.addChild(this.sprite);
  
  this.jumpHeight = 0.3;
  this.stall = 0.0028; //allows you to jump higher by holding down the jump button;
  this.speed = 0; //current speed
  this.min = -0.28; //min speed when knocked back
  this.walkSpeed = 0.12; //threshold for faster anim
  this.accel = 0.0005; //normal rate of accel
  this.run = 0.3; //max run speed
  this.sprintAccel = 0.0065; //sprinting rate of accel
  this.sprint = 0.45; //sprinting max speed
  this.energy = 100;
  this.maxEnergy = 100;
  this.sprintCost = 0.16; //energy cost of sprinting (per frame so probably will be very small)
  this.jumpCost = 0.8; //energy cost for jumping (once per jump)
  this.hitCost = 3; //energy lost on collision with obstacles
  this.regen = 0.07; //amount of energy regained;
  this.bushCollision = 0.3; //decel on collision
  this.bushLift = -0.012; //lift on collision
  this.animalCollision = 1.2;
  this.animalLift = -0.012;
  this.recover = this.accel * 4; //increased accel when vel is negative
  this.kickX = 0.0012;
  this.kickY = -0.003;
  
  if(dev=='mobile'){
    this.jumpHeight *= mobileMod;
    this.speed *= mobileMod;
    this.min *= mobileMod;
    this.walkSpeed *= mobileMod;
    this.accel *= mobileMod;
    this.run *= mobileMod;
    this.sprintAccel *= mobileMod;
    this.sprint *= mobileMod;
    this.bushCollision *= mobileMod;
    this.bushLift *= mobileMod;
    this.animalCollision *= mobileMod;
    this.animalLift *= mobileMod;
    this.recover *= mobileMod;
    this.kickX *= mobileMod;
    this.kickY *= mobileMod;
  }
  
  this.is = {
    racing: false,
    started: false,
    onGround: false, 
    jumping: false,
    dblJumpReady: false,
    sprinting: false,
    walking: false,
    idling: false
  };
  
  this.controls = {
    sprintDown: false,
    jumpDown: false
  }
  
  this.ground = function(){
    if(self.body.state.pos.y > worldHeight/2 && !self.is.onGround){
      self.is.onGround = true;
      if(logging){console.log('landing');}
      if(!self.is.racing && !self.is.idling){
        self.is.idling = true;
        self.anim.play('idle');
      }else if(self.is.racing && self.is.sprinting){
        self.anim.play('sprint');
      }else if (self.is.racing){
        self.anim.play('run');
      }
    }
  }
  
  this.jump = function(){
    if(!self.is.racing){return}
    if(self.is.onGround && self.energy > self.jumpCost){
      if(logging){console.log('jumping');}
      self.is.onGround = false;
      self.body.state.vel.y -= self.jumpHeight;
      self.anim.play('jump');
      self.energy -= self.jumpCost;
      clamp(this.energy,0,this.maxEnergy);
    }
  }
  
  this.hit = function(amt){
    self.speed -= amt;
    self.energy -= self.hitCost;
    clamp(this.energy,0,this.maxEnergy);
    if(logging){console.log('colliding');}
    if(self.speed<self.min){
      self.speed=self.min; 
    }
    self.is.onGround = false;
    self.anim.play('jump');
  }
  
  this.startRacing = function(){
    this.is.racing = true;
    this.is.started = true;
    this.is.idling = false;
  }
  
  this.update = function(){
    this.body.state.angular.vel = 0;
    this.body.state.angular.acc = 0;
    
    if(this.body.state.pos.x > worldWidth*(courseLength) && this.is.racing){
      this.is.racing = false;
      endGame();
    }
    
    if(!this.is.racing){
      if(!this.is.idling){this.is.idling = true; this.anim.play('idle');}
      this.body.state.vel.x = 0;
      this.anim.animate();
      return
    }else{
      
    }
    if(this.controls.jumpDown){
      if (!this.is.onGround && this.body.state.vel.y<0){
        this.body.state.vel.y -= this.stall;
      }
    }
    if(this.controls.sprintDown && !this.is.sprinting && this.energy>this.sprintCost*100){
      this.is.sprinting = true;
      this.is.walking = false;
      if(this.is.onGround){this.anim.play('sprint');}
    }
    
    if(this.is.sprinting){
      if(this.energy>this.sprintCost){
        this.energy -= this.sprintCost;
      }else{
        this.is.sprinting = false;
      }
    }
    
    if(this.is.sprinting){
      if(this.speed<0){
        this.speed += this.sprintAccel*1.2;
      }else if (this.speed<this.sprint){
        this.speed += this.sprintAccel;
      }else if (this.speed>this.sprint){
        this.speed = this.sprint
      }
      if (!this.controls.sprintDown){
        this.is.sprinting = false;
        if(self.is.onGround){self.anim.play('run');}
      }
    }else{
      if(this.speed<0){
        this.speed += this.recover;
        if(logging){console.log('recovering');}
      }else if (this.speed<this.run){
        this.speed += this.accel;
        if(this.speed>this.run){this.speed=this.run;}
        if(logging){console.log('accelerating');}
      }else if (this.speed>this.run){
        if(logging){console.log('decelerating');}
        this.speed -= this.sprintAccel*0.8;
      }
      if(this.is.onGround){
        if(this.speed<this.walkSpeed&&!this.is.walking){
          this.is.walking = true;
          this.anim.play('walk');
          if(logging){console.log('walking');}
        }else if (this.speed>this.walkSpeed&&this.is.walking){
          this.is.walking = false;
          this.anim.play('run');
          if(logging){console.log('running');}
        }
      }
    }
    
    if(this.energy<this.maxEnergy){
      this.energy += this.regen;
    }
    
    clamp(this.energy,0,this.maxEnergy);
    
    //console.dir(player);
    this.body.state.vel.x = this.speed;
    this.anim.animate();
  }
}