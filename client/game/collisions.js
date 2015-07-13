groundCheck = Physics.query({
    $or: [
        { bodyA: { label: 'player' }, bodyB: { label: 'bounds' } }
        ,{ bodyB: { label: 'player' }, bodyA: { label: 'bounds' } }
    ]
});

soccerCheck = Physics.query({
    $or: [
        { bodyA: { label: 'player' }, bodyB: { label: 'ball' } }
        ,{ bodyB: { label: 'player' }, bodyA: { label: 'ball' } }
    ]
});

bushCheck = Physics.query({
    $or: [
        { bodyA: { label: 'player' }, bodyB: { label: 'bush' } }
        ,{ bodyB: { label: 'player' }, bodyA: { label: 'bush' } }
    ]
});

medalCheck = Physics.query({
    $or: [
        { bodyA: { label: 'player' }, bodyB: { label: 'medal' } }
        ,{ bodyB: { label: 'player' }, bodyA: { label: 'medal' } }
    ]
});

animalCheck = Physics.query({
    $or: [
        { bodyA: { label: 'player' }, bodyB: { label: 'animal' } }
        ,{ bodyB: { label: 'player' }, bodyA: { label: 'animal' } }
    ]
});

defeatCheck = Physics.query({
    $or: [
        { bodyA: { label: 'ball' }, bodyB: { label: 'animal' } }
        ,{ bodyB: { label: 'ball' }, bodyA: { label: 'animal' } }
    ]
});

processCollisions = function(data,e) {
  var found = Physics.util.find( data.collisions, groundCheck );
  if ( found ){
    if ( found.bodyA.label=='player' ) {
      hitGround( found.bodyA )
    }else{
      hitGround( found.bodyB )
    }
  }
  found = Physics.util.find (data.collisions, soccerCheck);
  if (found){
    if(found.bodyA.label=='player'){
      kickBall(found.bodyA,found.bodyB);
    }else{
      kickBall(found.bodyB,found.bodyA);
    }
  }
  found = Physics.util.find (data.collisions, bushCheck);
  if (found){
    if(found.bodyA.label=='player'){
      hitBush(found.bodyA,found.bodyB);
    }else{
      hitBush(found.bodyB,found.bodyA);
    }
  }
  found = Physics.util.find (data.collisions, medalCheck);
  if (found){
    if(found.bodyA.label=='player'){
      collectMedal(found.bodyA,found.bodyB);
    }else{
      collectMedal(found.bodyB,found.bodyA);
    }
  }
  found = Physics.util.find (data.collisions, animalCheck);
  if (found){
    if(found.bodyA.label=='player'){
      hitAnimal(found.bodyA,found.bodyB);
    }else{
      hitAnimal(found.bodyB,found.bodyA);
    }
  }
  found = Physics.util.find (data.collisions, defeatCheck);
  if (found){
    if(found.bodyA.label=='ball'){
      //defeatAnimal(found.bodyA,found.bodyB);
    }else{
      //defeatAnimal(found.bodyB,found.bodyA);
    }
  }
}

hitGround = function(player){
  player.self.ground();
}

hitBush = function(player,bush){
  if(player.state.pos.x<bush.state.pos.x){
    player.self.hit(player.self.bushCollision);
  }
  player.applyForce({x:0,y:player.self.bushLift});
}

hitAnimal = function(player,animal){
  if(player.state.pos.x<animal.state.pos.x){
    player.self.hit(player.self.animalCollision);
  }
  player.applyForce({x:0,y:player.self.animalLift});
}

defeatAnimal = function(ball,animal){
  animals.splice(animals.indexOf(animal),1);
  setPhysics();
  animal.treatment = 'dynamic';
  animal.state.angular.vel = rnd()+ 0.005;
  animal.applyForce({x:0.04,y:-0.012});
}

collectMedal = function(player,medal){
  world.remove(medal);
  stage.collectibles.removeChild(medal.self.sprite);
  player.applyForce({x:0.01,y:0});
  Session.set('score',Session.get('score')+medal.self.value);
}

kickBall = function(player,ball){
  ball.applyForce({x:player.self.kickX,y:player.self.kickY});
}