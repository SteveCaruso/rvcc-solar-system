var sliderContainer;

function addSlider() {
    const LINE_WIDTH=4;
    const LINE_COLOR=0xffffff;
    const ANIMATE_TIME=1000;

    /*
    //Set up the app
    var app = new PIXI.Application(64+192*3+64, 128, {
        backgroundColor : 0x000000,
        antialias: true
    });
    document.body.appendChild(app.view);
    */

    //Center coordinates for the stage
    var centerX = app.view.width/2;
    var centerY = app.view.height/2;

    class Node {
        constructor(x, y, container, name){
            // you don't need these actually
            this.x=x;
            this.y=y;
            this.name=name;

            this.picture=new PIXI.Sprite.fromImage("./img/ui/node.png")
            this.picture.anchor.set(0.5);
            this.picture.position.set(x, y);
            this.picture.base=this;

            // this didn't end up being used
            this.picture_hover=new PIXI.Sprite.fromImage("./img/ui/node-hover.png")
            this.picture_hover.anchor.set(0.5);
            this.picture_hover.position.set(x, y);
            this.picture_hover.base=this;
            this.picture_hover.visible=false;

            this.picture_active=new PIXI.Sprite.fromImage("./img/ui/node-active.png");
            this.picture_active.anchor.set(0.5);
            this.picture_active.position.set(x, y);
            this.picture_active.base=this;

            this.next=null;
            this.previous=null;
            this.joiningLine=null;

            this.container=container;
            container.addChild(this.picture);
            container.addChild(this.picture_active);
            container.addChild(this.picture_hover);

            this.picture.interactive=true;

            this.picture.on("pointerdown", function(e){

            });

            this.picture.on("pointerup", function(e){
                deactivateAll();
                this.base.activate();
                slider.moveTo(this.base);
            });

            this.deactivate();
        }

        hover(){
            this.picture_hover.visible=true;
        }

        unhover(){
            this.picture_hover.visible=false;
        }

        activate(){
            this.picture.visible=false;
            this.picture_active.visible=true;
        }

        deactivate(){
            this.picture.visible=true;
            this.picture_active.visible=false;
        }

        deactivateNext(){
            this.deactivate();
            if (this.next!=null){
                this.next.deactivateNext();
            }
        }

        setNext(next){
            this.next=next;
            if (this.joiningLine!=null){
                this.container.removeChild(this.joiningLine);
            }

            var line=new PIXI.Graphics();
            line.beginFill(LINE_COLOR);
            line.lineStyle(LINE_WIDTH, LINE_COLOR);
            line.moveTo(this.x, this.y);
            line.lineTo(this.next.x, this.next.y);
            line.endFill();
            line.zIndex=10000;

            this.container.addChildAt(line, 0);

            this.joiningLine=line;
        }

        // this isn't really useful except for with the slider itself
        setPrevious(previous){
            this.previous=previous;
        }

        onSelect() {
            console.log(this.name + " was selected.")
        }
    }

    class Slider {
        constructor(node, container){
            this.picture=new PIXI.Sprite.fromImage("./img/ui/slider.png");
            this.picture.anchor.set(0.5);
            this.picture.position.set(node.x, node.y);
            this.picture.base=this;
            this.picture.interactive=true;
            this.node=node;

            this.following=false;

            this.picture.on("pointerdown", function(){
                this.base.following=true;
            });

            this.picture.on("pointerup", function(){
                this.base.release();
            });

            this.picture.on("pointerupoutside", function(){
                this.base.release();
            });

            this.picture.on("pointermove", function(event){
                if (this.base.following){
                    var position=event.data.getLocalPosition(this.parent);
                    var y=this.position.y;
                    var x=position.x;

                    var node=this.base.node;
                    var previous=node.previous;
                    var next=node.next;

                    if (previous!=null){
                        if (this.base.distance(previous)<this.base.distance(node)){
                            node.deactivate();
                            previous.activate();
                            this.base.node=previous;
                        }
                    }

                    if (next!=null){
                        if (this.base.distance(next)<this.base.distance(node)){
                            node.deactivate();
                            next.activate();
                            this.base.node=next;
                        }
                    }

                    if (this.base.node.previous==null){
                        x=Math.max(x, this.base.node.x);
                    }

                    if (this.base.node.next==null){
                        x=Math.min(x, this.base.node.x)
                    }

                    this.position.set(x, y);
                }
            });

            this.container=container;
            container.addChild(this.picture);
        }

        release(){
            this.following=false;
            this.moveTo(this.node);
        }

        moveTo(node){
            var how={
                x: node.x,
                y: node.y,
                easing: Easing.easeOut
            };

            Animate.to(this.picture, ANIMATE_TIME, how).then(node.onSelect);
        }

        pdistance(x, y, x2, y2){
            return Math.sqrt(Math.pow(x-x2, 2)+Math.pow(y-y2, 2));
        }

        distance(node){
        return this.pdistance(this.picture.position.x, this.picture.position.y, node.x, node.y);
    }
}

function deactivateAll(){
    first.deactivateNext();
}

var container=new PIXI.Container();
app.stage.addChild(container);
    
sliderContainer = container;

var first=new Node(64, 64, container, "first");
    first.onSelect = function() {
        Solar.changeSceneTo('test');
    }
var second=new Node(64+192, 64, container, "second");
    second.onSelect = function() {
        Solar.changeSceneTo('idle');
    }
var third=new Node(64+192*2, 64, container, "third");
var fourth=new Node(64+192*3, 64, container, "fourth");

var fifth = new Node(64+192*4, 64, container,"fifth");
    
first.setNext(second);
second.setPrevious(first);

second.setNext(third);
third.setPrevious(second);

third.setNext(fourth);
fourth.setPrevious(third);
    
fourth.setNext(fifth);
fifth.setPrevious(fourth);

var slider=new Slider(second, container);   
}