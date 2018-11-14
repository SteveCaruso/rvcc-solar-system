var test = new Solar.Scene("test");

var theSun2 = PIXI.Sprite.fromImage("img/sun.png");
            theSun2.width = 400;
            theSun2.height = 400;
            theSun2.anchor.set(0.5);

test.addChild(theSun2);