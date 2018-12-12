/*
 * most of this file is actually just copied and pasted from somewhere else
 */
/*
 * pretty sure there's a bug where if you click on the sun (to go back to the idle stage)
 * and then click on a timeline node before it disappears, pixi continues with the transition
 * to idle and the timeline ends up hidden. i've been doing a lot of projects this week
 * though so maybe someone else can be nice and fix that for me.
 */

/*
 * Timeline frames
 */

const TIMELINE_TIME=1000;

//Create our scene
var timeline1Bang = new Solar.Scene("timeline: big bang");
var timeline2Dust = new Solar.Scene("timeline: stellar dust");
var timeline3Disk = new Solar.Scene("timeline: disk");
var timeline5Giant = new Solar.Scene("timeline: red giant");
var timeline6Dwarf = new Solar.Scene("timeline: white dwarf");
var timeline7Death = new Solar.Scene("timeline: death");

// pictures
Solar.loader.add("cmb", "img/tl/cmb.png");
Solar.loader.add("dust", "img/tl/dust.png");
Solar.loader.add("disc", "img/tl/disc.png");
Solar.loader.add("giant", "img/tl/giant.png");
Solar.loader.add("dwarf", "img/tl/dwarf.png");
Solar.loader.add("death", "img/tl/death.png");

// A style for the text
var tlStyle = new PIXI.TextStyle({
	fontFamily: 'Constantina',
	fontSize: 36,
	fontWeight: 'bold',
	fill: ['#ffffff'],
    wordWrap: true,
    wordWrapWidth: 920
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
    initTimelineBang(timeline1Bang, "Big Bang", resources);
    initTimelineDust(timeline2Dust, "Stellar Dust", resources);
    initTimelineDisc(timeline3Disk, "Accretion Disk", resources);
    // timeline: now is elsewhere
    initTimelineGiant(timeline5Giant, "Red Giant", resources);
    initTimelineDwarf(timeline6Dwarf, "Red Dwarf", resources);
    initTimelineDeath(timeline7Death, "Death", resources);
});

function initTimelineTransitions(timeline, name, resources){
    assignTLTransitionIn(timeline);
    assignTLTransitionOut(timeline);
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

/*
 * specific things
 */

function initTimelineBang(timeline, name, resources){
    initTimelineTransitions(timeline, name, resources);
    
    timeline.addChild(tlCreateInfobox());
    timeline.addChild(tlCreateTitle("Big Bang"));
    timeline.addChild(tlCreateText("Someone add content to this please"));
    timeline.addChild(tlCreatePicture());
	
	//Add our Jupiter to the scene
    timeline.addChildAt(tlCreatePicture(resources.cmb.texture, app.view.width/4, app.view.height/2, 800, 880));
}

function initTimelineDust(timeline, name, resources){
    initTimelineTransitions(timeline, name, resources);
    
    timeline.addChild(tlCreateInfobox());
    timeline.addChild(tlCreateTitle("Stellar Dust"));
    timeline.addChild(tlCreateText("Someone add content to this please"));
    timeline.addChild(tlCreatePicture());
	
	//Add our Jupiter to the scene
    timeline.addChildAt(tlCreatePicture(resources.dust.texture, app.view.width/4, app.view.height/2, 800, 880));
}

function initTimelineDisc(timeline, name, resources){
    initTimelineTransitions(timeline, name, resources);
    
    timeline.addChild(tlCreateInfobox());
    timeline.addChild(tlCreateTitle("Accretion Disc"));
    timeline.addChild(tlCreateText("Someone add content to this please"));
    timeline.addChild(tlCreatePicture());
	
	//Add our Jupiter to the scene
    timeline.addChildAt(tlCreatePicture(resources.disc.texture, app.view.width/4, app.view.height/2, 800, 880));
}

function initTimelineGiant(timeline, name, resources){
    initTimelineTransitions(timeline, name, resources);
    
    timeline.addChild(tlCreateInfobox());
    timeline.addChild(tlCreateTitle("Red Giant"));
    timeline.addChild(tlCreateText("Someone add content to this please"));
    timeline.addChild(tlCreatePicture());
	
	//Add our Jupiter to the scene
    timeline.addChildAt(tlCreatePicture(resources.giant.texture, app.view.width/4, app.view.height/2, 800, 880));
}

function initTimelineDwarf(timeline, name, resources){
    initTimelineTransitions(timeline, name, resources);
    
    timeline.addChild(tlCreateInfobox());
    timeline.addChild(tlCreateTitle("White Dwarf"));
    timeline.addChild(tlCreateText("Someone add content to this please"));
    timeline.addChild(tlCreatePicture());
	
	//Add our Jupiter to the scene
    timeline.addChildAt(tlCreatePicture(resources.dwarf.texture, app.view.width/4, app.view.height/2, 800, 880));
}

function initTimelineDeath(timeline, name, resources){
    initTimelineTransitions(timeline, name, resources);
    
    timeline.addChild(tlCreateInfobox());
    timeline.addChild(tlCreateTitle("Heat Death"));
    timeline.addChild(tlCreateText("Someone add content to this please"));
    timeline.addChild(tlCreatePicture());
	
	//Add our Jupiter to the scene
    timeline.addChildAt(tlCreatePicture(resources.death.texture, app.view.width/4, app.view.height/2, 800, 880));
}

function tlCreateInfobox(){
    var infobox = new PIXI.Sprite(resources.infobox.texture);
        infobox.width = 750;
        infobox.height = 880;
        infobox.x = app.view.width/2;
        infobox.y = 50;
    
    return infobox;
}

function tlCreateTitle(title){
    var title = new PIXI.Text(title, titleStyle);
        title.x = 1200;
        title.y = 100;
    
    return title;
}

function tlCreateText(text){
    var text = new PIXI.Text(text, textStyle);
        text.x = 1200;
        text.y = 180;
    
    return text;
}

function tlCreatePicture(picture, x, y, width, height){
    var picture = new PIXI.Sprite(picture);
        picture.anchor.set(0.5);
		picture.x = x;
		picture.y = y;
        picture.width = width;
        picture.height = height;
    
    return picture;
}