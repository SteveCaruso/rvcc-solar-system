/*
  Create the scene:

  This creates the new scene and loads it into the Solar.scenes array for you.
*/
var myScene = new Solar.Scene("myscene");

/*
  Queue up the files:

  We invoke the Solar.loader.add() function to add new files to the loading queue.
  This solves the problem we were having with images not loading properly and
  forces the images to load before we use them. It takes two arguments:

    The first is the nickname for the image.
    The second is the image's url.

*/
Solar.loader.add("spaaace","img/spaaace.png");

/*
  Make the variables other folks need public:

  In the next phase, all of the variables we use will be locked in their own
  scope (inside a function). So if we want to allow any of our sprites or
  other things to be directly usable by our colleagues, we can define them
  now, here.
*/
var spaaace;

/*
  When things are loaded, do the stuff necessary to make it work:

  We add an EventListener on the "complete" event, which indicates that all
  of the images and other media we've requested has been successfully loaded
  into memory, and we can now use it all.

  At this point, we create our sprites, add them to the scene, set up 
  transitions (more on that below), add event listeners for click or touch
  events, and then set our stuff in motion.
*/
Solar.loader.on('complete',function(loader,resources) {

    //Create the Space Core and set its coordinates
    spaaace = new PIXI.Sprite(resources.spaaace.texture);
    spaaace.width = 200;
    spaaace.height = 200;
    spaaace.anchor.set(0.5);
    spaaace.x = centerX;
    spaaace.y = centerY;
    
    myScene.transition = async function() {

        //Slide current scene off to the left, and fade out – and wait for it
        await Animate.to(Solar.currentScene,2000,{x:-2000, alpha:0});

        //Then remove it from the stage
        app.stage.removeChild(Solar.currentScene);

        //Set up my scene
        myScene.x = 0;
        myScene.y = 0;
        myScene.alpha = 0;

        //Add it to the stage
        app.stage.addChild(myScene);

        //Let it fade in with await (so it returns only when complete)
        await Animate.to(myScene, 2000, {alpha:1});
    };

    //Add the Space Core to the scene
    myScene.addChild(spaaace);

});