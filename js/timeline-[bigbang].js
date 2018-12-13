<!doctype html>
<html>
<head>
	<title>Pixi.js Sound &amp; Buttons</title>
    
    <!-- Import Pixi.js from the main website. -->
	<script src="https://pixijs.download/dev/pixi.min.js"></script>
    
    <!-- Import the Pixi.js sound module. -->
	<script src="https://pixijs.io/pixi-sound/dist/pixi-sound.js"></script>
</head>
<body>
    <!-- Where our Pixi code is going. -->
    <script>
    var bigbang = new Solar.Scene("bigbang");


Solar.loader.on('complete',function(loader,resources) {

    
    var scene = bigbang;
       
       var app = new PIXI.Application(1080, 600, {backgroundColor : 0x000000});
        document.body.appendChild(app.view);
        
        //Center coordinates for the stage
        var centerX = app.view.width/2;
        var centerY = app.view.height/2;
        
        
      var bigbang = PIXI.Sprite.fromImage("img/bigbang.png");
            bigbang.width = 500;
            bigbang.height = 500;
            bigbang.anchor.set(0.5);
            bigbang.x= 240;
            bigbang.y= 300;
             
         var bigbeam = PIXI.Sprite.fromImage("img/bigbeam.png");
            bigbeam.width = 450;
            bigbeam.height = 1800;
            bigbeam.anchor.set(0.5);
            bigbeam.x= 240;
            bigbeam.y= 300;
        
        app.ticker.add(function(delta) 
        {
           bigbeam.rotation += -0.05 * delta;
            bigbang.rotation += 0.01 * delta;
        });

             
          app.stage.addChild(bigbeam);
              
        
          app.stage.addChild(bigbang);
              
        var style = new PIXI.TextStyle
         ({
            fontFamily: 'Arial',
            fontSize: 18,
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

        app.stage.addChild(infoText);
        
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

        app.stage.addChild(Title);
        
        
}

    </script>
</body>
</html>