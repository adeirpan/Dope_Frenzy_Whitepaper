let cody;
var facing = 'right';
var jumpTimer = 0;
let playerButtonUI;

let moveLeft = false;
import PlayerControllerButtonUI from "./PlayerControllerBUttonUI.js";
export default class Player {

    constructor(scene){
        this.scene = scene;
        this.direction = Phaser.Math.Vector2.RIGHT;
        this.cursorKeys = this.scene.input.keyboard.createCursorKeys();
 
        //init keyboard input
        scene.input.keyboard.on('keydown', e => {
            this.keydown(e);
        });

        //create animation
        
        this.scene.load.spritesheet('character', './assets/Cyberblitz_Anim_Walk.png',
        { frameWidth: 60, frameHeight: 69 });

        this.CreateAnimation('character');
        

        cody = this.scene.physics.add.sprite(100, 30, 'character');
        cody.setScale(2);
        cody.play('walk_right');
        //cody.enable = true;
        //cody.body.immovable = true;
        //console.log(cody.body);
        cody.body.bounce.y = 0.2;
        cody.setCollideWorldBounds(true);
        //this.scene.physics.add.collider(cody);
        // cody.body.collideWorldBounds = true;
        //cody.body.setSize(22, 46, 5, 16);
        //this.scene.physics.add.collider(cody);
        //this.physics.add.collider();
        


        //init button controller UI
        //playerButtonUI = new PlayerControllerButtonUI(this.scene, this);

        
        //this.scene.physics.add.overlap(cody,  null, this);
    }

    CreateAnimation(charactername){
        this.scene.anims.create({
            key: 'walk_right',
            frames: this.scene.anims.generateFrameNumbers(charactername, { frames: [ 0, 4, 8, 12, 16, 20, 24 ] }),
            frameRate: 8,
            repeat: -1
        });
    
        this.scene.anims.create({
            key: 'walk_up',
            frames: this.scene.anims.generateFrameNumbers(charactername, { frames: [ 1, 5, 9, 13, 17, 21, 25  ] }),
            frameRate: 8,
            repeat: -1,
            //repeatDelay: 2000
        });
    
        this.scene.anims.create({
            key: 'walk_left',
            frames: this.scene.anims.generateFrameNumbers(charactername, { frames: [ 2, 6, 10, 14, 18, 22, 26 ] }),
            frameRate: 8,
            repeat: -1,
            //repeatDelay: 2000
        });
    
        this.scene.anims.create({
            key: 'walk_down',
            frames: this.scene.anims.generateFrameNumbers(charactername, { frames: [ 3, 7, 11, 15, 19, 23, 27 ] }),
            frameRate: 8,
            repeat: -1,
            //repeatDelay: 2000
        });
    }
    // check keydown code
    keydown(event){
        //cek tombol apa yang ditekan
        //console.log(event);

        //lakukan sesuatu ketika keyCode tertentu ditekan
        switch(event.keyCode){
            case 37:  //left
                //console.log("left");
                break;
            case 38:  //up
                break;
            case 39:  //rigth            
                break;
            case 40: //down
                break;
        }
    }

    update(){
        //console.log(this.button_left);
        this.Move();
    }

    MoveLeft(){
        cody.body.velocity.x = -150;
            if (facing != 'left')
            {
                cody.play('walk_left');
                facing = 'left';
            }
    }

    MoveRight(){
        cody.body.velocity.x = 150;
        if (facing != 'right')
        {
            cody.play('walk_right');
            facing = 'right';
        }
    }

    Move(){
        if(this.cursorKeys.left.isDown || moveLeft){
            this.MoveLeft();
        }
        else if(this.cursorKeys.right.isDown){
            this.MoveRight();
        }

        else
        {
            if (facing != 'idle')
            {
                cody.stop();

                // if (facing == 'left')
                // {
                //     //cody.frame = 0;
                // }
                // else
                // {
                //     //cody.frame = 2;
                // }

                facing = 'idle';
            }
            cody.body.velocity.x = 0;
            //cody.body.velocity.y = 0;
        }
        if (this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).isDown && cody.body.onFloor() && this.scene.time.now > jumpTimer)
        {
            console.log("Jump");
            cody.body.velocity.y = -300;
            jumpTimer = this.scene.time.now + 750;
        }
    }
}