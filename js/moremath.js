/*
 * Becaues I get tired of rewriting these functions constantly
 */

function randomElementFromArray(array){
    return array[Math.floor(Math.random()*array.length)];
}

function randomRange(x1, x2){
    return Math.random()*(x2-x1)+x1;
}

function distance(x1, y1, x2, y2){
    return Math.hypot(Math.pow(x2-x1, 2)+Math.pow(y2-y2, 2));
}