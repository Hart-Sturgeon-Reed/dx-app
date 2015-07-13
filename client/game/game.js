setupGame = function(){
  player = new Player(worldWidth/2,worldHeight/2);
  followers = [];
  balls = [];
  medals = [];
  bushes = [];
  animals = [];
  
  collidable = [];
  
  new Ball(worldWidth + rnd(worldWidth/2),worldHeight/2);
  new Ball(worldWidth*(courseLength*(1/3)),worldHeight/2,sprites.soccerRed);
  new Ball(worldWidth*(courseLength*(2/3)),worldHeight/2,sprites.soccerBlue);
  
  //For obstacles
  var offset = worldWidth * 1.7;
  var minOffset = worldWidth/2;
  var variance = worldWidth * 2;
  var animalOffset = worldWidth * 0.8;
  var maxDist = worldWidth * (courseLength-1);
  
  while(offset<maxDist){
    //console.log('building a prop at: '+offset);
    
    if(rnd()<0.2){
      new Animal(offset, worldHeight*0.65);
      offset += animalOffset + rnd(variance);
    }else{
      new Bush(offset, worldHeight*0.73);
      offset += minOffset + rnd(variance);
    }
  }
  console.log('done building obstacles');
  
  //For medals
  offset = worldWidth*1.5;
  minOffset = worldWidth/10;
  variance = worldWidth*1.5;
  var height = worldHeight/2;
  var heightVariance = worldHeight/4;
  var gold = 0;
  var silver = 0;
  
  while(offset<maxDist){
    //console.log('building a medal at: '+offset);
    
    if(gold<numGold && rnd()<0.2){
      new Medal('gold', offset, height - rnd(heightVariance));
      offset += minOffset + rnd(variance);
      gold++;
    }else if(silver<numSilver){
      new Medal('silver', offset, height - rnd(heightVariance));
      offset += minOffset + rnd(variance);
      silver++;
    }else{
      break
    }
  }
  console.log('done placing medals');
  
  props = new PropManager();
  
  gravity.applyTo(balls.concat(player.body,animals));
  setPhysics();
  
  Physics.util.ticker.start();
}

gameLoop = function(){
  updateProgress();
  updateStamina();
  props.update();
  parallax.forEach(function(em){
    em.update();
  });
}

setPhysics = function(){
  collidable = [];
  collidable = collidable.concat(balls, animals, bushes, player.body, bounds.body);
  impulse.applyTo(collidable);
}

startGame = function(){
  console.log('race started!');
  Session.set('raceStarting', false);
  ballsScored = 0;
  player.startRacing();
  startTime = Date.now();
  timer = Meteor.setInterval(updateTime,1000);
  //timer = new ReactiveTimer();
  //timer.start(1);
  world.wakeUpAll();
}

endGame = function(){
  //calculate player score and show scores page
  console.log('race ended');
  //timer.stop();
  clearInterval(timer);
  balls.forEach(function(ball){
    if(ball.state.pos.x>worldWidth*courseLength){ballsScored++;}
  });
  console.log(ballsScored + ' balls scored');
  var score = Session.get('score');
  var min = 0;
  var sec = 0;
  var tenth = Math.floor((Date.now() - startTime)/100);
  var bonus = 900 - tenth;
  if(bonus > 0){
    score += 1*bonus;
  }
  while(tenth>600){
    tenth-=600;
    min ++;
  }
  while(tenth>10){
    tenth-=10;
    sec ++;
  }
  Session.set('min', min);
  Session.set('sec', sec);
  Session.set('tenth', tenth);
  
  if(ballsScored>0){
    score += 125*ballsScored;
  }
  console.log('final score is: '+score);
  Session.set('finalScore', score);
  Session.set('raceEnded', true);
}

resetGame = function(){
  //set player back to start, reset all counters, clear all physics bodies and obstacles, repopulate entities
}