/*
	The Idle and Lineup Screens
*/

//Create our scene
var solarSystem = new Solar.Scene("idle");
	solarSystem.x = centerX;
	solarSystem.y = centerY;


//Queue up our files we'll need
Solar.loader
	.add("sun","img/sun.png")			//The Sun
	.add("mercury","img/mercury.png")	//Mercury
	.add("venus","img/venus.png")		//Venus
	.add("earth","img/earth.png")		//Earth
	.add("moon","img/moon.png")		//The Moon
	.add("mars","img/mars.png")			//Mars
	.add("asteroid","img/asteroidVesta.png")			//Asteroids
    .add("spaaace","img/spaaace.png")	//spaaace
	.add("jupiter","img/jupiter.png")	//Jupiter
    .add("jMoonIo","img/jupiter-io.png")  // Jupiter's moons
    .add("jMoonEuropa","img/jupiter-europa.png")
    .add("jMoonGanymede","img/jupiter-ganymede.png")
    .add("jMoonCallisto","img/jupiter-callisto.png")
	.add("saturn","img/saturn.png")		//Saturn
	.add("uranus","img/uranus.png")		//That Planet
	.add("neptune","img/neptune.png")	//Neptune
	.add("pluto","img/pluto.png")		//Pluto
	
    .add("milkyway","img/milkyway.jpg") //Background image

// A style for the text
var style = new PIXI.TextStyle({
	fontFamily: 'Constantina',
	fontSize: 36,
	fontWeight: 'bold',
	fill: ['#ffffff']
	});

var textHeight = -75;

var textRotate = -.5;

//Expose the variables that we'll need public
var theSun,
	mercuryOrbit, 	mercury,
	venusOrbit, 	venus,
	earthOrbit, 	earth,
	theMoonOrbit, 	theMoon,
	marsOrbit, 		mars,
	asterOrbit,
    spaaaceOrbit,
	jupiterOrbit, 	jupiter,
	saturnOrbit, 	saturn,
	uranusOrbit,	uranus,
	neptuneOrbit,	neptune,
	plutoOrbit,		pluto,
	
	orbit,
	lineup;

function activatePlanets() {
    theSun.interactive = true;
    mercury.interactive = true;
    venus.interactive = true;
    earth.interactive = true;
    mars.interactive = true;

    jupiter.interactive = true;
    saturn.interactive = true;
    uranus.interactive = true;
    neptune.interactive = true;
    pluto.interactive = true;
    
    spaaace.interactive = true;
}

function deactivatePlanets() {
    theSun.interactive = false;
    mercury.interactive = false;
    venus.interactive = false;
    earth.interactive = false;
    mars.interactive = false;

    jupiter.interactive = false;
    saturn.interactive = false;
    uranus.interactive = false;
    neptune.interactive = false;
    pluto.interactive = false;
    
    spaaace.interactive = false;
}


