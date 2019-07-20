var stellarDust = new Solar.Scene("stellarDust");


Solar.loader.add("reddust","img/timeline/Reddust.png")
            .add("light","img/timeline/Light.png")

Solar.loader.on('complete',function(loader,resources) {

    
    var scene = stellarDust;
        
        //Center coordinates for the stage
        var centerX = app.view.width/2;
        var centerY = app.view.height/2;  
        
        var count = 0;
        
        var dust = new PIXI.Sprite(resources.reddust.texture);   
    
            dust.width = 600;
            dust.height = 600;
            dust.anchor.set(0.5);
            dust.x= 960;
            dust.y= 540;
         
             
         
        var light = new PIXI.Sprite(resources.light.texture);      
       
            light.width = 300;
            light.height = 300;
            light.anchor.set(0.5);
            light.x= 960;
            light.y= 540;
        
        
                scene.addChild(light);

          scene.addChild(dust);
        
        
        app.ticker.add(function(delta) 
        {
           //bigbeam.rotation += -0.05 * delta;
            dust.rotation += 0.0005 * delta;
            
           dust.scale.x = .76 + (Math.sin(count) * .15);
           dust.scale.y = .99 + (Math.cos(count) * .15);
            
            count += .002; 
            
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
            wordWrapWidth: 410
         });

         var style2 = new PIXI.TextStyle
         ({
            fontFamily: 'Arial',
            fontSize: 80,
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
            graphics.drawRoundedRect(590, 180, 430, 140, 15);
            graphics.endFill();
        
        //app.stage.addChild(graphics);
         
        var infoText = new PIXI.Text('Atomic and molecular gas (primarily hydrogen and helium) and tiny pieces of solid particles or dust (composed mainly of carbon, silicon and oxygen). In some places this interstellar material is very dense, forming nebulas.', textStyle);
        
        infoText.x = 1200;
        infoText.y = 600;

        scene.addChild(infoText);
        
      //Title  
         var Titlegraphics = new PIXI.Graphics();
             Titlegraphics.lineStyle(2, 0xFFFFFF, 1);
             Titlegraphics.beginFill(0xFFFFFF, 0.25);
             Titlegraphics.drawRoundedRect(360, 15, 240, 50, 15);
             Titlegraphics.endFill();
        
       // app.stage.addChild(Titlegraphics);
         
        var Title = new PIXI.Text("Stellar Dust", titleStyle);
        
        Title.x = 20;
        Title.y = 15;

        scene.addChild(Title);
});