ObstacleManager = {
  obstacles: [],
  collectibles: []
}

Obstacle = function(opt) {
  if(opt.min==null){opt.min = worldWidth * 0.7;}
  if(opt.max==null){opt.max = worldWidth * (courseLength - 1);}
  if(opt.minSpace==null){opt.minSpace = worldWidth / 7;}
  if(opt.spaceVariance==null){spaceVariance = worldWidth/5;}
  if(opt.height==null){opt.height = worldWidth * 0.73;}
  if(opt.heightVariance==null){opt.heightVariance = 0;}
  if(opt.constructor==null){opt.constructor = Bush;}
  if(opt.count==null){opt.count = courseLength;}
  if(opt.weight==null){opt.weight = 1;}
  return opt;
}

  
ObstacleManager.addObstacle = function(opt){
  var obstacle = new Obstacle(opt);
  this.obstacles.push(obstacle);
  console.log('added obstacle:');
  console.dir(obstacle);
}
  
ObstacleManager.buildObstacles = function(){
  var offset = worldWidth * 0.7;
  var maxDist = worldWidth * (courseLength-1);
  var totalWeight = 0;
  var obstacleWeights = [];
  
  var orderWeights = function(a,b){
    if(a.weight<b.weight){
      return -1;
    }else{
      return 1;
    }
  }
  
  this.obstacles.forEach(function(el,id){
    totalWeight += el.weight;
  });

  this.obstacles.forEach(function(el,id){
    el.weight = el.weight/totalWeight;
  });
  
  this.obstacles.sort(orderWeights);
  
  console.log(totalWeight);
  console.dir(this.obstacles);
  
  while( offset<maxDist ){
    var ob;
    var choice = rnd();
    console.log('building');
    this.obstacles.forEach(function(el){
      if(choice<el.weight){
        ob = el;
        return;
      }else{
        choice -= el.weight;
      }
    });
    console.log('picked '+ ob);
    offset += worldWidth;
  }
}