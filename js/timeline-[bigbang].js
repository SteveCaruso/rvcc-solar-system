var bigbang = new Solar.Scene("bigbang");


Solar.loader.add("bang","img/timeline/bigbang.png")
            .add("Beam","img/timeline/bigbeam.png")
            

Solar.loader.on('complete',function(loader,resources) {

    
    var scene = bigbang;
        
    //Center coordinates for the stage
    var centerX = app.view.width/2;
    var centerY = app.view.height/2;
     
    var bang = new PIXI.Sprite(resources.bang.texture);
    
            bang.width = 1920;
            bang.height = 1920;
            bang.anchor.set(0.5);
            bang.x= 960;
            bang.y= 540;
             
    var bigbeam = new PIXI.Sprite(resources.Beam.texture);
            bigbeam.width = 1920;
            bigbeam.height = 1080;
            bigbeam.anchor.set(0.5);
            bigbeam.x=960;
            bigbeam.y= 540;
        
        app.ticker.add(function(delta) 
        {
           bigbeam.rotation += -0.05 * delta;
            bang.rotation += 0.01 * delta;
        });

             
          scene.addChild(bigbeam);
    scene.addChild(bang);
              
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
            wordWrapWidth: 410
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
         
        var infoText = new PIXI.Text('the cosmic explosion that marked the beginning of the universe according to the big bang theory', style);
        
        infoText.x = 600;
        infoText.y = 190;

        bigbang.addChild(infoText);
        
      //Title  
         var Titlegraphics = new PIXI.Graphics();
             Titlegraphics.lineStyle(2, 0xFFFFFF, 1);
             Titlegraphics.beginFill(0xFFFFFF, 0.25);
             Titlegraphics.drawRoundedRect(360, 15, 190, 50, 15);
             Titlegraphics.endFill();
        
        //app.stage.addChild(Titlegraphics);
         
        var Title = new PIXI.Text("Big Bang", style2);
        
        Title.x = 370;
        Title.y = 15;

        bigbang.addChild(Title);
        
        
});

