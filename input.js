if(Meteor.isClient){
  
  Template.game.events({
    'tap #overlay': function(event) {
      if(!Session.get('raceStarted')){
        beginRace();
      }else if (Session.get('raceEnded')){
        Session.set('raceEnded', false);
        Session.set('submitScore',true);
      }
    },

    'tap .submit': function(event) {
      Session.set('submitScore',false);
      submitScore();
      $('.scoreboard').addClass('active');
    },
    
    'tap input.name': function(event) {
      $('input.name').val('');
    },

    'touchstart #overlay': function(event){
      if (event.originalEvent.changedTouches[0].pageX<stageWidth/2){
        //console.log('left start');
        player.controls.sprintDown = true;
        $('.sprint.button').addClass('pressed');
      }else{
        //console.log('right start');
        player.controls.jumpDown = true;
        player.jump();
        $('.jump.button').addClass('pressed');
      }
    },

    'touchend #overlay': function(event){
      if (event.originalEvent.changedTouches[0].pageX<stageWidth/2){
        //console.log('left end');
        player.controls.sprintDown = false;
        $('.sprint.button').removeClass('pressed');
      }else{
        //console.log('right end');
        player.controls.jumpDown = false;
        $('.jump.button').removeClass('pressed');
      }
    }
  });
  
}