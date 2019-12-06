//Create our scene
var titanScreen = new Solar.Scene("titan");

//here you load the images that you will use on the info box
//images have to be in the same folde as planets ...\rvcc-solar-system\img
Solar.loader.add("titan_c","img/titan_c.jpg");
Solar.loader.add("titan_outline","img/titan_outline.jpg");

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
    var title = new PIXI.Text("Titan",titleStyle);
        title.x = 1200;
        title.y = 100;
    
    //Add to content
    content.addChild(title);
            
   //Info box text
   var textTitan = new PIXI.Text("• Name origin: Titan's name comes from Greek mythology. The Titans were elder gods who ruled the universe before the Olympians came to power. \n\n• Orbit: 16 days. \n\n • Size: 1,600 miles in diameter. \n\n• Fun Fact: It is the only known moon with an atmosphere, mostly nitrogen. Also Titan is the most Earth-like place we know of.",textStyle);
   textTitan.x = 1200;
   textTitan.y = 180;

    //Add to content
    content.addChild(textTitan);

    //Add images 
    //these have to be loaded before hand top of this page (scroll up)

    var img1 = new PIXI.Sprite(resources.titan_c.texture);   
    
        img1.width = 216;
        img1.height = 162;
        //img1.anchor.set(0.5);
        img1.x= 1275;
        img1.y= 780;
        //img1.filters = [new PIXI.filters.DropShadowFilter()]
        img1.interactive = true;
        //img1.on('pointerdown', imageCenter());
        
    content.addChild(img1);
    
    var img2 = new PIXI.Sprite(resources.titan_outline.texture);   
    
        img2.width = 216;
        img2.height = 162;
        img2.x= 1565;
        img2.y= 780;

        //make it interactive
       //img2.interactive = true;
        //img2.on('pointerdown', imageCenter());
        content.addChild(img2);

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
        //await Animate.to(infobox,500,{alpha:1});

        //Remove old scene
        app.stage.removeChild(Solar.currentScene);

        //Fix scrim
        scrim.alpha = .75;

        //Resize panel
        //await Animate.to(infobox,500,{height:1030});

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

        //info about Titan
        await Animate.to(content,1000,{alpha:1,easing:Easing.easeInOut});

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
        await Animate.to(content,500,{alpha:0,easing:Easing.easeInOut});

        //Animate.to(infobox,500,{height:1020});
        
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
        //Set it to false to prevent mashing
        backbutton.interactive = false;

        //Transition out
        await scene.transitionOut();
  
        //Re-enable button
        backbutton.interactive = true;
	});
    
    function imageCenter() {
        img1.width = 800;
        img1.height = 600;
        img1.x=  app.view.width/2;
        img1.y = app.view.height/2;
    }
});