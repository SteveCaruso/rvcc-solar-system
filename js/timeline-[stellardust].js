<!doctype html>
<html>
<head>
	<title></title>
    
    <!-- Import Pixi.js from the main website. -->
	<script src="https://pixijs.download/dev/pixi.min.js"></script>
    
    <!-- Import the Pixi.js sound module. -->
	<script src="https://pixijs.io/pixi-sound/dist/pixi-sound.js"></script>
</head>
<body>
    <!-- Where our Pixi code is going. -->
    <script>
    
       
       var app = new PIXI.Application(1080, 600, {backgroundColor : 0x000000});
        document.body.appendChild(app.view);
        
        //Center coordinates for the stage
        var centerX = app.view.width/2;
        var centerY = app.view.height/2;  
        
        var count = 0;
        
        var dust = PIXI.Sprite.fromImage("img/reddust.png");
            dust.width = 500;
            dust.height = 500;
            dust.anchor.set(0.5);
            dust.x= 240;
            dust.y= 300;
             
         
              
        var light = PIXI.Sprite.fromImage("img/light.png");
            light.width = 300;
            light.height = 300;
            light.anchor.set(0.5);
            light.x= 240;
            light.y= 300;
        
        
                app.stage.addChild(light);

          app.stage.addChild(dust);
        
        
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
            fontSize: 18,
            fontStyle: 'italic',
            fontWeight: 'bold',
            stroke: '#FFFFFF',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
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
            stroke: '#FFFFFF',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
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
        
        app.stage.addChild(graphics);
         
        var infoText = new PIXI.Text('Atomic and molecular gas (primarily hydrogen and helium) and tiny pieces of solid particles or dust (composed mainly of carbon, silicon and oxygen). In some places this interstellar material is very dense, forming nebulas.', style);
        
        infoText.x = 600;
        infoText.y = 190;

        app.stage.addChild(infoText);
        
      //Title  
         var Titlegraphics = new PIXI.Graphics();
             Titlegraphics.lineStyle(2, 0xFFFFFF, 1);
             Titlegraphics.beginFill(0xFFFFFF, 0.25);
             Titlegraphics.drawRoundedRect(360, 15, 240, 50, 15);
             Titlegraphics.endFill();
        
        app.stage.addChild(Titlegraphics);
         
        var Title = new PIXI.Text("Stellar Dust", style2);
        
        Title.x = 370;
        Title.y = 15;

        app.stage.addChild(Title);
        

    </script>
</body>
</html>