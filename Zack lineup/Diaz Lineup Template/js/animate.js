//Create our Animator object...
var Animator = function() {

    //This function will take three arguments:
    //  1) A Pixi object
    //  2) A time
    //  3) A set of parameters
    this.to = function(obj, time, params) {

        //Check if the animation loop id is set, if not make it
        if (obj.animatorTimeout == undefined) obj.animatorTimeout = null;

        //If the stop flag is not there make it
        if (obj.animatorStop == undefined) obj.animatorStop = false;

        //Promise-ify it
        return new Promise(function(pass,fail) {

            //Stop the animationFrame just to be sure.
            cancelAnimationFrame(obj.animatorTimeout);

            //Throw the stop flag for current loops.
            this.stop();

            //Take note of the object's initial state
            var initialState = {
                x: obj.x,
                y: obj.y,
                alpha: obj.alpha,
                rotation: obj.rotation,
                width: obj.width,
                height: obj.height,
                scale: obj.scale.x
            };

            //Get the start time in milliseconds
            var startTime = new Date().getTime();

            //Set up a function to act as the loop
            var loop = function() {

                //If the stop flag is set, stop the animation
                if (this.animatorStop === true) {
                    this.animatorStop = false;
                    fail();
                    return;
                }


                //Get the delta (how many milliseconds have elapsed)
                var delta =  (new Date().getTime() - startTime);

                //If its done, it's done. Snap to the end.
                if(delta >= time) {

                    //Set x,y
                    if (params.x) obj.x = params.x;
                    if (params.y) obj.y = params.y;

                    //Set width,height
                    if (params.width) obj.width = params.width;
                    if (params.height) obj.height = params.height;

                    //Set rotation
                    if (params.rotation) obj.rotation = params.rotation;

                    //Set scale
                    if (params.scale) {
                        obj.scale.set(params.scale);
                    }
                    
                    //Set alpha
                    if (params.alpha) {
                        obj.alpha = params.alpha;
                    }

                    //etc.

                    //Fire the callback if there is one
                    if (params.then !== undefined) params.then();

                    //Stop!
                    pass("Animation complete.");
                    return;
                }

                //Animate all the things!

                //Set the easing
                var ease = Easing.linear;

                if (params.easing !== undefined) ease = params.easing;

                //Animate x and y coordinates
                if (params.x !== undefined) {
                    obj.x = initialState.x + ( (params.x - initialState.x) * ease(delta/time) );
                }
                if (params.y !== undefined) {
                    obj.y = initialState.y + ( (params.y - initialState.y) * ease(delta/time) );
                }

                //Animate width and height
                if (params.width !== undefined) {
                    obj.width = initialState.width + ( (params.width - initialState.width) * ease(delta/time) );
                }
                if (params.height !== undefined) {
                    obj.height = initialState.height + ( (params.height - initialState.height) * ease(delta/time) );
                }

                //Animate Rotation
                if (params.rotation !== undefined) {
                    obj.rotation = initialState.rotation + ( (params.rotation - initialState.rotation) * ease(delta/time) );
                }

                //Animate Scale
                if (params.scale !== undefined) {
                    obj.scale.set(obj.scale.y = initialState.scale + ( (params.scale - initialState.scale) * ease(delta/time) ));
                }
                
                //Animate Alpha
                if (params.alpha !== undefined) {
                    obj.alpha = initialState.alpha + ( (params.alpha - initialState.alpha) * ease(delta/time) );
                }

                //etc.

                //Set up the next loop
                obj.animatorTimeout = requestAnimationFrame(loop);

            }
            //Start the loop!
            loop();

        //End Promise
        });

    };

    //This function acts as an animation loop for the object until it's stopped
    this.loop = function(obj, func) {

        //Check if the animation loop id is set, if not make it
        if (obj.animatorTimeout == undefined) obj.animatorTimeout = null;

        //If the stop flag is not there make it
        if (obj.animatorStop == undefined) obj.animatorStop = false;

        //Promise-ify it
        return new Promise(function(pass,fail) {

            //Stop the animationFrame just to be sure.
            cancelAnimationFrame(obj.animatorTimeout);

            //Full stop!
            this.stop();


            //Get the start time in milliseconds
            var startTime = new Date().getTime();

            //Build the animaton loop
            var loop = function() {

                //If the stop flag is set, stop the animation
                if (this.animatorStop === true) {
                    this.animatorStop = false;
                    fail();
                    return;
                }

                //Get the delta time from the start
                var delta =  (new Date().getTime() - startTime);

                //Call the function for the loop, passing it that delta
                func(delta);

                //Request the next animation frame
                obj.animatorTimeout = requestAnimationFrame(loop);

            }
            //Start the loop
            loop();

        //End Promise
        });

    };

    //This function allows you to make keyframe animations
    this.keyframes = function(obj, list, params) {

        //Promise-ify it
        return new Promise(function(pass,fail) {



        //End Promise
        });

    }

    //This function will stop a Pixi object from animating dead in its tracks
    this.stop = function(obj) {

        //Throw the stop flag to stop animation loops
        obj.animatorStop = true;

        //Cancel the animation frame just to be sure
        cancelAnimationFrame(obj.animatorTimeout);

        //Clear the timeout id
        obj.animatorTimeout = null;

    };

};

//Build the new Animator!
var Animate = new Animator();