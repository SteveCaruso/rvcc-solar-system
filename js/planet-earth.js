//Create our scene
var earthScreen = new Solar.Scene("earth");

//Queue up our files we'll need
Solar.loader.add('infobox',"img/ui/infobox.png");
Solar.loader.add('backbutton',"img/ui/backbutton.png");

//When things are loaded, do the stuff necessary to make it work
Solar.loader.on('complete',function(loader,resources) {
    
    //Create a transparent scrim that will be used to fade out the solar system
    var scrim = new PIXI.Graphics();
        scrim.beginFill(0x000000);
        scrim.drawRect(0,0,app.view.width,app.view.height);
        scrim.alpha = .75;
    
    //Add the scrim to the scene
    earthScreen.addChild(scrim);
    
    var infobox = new PIXI.Sprite(resources.infobox.texture);
        infobox.width = 750;
        infobox.height = 1000;
        infobox.x = 2000;
        infobox.y = 50;
    
    earthScreen.addChild(infobox);
    
    var backbutton = new PIXI.Sprite(resources.backbutton.texture);
        backbutton.width = 120;
        backbutton.height = 120;
        backbutton.x = 0;
        backbutton.y = 960;
        backbutton.alpha = 0;
    
    earthScreen.addChild(backbutton);
    
    
    
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
		//if (Solar.currentScene.name == "idle") {
            
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
            Animate.to(ourEarth,3000,{      x:540,
                                            y:centerY,
                                            width:1080,
                                            height:1080,
                                            easing:Easing.easeInOut
                                     });
            
            Animate.to(solarSystem,3000,{easing:Easing.easeInOut,
                                              alpha:0});
            await Animate.to(infobox,3000,{x:1150,y:50,easing:Easing.easeInOut});
            
            await Animate.to(backbutton,500,{alpha:1});
            backbutton.interactive = true;
            
            //Remove the previous scene from the stage and reset it
            app.stage.removeChild(solarSystem);
            solarSystem.alpha = 1;
            
            
			
		//}
		//Otherwise we do something boring
		
		
	}
	

	//Change the transition out.
	earthScreen.transitionOut = async function() {
		
        backbutton.interactive = false;
        
        //While the real earth is on the stage, let's grab its coordinates
        var earthPos = earth.getGlobalPosition();
        
        Animate.to(backbutton,500,{alpha:0,
                                   easing:Easing.easeInOut});
        
        await Animate.to(infobox,3000,{x:2000,y:50,easing:Easing.easeInOut});
        
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
    backbutton.interactive = false;
	backbutton.on('click', async function() {
		await Solar.changeSceneTo('idle');
        showSlider();
	});
	
	
});
