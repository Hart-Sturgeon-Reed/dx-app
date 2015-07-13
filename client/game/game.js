setupGame = function(){
  player = new Player(worldWidth/2,worldHeight/2);
  followers = [];
  balls = [];
  medals = [];
  bushes = [];
  animals = [];
  
  collidable = [];
  
  for (var i=0;i<1;i++){
    new Ball(worldWidth + rnd(worldWidth/2),worldHeight/2);
  }
  
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
  offset = worldWidth;
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
  player.startRacing();
  timer = Meteor.setInterval(updateTime, 1000);
  world.wakeUpAll();
}

endGame = function(){
  //calculate player score and show scores page
}

resetGame = function(){
  //set player back to start, reset all counters, clear all physics bodies and obstacles, repopulate entities
}