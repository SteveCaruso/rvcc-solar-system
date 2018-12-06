/*
	comets are kinda nice
*/

var comets=new PIXI.Container();
app.stage.addChild(comets);

var resources=null;

const cometPeriods=[
    5, 10, 30, 60
]

//Queue up our files we'll need
Solar.loader.add("particle","img/particles/particle.png");

//When things are loaded, do the stuff necessary to make it work
Solar.loader.on('complete', function(loader, loadedResources) {
    resources=loadedResources;
    SetTimeout(function(){
        
    }, /*randomElementFromArray(cometPeriods)*1000*/1000);
});

function spawnComet(){
    
}

class Comet {
    constructor(x, y, xto, yto){
        this.x=x;
        this.y=y;
        this.xto=xto;
        this.yto=yto;
    }
}