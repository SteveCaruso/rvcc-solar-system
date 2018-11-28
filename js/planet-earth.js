//Create our scene
var earthScreen = new Solar.Scene("earth");

//Queue up our files we'll need
//But for this one we don't need any

//When things are loaded, do the stuff necessary to make it work
Solar.loader.on('complete',function(loader,resources) {
    
    //Create a transparent scrim that will be used to fade out the solar system
    var scrim = new PIXI.Graphics();
        scrim.beginFill(0x000000);
        scrim.drawRect(0,0,app.view.width,app.view.height);
        scrim.alpha = .75;
    
    //Add the scrim to the scene
    earthScreen.addChild(scrim);
    
    //Create our copy of the earth
    var ourEarth = new PIXI.Sprite(resources.earth.texture);
        ourEarth.width = 200;
        ourEarth.height = 200;
        ourEarth.anchor.set(0.5);
		ourEarth.x = 0;
		ourEarth.y = 0;
	
	//Add our Earth to the scene
    earthScreen.addChild(ourEarth);
	
    
	//Change the default transition
	earthScreen.transition = async function() {
		
		//If it's from the idle scene, we do something special
		if (Solar.currentScene.name == "idle") {
            
            //While the real earth is on the stage, let's grab its coordinates
            var earthPos = earth.getGlobalPosition();
            //And set our earth to them
            ourEarth.x = earthPos.x;
            ourEarth.y = earthPos.y;
            ourEarth.width = earth.width;
            ourEarth.height = earth.height;
            
            //Let's fade in our scene over the idle screen
            earthScreen.alpha = 0;
            app.stage.addChild(earthScreen);
            await Animate.to(earthScreen,1000,{ alpha:1,
                                                easing:Easing.easeInOut});
            
            //Then let's animate the planet growing and filling the screen while we fade out
            //the solar system
            Animate.to(ourEarth,3000,{      x:centerX,
                                            y:centerY,
                                            width:1080,
                                            height:1080,
                                            easing:Easing.easeInOut
                                     });
            await Animate.to(solarSystem,3000,{   alpha:0});
            
            //Remove the previous scene from the stage and reset it
            app.stage.removeChild(solarSystem);
            solarSystem.alpha = 1;
            
            
			
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
	earthScreen.transitionOut = async function() {
		
        //While the real earth is on the stage, let's grab its coordinates
        var earthPos = earth.getGlobalPosition();
        
        //Animate the earth back.
        await Animate.to(ourEarth,3000,{    x:earthPos.x,
                                            y:earthPos.y,
                                            width:earth.width,
                                            height:earth.height,
                                            easing:Easing.easeInOut
                                     });
        
        //Fade out the scene
        await Animate.to(earthScreen,1000,{ alpha:0,
                                            easing:Easing.easeInOut});
        
        //Remove it from the stage
        app.stage.removeChild(earthScreen);
        
	}
	
	//Set the event listeners
	earth.interactive = true;
    earth.on('click', function() {
		Solar.changeSceneTo("earth");
	});
	
	//When done, head back
    ourEarth.interactive = true;
	ourEarth.on('click', function() {
		Solar.changeSceneTo('idle');
	});
	
	
});
