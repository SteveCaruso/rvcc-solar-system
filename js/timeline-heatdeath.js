var heatDeath = new Solar.Scene("heatDeath");

//Solar.loader.add("white_dwarf","img/white_dwarf.png")

Solar.loader.on('complete',function(loader,resources) {

    
    var scene = heatDeath;
        
        //Center coordinates for the stage
        var centerX = app.view.width/2;
        var centerY = app.view.height/2;  
        
        var count = 0;
    
        var blackDude = new PIXI.Sprite(PIXI.Texture.WHITE);   
    
            blackDude.width = app.view.width;
            blackDude.height = app.view.height;
            blackDude.x= 0;
            blackDude.y= 0;
            blackDude.alpha = 0;
            blackDude.tint = 0x000000;
    
            scene.addChild(blackDude);
              
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
         
        var infoText = new PIXI.Text('In 1e100 (that is a 1 followed by 100 zeroes) years from now, the Universe will cool to the point that there is no more heat or light. Every star will eventually run out of fuel and go out.', textStyle);
        
        infoText.x = 150;
        infoText.y = 500;

        scene.addChild(infoText);
        
        //Title  
        var Titlegraphics = new PIXI.Graphics();
            Titlegraphics.lineStyle(2, 0xFFFFFF, 1);
            Titlegraphics.beginFill(0xFFFFFF, 0.25);
            Titlegraphics.drawRoundedRect(360, 15, 240, 50, 15);
            Titlegraphics.endFill();
        
        // app.stage.addChild(Titlegraphics);
         
        var Title = new PIXI.Text("Heat Death of the Universe", titleStyle);
        
        Title.x = 20;
        Title.y = 15;

        scene.addChild(Title);
    
    
    
        scene.transition = async function() {

            //Slide current scene off to the left, and fade out – and wait for it
            await Animate.to(Solar.currentScene,500,{alpha:0});

            //Then remove it from the stage
            app.stage.removeChild(Solar.currentScene);

            //Set up my scene
            scene.alpha = 0;
            Animate.to(blackDude, 0, {alpha:0});
            
            //Add it to the stage
            app.stage.addChild(scene);
            
            //Bring sider to top
            showSlider(0);

            //Let it fade in with await (so it returns only when complete)
            await Animate.to(scene, 500, {alpha:1});
            
            Animate.to(blackDude, 15000, {alpha:1});
            
        };
});