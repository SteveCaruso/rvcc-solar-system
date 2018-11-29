/*
 * Timeline frames
 */

TIMELINE_TIME=1000;

//Create our scene
var timeline1Bang = new Solar.Scene("timeline: big bang");
var timeline2Dust = new Solar.Scene("timeline: stellar dust");
var timeline3Disk = new Solar.Scene("timeline: accretion disk");
var timeline5Giant = new Solar.Scene("timeline: red giant");
var timeline6Dwarf = new Solar.Scene("timeline: white dwarf");
var timeline7Death = new Solar.Scene("timeline: death");

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

var tlDataIn={
    alpha: 1,
    easing: Easing.EaseInOut
}

var tlDataOut={
    alpha: 0,
    easing: Easing.EaseInOut
}

//When things are loaded, do the stuff necessary to make it work
Solar.loader.on('complete', function(loader, resources) {
    /*var nineslice=new PIXI.mesh.NineSlicePlane(loader.resources.nineslice.texture, 16, 16, 16, 16);
    nineslice.x=32;
    nineslice.y=32;
    nineslice.width=480;
    nineslice.height=480;
    nineslice.alpha=0;
    
    timeline.addChild(nineslice);*/
    
    assignTLTransitionIn(timeline1Bang);
    assignTLTransitionOut(timeline1Bang);
    
    assignTLTransitionIn(timeline2Dust);
    assignTLTransitionOut(timeline2Dust);
    
    assignTLTransitionIn(timeline3Disk);
    assignTLTransitionOut(timeline3Disk);
    
    assignTLTransitionIn(timeline5Giant);
    assignTLTransitionOut(timeline5Giant);
    
    assignTLTransitionIn(timeline6Dwarf);
    assignTLTransitionOut(timeline6Dwarf);
    
    assignTLTransitionIn(timeline7Death);
    assignTLTransitionOut(timeline7Death);
});

function assignTLTransitionIn(timeline){
    timeline.transition=async function(){
        app.stage.addChild(timeline);
        await Animate.to(timeline, TIMELINE_TIME, tlDataIn);
    }
}

async function assignTLTransitionOut(timeline){
    timeline.transitionOut=async function(){
        await Animate.to(timeline, TIMELINE_TIME, tlDataOut);
        app.stage.removeChild(timeline);
    }
}