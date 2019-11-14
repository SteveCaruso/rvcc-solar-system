//Create our scene
var jupiterScreen = new Solar.Scene("jupiter");

//Queue up our files we'll need

//When things are loaded, do the stuff necessary to make it work
Solar.loader.on('complete', function (loader, resources) {
    
    //Namespace
    var scene = jupiterScreen;
    var targetPlanet = jupiter;
    
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
    var title = new PIXI.Text("Jupiter",titleStyle);
        title.x = 1200;
        title.y = 100;
    
    //Add to content
    content.addChild(title);
            
    //Info box text
    var text = new PIXI.Text("• Day: Just under 10 Earth hours\n\n• Year: 12 Earth Years\n\n• Distance from Sun: 484 million miles \n\n• Size: 86,882 miles in diameter \n\n• Temperatures depend more on the layer \n  of Jupiter's atmosphere: \n  -260 degrees to 1,340 degrees  \n\n• Moons: 79 as of 2018\n  Four largest moons, from left to right:\n  Io, Europa, Ganymede, and Callisto\n\n• The big red spot is actually a massive \n  storm that is about 10,159 miles across",textStyle);
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
    
    
    
    //Create our copy of the jupter
    var planet = new PIXI.Sprite(resources.jupiter.texture);
        planet.width = 200;
        planet.height = 200;
        planet.anchor.set(0.5);
		planet.x = 0;
		planet.y = 0;
	
	//Add our Jupiter to the scene
    scene.addChildAt(planet,1);
	
    
    //Jupiter's moons
    var jmoonIo = new PIXI.Sprite(resources.jMoonIo.texture);
        jmoonIo.width = 138;
        jmoonIo.height = 138;
        jmoonIo.anchor.set(0.5);
        jmoonIo.x = 150;
        jmoonIo.y = 150;
    
    content.addChild(jmoonIo);
    
    var jmoonEuropa = new PIXI.Sprite(resources.jMoonEuropa.texture);
        jmoonEuropa.width = 125;
        jmoonEuropa.height = 125;
        jmoonEuropa.anchor.set(0.5);
        jmoonEuropa.x = 350;
        jmoonEuropa.y = 250;

        // Make it interactive
        jmoonEuropa.interactive = true;
        jmoonEuropa.on('pointerdown', function() {
            Solar.changeSceneTo("europa");
        });
    
    content.addChild(jmoonEuropa);
    
    var jmoonGanymede = new PIXI.Sprite(resources.jMoonGanymede.texture);
        jmoonGanymede.width = 200;
        jmoonGanymede.height = 200;
        jmoonGanymede.anchor.set(0.5);
        jmoonGanymede.x = 650;
        jmoonGanymede.y = 225;
    
    content.addChild(jmoonGanymede);
    
    var jmoonCallisto = new PIXI.Sprite(resources.jMoonCallisto.texture);
        jmoonCallisto.width = 190;
        jmoonCallisto.height = 190;
        jmoonCallisto.anchor.set(0.5);
        jmoonCallisto.x = 950;
        jmoonCallisto.y = 450;
    
    content.addChild(jmoonCallisto);

        // Make it interactive
        jmoonCallisto.interactive = true;
        jmoonCallisto.on('pointerdown', function() {
            Solar.changeSceneTo("callisto");
        });
    
    
    
	//Change the default transition
	scene.transition = async function() {
		
        //Stop clickability
        deactivatePlanets();
        hideSlider();
        
		//If it's from the idle scene, we do something special
		//if (Solar.currentScene.name == "idle") {
            
            //While the real jupiter is on the stage, let's grab its coordinates
            var planetPos = targetPlanet.getGlobalPosition();
            //And set our jupiter to them
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
        
        //While the real jupiter is on the stage, let's grab its coordinates
        var planetPos = targetPlanet.getGlobalPosition();
        
        Animate.to(backbutton,500,{alpha:0,
                                   easing:Easing.easeInOut});
        
        await Animate.to(content,500,{alpha:0,easing:Easing.easeInOut});
        
        
        await Animate.to(infobox,1500,{x:2000,y:50,easing:Easing.easeInOut});
        
        //Animate solar system back in
        solarSystem.alpha = 0;
        app.stage.addChildAt(solarSystem,1);
        Animate.to(solarSystem,3000,{alpha:1,easing:Easing.easeInOut});
        
        //Animate the jupiter back.
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
		Solar.changeSceneTo("jupiter");
    
	});
	
	//When done, head back
    backbutton.interactive = false;
	backbutton.on('pointerdown', function() {
		Solar.changeSceneTo('idle');
    });
    
    //make callisto clicky
    jmoonCallisto.interactive = true;
	jmoonCallisto.on('pointerdown', function() {
		Solar.changeSceneTo('callisto');
    content.alpha = 1;
	});
    
    //When done, head back
    jmoonGanymede.interactive = true;
    jmoonGanymede.on('pointerdown', function() {
        Solar.changeSceneTo('ganymede');
    });
	
});
