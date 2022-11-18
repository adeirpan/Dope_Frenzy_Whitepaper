const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};

export default class Preload {

    constructor(scene, game){
        this.scene = scene;
        this.game = game;
    }


    Preload(){
        let progressText =  this.scene.add.text(this.game.renderer.width/2, this.game.renderer.height/2, "0%").setOrigin(0.5,0.5);


        this.scene.load.on("progress", (percent) =>{
            progressText.text = percent * 100 + "%";
            console.log(percent);
        })
        
        this.scene.load.spritesheet('button_E', './assets/Button_E.png',
        { frameWidth: 128, frameHeight: 128 });
        this.scene.load.spritesheet('button_left', './assets/Button_Left.png',
        { frameWidth: 128, frameHeight: 128 });
        this.scene.load.spritesheet('button_right', './assets/Button_Right.png',
        { frameWidth: 128, frameHeight: 128 });

        this.scene.load.spritesheet('Road', './assets/DW_RoadTilemap.png',
            { frameWidth: 128, frameHeight: 128 });

        this.scene.load.image('bubbleChat', './assets/bubbleChat.png');
    
        this.scene.load.spritesheet('character', './assets/Cyberblitz_Anim_Walk.png',
        { frameWidth: 60, frameHeight: 69 });

        this.scene.load.spritesheet('NPC', './assets/NPC.png',
        { frameWidth: 60, frameHeight: 69 });
    
        this.scene.load.spritesheet('train', 'assets/train.png',
        { frameWidth: 60, frameHeight: 69 });
    
        this.scene.load.spritesheet('button', 'assets/button_green.png',
        { frameWidth: 60, frameHeight: 69 });
        
        this.scene.load.spritesheet('bar_menu', './assets/bar_menu.png',
        { frameWidth: 128, frameHeight: 128 });

        
        this.scene.load.spritesheet('button_arrow', './assets/button_arrow.png',
        { frameWidth: 128, frameHeight: 128 });

        this.scene.load.spritesheet('button_settings', './assets/button_settings.png',
        { frameWidth: 128, frameHeight: 128 });

        //add audio
        this.scene.load.audio('track', ['./assets/audio/pencilsketching.mp3']);
        this.scene.load.image('ground', 'assets/platform.png');
        

        //add buildings
        this.scene.load.spritesheet('building1', './assets/building1.png',
        { frameWidth: 280, frameHeight: 480 });

        this.scene.load.spritesheet('building2', './assets/building2.png',
        { frameWidth: 268, frameHeight: 212 });
        
        this.scene.load.spritesheet('building3', './assets/building3.png',
        { frameWidth: 316, frameHeight: 262 });

        this.scene.load.spritesheet('building4', './assets/building4.png',
        { frameWidth: 256, frameHeight: 224 });

        this.scene.load.spritesheet('building5', './assets/building5.png',
        { frameWidth: 440, frameHeight: 400 });

        this.scene.load.spritesheet('building6', './assets/building6.png',
        { frameWidth: 548, frameHeight: 329 });

        // object ======================================================================
        this.scene.load.spritesheet('vehicle', './assets/RC_DF_Anim_Vehicle_side_Damaged.png',
        { frameWidth: 209, frameHeight: 160 });
        this.scene.load.spritesheet('power_box', './assets/RC_DF_Object_Power_box_destroyed.png',
        { frameWidth: 53, frameHeight: 70 });
        this.scene.load.spritesheet('vendingMachine_1', './assets/RC_DF_Object_Vending_Machine_01.png',
        { frameWidth: 121, frameHeight: 120 });
        this.scene.load.spritesheet('vendingMachine_2', './assets/RC_DF_Object_Vending_Machine_02.png',
        { frameWidth: 120, frameHeight: 120 });
        this.scene.load.spritesheet('hydrant', './assets/RC_DF_Object_Water_Hydrant.png',
        { frameWidth: 272, frameHeight: 174 });
        

        this.scene.load.on("complete", async (percent) =>{
            console.log("complete");
            await sleep(1000);
            progressText.setVisible(false);

        })

        this.scene.load.image('bg', './assets/BoardInfo/Board.png');
    }
}