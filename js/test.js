//Create our scene
var testScene = new Solar.Scene("test");

//Queue up our files we'll need
Solar.loader.add('spaceCore',"img/spaaace.png");

//Make the variables we need public
var spaaace;

//When things are loaded, do the stuff necessary to make it work
Solar.loader.on('complete',function(loader,resources) {
    
    //Create the Space Core 
    spaaace = new PIXI.Sprite(resources.spaceCore.texture);
        spaaace.width = 200;
        spaaace.height = 200;
        spaaace.anchor.set(0.5);
		spaaace.x = 0;
		spaaace.y = centerY;
	
	//Add the Space Code to the scene
    testScene.addChild(spaaace);
	
	//Change the default transition
	testScene.transition = async function() {
	
		console.log(Solar.currentScene.name);
		
		//If it's from the idle scene, we do something special
		if (Solar.currentScene.name == "idle") {
		
			//Set our little booger's initial size
			spaaace.width = 0;
			spaaace.height = 0;
			
			//Query where the Moon is
			var moonPos = window.theMoon.getGlobalPosition();
	
			//Stick him there
			spaaace.x = moonPos.x;
			spaaace.y = moonPos.y;
	
			//Add the test scene to the stage (IMPORTANT!)
			app.stage.addChild(testScene);
	
			//Have him fly out from the moon to the center of the screen
			//getting bigger
			Animate.to(spaaace,5000,{ 	x:centerX,
										y:centerY, 
										width:200,
										height:200,
										easing:Easing.easeOut});
	
			//At the same time animate the Solar System off to the left
			//and make it fade out.
			await Animate.to(solarSystem,7000, {	x:-500,
													alpha:0})
			//Then remove it from the stage and reset it
			app.stage.removeChild(solarSystem);
			solarSystem.x = centerX;
			solarSystem.alpha = 1;
			
			//Make the lil' guy clickable
			spaaace.interactive = true;
			
		}
		//Otherwise we do something boring
		else {
			
			//Center up
			spaaace.width = 200;
			spaaace.height = 200;
			spaaace.x = centerX;
			spaaace.y = centerY;
			
			//Fade in
			await testScene.defaultTransition();
			
		}
		
	}
	
	//Change the transition out.
	testScene.transitionOut = async function() {
		
		//Deactivate click-ability
		spaaace.interactive = true;
		
		//Animate out
		await Animate.to(spaaace,3000,{ 	x:app.view.width+200,
											y:centerY,
											width:200,
											height:200,
											easing:Easing.easeIn })
		//Remove scene from stage
		app.stage.removeChild(testScene);
	}
	
	//Set the event listeners
	spaaace.on('click', function() {
		Solar.changeSceneTo("idle");
	});
	
	earth.interactive = true;
	earth.on('click', function() {
		Solar.changeSceneTo('test');
	});
	
	
});
