
export default class HUD {
    /**
*
* @param {boolean} walkLeft
* @param {boolean} walkRight
* @param {Float64Array} offset_y
*/
    constructor(scene, game, walkLeft, walkRight, offset_y, state){
        this.scene = scene;
        this.game = game;
        this.walkLeft = walkLeft;
        this.walkRight = walkRight;
        this.offset_y = offset_y;
        this.state = state;
        this.moveInterval = 0;
        this.lastMoveTime = 0;

        // this.button_left =  this.scene.add.image(100 , this.game.renderer.height * 4 / 5 - this.offset_y , 'button_left', '__BASE').setOrigin(0, 0);
        // this.button_left.setInteractive();
        // this.button_left.setScrollFactor(0);
        // this.button_left.on("pointerdown", () => {
        //     this.walkLeft = true;
        //     console.log("call walk left");
        // })

        // this.button_left.on("pointerup", () => {
        //     this.walkLeft = false;
            
        // })


        // this.button_right =  this.scene.add.image(200, this.game.renderer.height * 4 / 5 - this.offset_y , 'button_right', '__BASE').setOrigin(0, 0);
        // this.button_right.setInteractive();
        // this.button_right.setScrollFactor(0);

        // this.button_right.on("pointerdown", () => {
        //     this.walkRight = true;
        //     console.log("call walk right");
        // })
        // this.button_right.on("pointerup", () => {
        //     this.walkRight = false;
            
        // })


        // this.button_E =  this.scene.add.image(this.game.renderer.width - 200 , this.game.renderer.height * 4 / 5 - this.offset_y, 'button_E', '__BASE').setOrigin(0, 0);
        // this.button_E.setInteractive();
        // // button_E.setVisible(false);
        // this.button_E.setScrollFactor(0);

        this.box = this.scene.add
        .rectangle(this.game.renderer.width/2,0, this.game.renderer.width, this.game.renderer.height/2, 0x000000)
        .setOrigin(0.5,0);
        this.box.setScrollFactor(0);

        this.box2 = this.scene.add
        .rectangle(this.game.renderer.width/2,this.game.renderer.height/2, this.game.renderer.width, this.game.renderer.height/2, 0x000000)
        .setOrigin(0.5,0);
        this.box2.setScrollFactor(0);
        var camera = this.scene.cameras.main;
        Text =  this.scene.add.text(camera.width/2, camera.height/2, "press any key to start", {fill: '#ffffff', fontSize: 30,});
    }

    openBox(time, lastMoveTime, moveInterval){
        
    }

    printNumber(){
        var i = 0
        while (i < 10) {
            console.log("number: " + i);
            i++;
          }
    }
    update(time){
        if (this.state == "start"){
            if (time >= this.lastMoveTime + this.moveInterval && this.box2.y < this.game.renderer.height){
                this.lastMoveTime = time;
                this.box.y -= 5;
                this.box2.y += 5;
            } 
            else {
                this.state = "play";
                console.log("state: " + this.state);
            }
            
        }
    }
}