//When things are loaded, do the stuff necessary to make it work
Solar.loader.on('complete', function(loader, resources) {
    
    var background = new PIXI.Sprite(resources.milkyway.texture);
        var bgheight = Math.sqrt(app.view.width * app.view.width + app.view.height * app.view.height);
        background.height = bgheight;
        background.scale.x = background.scale.y;
        background.anchor.set(0.5);
        background.x = centerX;
        background.y = centerY;
        background.tint = 0x666666;
        app.stage.addChild(background);
    
        Animate.loop(background,function(delta) {
            background.rotation = (-base / 100 * delta) % (2*Math.PI);
        });
    
    solarSystem.transition = async function() {
        if (Solar.incomingScene.name == "earth") {
            //Do nothing
        }
        else {
            solarSystem.defaultTransition();
        }
    };
    
	//The Sun
	theSun = new PIXI.Sprite(resources.sun.texture);
		theSun.width = 200;
		theSun.height = 200;
		theSun.anchor.set(0.5);

	//Add the Sun to the Solar System
	solarSystem.addChild(theSun);

	//Mercury
	mercury = new PIXI.Sprite(resources.mercury.texture);
		mercury.width = 30;
		mercury.height = 30;
		mercury.anchor.set(0.5);
		mercury.x = 125;

	//Make Mercury's trail
	var mercuryRing = new PIXI.Graphics();
		mercuryRing.lineStyle(1, 0xffffff, 1);
		mercuryRing.drawCircle(0,0,125);
		mercuryRing.alpha = .25;

	//Mercury's text
	var mercuryText = new PIXI.Text('Mercury', style);
		mercuryText.x = mercury.x;
		mercuryText.y = textHeight;
		mercuryText.alpha = 0;
        mercuryText.rotation = textRotate;

	//Mercury's Orbit
	mercuryOrbit = new PIXI.Container();

	//Add Mercury to Mercury's Orbit (duh...)
	mercuryOrbit.addChild(mercuryRing);
	mercuryOrbit.addChild(mercury);
	mercuryOrbit.addChild(mercuryText);

	//Add Mercury's orbit to the Solar System
	solarSystem.addChild(mercuryOrbit);


	//Venus
	venus = new PIXI.Sprite(resources.venus.texture);
		venus.width = 40;
		venus.height = 40;
		venus.anchor.set(0.5);
		venus.x = 195;

	//Make Venus's trail
	var venusRing = new PIXI.Graphics();
		venusRing.lineStyle(1, 0xffffff, 1);
		venusRing.drawCircle(0,0,195);
		venusRing.alpha = .25;

	//Venus's text
	var venusText = new PIXI.Text('Venus', style);
		venusText.x = venus.x;
		venusText.y = textHeight;
		venusText.alpha = 0;
        venusText.rotation = textRotate;

	//Venus's Orbit
	venusOrbit = new PIXI.Container();

	//Add Venus to Venus's Orbit (duh...)
	venusOrbit.addChild(venusRing);
	venusOrbit.addChild(venus);
	venusOrbit.addChild(venusText);

	//Add Venus's orbit to the Solar System
	solarSystem.addChild(venusOrbit);


	//Earth
	earth = new PIXI.Sprite(resources.earth.texture);
		earth.width = 50;
		earth.height = 50;
		earth.anchor.set(0.5);
		earth.x = 275;

	//Make Earth's trail
	var earthRing = new PIXI.Graphics();
		earthRing.lineStyle(1, 0xffffff, 1);
		earthRing.drawCircle(0,0,275);
		earthRing.alpha = .25;

	//Earth's text
	var earthText = new PIXI.Text('Earth', style);
		earthText.x = earth.x;
		earthText.y = textHeight;
		earthText.alpha = 0;
        earthText.rotation = textRotate;

	//Earth's Orbit
	earthOrbit = new PIXI.Container();

	//Add Earth to Earth's Orbit (duh...)
	earthOrbit.addChild(earthRing);
	earthOrbit.addChild(earth);
	earthOrbit.addChild(earthText);

	//Add Earth's orbit to the Solar System
	solarSystem.addChild(earthOrbit);

		//The Moon's Orbit
		theMoon = new PIXI.Sprite(resources.moon.texture);
		theMoon.width = 20;
		theMoon.height = 20;
		theMoon.anchor.set(0.5);
		theMoon.x = 45;

		//Make The Moon's trail
		var theMoonRing = new PIXI.Graphics();
		theMoonRing.lineStyle(1, 0xffffff, 1);
		theMoonRing.drawCircle(0,0,45);
		theMoonRing.alpha = .25;

		//The Moon's Orbit
		theMoonOrbit = new PIXI.Container();
		theMoonOrbit.x = earth.x;

		//Add the Moon to the Moon's Orbit (duh...)
		theMoonOrbit.addChild(theMoonRing);
		theMoonOrbit.addChild(theMoon);

		//Add the Moon's orbit to the Earth's Orbit
		earthOrbit.addChild(theMoonOrbit);


	//Mars
	mars = new PIXI.Sprite(resources.mars.texture);
		mars.width = 45;
		mars.height = 45;
		mars.anchor.set(0.5);
		mars.x = 350;

	//Make Mars's trail
	var marsRing = new PIXI.Graphics();
		marsRing.lineStyle(1, 0xffffff, 1);
		marsRing.drawCircle(0,0,350);
		marsRing.alpha = .25;

	//Mars's text
	var marsText = new PIXI.Text('Mars', style);
		marsText.x = mars.x;
		marsText.y = textHeight;
		marsText.alpha = 0;
        marsText.rotation = textRotate;

	//Mars's Orbit
	marsOrbit = new PIXI.Container();

	//Add Mars to Mars's Orbit (duh...)
	marsOrbit.addChild(marsRing);
	marsOrbit.addChild(mars);
	marsOrbit.addChild(marsText);

	//Add Mars's orbit to the Solar System
	solarSystem.addChild(marsOrbit);


	//The Asteroid Belt
	//Mike
	var asterCount=250;
	var asterRadius=420;

	var asterRing=new PIXI.Graphics();
		asterRing.lineStyle(1, 0xffffff, 1);
		asterRing.drawCircle(0, 0, asterRadius);
		asterRing.alpha=0.25;

	asterOrbit=new PIXI.Container();
    var asterTwist = new PIXI.Container();
	//asterOrbit.addChild(asterRing);

	for (var i=0; i<asterCount; i++){
		var asteroid=new PIXI.Sprite(resources.asteroid.texture); // add an asteroid picture later
			asteroid.width=Math.floor(Math.random()*4+4);
			asteroid.height=Math.floor(Math.random()*4+4);
		// if you want them to be round just set asteriod.height = asteriod.width
		// if you want them to be potato-shaped leave them alone
			asteroid.anchor.set(0.5);
		var currentRadius=asterRadius+(Math.random()*10)-5;
		var asterAngle=Math.random()*2*3.14159;
		var xx=currentRadius*Math.cos(asterAngle);
		var yy=-currentRadius*Math.sin(asterAngle);
			asteroid.x = xx;
			asteroid.y = yy;

			asterTwist.addChild(asteroid);
		}
    
    asterOrbit.addChild(asterTwist);
    
    Animate.loop(asterTwist,function(delta) {
        asterTwist.rotation = (base / (1000/365.25) * delta) % (2*Math.PI);
    });

	solarSystem.addChild(asterOrbit);

    // this is very important
    spaaace = new PIXI.Sprite(resources.spaaace.texture);
    spaaace.width = 12;
    spaaace.height = 12;
    spaaace.anchor.set(0.5);
    spaaace.x = 420;
    
    spaaace.on("click",async function() {
        var scale = spaaace.scale.x;
        await Animate.to(spaaace,2000,{scale:5});
        await Animate.to(spaaace,2000,{alpha:0});
        spaaace.alpha = 1;
        spaaace.width = 12;
        spaaace.height = 12;
    });
    
    spaaaceOrbit = new PIXI.Container();
    var spaaaceTwist = new PIXI.Container();
    
    
    Animate.loop(spaaaceTwist,function(delta) {
        spaaaceTwist.rotation = (base / (1200/365.25) * delta) % (2*Math.PI);
    });
    
    spaaaceTwist.addChild(spaaace);
    
	spaaaceOrbit.addChild(spaaaceTwist);
    
	solarSystem.addChild(spaaaceOrbit);

	//Jupiter
	// Coriander
	jupiter = new PIXI.Sprite(resources.jupiter.texture);
		jupiter.width = 100;
		jupiter.height = 100;
		jupiter.anchor.set(0.5);
		jupiter.x = 500;

	//Make Jupiter's trail
	var jupiterRing = new PIXI.Graphics();
		jupiterRing.lineStyle(1, 0xffffff, 1);
		jupiterRing.drawCircle(0,0,500);
		jupiterRing.alpha = .25;

	//Jupiter's text
	var jupiterText = new PIXI.Text('Jupiter', style);
		jupiterText.x = jupiter.x;
		jupiterText.y = textHeight;
		jupiterText.alpha = 0;
        jupiterText.rotation = textRotate;

	//Jupiter's Orbit
	var jupiterOrbit = new PIXI.Container();

	//Add Jupiter to Jupiter's Orbit (duh...)
	jupiterOrbit.addChild(jupiterRing);
	jupiterOrbit.addChild(jupiter);
	jupiterOrbit.addChild(jupiterText);

	//Add Jupiter's orbit to the Solar System
	solarSystem.addChild(jupiterOrbit);
	//Coriander

	//Saturn
	//Corey
	saturn = new PIXI.Sprite(resources.saturn.texture);
		saturn.width = 150;
		saturn.height = 75;
		saturn.anchor.set(0.5);
		saturn.x = 650;

	var saturnRing = new PIXI.Graphics();
		saturnRing.lineStyle(1, 0xffffff, 1);
		saturnRing.drawCircle(0,0,650);
		saturnRing.alpha = .25;

	//Saturn's text
	var saturnText = new PIXI.Text('Saturn', style);
		saturnText.x = saturn.x;
		saturnText.y = textHeight;
		saturnText.alpha = 0;
        saturnText.rotation = textRotate;

	saturnOrbit = new PIXI.Container();
		saturnOrbit.addChild(saturnRing, saturn, saturnText);

	solarSystem.addChild(saturnOrbit);
	

	//Uranus
	//Luther
	uranus = new PIXI.Sprite(resources.uranus.texture);
		uranus.width = 75;
		uranus.height = 75;
		uranus.anchor.set(0.5);
		uranus.x = 775;

	//Make uranus's trail
	var uranusRing = new PIXI.Graphics();
		uranusRing.lineStyle(1, 0xffffff, 1);
		uranusRing.drawCircle(0,0,775);
		uranusRing.alpha = .25;

	//Uranus's text
	var uranusText = new PIXI.Text('Uranus', style);
		uranusText.x = uranus.x;
		uranusText.y = textHeight;
		uranusText.alpha = 0;
        uranusText.rotation = textRotate;

	//uranus's Orbit
	uranusOrbit = new PIXI.Container();

	//Add uranus to uranus's Orbit (duh...)
	uranusOrbit.addChild(uranusRing);
	uranusOrbit.addChild(uranus);
	uranusOrbit.addChild(uranusText);

	//Add uranus's orbit to the Solar System
	solarSystem.addChild(uranusOrbit);

	//Neptune
	//John
	neptune=new PIXI.Sprite(resources.neptune.texture);
		neptune.width=60;
		neptune.height=60;
		neptune.anchor.set(0.5);
		neptune.x=870;

	//add neptune ring
	var neptuneRing = new PIXI.Graphics();
		neptuneRing.lineStyle(1, 0xffffff, 1);
		neptuneRing.drawCircle(0,0,870);
		neptuneRing.alpha = .25;

	//Neptune's text
	var neptuneText = new PIXI.Text('Neptune', style);
		neptuneText.x = neptune.x;
		neptuneText.y = textHeight;
		neptuneText.alpha = 0;
        neptuneText.rotation = textRotate;

	neptuneOrbit=new PIXI.Container();

	neptuneOrbit.addChild(neptuneRing);
	neptuneOrbit.addChild(neptune);
	neptuneOrbit.addChild(neptuneText);

	solarSystem.addChild(neptuneOrbit);

	//Pluto
	//Chaz
	pluto = new PIXI.Sprite(resources.pluto.texture);
		pluto.width=20;
		pluto.height=20;
		pluto.anchor.set(0.5);
		pluto.x=925;

	//add pluto ring
	var plutoRing = new PIXI.Graphics();
		plutoRing.lineStyle(1, 0xffffff, 1);
		plutoRing.drawCircle(0,0,925);
		plutoRing.alpha = .25;

	//Pluto's text
	var plutoText = new PIXI.Text('Pluto', style);
		plutoText.x = pluto.x;
		plutoText.y = textHeight+20;
		plutoText.alpha = 0;
        plutoText.rotation = textRotate;

	plutoOrbit=new PIXI.Container();

		plutoOrbit.addChild(plutoRing);
		plutoOrbit.addChild(pluto);
		plutoOrbit.addChild(plutoText);

		solarSystem.addChild(plutoOrbit);

    
    //Title, etc.
    var titleText = new PIXI.Text('The Solar System', {
                                                        fontFamily: 'Constantina',
                                                        fontSize: 75,
                                                        fontWeight: 'bold',
                                                        fill: ['#ffffff']
                                                        });
        titleText.x = centerX - titleText.width - 40;
        titleText.y = -centerY + 20;
    
        solarSystem.addChild(titleText);
    
    var subtitleText = new PIXI.Text('Tap To Interact',{
                                                        fontFamily: 'Constantina',
                                                        fontSize: 50,
                                                        fill: ['#ffffff']
                                                        });
        subtitleText.x = centerX - subtitleText.width - 40;
        subtitleText.y = -centerY + 20 + titleText.height;
        solarSystem.addChild(subtitleText);
    
    
	//Base rate of orbit
	var base = .0005;
	var orbiting = false;

	orbit = async function () {
        
        deactivatePlanets();
        
        hideSlider(1000);
	
		orbiting = true;
	       
		//getting rid of name text
		Animate.to(mercuryText,500,{alpha:0});
		Animate.to(venusText,500,{alpha:0});
		Animate.to(earthText,500,{alpha:0});
		Animate.to(marsText,500,{alpha:0});
		Animate.to(jupiterText,500,{alpha:0});
		Animate.to(saturnText,500,{alpha:0});
		Animate.to(uranusText,500,{alpha:0});
		Animate.to(neptuneText,500,{alpha:0});
		Animate.to(plutoText,500,{alpha:0});
        
        await setTimeout(_=>true,550);
        
        //Bring back to normal size
        var line = {
            rotation:0,
            easing:Easing.easeInOut,
            scale:1
        };
        var linetime = 3000;
        
        Animate.to(mercuryOrbit,linetime,line);
		Animate.to(venusOrbit,linetime,line);
		Animate.to(earthOrbit,linetime,line);
			Animate.to(theMoonOrbit,3000,{rotation:Math.PI/2,easing:Easing.easeInOut});
		Animate.to(marsOrbit,linetime,line);
        Animate.to(asterOrbit,linetime,{
            easing:Easing.easeInOut,
            scale:1
        });
        Animate.to(spaaaceOrbit,linetime,{
            easing:Easing.easeInOut,
            scale:1
        });
		Animate.to(jupiterOrbit,linetime,line);
		Animate.to(saturnOrbit,linetime,line);
		Animate.to(uranusOrbit,linetime,line);
		Animate.to(neptuneOrbit,linetime,line);
		Animate.to(plutoOrbit,linetime,line);
        
        Animate.to(theSun,linetime,{width:200, height:200, x:0, easing:Easing.easeInOut});
        
        //Move the solar system to the center
        await Animate.to(solarSystem,linetime,{x:centerX, y:centerY, easing:Easing.easeInOut});
        
		//Get the planets spinning
        Animate.loop(mercuryOrbit,function(delta) {
            mercuryOrbit.rotation = (base / (176/365.25) * delta) % (2*Math.PI);
        });
        Animate.loop(venusOrbit,function(delta) {
            venusOrbit.rotation = (base / (225/365.25) * delta) % (2*Math.PI);
        });
        Animate.loop(earthOrbit,function(delta) {
            earthOrbit.rotation = (base * delta) % (2*Math.PI);
        });
            Animate.loop(theMoonOrbit, function(delta) {
                theMoonOrbit.rotation = ( (base / (28/365.25) * delta) % (2*Math.PI) ) + Math.PI/2;
            });
        Animate.loop(marsOrbit,function(delta) {
            marsOrbit.rotation = (base / (687/365.25) * delta) % (2*Math.PI);
        });
        Animate.loop(jupiterOrbit,function(delta) {
            jupiterOrbit.rotation = (base / (4332/365.25) * delta) % (2*Math.PI);
        });
        Animate.loop(saturnOrbit, function(delta) {
            saturnOrbit.rotation = (base / (10759/365.25) * delta) % (2*Math.PI);
        });
        Animate.loop(uranusOrbit, function(delta){
            uranusOrbit.rotation = (base/ (42718/365.25) * delta) % (2*Math.PI);
        });
        Animate.loop(neptuneOrbit,function(delta) {
            neptuneOrbit.rotation = (base / (60182/365.25) * delta) % (2*Math.PI);
        });
        Animate.loop(plutoOrbit,function(delta) {
            plutoOrbit.rotation = (base / (90400/365.25) * delta) % (2*Math.PI);
        });
        
        Animate.loop(theSun,function(delta) {
                theSun.width = 200 + ( Math.sin(delta/1000) * 3 );
                theSun.height = 200 + ( Math.cos(delta/1000) * 3 );
        
	    });
    }

	lineup = async function() {
	   
        var line = {
            rotation:.5,
            easing:Easing.easeInOut,
            scale:1.8
        };
        
		orbiting = false;
		//Line up the planets
        Animate.to(mercuryOrbit,3000,line);
		Animate.to(venusOrbit,3000,line);
		Animate.to(earthOrbit,3000,line);
			Animate.to(theMoonOrbit,3000,{rotation:Math.PI/2,easing:Easing.easeInOut});
		Animate.to(marsOrbit,3000,line);
        Animate.to(asterOrbit,3000,{
            easing:Easing.easeInOut,
            scale:1.8
        });
        Animate.to(spaaaceOrbit,3000,{
            easing:Easing.easeInOut,
            scale:1.8
        });
		Animate.to(jupiterOrbit,3000,line);
		Animate.to(saturnOrbit,3000,line);
		Animate.to(uranusOrbit,3000,line);
		Animate.to(neptuneOrbit,3000,line);
		Animate.to(plutoOrbit,3000,line);
		//Move the solar system to the left
		Animate.to(solarSystem,3000,{x:100,y:centerY,easing:Easing.easeInOut});
		//Make the sun BIG
		Animate.to(theSun,3000,{width:2000,height:2000,x:-750});

		//Move the solar system to the left
		Animate.to(solarSystem,3000,{x:200,y:200,easing:Easing.easeInOut});

		//Make the sun BIG
		await Animate.to(theSun,3000,{width:2000,height:2000,x:-750});
        
        var speed = 250;
        
        await Animate.to(mercuryText,speed,{alpha:1})
            .then( _=> Animate.to(venusText,speed,{alpha:1}))
            .then( _=> Animate.to(earthText,speed,{alpha:1}))
            .then( _=> Animate.to(marsText,speed,{alpha:1}))
            .then( _=> Animate.to(jupiterText,speed,{alpha:1}))
            .then( _=> Animate.to(saturnText,speed,{alpha:1}))
            .then( _=> Animate.to(uranusText,speed,{alpha:1}))
            .then( _=> Animate.to(neptuneText,speed,{alpha:1}))
            .then( _=> Animate.to(plutoText,speed,{alpha:1}));
        
        activatePlanets();
        
        showSlider();
    }
    
    /*
	theSun.interactive = true;

	theSun.on('click', function() {
			if (orbiting) lineup();
			else orbit();
			//setTimeout(orbit,10000);
	});*/

	//Begin everything
	setTimeout(async function() {
        await orbit();
		Solar.startScene("idle");
	},500);
    
    app.view.addEventListener('click', function() {
        console.log("Clicked!");
        if (orbiting) {
            lineup();
        }
        
    });
    
    var finalCountDown = 30;
    var finalCountDownTimer = finalCountDown;
    
    setInterval(function() {
        if (Solar.currentScene.name == "idle" 
            && Solar.incomingScene.name == "idle" 
            && !orbiting) {
            
            finalCountDownTimer--;
            console.log('Countdown until idle: ' + finalCountDownTimer);
            if (finalCountDownTimer <= 0) orbit();
            
        }
        else finalCountDownTimer = finalCountDown;
    },1000);
    
    solarSystem.transition = async function() {
        
        var scenes = ['mercury','venus','earth','mars','jupiter','saturn','uranus','neptune','pluto'];
        
        if ( scenes.includes(Solar.currentScene.name) ) {
            Solar.currentScene.transitionOut();
        }
        else {
            solarSystem.defaultTransition();
        }
        
    }

    
	//addSlider();

});
