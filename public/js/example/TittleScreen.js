// import { Game } from "phaser";

export default class TittleScreen extends Phaser.Scene {
    constructor(){
        super('MainMenu');
    }

    TittleScreen ()
    {
        Phaser.Scene.call(this, { key: 'background', active: true });
    }

    preload(){
        this.load.spritesheet('Road', './assets/train.png',
        { frameWidth: 128, frameHeight: 128 });

        let Text2 =  this.add.text(200, 200, "0%");


        this.load.on("progress", (percent) =>{
            Text2.text = parseInt(percent * 100) + "%";
            console.log(percent);
        })


        this.load.on("complete", (percent) =>{
            console.log("complete");
        })

    }

    create(){
        // let Text2 =  this.add.text(200, 200, "0%");
    }
    
}