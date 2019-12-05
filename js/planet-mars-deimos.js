//Create our scene
var deimosScreen = new Solar.Scene("deimos");

//Queue up our files we'll need
//None!

//When things are loaded, do the stuff necessary to make it work
Solar.loader.on('complete',function(loader,resources) {
    
    //Namespace
    var scene = deimosScreen;
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
    var title = new PIXI.Text("Deimos",titleStyle);
        title.x = 1200;
        title.y = 100;
    
    //Add to content
    content.addChild(title);
            
    //Info box text
    var text = new PIXI.Text("• Deimos: Son of Ares also the god of war \n\n• Orbit: Takes 30.3 hours to orbit around mars \n\n• Size: 12.4 km \n\n• Average Temperature: -40.15 degrees \n• Smooth surface and has two craters \n\n• Deimos rises in the east and sets in the west every 2.7 days \n\n• Visited by a number of aircrafts \n\n Orbital Period: 1.3 days  \n\n",textStyle);
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
        backbutton.alpha = 1;
    
    scene.addChild(backbutton);
    
    
    
    //Create our copy of the Mars
    var planet = new PIXI.Sprite(resources.mars.texture);
        planet.width = 1080;
        planet.height = 1080;
        planet.anchor.set(0.5);
		planet.x = 540;
		planet.y = centerY;
	
	//Add our Mars to the scene
    scene.addChildAt(planet,1);
    
    

    var deimos = new PIXI.Sprite(resources.deimos.texture);
        deimos.width = 225;
        deimos.height = 225;
        deimos.anchor.set(0.5);
        deimos.x = 1000;
        deimos.y = 400;
    
    scene.addChild(deimos);
	
    var phobos = new PIXI.Sprite(resources.phobos.texture);
        phobos.width = 225;
        phobos.height = 225;
        phobos.anchor.set(0.5);
        phobos.x = 150;
        phobos.y = 150;
    
    scene.addChild(phobos);

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

        //Fix scrm
        scrim.alpha = .75;

        //Shrink panel
       

        //Move planet and moon
         Animate.to(planet,3000,{
            height:2000,
            width:2000,
            x:0,
            y:0,
            alpha:.6,
            easing:Easing.easeInOut
        });
        
        Animate.to(phobos,3000,{
            x:150,
            y:-150,
            alpha: 1,
            easing:Easing.easeInOut
        });
        
        await Animate.to(deimos,3000,{
            height:700,
            width:700,
            x:540,
            y:centerY,
            alpha: 1,
            easing:Easing.easeInOut
        });

        //Fade in content
        //Here later.
        
        


        Animate.to(content,3000,{
            alpha:1,
            easing:Easing.easeInOut
        });

         Animate.to(deimos,3000,{
            x:600,
            easing:Easing.easeInOut
        });

		

		
    }

        //Drift the mars and deimos a bit
       
	

	//Change the transition out.
	scene.transitionOut = async function() {
        
        //Move them back!
        Animate.to(infobox,500,{height:1020});
        
        Animate.to(content,1000,{alpha:0,easing:Easing.easeInOut});

        Animate.to(planet,3000,{
            height:1080,
            width:1080,
            x:540,
            y:centerY,
            alpha:1,
            easing:Easing.easeInOut
        });

        Animate.to(phobos,3000,{
            x:150,
            y:150,
            alpha: 1,
            easing:Easing.easeInOut
        });

        await Animate.to(deimos,3000,{
            height:225,
            width:225,
            x:1000,
            y:400,
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
		Solar.changeSceneTo("earth");
	});
	*/
	//When done, head back
    backbutton.interactive = true;
	backbutton.on('pointerdown', async function() {
        backbutton.interactive = false;
        await scene.transitionOut();
        backbutton.interactive = true;
	});
	
});
