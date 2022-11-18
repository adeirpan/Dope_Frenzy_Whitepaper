


import PlayerControllerButtonUI from "./example/PlayerControllerButtonUI.js";
export default class Player {

    constructor(scene, game){
        this.scene = scene;
        this.game = game;
        this.walkRight = false;
        this.walkLeft = false;
        this.moveLeft = false;
        this.cody;
        this.facing = 'right';
        // Player ===============================================================================
        this.cursorKeys = this.scene.input.keyboard.createCursorKeys();
        this.scene.load.spritesheet('character', './assets/Cyberblitz_Anim_Walk.png',
        { frameWidth: 60, frameHeight: 69 });

        //create animation
        this.scene.anims.create({
            key: 'walk_right',
            frames: this.scene.anims.generateFrameNumbers('character', { frames: [ 0, 4, 8, 12, 16, 20, 24 ] }),
            frameRate: 8,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'walk_up',
            frames: this.scene.anims.generateFrameNumbers('character', { frames: [ 1, 5, 9, 13, 17, 21, 25  ] }),
            frameRate: 8,
            repeat: -1,
            //repeatDelay: 2000
        });
    
        this.scene.anims.create({
            key: 'walk_left',
            frames: this.scene.anims.generateFrameNumbers('character', { frames: [ 2, 6, 10, 14, 18, 22, 26 ] }),
            frameRate: 8,
            repeat: -1,
            //repeatDelay: 2000
        });
    
        this.scene.anims.create({
            key: 'walk_down',
            frames: this.scene.anims.generateFrameNumbers('character', { frames: [ 3, 7, 11, 15, 19, 23, 27 ] }),
            frameRate: 8,
            repeat: -1,
            //repeatDelay: 2000
        });

        this.cody = this.scene.physics.add.sprite(0, 410, 'character');
        this.cody.setScale(1);
        this.cody.play('walk_right');
        this.cody.body.setSize(22, 46, 5, 16);
        this.cody.body.bounce.y = 0.2;
        this.cody.setCollideWorldBounds(true);
        // this.scene.physics.add.collider(cody, platforms);

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
        this.Move();
        this.Move(this.cursorKeys, this.walkLeft, this.walkRight )
    }

    Move(cursorKeys, walkLeft,  walkRight){
    

        if(this.cursorKeys.left.isDown || walkLeft || this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown){
            this.cody.body.velocity.x = -150;
            if (this.facing != 'left')
            {
                this.cody.play('walk_left');
                this.facing = 'left';
                
                console.log("walk_left");
            }
    
            
        }
        else if(this.cursorKeys.right.isDown || walkRight || this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown){
            this.cody.body.velocity.x = 150;
            if (this.facing != 'right')
            {
                this.cody.play('walk_right');
                this.facing = 'right';
            }
        }
    
        else
        {
            if (this.facing != 'idle')
            {
                this.cody.stop();
                
                this.facing = 'idle';
            }
            this.cody.body.velocity.x = 0;
        }
        walkLeft = false;
        walkRight = false;
        
        
    }
}