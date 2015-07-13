Emitter = function(particleSystem,startingSize,batchSize){
    if(startingSize===null){startingSize = 100;}
    if(batchSize===null){batchSize = 10;}
    ObjectPool.call(this,startingSize,batchSize);
    this.addObject = function(){
        //console.log("the pool contains "+(this.numObjects++)+" objects");
        var p = new Particle(particleSystem,this);
        this.pool.push(p);
    }
}

//Need to add functions for various effects or modes - burst, stream etc
//Should support some default particle systems as well for setting up simple emitters quickly