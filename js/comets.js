/*
 * this was my only real contribution to the project honestly
 * - peng
 *
 * I call BS.
 * - The Professor
 *
 * creating merge conflicts does not count as a "contribution," professor
 * - peng
 *
 * (also the comet particles get hidden behind milkyway.jpg but
 * that can get fixed later)
 */

var cometContainer = new PIXI.Container();
solarSystem.addChild(cometContainer);

var resources = null;

const COMET_PERIODS = [
    6, 12, 18, 24, 30
];
const COMET_TRAVEL_TIME = [
    36, 72, 144, 160
];

const COMET_TAIL_DENSITY = 32;
const COMET_RADIUS = app.view.width * 2;
const COMET_OFFSET = 2.5;

Solar.loader.add("particle","img/particles/particle.png");

Solar.loader.on('complete', function(loader, loadedResources) {
    resources = loadedResources;
    setTimeout(function() {
        spawnComet();
    }, 1000);
});

function spawnComet(){
    /*
     * Problem: need a start and an end point for the comets, but they're not allowed to
     *      spawn (or despawn) while on the screen
     * Solution: you could ask the computer to pick points around the boundary of the screen
     *      but honestly that's a lot of work and it's really ugly code, so we can also just
     *      pick points that are a fixed distance away (the math department would like me to
     *      describe it as "points on a circle that cirucmscribes the canvas")
     * Second problem: when you click on the sun on the idle screen all hell breaks loose
     *      because the origins of the containers are all over the place and I offer my
     *      condolences to whichever future class is burdened with the task of cleaning it up
     * Second solution: make all of the comets spawn so astonishingly far away from the origin
     *      that moving the container origins by a thousand or so pixels in any direction has
     *      no noticeable effect. This has the unfortunte side effect of some / most of the
     *      comets never actually passing through the visible part of the PIXI canvas, so you're
     *      going to need to spawn way more of them than you want to see. If the viable radius
     *      is (2 * 1920) the amount of area in the spawn circle that's actually visible on the
     *      canvas is about 4.4% ((1920 * 1080) / (4 * 1920 * 1920 * pi)) which should give you
     *      an idea of how infrequently you'll actually be seeing the things.
     * Third problem: comets, like everything else, orbit in ellipses and typically do not
     *      plunge headlong into the Sun just to show it who's boss
     * Third solution: make it someone else's problem ¯\_(ツ)_/¯
     */
    
    let angle = Math.random() * Math.PI * 2;
    let x = COMET_RADIUS * Math.cos(angle);
    let y = COMET_RADIUS * Math.sin(angle);
    let destAngle = Math.random() * Math.PI * 2;
    let xto = COMET_RADIUS * Math.cos(destAngle);
    let yto = COMET_RADIUS * Math.sin(destAngle);
    
    setTimeout(function(){
        spawnComet();
    }, randomElementFromArray(COMET_PERIODS) * 1000 / 10);
    
    return new Comet(x, y, xto, yto);
}

class Comet {
    constructor(x, y, xto, yto){
        /*
         * before all of the images were added to the comet container individually, but this
         * was actually really stupid and slow(er) and makes it really annoying if you want to
         * do things such as "rotate the comet to make the tail point away from the sun." which
         * SOMEONE gave me a very long lecture about but weren't interested in changing
         * themselves ლ(ಠ益ಠლ)
         */
        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = y;
        this.container.scale.set(0.5);
        
        cometContainer.addChild(this.container);
        
        this.sprite = new PIXI.Sprite(resources.particle.texture);
        this.sprite.alpha = randomRange(0.75, 0.85);
        this.sprite.x = -COMET_OFFSET;
        // Also the head is blue now, that's neat.
        this.sprite.tint = 0x66ffff;
        this.container.addChild(this.sprite);
        
        let date = new Date();
        
        for (let i = 0; i < COMET_TAIL_DENSITY; i++) {
            // and you all said algebra wasn't useful for anything
            let f = (COMET_TAIL_DENSITY - i + 1) / COMET_TAIL_DENSITY;
            let particle = new PIXI.Sprite(resources.particle.texture);
            particle.x = i * COMET_OFFSET * 2;
            particle.y = randomRange(-COMET_OFFSET, COMET_OFFSET);
            particle.alpha = randomRange(0.15, 0.25) * f * f;
            // If you don't know what this does, I'm not telling you
            if (date.getMonth() == 3 && date.getDate() == 1) {
                particle.scale.set(1 / (f * f * f * f * f * f * f));
            } else {
                particle.scale.set(1 / (f * f));
            }
            this.container.addChild(particle);
        }
        
        Animate.to(this.container, this.container.travelTime*1000, {
            x: xto,
            y: yto,
            easing: Easing.linear
        }).then(_ => {
            cometContainer.removeChild(this.container);
            this.container.destroy();
        });
    }
}

app.ticker.add(function(delta) {
    /*
     * seriously, how is the actual delta useful to anyone? the solution to frame
     * independence is not "account for lag to make sure everything is tied to the
     * frame rate exactly," PIXI. Gawd.
     */
    let dt = delta / app.ticker.FPS;
    
    cometContainer.children.forEach(function(element) {
        let dx = element.x - theSun.x;
        let dy = element.y - theSun.y;
        /*
         * Whenever I want people to think I know what I'm talking about I pull out
         * one of the two and a quarter trigonometry facts I remember from high school
         */
        element.rotation = Math.atan2(dy, dx);
    });
});