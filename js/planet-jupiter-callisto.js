//Create our scene
var callistoScene = new Solar.Scene("callisto");

//Queue up our files we'll need
//None!

//When things are loaded, do the stuff necessary to make it work
Solar.loader.on('complete', function (loader, resources) {
    
    //Namespace
    var scene = callistoScene;
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
        infobox.x = 1150;
        infobox.y = 50;
    
    scene.addChild(infobox);
    
    
    
    //Content container/
    var content = new PIXI.Container();
        content.alpha = 0;
    
    //Info box title
    var title = new PIXI.Text("Callisto",titleStyle);
        title.x = 1200;
        title.y = 100;
    
    //Add to content
    content.addChild(title);
            
    //Info box text
    var text = new PIXI.Text("• Day: 1 Callisto day = 16.7 Earth days, or 400 hours \n\n• Year: 365.25 Days\n\n• Size: 2,995 miles in diameter\n\n• Distance from sun: 484 million miles\n\n• Avg. Temperature: -218.47 degrees Fahrenheit (-139.2 Celsius)\n\n• Atmosphere: Extremely thin layer of carbon dioxide and molecular oxygen",textStyle);
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

    var planet = new PIXI.Sprite(resources.jupiter.texture);
        planet.width = 1080;
        planet.height = 1080;
        planet.anchor.set(0.5);
        planet.x = 540;
        planet.y = centerY;
    scene.addChildAt(planet,1);

    var jmoonIo = new PIXI.Sprite(resources.jMoonIo.texture);
        jmoonIo.width = 138;
        jmoonIo.height = 138;
        jmoonIo.anchor.set(0.5);
        jmoonIo.x = 150;
        jmoonIo.y = 150;
    scene.addChild(jmoonIo);

    var jmoonEuropa = new PIXI.Sprite(resources.jMoonEuropa.texture);
        jmoonEuropa.width = 125;
        jmoonEuropa.height = 125;
        jmoonEuropa.anchor.set(0.5);
        jmoonEuropa.x = 350;
        jmoonEuropa.y = 250;
     scene.addChild(jmoonEuropa);

    var jmoonGanymede = new PIXI.Sprite(resources.jMoonGanymede.texture);
        jmoonGanymede.width = 200;
        jmoonGanymede.height = 200;
        jmoonGanymede.anchor.set(0.5);
        jmoonGanymede.x = 650;
        jmoonGanymede.y = 225;
    scene.addChild(jmoonGanymede);

    var jmoonCallisto = new PIXI.Sprite(resources.jMoonCallisto.texture);
        jmoonCallisto.width = 190;
        jmoonCallisto.height = 190;
        jmoonCallisto.anchor.set(0.5);
        jmoonCallisto.x = 950;
        jmoonCallisto.y = 450;
    scene.addChild(jmoonCallisto);
    
//Change the default transition
	scene.transition = async function(){
        
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
        
        // Fade out old moons
        Animate.to(jmoonGanymede,300,{alpha:0});
        Animate.to(jmoonEuropa,300,{alpha:0});
        Animate.to(jmoonIo,300,{alpha:0});

       //Remove old scene
        app.stage.removeChild(Solar.currentScene);

        //Fix scrim
        scrim.alpha = .75;

        //Shrink panel
        await Animate.to(infobox,500,{height:950});


        //Move planet and moon
        Animate.to(planet,3000,{
            height:2000,
            width:2000,
            x:0,
            y:0,
            alpha:.6,
            easing:Easing.easeInOut
        });
        
        await Animate.to(jmoonCallisto,3000,{
            height:750,
            width:750,
            x:540,
            y:centerY,
            easing:Easing.easeInOut
        });

        //Fade in content
       
         Animate.to(content,500,{alpha:1,easing:Easing.easeInOut});
        

        //Drift the earth and moon a bit
        Animate.to(jmoonCallisto,10000,{
            x:600,
            easing:Easing.easeInOut
        });
		
	}
	

    
    
    
    
    
    
    
    
    
    
    
    
	//Change the transition out.
	scene.transitionOut = async function() {
        
        //Move them back!
        await Animate.to(content,500,{alpha:0,easing:Easing.easeInOut});
        
        Animate.to(infobox,500,{height:1020});
        
        Animate.to(planet,3000,{
            height:1080,
            width:1080,
            x:540,
            y:centerY,
            alpha:1,
            easing:Easing.easeInOut
        });
        await Animate.to(jmoonCallisto,3000,{
            height:190,
            width:190,
            x:950,      
            y:450,
            easing:Easing.easeInOut
        });

        // Fade in old moons
        await Animate.to(jmoonGanymede,300,{alpha:1});
        await Animate.to(jmoonEuropa,300,{alpha:1});
        await Animate.to(jmoonIo,300,{alpha:1});
        
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

    //When done, head back
    backbutton.interactive = true;
    backbutton.on('pointerdown', async function() {
        await scene.transitionOut();
    });
});