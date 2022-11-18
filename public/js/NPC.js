

export default class CharacterNPC {
/**
*
* @param {int} position_x
@param {int} position_y
*/
    constructor(scene, game, position_x, position_y, Player){
        this.scene = scene;
        this.game = game;
        this.Player = Player;
        this.cody = this.Player.cody;

        
        // NPC =================================================================================================
        this.NPC = this.scene.physics.add.sprite( position_x, position_y, 'NPC');
        
        this.NPC.body.setSize(22, 46, 5, 16);
        this.NPC.setFrame(3);
        this.NPC.setCollideWorldBounds(true);

        this.middleNotificationText =  this.scene.add.text(this.game.renderer.width/2, this.game.renderer.height * 0.9, "Press E Button").setOrigin(0.5,0.5);
        this.middleNotificationText.setScrollFactor(0);
        this.middleNotificationText.setVisible(false);

        this.bubbleChat = this.scene.add.sprite(this.NPC.x, this.NPC.y, 'bubbleChat', '__BASE');
        this.bubbleChat.y -= this.NPC.height/2;
        this.bubbleChat.x += this.NPC.x - this.NPC.width/2;
        this.bubbleChat.setScale(0.1);
        this.bubbleChat.setVisible(false);
        this.label = this.scene.add.text(this.bubbleChat.x - 20, 265, '', { fill: '#00ff00'});


        this.isTalking = false;
        this.canTalk = false;
        this. isGoingToNPC = false;
        this.onDialogueNPC = false;
        this.isdialogueUItextShow = false;


        this.message = "The sky above the port was the color of television, tuned to a dead channel.\n`It's not like I'm using,' Case heard someone say, as he shouldered his way\nthrough the crowd around the door of the Chat. `It's like my body's developed";
        this.message += "\n" + this.message;

        var graphics = this.scene.make.graphics(0.5, 0);

        graphics.fillStyle(0xffffff);
        graphics.fillRect(0, 0, this.game.renderer.width , this.game.renderer.height/2 * 0.9 );
        graphics.setScrollFactor(0);
        var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

        //text width is 80% from camera width
        this.dialogueUItext = this.scene.add.text(this.game.renderer.width/2, this.game.renderer.height * 0.1, this.message, { /**fontFamily: 'Arial', **/ color: '#09EDF0', wordWrap: { width: this.game.renderer.width * 0.8 }, fontSize: this.game.renderer.width/100 }).setOrigin(0.5, 0);
        this.dialogueUItext.setScrollFactor(0);
        this.dialogueUItext.width = this.game.renderer.width;
        this.dialogueUItext.setMask(mask);
    }


    getPosition_x(){
        return this.NPC.x;
    }

    getPosition_y(){
        return this.NPC.y;
    }



    update(time){
        // console.log(this.cody.x);
        if(this.cody.x >= this.NPC.x - 50 &&  this.cody.x <= this.NPC.x + 50){
            this.canTalk = true;
            // this.middleNotificationText.setVisible(true);
            // this.middleNotificationText.text = "Press E To Talk";
            if (!this.isTalking){
                this.middleNotificationText.setVisible(true);
                this.middleNotificationText.text = "Press E To Talk";
                
                this.bubbleChat.setVisible(true);
                // this.typewriteText('Hello!', time, this.label);
                // bar1CanShow = true;
                this.isTalking = true;
            }
            
            
        } else {
            this.middleNotificationText.setVisible(false);
            this.bubbleChat.setVisible(false);
            this.isTalking = false;
            this.label.text = '';
            this.canTalk = false;
        }

        if (this.canTalk){
            // button_E?.on("pointerdown", () => {
            //     //bar.setVisible(!bar.visible);
            //     if (cody.x > NPC1.x - 30){
            //         walkLeft = true;
            //     } 
            //     isGoingToNPC1 = true;
    
            // })

            if (this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown){
                console.log("button E pressed")
                if (this.cody.x > this.NPC.x - 30){
                    this.Player.walkLeft = true;
                } 
                this.isGoingToNPC = true;
            }
        }

        if (this.isGoingToNPC){
            if (this.cody.x <= this.NPC.x - 30){
                this.isGoingToNPC == false;
                this.cody.setFrame(0);
                this.Player.walkLeft = false;
                this.onDialogueNPC = true;
                
            }
        }

        if (this.onDialogueNPC){
            // box.y  = 0 - (this.game.renderer.height/10) ;
            // box2.y = this.game.renderer.height * 3 /5;
            // if (this.isdialogueUItextShow == false){
            //     this.dialogueUItext.setVisible(true);
            //     // typewriteText(message, time, dialogueUItext);
                
            //     this.dialogueUItext.y = 0;
            //     this.isdialogueUItextShow = true;
                
            //     console.log("message" + this.message);
            // }
            
            this.isGoingToNPC = false;
            this.cody.setFrame(0);
            this.Player.walkLeft = false;

            this.onDialogueNPC = false;
            // button_close.setVisible(true);
        }
    }

    typewriteText(text, time, label)
    {
        console.log("typewriter start");
        const length = text.length
        let i = 0
        time.addEvent({
            callback: () => {
                
                // if (input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).isDown){
                //     delay = 0;
                // }
                // console.log("onTypewriter");
                label.text += text[i]
                ++i
            },
            repeat: length - 1,
            delay: 10
        })
        console.log("typewriter end");
    }
}