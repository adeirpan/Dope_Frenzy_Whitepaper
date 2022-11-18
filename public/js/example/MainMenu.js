//import { Game } from "phaser";
import MainScene from "../MainScene.js";
import Box from "../box.js";
export default class MainMenu extends Phaser.Scene {
    constructor(){
        super('MainMenu');
    }

    preload(){
        this.load.spritesheet('green_button', 'assets/button_green.png',
        { frameWidth: 60, frameHeight: 69 });


        // let loadingBar = this.add.graphics({
        //     fillStyle: {
        //         color: 0xffffff
        //     }
        // })


        // this.load.on("progress", (percent) =>{
        //     loadingBar.fillRect(0, this.game.renderer.height /2, this.game.renderer.width * percent, 50 );
        //     console.log(percent);
        // })


        this.load.on("complete", (percent) =>{
            console.log("complete");
        })
    }

    create(){
        var greenButton = this.add.image(128, 128, 'green_button', '__BASE').setOrigin(0, 0);
        this.add.text(greenButton.x + 40,greenButton.y + 20, "BUTTON", {fill: '#ffffff', fontSize: 30,});
        var text = this.add.text(10, 10, 'WHITEPAPER', { fill: '#00ff00', fontSize: 30 });

        var box = new Box(this);
        //make the image / object interactive
        greenButton.setInteractive();
        greenButton.on("pointerover", () => {
            // hoverSprite.setVisible(true);
            // hoverSprite.play("walk");
            // hoverSprite.x = greenButton.x - greenButton.width;
            // hoverSprite.y = greenButton.y;
            console.log("hover");
            console.log(text.visible);
        })

        greenButton.on("pointerout", () => {
            // hoverSprite.setVisible(false);
            console.log("pointer out");
        })

        //call this when pointer click
        greenButton.on("pointerup", () => {
            //this.scene.start(this.game.scene[1]);
            text.setVisible(!text.visible);

            console.log("clicked");
        })

        // optionsButton.setInteractive();

        // optionsButton.on("pointerover", () => {
        //     hoverSprite.setVisible(true);
        //     hoverSprite.play("walk");
        //     hoverSprite.x = optionsButton.x - optionsButton.width;
        //     hoverSprite.y = optionsButton.y;

        // })

        // optionsButton.on("pointerout", () => {
        //     hoverSprite.setVisible(false);
        // })

        // optionsButton.on("pointerup", () => {
        //     //this.scene.launch();
        // })

        //change scene
        //this.scene.start(this.game.scene.MainScene);
    }

    
}