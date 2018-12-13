/*
 * Don't touch this file or the universe will explode (unless you really want to)
 */

var sliderSlider=null;
// there's a way to make the linter shut up but it's a pain in the neck so in
// the meantime if brackets tells you there's something wrong with this line
// just pretend that it isn't
const ANIMATE_TIME=500;

/*
 * Hey, listen!
 *
 * the Node/Slider icons are 64x64 and centered. The first node is positioned
 * at 64, 64 and each subsequent node is 192 after it. Therefore, the size of
 * the Container is effectively 128+192*n, 128.
 */

Solar.loader.add("ui-node","img/ui/node.png")
	.add("ui-node-active","img/ui/node-active.png")
	.add("ui-node-hover","img/ui/node-hover.png")
    .add("ui-slider","img/ui/slider.png");

var slider;

Solar.loader.on("complete", function(loader,resources) {
    
    slider=addSlider(64, app.view.height-128, 64, app.view.height, resources);
    hideSlider(0);

});

function addSlider(xorigin, yorigin, xoffscreen, yoffscreen, resources) {
    const LINE_WIDTH=4;
    const LINE_COLOR=0xffffff;

    //Center coordinates for the stage
    var centerX = app.view.width/2;
    var centerY = app.view.height/2;

    class Node {
        constructor(x, y, container, name, resources){
            // you don't need these actually
            this.x=x;
            this.y=y;
            this.name=name;

            this.picture=new PIXI.Sprite(resources["ui-node"].texture);
            this.picture.anchor.set(0.5);
            this.picture.position.set(x, y);
            this.picture.base=this;

            // this didn't end up being used because it turns out that touch
            // screens don't know when you're hovering
            /*
                this.picture_hover=new PIXI.Sprite(resources["ui-node-hover"].texture);
                this.picture_hover.anchor.set(0.5);
                this.picture_hover.position.set(x, y);
                this.picture_hover.base=this;
                this.picture_hover.visible=false;
            */

            this.picture_active=new PIXI.Sprite(resources["ui-node-active"].texture);
            this.picture_active.anchor.set(0.5);
            this.picture_active.position.set(x, y);
            this.picture_active.base=this;

            this.next=null;
            this.previous=null;
            this.joiningLine=null;

            this.container=container;
            container.addChild(this.picture);
            container.addChild(this.picture_active);
            //container.addChild(this.picture_hover);

            this.picture.interactive=true;

            this.picture.on("pointerdown", function(e){

            });

            this.picture.on("pointerup", function(e){
                deactivateAll();
                this.base.activate();
                sliderSlider.moveTo(this.base);
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
        constructor(node, container, resources){
            this.picture=new PIXI.Sprite(resources["ui-slider"].texture);
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

            Animate.to(this.picture, ANIMATE_TIME, how).then(function(){
                node.onSelect();
            });
        }

        pdistance(x, y, x2, y2){
            return Math.sqrt(Math.pow(x-x2, 2)+Math.pow(y-y2, 2));
        }

        distance(node){
            return this.pdistance(this.picture.position.x, this.picture.position.y, node.x, node.y);
        }
    }

    function deactivateAll(){
        node1.deactivateNext();
    }

    var container=new PIXI.Container();
    app.stage.addChild(container);
    
    container.name="slider";
    
    container.xorigin=xorigin;
    container.yorigin=yorigin;
    container.xoffscreen=xoffscreen;
    container.yoffscreen=yoffscreen;
    
    container.x=xoffscreen;
    container.y=yoffscreen;
    
    container.alpha=0;
    
    var node1=new Node(64, 64, container, "Big Bang", resources);
    var node2=new Node(64+192, 64, container, "Stellar Dust", resources);
    var node3=new Node(64+2*192, 64, container, "Disk", resources);
    var node4=new Node(64+3*192, 64, container, "Now", resources);
    var node5=new Node(64+4*192, 64, container, "Red Giant", resources);
    var node6=new Node(64+5*192, 64, container, "White Dwarf", resources);
    var node7=new Node(64+6*192, 64, container, "Heat Death", resources);
    
    node1.onSelect = function() {
        Solar.changeSceneDiscardCurrent("timeline: big bang", true);
    }
    
    node2.onSelect = function() {
        Solar.changeSceneDiscardCurrent("timeline: stellar dust", true);
    }
    
    node3.onSelect = function() {
        Solar.changeSceneTo("accretion");
        //Solar.changeSceneDiscardCurrent("timeline: disk", true);
    }
    
    node4.onSelect = function() {
        Solar.changeSceneTo("idle");
        //Solar.changeSceneDiscardCurrent("idle", true);
    }
    
    node5.onSelect = function() {
        Solar.changeSceneDiscardCurrent("timeline: red giant", true);
    }
    
    node6.onSelect = function() {
        Solar.changeSceneDiscardCurrent("timeline: white dwarf", true);
    }
    
    node7.onSelect = function() {
        Solar.changeSceneDiscardCurrent("timeline: death", true);
    }

    node1.setNext(node2);
    node2.setPrevious(node1);
    
    node2.setNext(node3);
    node3.setPrevious(node2);
    
    node3.setNext(node4);
    node4.setPrevious(node3);
    
    node4.setNext(node5);
    node5.setPrevious(node4);
    
    node5.setNext(node6);
    node6.setPrevious(node5);
    
    node6.setNext(node7);
    node7.setPrevious(node6);
    
    sliderSlider=new Slider(node4, container, resources);
    return sliderSlider;
}

function hideSlider(delay){
    if (typeof delay==="undefined"){
        delay=0;
    }
    
    var data={
        x: sliderSlider.container.xoffscreen,
        y: sliderSlider.container.yoffscreen,
        alpha: 0,
        easing: Easing.easeOut
    };
    
    setTimeout(function() {
		Animate.to(sliderSlider.container, ANIMATE_TIME, data);
	}, delay);
}

function showSlider(delay){
    if (typeof delay==="undefined"){
        delay=0;
    }
    
    var data={
        x: sliderSlider.container.xorigin,
        y: sliderSlider.container.yorigin,
        alpha: 1,
        easing: Easing.easeInOut
    };
    
    app.stage.addChildAt(sliderSlider.container,app.stage.children.length-1);
    
    setTimeout(function() {
		Animate.to(sliderSlider.container, ANIMATE_TIME, data);
	}, delay);
}

function resetSlider(){
    // todo z indexing is a pain
    slider.container.removeChild(slider.picture);
    slider.container.addChild(slider.picture);
}