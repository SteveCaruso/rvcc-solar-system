function doSolar(){
    var loader=new PIXI.loaders.Loader();
    
    loader.add("img/sun.png")/*.add(ehh).add(ffff)*/;
    
    loader.load((loader, resources)=>{
        //console.log(resources);
        var newSun=new PIXI.Sprite(resources["img/sun.png"].texture);
        newSun.width=400;
        newSun.height=400;
        newSun.x=0;
        newSun.y=0;
        newSun.name="stop failing";
        newSun.anchor.set(0.5);
        app.stage.addChild(newSun);
        
        console.log("done")
        
        var test = new Solar.Scene("testdotjs");
        test.addChild(newSun);
        
        app.stage.addChild(newSun);
    });

    /*var theSun2 = PIXI.Sprite.fromImage();
                theSun2.width = 400;
                theSun2.height = 400;
                theSun2.anchor.set(0.5);

    test.addChild(theSun2);*/
}