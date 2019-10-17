//Create our scene
var phobosScreen = new Solar.Scene("phobos");

//Queue up our files we'll need
//None!

//When things are loaded, do the stuff necessary to make it work
Solar.loader.on('complete',function(loader,resources) {
    
    //Namespace
    var scene = phobosScreen;
    var targetPlanet = mars;
    
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
        infobox.x = 1150;
        infobox.y = 50;
    
    scene.addChild(infobox);
    
    
    
    //Content container
    var content = new PIXI.Container();
        content.alpha = 0;
    
    //Info box title
    var title = new PIXI.Text("Mars",titleStyle);
        title.x = 1200;
        title.y = 100;
    
    //Add to content
    //content.addChild(title);
            
    //Info box text
    var text = new PIXI.Text("• Day: 24.6 Hours \n\n• Year: 687 Earth Days \n\n• Size: 4,212 miles in diameter \n\n• Distance from Sun: 142 million miles \n\n• Rocky, volcanoes, impact craters, and\n  winds \n\n• Avg. Temperature: -81 degrees \n\n• Atmosphere: Carbon Dioxide, Argon,\n  Nitrogen, Low Oxygen, and Low Water\n  Vapor \n\n• Moons: Phobos, Deimos",textStyle);
        text.x = 1200;
        text.y = 180;
    
    //Add to content
    //content.addChild(text);
    
    //Add the content container to the scene
    scene.addChild(content);
    
    var backbutton = new PIXI.Sprite(resources.backbutton.texture);
        backbutton.width = 120;
        backbutton.height = 120;
        backbutton.x = 0;
        backbutton.y = 960;
        backbutton.alpha = 1;
    
    scene.addChild(backbutton);
    
    
    
    //Create our copy of mars
    var planet = new PIXI.Sprite(resources.mars.texture);
        planet.width = 1080;
        planet.height = 1080;
        planet.anchor.set(0.5);
		planet.x = 540;
		planet.y = centerY;
	
	//Add our mars to the scene
    scene.addChildAt(planet,1);
    
    var phobos = new PIXI.Sprite(resources.phobos.texture);
        phobos.width = 225;
        phobos.height = 225;
        phobos.anchor.set(0.5);
        phobos.x = 150;
        phobos.y = 150;
    
    scene.addChild(phobos);
    
    var deimos = new PIXI.Sprite(resources.deimos.texture);
        deimos.width = 225;
        deimos.height = 225;
        deimos.anchor.set(0.5);
        deimos.x = 1000;
        deimos.y = 400;
    
    scene.addChild(deimos);
	
    
	//Change the default transition
	scene.transition = async function() {
        
        //Set scrim alpha to 0
        scrim.alpha = 0;

    	//Set alpha to zero
        scene.alpha = 1;

        //Set infopanel to transparent
        infobox.alpha = 0;

        //Add to stage
        app.stage.addChild(scene);
        
        //Fade in
        await Animate.to(infobox,500,{alpha:1});

        //Remove old scene
        app.stage.removeChild(Solar.currentScene);

        //Fix scrim
        scrim.alpha = .75;

        //Shrink panel
        await Animate.to(infobox,500,{height:700});

        //Move planet and phobos
        Animate.to(planet,3000,{
            height:2000,
            width:2000,
            x:0,
            y:0,
            alpha:.6,
            easing:Easing.easeInOut
        });
        Animate.to(deimos,3000,{
            x:1000,
            y:-150,
            alpha: 1,
            easing:Easing.easeInOut
        });
        await Animate.to(phobos,3000,{
            height:750,
            width:750,
            x:540,
            y:centerY,
            alpha: 1,
            easing:Easing.easeInOut
        });

        //Fade in content
        //Here later.

        //Drift mars and phobos a bit
        Animate.to(phobos,10000,{
            x:600,
            easing:Easing.easeInOut
        });
		
	}
	

	//Change the transition out.
	scene.transitionOut = async function() {
        
        //Move them back!
        Animate.to(infobox,500,{height:1020});
        
        Animate.to(planet,3000,{
            height:1080,
            width:1080,
            x:540,
            y:centerY,
            alpha:1,
            easing:Easing.easeInOut
        });
        Animate.to(deimos,3000,{
            x: 1000,
            y: 400,
            easing:Easing.easeInOut
        });
        await Animate.to(phobos,3000,{
            height:225,
            width:225,
            x:150,
            y:150,
            easing:Easing.easeInOut
        });

        //Fix panel
        Animate.to(infobox,500,{height:1020});

        //Fix scrim
        scrim.alpha = 0;

        //Add scene
        app.stage.removeChild(Solar.incomingScene);

        //Remove old scene
        app.stage.removeChild(scene);

        Solar.startScene('mars');
    }
    
    /*
	//Set the event listeners
	targetPlanet.interactive = true;
    targetPlanet.on('pointerdown', function() {
		Solar.changeSceneTo("mars");
	});
	*/
	//When done, head back
    backbutton.interactive = true;
	backbutton.on('pointerdown', async function() {
        await scene.transitionOut();
	});
	
});
