<!doctype html>
<html>
<head>
	<title>Pixi.js Sound &amp; Buttons</title>

    <!-- Import Pixi.js from the main website. -->
	<script src="js/pixi.min.js"></script>
    <!-- <script src="https://pixijs.download/dev/pixi.min.js"></script>-->

    <!-- Import the Pixi.js sound module. -->
	<!--<script src="https://pixijs.io/pixi-sound/dist/pixi-sound.js"></script>-->

    <!-- Import Easing -->
    <script src="js/easing.js"></script>

    <!-- Import Animator -->
    <script src="js/animate.js"></script>
</head>
<body>
    <!-- Where our Pixi code is going. -->
    <script>

        //Set up the app
        var app = new PIXI.Application(1080, 720, {backgroundColor : 0x000000});
        document.body.appendChild(app.view);
        
        //Center coordinates for the stage
        var centerX = app.view.width/2;
        var centerY = app.view.height/2;
        
        var count = 0;
       
        //The Sun
        var theSun = PIXI.Sprite.fromImage("img/star.png");
            theSun.width = 175;
            theSun.height = 175;
            theSun.anchor.set(0.5);
            theSun.x= 240;
            theSun.y= 300;
        
        //the light beam
        var thebeam = PIXI.Sprite.fromImage("img/light beam.png");
            thebeam.width = 372;
            thebeam.height =  720;
            thebeam.anchor.set(0.5);
            thebeam.x= 260;
            thebeam.y= 300;
        
        var frontdust = PIXI.Sprite.fromImage("img/front dust.png");
            frontdust.width = 612;
            frontdust.height = 216;
            frontdust.anchor.set(0.5);
            frontdust.x= 310;
            frontdust.y= 325;
        
        var backdust = PIXI.Sprite.fromImage("img/dust back.png");
            backdust.width = 612;
            backdust.height = 216;
            backdust.anchor.set(0.5);
            backdust.x= 310;
            backdust.y= 300;
        
         app.stage.addChild(backdust);
         app.stage.addChild(thebeam);
         app.stage.addChild(theSun);
         app.stage.addChild(frontdust);
    
         app.ticker.add(function(delta) {

   theSun.scale.x = 1 + Math.sin(count) * 0.01;
   theSun.scale.y = 1 + Math.cos(count) * 0.01;
            
  thebeam.scale.x = 1 + Math.sin(count) * 0.01;
  thebeam.scale.y = 1 + Math.cos(count) * 0.01;
             
  frontdust.scale.x = 1 + Math.sin(count) * 0.01;
  //frontdust.scale.y = 1 + Math.cos(count) * 0.01;
             
 backdust.scale.x = 1 + Math.sin(count) * 0.01;
            
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
         
        var infoText = new PIXI.Text('A rotating disk of matter formed by accretion around a massive body (such as a black hole) under the influence of gravitation', style);
        
        infoText.x = 600;
        infoText.y = 190;

        app.stage.addChild(infoText);
        
      //Title  
         var Titlegraphics = new PIXI.Graphics();
             Titlegraphics.lineStyle(2, 0xFFFFFF, 1);
             Titlegraphics.beginFill(0xFFFFFF, 0.25);
             Titlegraphics.drawRoundedRect(360, 15, 300, 50, 15);
             Titlegraphics.endFill();
        
       // app.stage.addChild(Titlegraphics);
         
        var Title = new PIXI.Text("Accretion Disk", style2);
        
        Title.x = 370;
        Title.y = 15;

        app.stage.addChild(Title);
        

         
        
    </script>
</body>
</html>