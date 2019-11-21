//Create our scene
var ganymedeScreen = new Solar.Scene("ganymede");

//Queue up our files we'll need
//None!

//When things are loaded, do the stuff necessary to make it work
Solar.loader.on('complete',function(loader,resources) {
    
    //Namespace
    var scene = ganymedeScreen;
    var targetPlanet = earth;
    
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
    var title = new PIXI.Text("Ganymede",titleStyle);
        title.x = 1200;
        title.y = 100;
    
    //Add to content
    content.addChild(title);
            
    //Info box text; insert the rest of information
    var textGany = new PIXI.Text("Ganymede\n\n•INSERT INFO HERE", textStyle);
        textGany.x = 1200;
        textGany.y = 180;
    
    //Add to content
    content.addChild(textGany);
    
    //Add the content container to the scene
    scene.addChild(content);
    
    var backbutton = new PIXI.Sprite(resources.backbutton.texture);
        backbutton.width = 120;
        backbutton.height = 120;
        backbutton.x = 0;
        backbutton.y = 960;
        backbutton.alpha = 1;
    
    scene.addChild(backbutton);
    
    
    //Create our copy of jupiter
    var planet = new PIXI.Sprite(resources.jupiter.texture);
        planet.width = 1080;
        planet.height = 1080;
        planet.anchor.set(0.5);
		planet.x = 540;
		planet.y = centerY;
	
	//Add our Jupiter to the scene
    scene.addChildAt(planet,1);
    var moon = new PIXI.Sprite(resources.jMoonGanymede.texture);
        moon.width = 200; 
        moon.height = 200; 
        moon.anchor.set(0.5);
        moon.x = 650;
        moon.y = 225;
    
    scene.addChild(moon);

    
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


        //Move planet and moon
        Animate.to(planet,3000,{
            height:2000,
            width:2000,
            x:0,
            y:0,
            alpha:.6,
            easing:Easing.easeInOut
        });

        await Animate.to(moon,3000,{
            height:750,
            width:750,
            x:540,
            y:centerY,
            easing:Easing.easeInOut
        });

        //Fade in content
        //Here later.

        //Drift jupiter and moon a bit
        Animate.to(moon,10000,{
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
        await Animate.to(moon,3000,{
            height:200,
            width:200,
            x:650,
            y:225,
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

        Solar.startScene('jupiter');
    }
    
    /*
	//Set the event listeners
	targetPlanet.interactive = true;
    targetPlanet.on('pointerdown', function() {
		Solar.changeSceneTo("earth");
	});
	*/
	//When done, head back
    backbutton.interactive = true;
	backbutton.on('pointerdown', async function() {
        await scene.transitionOut();
	});
	
});
