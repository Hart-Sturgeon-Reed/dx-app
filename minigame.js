if (Meteor.isClient) {
  gameActive = false;
  $(window).on('keyup', function(event){
    if (event.which==80){
      paused = !paused;
    }
  });
  
  if (window.matchMedia('(max-device-width: 800px)').matches) {
    dev = 'mobile';
  }else if (window.matchMedia('(max-device-width: 960px)').matches) {
    dev = 'tablet';
  }else{
    dev = 'large';
  }
  
  countdown = function(){
    var cd = Session.get('cd');
    console.log(cd + ' seconds to go');
    cd--;
    if(cd>0){
      Session.set('cd',cd);
      Meteor.setTimeout(countdown, 1000);
    }else{
      Session.set('cd','Go!');
      Meteor.setTimeout(startGame, 1000);
    }
  }
  
  beginRace = function(){
    console.log('starting the game in 3 seconds');
    Session.set('raceStarted', true);
    Session.set('raceStarting', true);
    Session.set('raceEnded', false);
    Session.set('cd', 3);
    Meteor.setTimeout(countdown, 1000);
  }
  
  initGame = function(){
    Session.set('tenth', 0);
    Session.set('sec', 0);
    Session.set('min', 0);
    Session.set('score', 0);
    Session.set('stamina', 100);
    Session.set('progress', 0);
    Session.set('raceStarted',false);
  }
  
  updateTime = function(){
    //console.log('updating time');
    if(paused){return;}
    min = Session.get('min');
    sec = Session.get('sec');
    tenth = Session.get('tenth');
    sec++; //should be tenth++ if clock were running at correct speed
    if(tenth>9){
      tenth = 0;
      tenth++;
    }
    if(sec>59){
      sec = 0;
      min++;
    }
    Session.set('tenth',tenth);
    Session.set('sec',sec);
    Session.set('min',min);
  }
  
  updateProgress = function(){
    //console.log('updating progress');
    var dist = courseLength*worldWidth;
    var togo = dist - player.body.state.pos.x;
    var progress = togo/dist;
    var percent = Math.floor(100*(1-progress));
    Session.set('progress', percent);
  }
  
  updateStamina = function(){
    var stamina = Math.floor((player.energy/player.maxEnergy)*100);
    Session.set('stamina', stamina);
  }
  
  pad = function(number){
    var num = '0'+number;
    return num.substr(-2);
  }

  Template.game.helpers({
    score: function (){
      return Session.get('score');
    },
    min: function(){
      return Session.get('min');
    },
    sec: function(){
      return pad(Session.get('sec'));
    },
    tenth: function(){
      return pad(Session.get('tenth'));
    },
    staminaPercent: function(){
      return Session.get('stamina');
    },
    progress: function(){
      return Session.get('progress');
    },
    notStarted: function(){
      return !Session.get('raceStarted'); 
    },
    raceStarting: function(){
      return Session.get('raceStarting');
    },
    cd: function(){
      return Session.get('cd');
    }
  });

  Template.game.onRendered(function(){
    if(!gameActive){
      gameActive = true;
      startLoading();
    }else{
      startBuilding();
    }
    $('#overlay').hammer();
    initGame();
  });
}

startBuilding = function(){
  createRenderer();
  setupWorld(renderer);
  setupStage(renderer);
  setupGame();
}

createRenderer = function(){
//  PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;
  renderer = Physics.renderer('pixi', {
      el: 'game-canvas', // The DOM element to append the stage to
      meta: false // Turns debug info on/off
  });
  
  var resize = function(){
    stageWidth = window.innerWidth;
    stageHeight = window.innerHeight;

    renderer.resize(stageWidth,stageHeight);
  }();
  
  window.onresize = resize;

  console.log('added renderer: '+stageWidth+', '+stageHeight);
}
