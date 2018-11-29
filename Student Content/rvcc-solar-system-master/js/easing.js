//Easing functions
var Easing = {

    //No easing... kinda a cheat.
    linear: function (x) { 
        return x 
    },

    //Accelerate into it, using a quadratic function
    easeIn: function (x) { 
        return x*x 
    },

    //Decelerate out of it, using a quadratic function
    easeOut: function (x) { 
        return x*(2-x) 
    },

    //Accelerate for the first half, decelerate for the second half.
    easeInOut: function (x) { 
        if (x < 0.5) {
            return 2*x*x;
        }
        else {
            return -1+(4-2*x)*x;
        } 
    }

}
