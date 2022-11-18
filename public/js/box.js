export default class Box {
    constructor(scene){
        this.scene = scene;
        this.lastMoveTime = 0;
        this.moveInterval = 50;  //500 nilai detik . 1 detik == 1000. 
        this.tileSize = 10;
        this.direction = Phaser.Math.Vector2.RIGHT;
        
        this.gameIsPlaying = false;
        scene.input.keyboard.on('keydown', e => {
            this.keydown(e);
        });

        this.box = this.scene.add
        .rectangle(0,0, 10000, 250, 0x000000)
        .setOrigin(0);

        this.box2 = this.scene.add
        .rectangle(0,250, 10000, 250, 0x000000)
        .setOrigin(0);
        // this.scene.load.spritesheet('green_button', 'assets/button_green.png',
        // { frameWidth: 250, frameHeight: 69 });

        //this.scene.add.image(200, 200, 'green_button', '__BASE').setOrigin(0, 0);

        this.Text =  this.scene.add.text(250, 250, "press any key to start", {fill: '#ffffff', fontSize: 30,});


    }
    keydown(event){
        //cek tombol apa yang ditekan
        console.log(event);
        this.gameIsPlaying = true;
        this.Text.setVisible(false);
        
    }

    update(time){
        if (time >= this.lastMoveTime + this.moveInterval && this.box2.y < 500){
            this.lastMoveTime = time;
            this.box.y -= 5;
            this.box2.y += 5;
        }
        
        
    }
}