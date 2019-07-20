var accretion = new Solar.Scene("accretion");

Solar.loader.add("diskStar","img/timeline/star.png")
            .add("diskBeam","img/timeline/light beam.png")
            .add("diskFront","img/timeline/front dust.png")
            .add("diskBack","img/timeline/dust back.png");


Solar.loader.on('complete',function(loader,resources) {

    
    var scene = accretion;
        
        //Center coordinates for the stage
        var centerX = app.view.width/2;
        var centerY = app.view.height/2;
        
        var count = 0;
       
        //The Sun
        var theSun = new PIXI.Sprite(resources.diskStar.texture);
            theSun.width = 225;
            theSun.height = 225;
            theSun.anchor.set(0.5);
            theSun.x= 200 + 760;
            theSun.y= 350 + 120;
        
        //the light beam
        var thebeam = new PIXI.Sprite(resources.diskBeam.texture);
            thebeam.width = 400;
            thebeam.height =  3000;
            thebeam.anchor.set(0.5);
            thebeam.x= 260 + 760 + 20;
            thebeam.y= 300 + 190 + 500;
        
        var frontdust = new PIXI.Sprite(resources.diskFront.texture);
            frontdust.width = 2500;
            frontdust.height = 216;
            frontdust.anchor.set(0.5);
            frontdust.x= 310 + 760;
            frontdust.y= 325 + 190;
        
        var backdust =new PIXI.Sprite(resources.diskBack.texture);
            backdust.width = 2500;
            backdust.height = 216;
            backdust.anchor.set(0.5);
            backdust.x= 310 + 760;
            backdust.y= 300 + 190;
        
         accretion.addChild(backdust);
         accretion.addChild(thebeam);
         accretion.addChild(theSun);
         accretion.addChild(frontdust);
        
        var sunscaleX = theSun.scale.x;
        var sunscaleY = theSun.scale.y;
        var beamScaleX = thebeam.scale.x;
        var beamScaleY = thebeam.scale.y;
        var frontDustScaleX = frontdust.scale.x;
        var backDustScaleX = backdust.scale.x;
    
         app.ticker.add(function(delta) {

            theSun.scale.x = sunscaleX + Math.sin(count) * 0.01;
            theSun.scale.y = sunscaleY + Math.cos(count) * 0.01;

            thebeam.scale.x = beamScaleX + Math.sin(count) * 0.01;
            thebeam.scale.y = beamScaleY + Math.cos(count) * 0.01;

            frontdust.scale.x = frontDustScaleX + Math.sin(count) * 0.01;
            //frontdust.scale.y = 1 + Math.cos(count) * 0.01;

            backdust.scale.x = backDustScaleX + Math.sin(count) * 0.01;

            function slide(){
                if(x>0)
                    this.x= this.x-1;
                 else{
                     this.x= 310;
                 }
            }

                count += 0.1; 

   
        });
    
        var style = new PIXI.TextStyle
         ({
            fontFamily: 'Arial',
            fontSize: 36,
            fontStyle: 'italic',
            fontWeight: 'bold',
            //stroke: '#FFFFFF',
            fill: '#FFFFFF',
            strokeThickness: 5,
            //dropShadow: true,
            //dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440
         });

         var style2 = new PIXI.TextStyle
         ({
            fontFamily: 'Arial',
            fontSize: 36,
            fontStyle: 'italic',
            fontWeight: 'bold',
            //stroke: '#FFFFFF',
             fill: '#FFFFFF',
            strokeThickness: 5,
            //dropShadow: true,
            //dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440
         }); 
        
        //info
        var graphics = new PIXI.Graphics();
            graphics.lineStyle(2, 0xFFFFFF, 1);
            graphics.beginFill(0xFFFFFF, 0.25);
            graphics.drawRoundedRect(590, 180, 420, 100, 15);
            graphics.endFill();
        
        //app.stage.addChild(graphics);
         
        var infoText = new PIXI.Text('A rotating disk of matter formed under the influence of gravity around a star. The dust slowly accretes (comes together) into bigger and bigger pieces eventually forming planets.', textStyle);
        
        infoText.x = 1200;
        infoText.y = 700;

        accretion.addChild(infoText);
        
      //Title  
         var Titlegraphics = new PIXI.Graphics();
             Titlegraphics.lineStyle(2, 0xFFFFFF, 1);
             Titlegraphics.beginFill(0xFFFFFF, 0.25);
             Titlegraphics.drawRoundedRect(360, 15, 300, 50, 15);
             Titlegraphics.endFill();
        
       // app.stage.addChild(Titlegraphics);
         
        var Title = new PIXI.Text("Accretion Disk", titleStyle);
        
        Title.x = 20;
        Title.y = 15;

        accretion.addChild(Title);
        

});