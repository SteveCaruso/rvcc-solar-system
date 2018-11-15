function doSolarDS(){
    var loader=new PIXI.loaders.Loader();

    loader.add("sun", "img/sun.png")/*.add("ehh", "ehh.png").add("ffff", "ffff.png")*/;

    loader.load((loader, resources)=>{
        //console.log(resources);
        var newSun=new PIXI.Sprite(resources.sun.texture);
        newSun.width=400;
        newSun.height=400;
        newSun.x=0;
        newSun.y=0;
        newSun.name="stop failing";
        newSun.anchor.set(0.5);
        app.stage.addChild(newSun);
        
        console.log(resources.sun);
    });
}