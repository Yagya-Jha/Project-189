AFRAME.registerComponent("player",{
    schema: {
        pickableItem: {type: 'string', default: ' '},
        inventory: {type:'array', default: []},
    },
    init: function(){
        let add=true
        let canAdd=true;
        window.addEventListener("mousedown", (e)=>{
            let doOnce=true;
            if(e.button==0 && add && canAdd){
                let { pickableItem, inventory }=this.el.getAttribute("player");
                if(pickableItem!=' '){
                    add=false;
                    inventory.push(pickableItem);
                    this.onCollect(pickableItem);
                    this.el.setAttribute("player", {inventory: inventory});
                    if(inventory.length==5){
                        canAdd=false;
                        if(doOnce){
                            this.change();
                            this.show();
                            doOnce=false;
                        }
                        console.log(doOnce)
                    }
                }
            }
        });
        
        window.addEventListener("mouseup", (e)=>{
            if(e.button==0){
                add=true;
            }
        });


    },
    onCollect: function(x){
        for(var i=1;i<=5;i++){
            let spot=document.querySelector(`#icon_${i}`);
            if(spot.getAttribute("src")=='#empty'){
                spot.setAttribute("src", `#${x}`)
                break;
            }
        }
    },
    
    change: function(){
        const scene=document.querySelector("#scene");
        let t=document.querySelector("#fight")

        for(let i=0; i<10; i++){
            let e=document.querySelector(`#elem_${i}`);
            scene.removeChild(e);
        }

        let b= document.querySelector("#black");
        b.setAttribute("animation", {property: 'opacity',from:0,to:1,easing:'linear',loop:false,dur:1000});

        t.setAttribute("visible", true);
    },

    show: function(){
        let d=false;
        window.addEventListener("keydown", (e)=>{
            if(e.key=="z"){
                if(!d){
                    let t=document.querySelector("#fight")
                    t.setAttribute("visible", false);
                    this.createEnemy();
                    this.el.setAttribute("wasd-controls",{acceleration: 0});
                    this.el.setAttribute("position",{x: 0,y: 1,z: 23})
                    let b= document.querySelector("#black");
                    b.setAttribute("animation", {property: 'opacity',from:1,to:0,easing:'linear',loop:false,dur:1000});
                    d=true;
                    this.el.removeAttribute("player");
                }
            }
        });
    },
    createEnemy: function(){
        const scene=document.querySelector("#scene");
        let elm=document.createElement("a-entity");
        elm.setAttribute("gltf-model", "#monster_model");
        elm.setAttribute("id","monster");
        elm.setAttribute("scale",{x:0.3,y:0.3,z:0.3});
        elm.setAttribute("enemy",{});
        let y = 4;
        let x=0;
        let z=15;
        elm.setAttribute("position",{x:x,y:y,z:z});
        let t=y+0.75;
        let f=y-0.25;
        elm.setAttribute("animation", {property: 'position', from: `${x} ${t} ${z}`, to: `${x} ${f} ${z}`,dir:'alternate',easing: 'easeInOutSine', loop: true, dur: 1000});
        elm.setAttribute("animation__2", {property: 'rotation', from: "10 -9 -5", to: "15 9 5",dir:'alternate',easing: 'easeInOutSine', loop: true, dur: 8000});
        scene.appendChild(elm);
    },
});


AFRAME.registerComponent("player-fight",{

});