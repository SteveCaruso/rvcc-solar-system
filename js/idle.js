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
	//	.add("moon","img/moon.png")		//The Moon
	.add("mars","img/mars.png")			//Mars
	//We need some real asteroids here
    .add("spaaace","img/spaaace.png")	//spaaace
	.add("jupiter","img/jupiter.png")	//Jupiter
	.add("saturn","img/saturn.png")		//Saturn
	.add("uranus","img/uranus.png")		//That Planet
	.add("neptune","img/neptune.png")	//Neptune
	.add("pluto","img/pluto.png")		//Pluto
	

// A style for the text
var style = new PIXI.TextStyle({
	fontFamily: 'Constantina',
	fontSize: 36,
	fontWeight: 'bold',
	fill: ['#ffffff']
	});

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


//When things are loaded, do the stuff necessary to make it work
Solar.loader.on('complete', function(loader, resources) {
    
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
		mercuryText.y = (mercury.y - ((mercury.height/2) + style.fontSize));
		mercuryText.alpha = 0;

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
		venusText.y = (venus.y - ((venus.height/2) + style.fontSize));
		venusText.alpha = 0;

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
		earthText.y = (earth.y - ((earth.height/2) + style.fontSize));
		earthText.alpha = 0;

	//Earth's Orbit
	earthOrbit = new PIXI.Container();

	//Add Earth to Earth's Orbit (duh...)
	earthOrbit.addChild(earthRing);
	earthOrbit.addChild(earth);
	earthOrbit.addChild(earthText);

	//Add Earth's orbit to the Solar System
	solarSystem.addChild(earthOrbit);

		//The Moon's Orbit
		theMoon = new PIXI.Sprite(resources.mercury.texture);
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
		marsText.y = (mars.y - ((mars.height/2) + style.fontSize));
		marsText.alpha = 0;

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

	asterOrbit=new PIXI.Container;
	//asterOrbit.addChild(asterRing);

	for (var i=0; i<asterCount; i++){
		var asteroid=new PIXI.Sprite(resources.mars.texture); // add an asteroid picture later
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

			asterOrbit.addChild(asteroid);
		}

	solarSystem.addChild(asterOrbit);

    // this is very important
    spaaace = new PIXI.Sprite(resources.spaaace.texture);
    spaaace.width = 12;
    spaaace.height = 12;
    spaaace.anchor.set(0.5);
    spaaace.x = 420;
    
    spaaaceOrbit = new PIXI.Container();
	spaaaceOrbit.addChild(spaaace);
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
		jupiterText.y = (jupiter.y - ((jupiter.height/2) + jupiterText.style.fontSize));
		jupiterText.alpha = 0;

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
		saturnText.y = (saturn.y - ((saturn.height/2) + style.fontSize));
		saturnText.alpha = 0;

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
		uranusText.y = (uranus.y - ((uranus.height/2) + style.fontSize));
		uranusText.alpha = 0;

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
		neptuneText.y = (neptune.y - ((neptune.height/2) + style.fontSize));
		neptuneText.alpha = 0;

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
		plutoText.y = (pluto.y - ((pluto.height/2) + style.fontSize));
		plutoText.alpha = 0;

	plutoOrbit=new PIXI.Container();

		plutoOrbit.addChild(plutoRing);
		plutoOrbit.addChild(pluto);
		plutoOrbit.addChild(plutoText);

		solarSystem.addChild(plutoOrbit);

	//Base rate of orbit
	var base = .0005;
	var orbiting = false;

	orbit = function () {
	
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

		//Get the planets spinning
		setTimeout(function() {
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
			Animate.loop(asterOrbit,function(delta) {
				asterOrbit.rotation = (base / (1000/365.25) * delta) % (2*Math.PI);
			});
            Animate.loop(spaaaceOrbit,function(delta) {
				spaaaceOrbit.rotation = -(base / (1000/365.25) * delta) % (2*Math.PI);
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
			//Move the solar system to the center
			Animate.to(solarSystem,3000,{x:centerX,y:centerY,easing:Easing.easeInOut});
			Animate.to(theSun,3000,{width:200,height:200,x:0,easing:Easing.easeInOut})
				.then(_ => Animate.loop(theSun,function(delta) {
					theSun.width = 200 + ( Math.sin(delta/1000) * 3 );
					theSun.height = 200 + ( Math.cos(delta/1000) * 3 );
				}));
	
		},500);

	}

	lineup = function() {
	
		orbiting = false;
		//Line up the planets
		Animate.to(mercuryOrbit,3000,{rotation:0,easing:Easing.easeInOut});
		Animate.to(venusOrbit,3000,{rotation:0,easing:Easing.easeInOut});
		Animate.to(earthOrbit,3000,{rotation:0,easing:Easing.easeInOut});
			Animate.to(theMoonOrbit,3000,{rotation:Math.PI/2,easing:Easing.easeInOut});
		Animate.to(marsOrbit,3000,{rotation:0,easing:Easing.easeInOut});
		Animate.to(jupiterOrbit,3000,{rotation:0,easing:Easing.easeInOut});
		Animate.to(saturnOrbit,3000,{rotation:0,easing:Easing.easeInOut});
		Animate.to(uranusOrbit,3000,{rotation:0,easing:Easing.easeInOut});
		Animate.to(neptuneOrbit,3000,{rotation:0,easing:Easing.easeInOut});
		Animate.to(plutoOrbit,3000,{rotation:0,easing:Easing.easeInOut});
		//Move the solar system to the left
		Animate.to(solarSystem,3000,{x:100,y:centerY,easing:Easing.easeInOut});
		//Make the sun BIG
		Animate.to(theSun,3000,{width:2000,height:2000,x:-750});
	
		var speed = 250;

		setTimeout(function() {
			// adding the name text
			Animate.to(mercuryText,speed,{alpha:1})
				.then( _=> Animate.to(venusText,speed,{alpha:1}))
				.then( _=> Animate.to(earthText,speed,{alpha:1}))
				.then( _=> Animate.to(marsText,speed,{alpha:1}))
				.then( _=> Animate.to(jupiterText,speed,{alpha:1}))
				.then( _=> Animate.to(saturnText,speed,{alpha:1}))
				.then( _=> Animate.to(uranusText,speed,{alpha:1}))
				.then( _=> Animate.to(neptuneText,speed,{alpha:1}))
				.then( _=> Animate.to(plutoText,speed,{alpha:1}));
		},3000);

		//Move the solar system to the left
		Animate.to(solarSystem,3000,{x:100,y:centerY,easing:Easing.easeInOut});

		//Make the sun BIG
		Animate.to(theSun,3000,{width:2000,height:2000,x:-750});

	}

	orbit();

	theSun.interactive = true;

	theSun.on('click',function() {
			if (orbiting) lineup();
			else orbit();
			//setTimeout(orbit,10000);
	});

	//Begin everything
	setTimeout(function() {
		Solar.startScene("idle")
	},1000);

	//addSlider();

});
