let button_left;
import Player from "../Player.js";

export default class PlayerControllerButtonUI {

    constructor(scene, player){
        this.scene = scene;
        
        this.scene.load.spritesheet('button_arrow', './assets/button_arrow.png',
        { frameWidth: 128, frameHeight: 128 });

        button_left = this.scene.add.image(100, 100, 'button_arrow', '__BASE').setOrigin(0, 0);
        button_left.direction = Phaser.Math.Vector2.LEFT;

        button_left.setInteractive();
        button_left.on("pointerover", () => {
            
            console.log("hover");
        })

        button_left.on("pointerout", () => {
            // hoverSprite.setVisible(false);
            console.log("pointer out");
        })

        //call this when pointer click
        button_left.on("pointerdown", () => {
            //this.scene.start(this.game.scene[1]);
            // player.MoveLeft();
            player.MoveLeft = true;
            console.log("clicked");
        })

        button_left.on("pointerup", () => {
            //this.scene.start(this.game.scene[1]);
            player.MoveLeft = false;
            
        })
    }
}