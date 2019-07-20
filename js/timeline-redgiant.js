var redGiant = new Solar.Scene("redGiant");

//Solar.loader.add("reddust","img/timeline/Reddust.png")

Solar.loader.on('complete',function(loader,resources) {

    
    var scene = redGiant;
        
        //Center coordinates for the stage
        var centerX = app.view.width/2;
        var centerY = app.view.height/2;  
        
        var count = 0;
        
        var redDude = new PIXI.Sprite(resources.sun.texture);   
    
            redDude.width = 100;
            redDude.height = 100;
            redDude.anchor.set(0.5);
            redDude.x= app.view.width;
            redDude.y= 0;
            redDude.tint = 0xcc0000;
    
            scene.addChild(redDude);
         
        
        
        /*
        app.ticker.add(function(delta) {
            
            redDude.
            
            count += .002;
            
            
           //bigbeam.rotation += -0.05 * delta;
            dust.rotation += 0.0005 * delta;
            
           dust.scale.x = .76 + (Math.sin(count) * .15);
           dust.scale.y = .99 + (Math.cos(count) * .15);
            
            count += .002; 
            
        });*/

             
          
              
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
         
        var infoText = new PIXI.Text('In 5.5 billion years, as our sun runs out of fuel, it will expand into a red giant – which is many times larger than it is today – eclipsing the inner planets of the Solar System.', textStyle);
        
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
         
        var Title = new PIXI.Text("Red Giant", titleStyle);
        
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
                width:100,
                height:100
            });
            
            //Add it to the stage
            app.stage.addChild(scene);

            //Let it fade in with await (so it returns only when complete)
            await Animate.to(scene, 500, {alpha:1});
            
            //And then let it expand!
            Animate.to(redDude,10000,{
                width:app.view.height*2,
                height:app.view.height*2,
                easing:Easing.easeOut
            });
        };
});