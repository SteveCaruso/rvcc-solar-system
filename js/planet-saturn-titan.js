//Create our scene
var titanScreen = new Solar.Scene("titan");

//Queue up our files we'll need
//None!

//When things are loaded, do the stuff necessary to make it work
Solar.loader.on('complete',function(loader,resources) {
    
    //Namespace
    var scene = titanScreen;
    var targetPlanet = saturn;
    
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
    var title = new PIXI.Text("saturn",titleStyle);
        title.x = 1200;
        title.y = 100;
    
    //Add to content
    //content.addChild(title);
            
    //Info box text
    var text = new PIXI.Text("• Day: 10.7 Earth Days \n\n• Year: 29 Earth Years \n\n• Size: 74,897 miles in diameter \n\n• Distance from Sun: 886 million miles \n\n• Avg. Temperature:\n  about -288 degrees \n\n• Atmosphere: Hydrogen, Helium \n\n• The rings are mostly made of\n  ice and rock \n\n• Moons: 62 (Titan in Display)",textStyle);
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
    
    
    //Create our copy of the Saturn
    var planet = new PIXI.Sprite(resources.saturn.texture);
        planet.width = 2160;
        planet.height = 1080;
        planet.anchor.set(0.5);
		planet.x = 540;
		planet.y = centerY;
	
	//Add our Saturn to the scene
    scene.addChildAt(planet,1);
    var titan = new PIXI.Sprite(resources.titan.texture);
        titan.width = 400;
        titan.height = 400;
        titan.anchor.set(0.5);
        titan.x = 200;
        titan.y = 200;
   
    scene.addChild(titan);
	
    
	//Change the default transition
	scene.transition = async function() {
        
        //Set scrim alpha to 0
        scrim.alpha = 0;

    	//Set alpha to zero
        scene.alpha = 1;

        //Set infopanel to transparent
       //infobox.alpha = 0;

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
            width:4000,
            x:0,
            y:0,
            alpha:.6,
            easing:Easing.easeInOut
        });
        await Animate.to(titan,3000,{
            height:750,
            width:750,
            x:540,
            y:centerY,
            easing:Easing.easeInOut
        });

        //Fade in content
        //Here later.

        //Drift the saturn and titan a bit
        Animate.to(titan,10000,{
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
            width:2160,
            x:540,
            y:centerY,
            alpha:1,
            easing:Easing.easeInOut
        }); 
        
        await Animate.to(titan,3000,{
            height:400,
            width:400,
            x:200,
            y:200,
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

        Solar.startScene('saturn');
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