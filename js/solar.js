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

//Incoming Scene
Solar.incomingScene = null;

//Scene Object
//This is a modified PIXI Container.
//Invoke it with -- var x = new Solar.Scene();
Solar.Scene = function(name) {
    
    //Check if the scene name exists
    if (Solar.scenes[name] !== undefined) 
    	throw "Whoops! A Scene with that name exists.";
    
    //This is a modified Container
	var sc = new PIXI.Container();
	
    //Set name
    sc.name = name;
    
    //Default transition in
    sc.defaultTransition = async function() {
    	//Transition out current scene
    	await Solar.currentScene.transitionOut();
    	//Set alpha to zero
        sc.alpha = 0;
        //Add to stage
        app.stage.addChild(sc);
        //Fade in
        await Animate.to(sc,500,{alpha:1});
    }
    
    //Transition function to be overwritten
    sc.transition = async function() {
    	await sc.defaultTransition();
    }
    
    //Default transition out
    sc.defaultTransitionOut = async function() {
    	//Fade out
        await Animate.to(sc,500,{alpha:0});
        //Remove from stage
		app.stage.removeChild(sc);
        //Set alpha back to full
		sc.alpha = 1;
    }
    
    //Transition out function to be overwritten
    sc.transitionOut = async function() {
    	await sc.defaultTransitionOut();
    }
    
    //Add the scene to the scenes array
    Solar.scenes[name] = sc;
    
    //Set defaults for current, last, and incoming
    if (Solar.currentScene === null) {
        Solar.currentScene = sc;
    }
    if (Solar.lastScene === null) {
        Solar.lastScene = sc;
    }
    if (Solar.incomingScene === null) {
        Solar.incomingScene = sc;
    }
    
	return sc;

};

//Change to the named scene and provoke its transition
Solar.changeSceneTo = async function(name) {

	if (Solar.scenes[name] === undefined)
		throw "So such scene.";

	//Set the incoming scene
	Solar.incomingScene = Solar.scenes[name];

	//Trigger the transition
	await Solar.incomingScene.transition();

	//Set the last scene as the current scene
	Solar.lastScene = Solar.currentScene;
	//Set the incoming scene as the current scene
	Solar.currentScene = Solar.incomingScene;
}

Solar.startScene = async function(name) {

	if (Solar.scenes[name] === undefined)
		throw "So such scene.";
	
	//Set the incoming scene
	Solar.incomingScene = Solar.scenes[name];

	//Set alpha to zero
	Solar.incomingScene.alpha = 0;
	//Add to stage
	app.stage.addChild(Solar.incomingScene);
	//Fade in
	await Animate.to(Solar.incomingScene,2000,{alpha:1});

	//Set the last scene as the current scene
	Solar.lastScene = Solar.scenes[name];
	//Set the incoming scene as the current scene
	Solar.currentScene = Solar.scenes[name];
	
	console.log("We're a go.");
	
}


/*
 * Resource Management
 */

//Loader pass-through
Solar.loader = PIXI.loader;

//Simple loading screen
var loading = new PIXI.Text("Loading... ", new PIXI.TextStyle({
		fontFamily: 'Constantina',
		fontSize: 36,
		fill: ['#ffffff']
	}));
	loading.x = 0;
	loading.y = 0;
	
	app.stage.addChild(loading);

Solar.loader.on('progress',function (loader,res) {
	loading.text = "Loading... " + Math.round(loader.progress) + "%";
});

Solar.loader.on('complete', function() {
	loading.text = "Loaded!";
	setTimeout(function() {
		app.stage.removeChild(loading);
	},1000);
});

/*
 * Interface Management
 */

//This is where there is work to do.