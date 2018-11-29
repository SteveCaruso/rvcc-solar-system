/*
 * Timeline frames
 */

const TIMELINE_TIME=1000;

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
    
    initTimeline(timeline1Bang, "Big Bang", resources);
    initTimeline(timeline2Dust, "Stellar Dust", resources);
    initTimeline(timeline3Disk, "Accretion Disk", resources);
    initTimeline(timeline5Giant, "Red Giant", resources);
    initTimeline(timeline6Dwarf, "Red Dwarf", resources);
    initTimeline(timeline7Death, "Death", resources);
});

function initTimeline(timeline, name, resources){
    assignTLTransitionIn(timeline);
    assignTLTransitionOut(timeline);
    
    // good to remember: Timelines (and all Solar.Scenes) are just Containers
    var infobox = new PIXI.Sprite(resources.infobox.texture);
        infobox.width = 750;
        infobox.height = 1000;
        infobox.x = 2000;
        infobox.y = 50;
    
    timeline.addChild(infobox);
    
    //Info box title
    var title = new PIXI.Text(name, titleStyle);
        title.x = 1200;
        title.y = 100;
    
    timeline.addChild(title);
            
    //Info box text
    var text = new PIXI.Text("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at sapien a lorem imperdiet ultricies sit amet a urna. Aenean ultrices vel ligula sit amet convallis. Cras rhoncus neque sollicitudin mollis placerat. Cras aliquet velit vitae pulvinar tristique. Quisque id volutpat purus, eu ultricies metus. Nullam laoreet varius nulla, tincidunt gravida ipsum lobortis at. Morbi lacinia consectetur magna, eu maximus ipsum aliquet non. Sed finibus urna vitae arcu gravida sodales.",textStyle);
        text.x = 1200;
        text.y = 180;
    
    //Add to content
    timeline.addChild(text);
    
    // todo nothing's appearing on the new screens except for this,
    // if you uncomment it. also it's appearing over the top of the slider
    // so that ought to be dealt with if you want it to work more than once.
    
    /*var scrim = new PIXI.Graphics();
        scrim.beginFill(0x00ff00);
        scrim.drawRect(0,0,app.view.width,app.view.height);
        scrim.alpha = 1;
    
    //Add the scrim to the scene
    timeline.addChild(scrim);*/
}

function assignTLTransitionIn(timeline){
    timeline.transition=async function(){
        app.stage.addChild(timeline);
        timeline.alpha=0;
        resetSlider();
        await Animate.to(timeline, TIMELINE_TIME, tlDataIn);
    }
}

async function assignTLTransitionOut(timeline){
    timeline.transitionOut=async function(){
        await Animate.to(timeline, TIMELINE_TIME, tlDataOut);
        app.stage.removeChild(timeline);
    }
}