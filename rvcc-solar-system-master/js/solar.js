/*
 * Our Solar Object
 */
const Solar = {};


/*
 * Scene Management
 */


//Scenes List
Solar.scenes = {};

//Current Scene
Solar.currentScene = null;

//Last Scene
Solar.lastScene = null;

//Scene Object
//This is a modified PIXI Container.
//Invoke it with -- var x = new Solar.Scene();
Solar.Scene = function(name) {
    
    //Check if the scene name exists
    if (Solar.scenes[name] !== undefined) throw("Whoops! A Scene with that name exists.");
    
    //This is a modified Container
	var sc = new PIXI.Container();
	
    //Set name
    sc.name = name;
    
    //Default Transition Out
    sc.defaultTransitionOut = function(resolve, reject) {
        //Fade out
        Animate.to(sc,500,{alpha:0})
        //Remove from stage
		.then(_=> app.stage.removeChild(sc))
        //Set alpha back to full
		.then(_=> sc.alpha = 1)
        //Resolve
        .then(resolve);
    }
    
    //Trigger the default transition out.
    //This can be overridden, so long as when the transition is over resolve() is called.
    sc.transitionOut = function(resolve,reject) {
        
        sc.defaultTransitionOut(resolve,reject);
        
    }
    
    //Wrap the transition in a Promise
    sc.transitionOutPromise = function() {
        return new Promise(function(resolve,reject) {
            sc.transitionOut(resolve,reject);
        });
    }
    
    //Default Transition In
    sc.defaultTransitionIn = function(resolve, reject) {
        //Set alpha to zero
        sc.alpha = 0;
        //Add to stage
        app.stage.addChild(sc);
        //Fade in
        Animate.to(sc,500,{alpha:1})
        //Resolve
        .then(resolve);
    }
    
    //Trigger the default transition in. 
    //This can be overridden, so long as when the transition is over resolve() is called.
    sc.transitionIn = function(resolve,reject) {
        
        sc.defaultTransitionIn(resolve,reject);
        
    }
    
    //Wrap the transition in a Promise
    sc.transitionInPromise = function() {
        return new Promise(function(resolve,reject) {
            sc.transitionIn(resolve,reject);
        });
    }
    
    Solar.scenes[name] = sc;
    
    if (Solar.currentScene === null) {
        Solar.currentScene = sc;
    }
    if (Solar.lastScene === null) {
        Solar.lastScene = sc;
    }
	
	return sc;

};

//Change The Scene, as a Promise
Solar.changeSceneTo = function(name) {
	
	return new Promise(function(resolve,reject) {
	
		//If there is no such scene, fail
		if (Solar.scenes[name] === undefined) {
			reject("No such scene to change to!");
			return;
		}
		
        //Gran the incoming scene
        var incomingScene = Solar.scenes[name];
        
        //transition out current scene
        Solar.currentScene.transitionOutPromise()
        //transition in this scene
        .then(_=> incomingScene.transitionInPromise())
        //Change current and last scenes in memory
        .then(function() { 
            return new Promise (function(resolve,reject) {
                //Move the former current scene to the last scene
                Solar.lastScene = Solar.currentScene;
                //Set the new scene as the current scene
                Solar.currentScene = incomingScene;
                //Resolve *this* code.
                resolve();
            });
        })
        //And then resolve the whole thing.
        .then(resolve);
	
	});
	
}

/*
 * Resource Management
 */

//Loader pass-through
Solar.loader = PIXI.loader;
Solar.loaders = PIXI.loaders;

/*
 * Interface Management
 */

//This is where there is work to do.