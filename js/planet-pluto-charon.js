//Create our scene
var charonScreen = new Solar.Scene("charon");

//Queue up our files we'll need
Solar.loader.add("charonPluto",'img/charonPluto.jpg');
Solar.loader.add("plutoVearth",'img/plutoVearth.jpg');

//When things are loaded, do the stuff necessary to make it work
Solar.loader.on('complete',function(loader,resources) {
    
    //Namespace
    var scene = charonScreen;
    var targetPlanet = pluto;
    
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
    var title = new PIXI.Text("Charon",titleStyle);
        title.x = 1200;
        title.y = 100;
    
    //Add to content
    content.addChild(title);
            
    //Info box text
    var text = new PIXI.Text("• Was found by Jim Christy in 1978, by accident. \n\n • Charon's orbit around Pluto takes 6.4 Earth days. \n\n • Got its name after a mythological ferryman who carried souls across the river Acheron, one of the five mythical rivers that surrounded Pluto's underworld.",textStyle);
        text.x = 1200;
        text.y = 180;
    
    //Add to content
    content.addChild(text);

    //Add photo to container
    var charonPluto = new PIXI.Sprite(resources.charonPluto.texture);
        charonPluto.width = 300;
        charonPluto.height = 300;
        charonPluto.x = 1200;
        charonPluto.y = 750;
        charonPluto.alpha = 1;

    //Add photo to content
    content.addChild(charonPluto);    

     //Add photo to container
     var plutoVearth = new PIXI.Sprite(resources.plutoVearth.texture);
     plutoVearth.width = 400;
     plutoVearth.height = 300;
     plutoVearth.x = 1500;
     plutoVearth.y = 750;
     plutoVearth.alpha = 1;

    //Add photo to content
    content.addChild(plutoVearth);   
    
    //Add the content container to the scene
    scene.addChild(content);
    
    var backbutton = new PIXI.Sprite(resources.backbutton.texture);
        backbutton.width = 120;
        backbutton.height = 120;
        backbutton.x = 0;
        backbutton.y = 960;
        backbutton.alpha = 1;
    
    scene.addChild(backbutton);
    
    
    
    //Create our copy of pluto
    var planet = new PIXI.Sprite(resources.pluto.texture);
        planet.width = 1080;
        planet.height = 1080;
        planet.anchor.set(0.5);
		planet.x = 540;
		planet.y = centerY;
	
	//Add our Pluto to the scene
    scene.addChildAt(planet,1);
    
    //create our copy of Charon
    var moon = new PIXI.Sprite(resources.charon.texture);
        moon.width = 350;
        moon.height = 350;
        moon.anchor.set(0.5);
        moon.x = 200;
        moon.y = 200;
    
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
            height:1500,
            width:1500,
            x:0,
            y:0,
            alpha:.6,
            easing:Easing.easeInOut
        });
        await Animate.to(moon,3000,{
            height:650,
            width:650,
            x:540,
            y:centerY,
            easing:Easing.easeInOut
        });

        //Fade in content
        await Animate.to(content,1000,{alpha:1,easing:Easing.easeInOut});

        //Drift the earth and moon a bit
        Animate.to(moon,10000,{
            x:600,
            easing:Easing.easeInOut
        });
		
	}
	

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
        await Animate.to(moon,3000,{
            height:350,
            width:350,
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

        Solar.startScene('pluto');
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
