//Create our scene
var uranusScreen = new Solar.Scene("uranus");

//Queue up our files we'll need
//None!

//When things are loaded, do the stuff necessary to make it work
Solar.loader.on('complete',function(loader,resources) {
    
    //Namespace
    var scene = uranusScreen;
    var targetPlanet = uranus;
    
    //Create a transparent scrim that will be used to fade out the solar system
    var scrim = new PIXI.Graphics();
        scrim.beginFill(0x000000);
        scrim.drawRect(0,0,app.view.width,app.view.height);
        scrim.alpha = .75;
    
    //Add the scrim to the scene
    scene.addChild(scrim);
    
    //Info box
    var infobox = new PIXI.Sprite(resources.infobox.texture);
        infobox.width = 750;
        infobox.height = 1020;
        infobox.x = 2000;
        infobox.y = 50;
    
    scene.addChild(infobox);
    
    
    
    //Content container
    var content = new PIXI.Container();
        content.alpha = 0;
    
    //Info box title
    var title = new PIXI.Text("Uranus",titleStyle);
        title.x = 1200;
        title.y = 100;
    
    //Add to content
    content.addChild(title);
            
    //Info box text
    var text = new PIXI.Text("• Day: 17.23 Earth Hours \n\n• Year: 84 Earth Years \n\n• Size: 31,763 miles in diameter \n\n• Distance from Sun: 1.786 billion miles \n\n• Avg. Temperature: -357 degrees \n\n• Uranus hits the coldest\n  temperatures of any planet \n\n• Atmosphere: Hydrogen, Helium, \n  Methane \n\n• Moons: 27",textStyle);
        text.x = 1200;
        text.y = 180;
    
    //Add to content
    content.addChild(text);
    
    //Add the content container to the scene
    scene.addChild(content);
    
    var backbutton = new PIXI.Sprite(resources.backbutton.texture);
        backbutton.width = 120;
        backbutton.height = 120;
        backbutton.x = 0;
        backbutton.y = 960;
        backbutton.alpha = 0;
    
    scene.addChild(backbutton);
    
    
    
    //Create our copy of the uranus
    var planet = new PIXI.Sprite(resources.uranus.texture);
        planet.width = 200;
        planet.height = 200;
        planet.anchor.set(0.5);
		planet.x = 0;
		planet.y = 0;
	
	//Add our uranus to the scene
    scene.addChild(planet);
	
    
	//Change the default transition
	scene.transition = async function() {
		
        //Stop clickability
        deactivatePlanets();
        hideSlider();
        
		//If it's from the idle scene, we do something special
		//if (Solar.currentScene.name == "idle") {
            
            //While the real uranus is on the stage, let's grab its coordinates
            var planetPos = targetPlanet.getGlobalPosition();
            var planetBounds = targetPlanet.getBounds();
            //And set our uranus to them
            planet.x = planetPos.x;
            planet.y = planetPos.y;
            planet.width = targetPlanet.width * targetPlanet.parent.scale.x;
            planet.height = targetPlanet.height * targetPlanet.parent.scale.y;
            
            //Let's fade in our scene over the idle screen
            scene.alpha = 0;
            app.stage.addChild(scene);
            await Animate.to(scene,1000,{ alpha:1,
                                                easing:Easing.easeInOut});
            
            //Then let's animate the planet growing and filling the screen while we fade out
            //the solar system
            Animate.to(planet,3000,{      x:540,
                                            y:centerY,
                                            width:1080,
                                            height:1080,
                                            easing:Easing.easeInOut
                                     });
            
            Animate.to(solarSystem,3000,{easing:Easing.easeInOut,
                                              alpha:0});
            await Animate.to(infobox,3000,{x:1150,y:50,easing:Easing.easeInOut});
            
            await Animate.to(content,1000,{alpha:1,easing:Easing.easeInOut});
        
            await Animate.to(backbutton,500,{alpha:1});
            backbutton.interactive = true;
            
            //Remove the previous scene from the stage and reset it
            app.stage.removeChild(solarSystem);
            solarSystem.alpha = 1;
            
            
			
		//}
		//Otherwise we do something boring
		
		
	}
	

	//Change the transition out.
	scene.transitionOut = async function() {
		
        backbutton.interactive = false;
        
        //While the real uranus is on the stage, let's grab its coordinates
        var planetPos = targetPlanet.getGlobalPosition();
        
        Animate.to(backbutton,500,{alpha:0,
                                   easing:Easing.easeInOut});
        
        await Animate.to(content,500,{alpha:0,easing:Easing.easeInOut});
        
        
        await Animate.to(infobox,1500,{x:2000,y:50,easing:Easing.easeInOut});
        
        //Animate solar system back in
        solarSystem.alpha = 0;
        app.stage.addChildAt(solarSystem,1);
        Animate.to(solarSystem,3000,{alpha:1,easing:Easing.easeInOut});
        
        //Animate the uranus back.
        await Animate.to(planet,3000,{    x:planetPos.x,
                                            y:planetPos.y,
                                            width:targetPlanet.width * targetPlanet.parent.scale.x,
                                            height:targetPlanet.height * targetPlanet.parent.scale.y,
                                            easing:Easing.easeInOut
                                     });
        
        //Fade out the scene
        await Animate.to(scene,1000,{ alpha:0,
                                            easing:Easing.easeInOut});
        
        
        
        //Remove it from the stage
        app.stage.removeChild(scene);
        
        //Make them clickable again
        activatePlanets();
        showSlider();
        
	}
	
	//Set the event listeners
	targetPlanet.interactive = true;
    targetPlanet.on('pointerdown', function() {
		Solar.changeSceneTo("uranus");
	});
	
	//When done, head back
    backbutton.interactive = false;
	backbutton.on('pointerdown', function() {
		Solar.changeSceneTo('idle');
	});
	
	
});
