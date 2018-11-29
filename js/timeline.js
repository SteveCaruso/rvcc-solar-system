/*
 * Timeline frames
 */

//Create our scene
var timeline1Bang = new Solar.Scene("timeline: big bang");
var timeline2Dust = new Solar.Scene("timeline: stellar dust");
var timeline1Disk = new Solar.Scene("timeline: accretion disk");
var timeline1Giant = new Solar.Scene("timeline: red giant");
var timeline1Dwarf = new Solar.Scene("timeline: white dwarf");
var timeline1Death = new Solar.Scene("timeline: death");

//Queue up our files we'll need
/*Solar.loader
	.add("nineslice","img/ui/nineslice.png")*/;
	

// A style for the text
var tlStyle = new PIXI.TextStyle({
	fontFamily: 'Constantina',
	fontSize: 36,
	fontWeight: 'bold',
	fill: ['#ffffff']
});

//When things are loaded, do the stuff necessary to make it work
Solar.loader.on('complete', function(loader, resources) {
    /*var nineslice=new PIXI.mesh.NineSlicePlane(loader.resources.nineslice.texture, 16, 16, 16, 16);
    nineslice.x=32;
    nineslice.y=32;
    nineslice.width=480;
    nineslice.height=480;
    nineslice.alpha=0;
    
    timeline.addChild(nineslice);*/
    
    var dataIn={
        alpha: 1,
        easing: Easing.EaseInOut
    }
    
    var dataOut={
        alpha: 0,
        easing: Easing.EaseInOut
    }
    
    timeline1Bang.transition = async function() {
        app.stage.addChild(timeline1Bang);
		await Animate.to(timeline1Bang,500, dataIn);
	}
	
	timeline1Bang.transitionOut = async function() {
        await Animate.to(timeline1Bang,500, dataOut);
        app.stage.removeChild(timeline1Bang);
        
	}
});
