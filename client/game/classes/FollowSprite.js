FollowSprite = function(sprite, target, scroll) {
  if(scroll==null){scroll = 1}
  var ns = new PIXI.Sprite(sprite);
  ns.width *= scaleFactor;
  ns.height *= scaleFactor;
  ns.target = target;
  ns.actualPos = {x:0,y:0};
  ns.scroll = scroll
  
  ns.setPos = function(xPos,yPos){
    ns.actualPos.x = xPos;
    ns.actualPos.y = yPos;
  }
  
  ns.update = function(){
    ns.position.x = ns.actualPos.x - (player.body.state.pos.x - (worldWidth/2)) * ns.scroll;
    ns.position.y = ns.actualPos.y;
  }
  followers.push(ns);
  return ns;
}