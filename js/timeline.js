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

var ipsum={
    "Big Bang": `Egg rooster pecking order beak nest hatch hen. Incubation coop poultry hackles barnyard. Roost pullet crest hen chick chicken wattles broody scratch crest fowl. Hen comb coop broody hen. Hatch clutch hackles bantam hackles wattles hen hatch clutch wattles scratch. Rooster chicken incubation egg incubation. Egg free range rooster hen wattles crest clutch. Hatch comb bantam hackles comb pecking order.`,
    
    "Stellar Dust": `Bantam hatch wattles barnyard fowl hen barnyard coop roost pullet. Crest hackles hen chicken broody incubation. Scratch perch poultry roost rooster. Fowl chicken beak coop hen crest clutch free range roost. Free range hatch chick pullet bantam chicken.`,
    
    "Accretion Disk": `Wattles chick bantam nest. Broody hen clutch chicken coop rooster. Coop nest incubation nest egg. Beak pecking order poultry egg scratch pullet barnyard fowl hatch free range.`,
    
    "Red Giant": `Broody hen hackles nest broody crest beak. Hackles comb fowl pecking order. Scratch barnyard chicken clutch egg crest comb fowl egg pecking order. Nest clutch bantam hackles pullet. Bantam wattles pullet hackles comb pecking order chick hen pullet hackles hen. Poultry chick chicken wattles nest coop beak chick. Poultry comb coop pullet broody clutch pullet roost poultry nest pecking order.`,
    
    "Red Dwarf": ` Hackles perch hen scratch clutch wattles comb. Scratch pecking order hatch crest egg barnyard nest roost perch. Free range pullet incubation broody perch hatch hackles clutch. Incubation hen chicken perch beak.`,
    
    "Death": `Barnyard rooster perch pecking order barnyard broody hen. Perch clutch comb rooster pullet incubation. Pullet hen chicken hen chick clutch. Comb incubation nest pecking order pullet scratch coop rooster hen coop. Bantam egg wattles clutch rooster clutch comb perch clutch.`,
}

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
    initTimeline(timeline1Bang, "Big Bang", resources);
    initTimeline(timeline2Dust, "Stellar Dust", resources);
    initTimeline(timeline3Disk, "Accretion Disk", resources);
    // timeline: now is elsewhere
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
    var title = new PIXI.Text(name, tlStyle);
        title.x = 960;
        title.y = 100;
    
    timeline.addChild(title);
            
    //Info box text
    var text = new PIXI.Text(ipsum[name], tlStyle);
        text.x = 960;
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