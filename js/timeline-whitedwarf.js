var whiteDwarf = new Solar.Scene("whiteDwarf");

Solar.loader.add("white_dwarf","img/white_dwarf.png")

Solar.loader.on('complete',function(loader,resources) {

    
    var scene = whiteDwarf;
        
        //Center coordinates for the stage
        var centerX = app.view.width/2;
        var centerY = app.view.height/2;  
        
        var count = 0;
        
        var whiteDude = new PIXI.Sprite(resources.white_dwarf.texture);   
    
            whiteDude.width = 100;
            whiteDude.height = 100;
            whiteDude.anchor.set(0.5);
            whiteDude.x= app.view.width;
            whiteDude.y= 0;
    
            scene.addChild(whiteDude);
    
        var redDude = new PIXI.Sprite(resources.sun.texture);   
    
            redDude.width = app.view.height*2;
            redDude.height = app.view.height*2;
            redDude.anchor.set(0.5);
            redDude.x= app.view.width;
            redDude.y= 0;
            redDude.tint = 0xcc0000;
    
            scene.addChild(redDude);
             
          
              
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
         
        var infoText = new PIXI.Text('In 8.5 billion years the Red Giant will continue to expand into a nebula, leaving behind an earth-sized White Dwarf star.', textStyle);
        
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
         
        var Title = new PIXI.Text("White Dwarf", titleStyle);
        
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
            Animate.to(redDude,0,{
                width:app.view.height*2,
                height:app.view.height*2,
                alpha:1,
                x:app.view.width,
                y:0
            });
            Animate.to(whiteDude,0,{
                x:app.view.width,
                y:0
            });
            
            //Add it to the stage
            app.stage.addChild(scene);

            //Let it fade in with await (so it returns only when complete)
            await Animate.to(scene, 500, {alpha:1});
            
            //And then let it evaporate!
            Animate.to(redDude,15000,{
                width:app.view.height*5,
                height:app.view.height*5,
                alpha:0,
                easing:Easing.easeOut
            });
            
            Animate.to(whiteDude,20000,{
                x:centerX + 100,
                y:centerY,
                easing:Easing.easeOut
            });
        };
});