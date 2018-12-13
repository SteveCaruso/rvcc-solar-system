/*
 * this was my only real contribution to the project honestly
 */

var cometContainer=new PIXI.Container();
app.stage.addChild(cometContainer);

var resources=null;

/*
 * seconds between appearences
 */
const COMET_PERIODS=[
    30, 60, 120, 600
]

/*
 * time it takes to cross the screen (the tails are less satisfying with slower
 * transit times)
 */
const COMET_TRAVEL_TIME=[
    12, 16, 20
]

const COMET_RADIUS=16;

//Queue up our files we'll need
Solar.loader.add("particle","img/particles/particle.png");

//When things are loaded, do the stuff necessary to make it work
Solar.loader.on('complete', function(loader, loadedResources) {
    resources=loadedResources;
    setTimeout(function(){
        spawnComet();
    }, 1000);
});

function spawnComet(){
    var roll=Math.random();
    
    var minx=-COMET_RADIUS;
    var maxx=app.view.width+COMET_RADIUS;
    var miny=-COMET_RADIUS;
    var maxy=app.view.height+COMET_RADIUS;
    
    var x=minx;
    var y=miny;
    var xto=maxx;
    var yto=maxy;
    
    // right to left
    if (roll<0.25){
        x=maxx;
        xto=minx;
        y=randomRange(miny, maxy);
        yto=randomRange(miny, maxy);
    // left to right
    } else if (roll<0.5){
        y=randomRange(miny, maxy);
        yto=randomRange(miny, maxy);
    // top to bottom
    } else if (roll<0.75){
        x=randomRange(minx, maxx);
        xto=randomRange(minx, maxx);
    // bottom to top
    } else {
        y=maxy;
        yto=miny;
        x=randomRange(minx, maxx);
        xto=randomRange(minx, maxx);
    }
    
    // do it again
    setTimeout(function(){
        spawnComet();
    }, randomElementFromArray(COMET_PERIODS)*1000/10);
    
    return new Comet(x, y, xto, yto);
}

class Comet {
    constructor(x, y, xto, yto){
        this.sprite=new PIXI.Sprite(resources.particle.texture);
        this.sprite.x=x;
        this.sprite.y=y;
        this.sprite.scale.set(0.5);
        this.sprite.alpha=randomRange(0.15, 0.25);
        this.sprite.comet=this;
        this.sprite.root=true;
        
        this.travelTime=randomElementFromArray(COMET_TRAVEL_TIME);
        
        cometContainer.addChild(this.sprite);
        
        Animate.to(this.sprite, this.travelTime*1000, {
            x: xto,
            y: yto,
            easing: Easing.linear
        }).then(_ => {
            cometContainer.removeChild(this.sprite);
            this.sprite.destroy();
        });
    }
}

app.ticker.add(function(delta){
    cometContainer.children.forEach(function(element){
        // if you dont check if element is root you'll have one of those
        // fork bomb things and your computer will be very upset with you
        if (element.root){
            var particle=new PIXI.Sprite(resources.particle.texture);
            particle.x=element.x;
            particle.y=element.y;
            particle.alpha=randomRange(0.15, 0.25);
            particle.scale.set(0.5);
            particle.root=false;
            particle.comet=element.comet;
            cometContainer.addChild(particle);

            Animate.to(particle, 1000, {
                alpha: 0,
                easing: Easing.linear
            }).then(_ => {
                cometContainer.removeChild(particle);
                particle.destroy();
            });
            
            // really wanted to make comets follow the sun's gravitational well
            // but it's 2 am on the day this is due and i really dont feel like
            // taking apart animate.js to see how it works anyway
        }
    });
});