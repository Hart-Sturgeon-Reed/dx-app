//function getRandomProperty(obj, exclude) {
//    var result = randProp(obj);
//    if(exclude != null)
//        while (arrayContains(exclude,result))
//            result = randProp(obj);
//    
//    return obj[result];
//}
//
//function randProp(obj){
//    var count = 0;
//    for (var prop in obj)
//        if (Math.random() < 1/++count)
//           result = prop;
//    return result;
//}
//
//function pickRandomProperty(obj) {
//    var result;
//    var count = 0;
//    for (var prop in obj)
//        if (Math.random() < 1/++count)
//           result = prop;
//    return result;
//}
//
//function contains(obj, exclude) {
//    for (var prop in obj) {
//        if (prop === exclude) {
//            return true;
//        }
//    }
//    return false;
//}
//
//function arrayContains(array, element) {
//    for (var exclude of array) {
//        if (element === exclude) {
//            return true;
//        }
//    }
//    return false;
//}

rnd = function(opt){
  if(opt==null){
    //console.log('RND float');
    return Math.random();
  }else if(typeof opt == 'Object' && Object.keys(opt).length>0){
    if(opt.eql!=null){
      //console.log('RND eql');
      return (Math.random()*opt.eql)-(opt.eql/2);
    }else if(opt.min!=null&&opt.max!=null){
      //console.log('RND min/max');
      return opt.min + Math.random()*(opt.max-opt.min);
    }else{
      if(debug){console.log('Error, incorrect arguments to rnd:');}
      if(debug){console.dir(opt);}
    }
  }else{
    //console.log('RND num');
    return Math.random()*opt;
  }
}

clamp = function(value,min,max){
  if(value<min){
    value=min;
  }else if(value>max){
    value=max;
  }
  return value;
}

range = function(min, max){
    return min + Math.random()*(max-min);
}
//function equalDist(range){
//    return (Math.random()*range)-(range/2);
//}
//
//function animTo(target,tween,time)
//{if(!tween){tween={}}if(!time){time=1}
//    new TweenLite.to(target,time,tween).play();
//}
//function animFrom(target,tween,time)
//{if(!tween){tween={}}if(!time){time=1}
//    new TweenLite.from(target,time,tween).play();
//}
//function animFromTo(target,from,to,time)
//{if(!from){from={}}{if(!to){to={}}if(!time){time=1}}
//    new TweenLite.to(target,time,from,to).play();
//}
//
//function TexturePack(){
//    var self = this;
//    this.tex = 0;
//    this.add = function(label,src){
//        self[label] = PIXI.Texture.fromFrame(src);
//        self.tex++;
//    }
//}
//
//function getRadialSym(sym, root, origin, rotation){
//    var points = [];
//    var root = new Physics.vector(root.x,root.y);
//    if(rotation!=null) root = root.rotate(rotation,origin).clone();
//    var shift = (2*Math.PI)/sym;
//    points.push(root.clone());
//    for (var i=1;i<sym;i++){
//        points.push(root.rotate(shift,origin).clone());
//    }
//    return points;
//}