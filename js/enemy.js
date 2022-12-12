AFRAME.registerComponent("enemy",{
    schema:{
        inventory: {type: "array", default: []}
    },
    init:function(){
        let elements=["fire", "water", "electricity", "wind", "stone"];
        let inventory=[];
        for(var i=0;i<5;i++){
            let rand = Math.round(Math.random()*5)
            console.log(rand);
            inventory.push(elements[rand]);
        }
        console.log(inventory);
        this.el.setAttribute("enemy",{inventory: inventory});
    }
})