import phaser from "./lib/phaser.js";
import { app } from "./lib/appScale.js";
// import FormUtil from "./utility/formUtil.js"
const  config = {
    width: window.innerWidth,
    height:  window.innerHeight,
    antialias: true,
    multiTexture: true,
    // type: Phaser.AUTO,
    type: Phaser.WEBGL,
    // type: Phaser.CANVAS,
    scale: {
        mode: Phaser.Scale.RESIZE,
    },
    parent: 'phaser-game',
    parent: 'phaser-example',
    dom: {
        createContainer: true
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
        keydown : keydown,
        render : render,
        Move: Move,
        triggerEnter : triggerEnter,
        typewriteText : typewriteText,
        typewriteTextWrapped : typewriteTextWrapped,
        typewriteBitmapText : typewriteBitmapText,
        resize : resize,
        p : p
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: window.innerHeight *  1500/1000 },
            // debug:true
        }
    }
    
};

var game = new Phaser.Game(config);
var gameState = "start";

var  train;
var cody;
var jumpTimer = 0;
var bubbleChat, bubbleChat2, bubbleChat3, bubbleChat4, bubbleChat5, bubbleChat6, bubbleChat7, bubbleChat8;
var train;
var facing = 'right';
var jumpTimer = 0;
let screen1;
let screen2;
let gameIsPlaying = false;
let bar;
let Text, Text2, dialogUItext;
let isTextShow = false;
let isText2Show = false;
let isDialogUITextShow = false;
let cursorKeys;
let box;
let box2;
let moveInterval = 0;
let lastMoveTime = 0;
let startGame = false;
let content;
let button_left, button_right, button_E, button_close, button_jump;
let message;
let walkRight, walkLeft = false;
//text: Phaser.GameObjects.Text
let NPC1;
let NPC2;
let NPC3;
let NPC4;
let NPC5;
let NPC6;
let NPC7;
let NPC8;
let Kiosk;

let cantalkNPC1;
let isGoingToNPC1;
let NPC1IsTalking = false;

let cantalkNPC2;
let isGoingToNPC2;
let NPC2IsTalking = false;

let cantalkNPC3 = false;
let isGoingToNPC3 = false;
let NPC3IsTalking = false;

let cantalkNPC4 = false;
let isGoingToNPC4 = false;
let NPC4IsTalking = false;

let cantalkNPC5 = false;
let isGoingToNPC5 = false;
let NPC5IsTalking = false;

let cantalkNPC6 = false;
let isGoingToNPC6 = false;
let NPC6IsTalking = false;

let cantalkKiosk = false;
let isGoingToKiosk = false;
let KioskIsTalking = false;

let cantalkNPC7 = false;
let isGoingToNPC7 = false;
let NPC7IsTalking = false;

let cantalkNPC8 = false;
let isGoingToNPC8 = false;
let NPC8IsTalking = false;

let cantalkSubway = false;

//interaction NPC (digunakan ketika player menemui NPC. false berarti NPC belum mengeluarkan percakapan apapun)\

let bar1CanShow = false;
let onDialogNPC;


let talkMessage = [];
let indexTalk = 0;

var label1;
var label2;
var label3;
var label4;
var label5;
var label6;
var label7;
var label8;


var url = "https://dry-brushlands-43705.herokuapp.com/api/email/submit";
var API_Server = "https://dry-brushlands-43705.herokuapp.com/";



// talk content =========================================================================================
var NPC1Talk = [
    "Hey there hustler, word on tha street is there is a portal somewhere that takes you into this blissful frenzy paradise where you can be who you wanna be! ",
    "But there are a few things you gotta do in order to find it",
    "Score some Drugs, and ready your $paper"
];

var NPC2Talk = [
    " Lookin good playa! … seems you have been waiting a while to release your wrath on the city!",
    "If you need some help on how shit works go see cyber, He will give you the low down.",
    "……",
    "Ok this is getting creepy..",
    "I don't have Instagram"
]

var NPC3Talk = [
    "Yo! Side hustle, Fancy a quick bet? Come back and see me when you have built your score up.",
    "That's it…. Wanna help code?",
    "Thought so… move along"
]

var NPC4Talk = [
    "I built this city and now mother fuckers want to destroy it! ",
    "Damn dragon and gold shirt war.. I don't fuck with either.. just build, smoke, deal… that's my motto."
]

var NPC5Talk = [
    " Looking fly there playa",
    "Have you visited the Merch store and scored some IRL stuff?",
    "Word on the street is if you play well out here you will win some free Merch!"
]

var NPC6Talk = [
    "Ahh so you wanna be a playa? Lemme tell you how its going to go down",
    "We all know the saying “don't get high on your own supply” well that shit does apply here!",
    "Pop as much shit as you can, run around shooting shit, cause damage mayhem!",
    "Get that score cranking up!",
    "Don't worry in this world no one really gets hurt.. only your ego if your not getting up on that score board then best to keep tryin'",
    "Guns have different rates of fire, drugs do different ….things lol , Work out the perfect combo and level up",
    "Ohhh you need more info? Go to the store and have a look at for the mechanics there."
]

var NPC7Talk = [
    'Join our wait list to get on as an alpha tester',
    'Everyone has an email right… but do they check it?',
    'Enter your email here:',
    'Stay tuned for updates', 
    'Maybe this is what you are looking for…'
]

//Dragon
var NPC8Talk = [
    "See how they hid me back here!!",
    "These fucks, Wanna buy some fentanyl? I got cheap stuff coming in soon. Join our gang and I'll reward you with parts of the city. Fuck the gold shirts!",
    "We will take it over, They won't know what hit them Mwwwhahahaha",
    " Shipment arrives in a few days, we need someone to go collect from the docks… are you down?",
    "Enter your seed phrase here and we will look after your money for you",
    "Still here….??",
    "Admit it.. you love the dragon gang."

]

var subwayTalk = [
    "insert password"
]

var key_a, key_d, key_e, key_space;
var text_content, graphics;
var zoomScale = 1.2;
var email;
var jump = false;
//========================================================================================================


// var scaleW = this.sys.game.config.width;
const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};

function preload(){
    this.startLoad = false;
    // this.load.html('nameform', 'inputfield.html');
    // this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
    this.load.html("email", "../email.html");
    this.load.html("password", "../password.html");
    this.load.spritesheet('splashScreen', './assets/loadingScreen/splashScreen.png',
    { frameWidth: 800, frameHeight: 450 });

    this.load.spritesheet('button_E', './assets/Button_E.png',
    { frameWidth: 128, frameHeight: 128 });

    // 
    
    let progressText =  this.add.text(this.game.renderer.width/2, this.game.renderer.height/2, "0%").setOrigin(0.5,0.5);
    //load ==========================================================================================================
    
    this.load.on("progress", (percent) =>{
        var round = Math.round(percent*100);
        // console.log("round: " + round);
        progressText.text = round + "%";
    })

    this.load.on("complete", async (percent) =>{
        await sleep(1000);

        progressText.setVisible(false);

        // this.splashScreen.anims.play("showSplash");
    })

    // ================================================================================================
    
    //button
    this.load.spritesheet('button_E', './assets/Button_E.png',
    { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('button_left', './assets/Button_Left.png',
    { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('button_right', './assets/Button_Right.png',
    { frameWidth: 128, frameHeight: 128 });

    //add asphalt
    this.load.spritesheet('Road', './assets/DW_RoadTilemap.png',
    { frameWidth: 128, frameHeight: 128 });

    this.load.image('bubbleChat', './assets/bubbleChat.png');

    this.load.spritesheet('character', './assets/Cyberblitz_Anim_Walk.png',
    { frameWidth: 60, frameHeight: 69 });

    this.load.spritesheet('character2', './assets/RC_DF_Coke_Cyberblitz_Walk_Layout_Whitepaper.png',
    { frameWidth: 302, frameHeight: 345 });

    this.load.spritesheet('button_close', 'assets/button_close.png',
    { frameWidth: 60, frameHeight: 60 });

    this.load.spritesheet('button_next', 'assets/button_next.png',
    { frameWidth: 60, frameHeight: 60 });
    
    
    this.load.spritesheet('button_arrow', './assets/button_arrow.png',
    { frameWidth: 128, frameHeight: 128 });



    // object ======================================================================
    this.load.spritesheet('vehicle', './assets/RC_DF_Anim_Vehicle_side_Damaged.png',
    { frameWidth: 209, frameHeight: 160 });
    this.load.spritesheet('power_box', './assets/RC_DF_Object_Power_box_destroyed.png',
    { frameWidth: 53, frameHeight: 70 });
    this.load.spritesheet('vendingMachine_1', './assets/RC_DF_Object_Vending_Machine_01.png',
    { frameWidth: 121, frameHeight: 120 });
    this.load.spritesheet('vendingMachine_2', './assets/RC_DF_Object_Vending_Machine_02.png',
    { frameWidth: 120, frameHeight: 120 });
    this.load.spritesheet('hydrant', './assets/RC_DF_Object_Water_Hydrant.png',
    { frameWidth: 272, frameHeight: 174 });

    // sheet =============================================================================
    this.load.spritesheet('file_sheet', './assets/sheet/File_Sheet.png',
    {frameWidth: 320,  frameHeight: 180});
    this.load.spritesheet('left_button_sheet', './assets/sheet/Left_Button_Sheet.png',
    {frameWidth: 310,  frameHeight: 280});
    this.load.spritesheet('record_button_sheet', './assets/sheet/Record_Button_Sheet.png',
    {frameWidth: 310,  frameHeight: 280});
    this.load.spritesheet('right_button_sheet', './assets/sheet/Right_Button_Sheet.png',
    {frameWidth: 310,  frameHeight: 280});
    this.load.spritesheet('board_button_close', './assets/sheet/Close_button.png',
    {frameWidth: 135,  frameHeight: 94});
    this.load.spritesheet('talk_bar', './assets/sheet/Talk_bar.png',
    {frameWidth: 135,  frameHeight: 94});
    // this.load.spritesheet('email_inputfield', './assets/sheet/email_inputfield.png',
    // {frameWidth: 135,  frameHeight: 94});
    this.load.spritesheet('box_sheet', './assets/sheet/Box.png',
    {frameWidth: 135,  frameHeight: 94});
    // this.load.spritesheet('avatar_NPC', './assets/sheet/avatar_NPC.png',
    // {frameWidth: 64,  frameHeight: 68});
    this.load.spritesheet('avatar_NPC', './assets/sheet/RC_DF_UI_Close_Up_Potrait.png',
    {frameWidth: 160,  frameHeight: 170});
    this.load.spritesheet('button_submit', './assets/sheet/submit.png',
    {frameWidth: 64,  frameHeight: 68});
    this.load.spritesheet('email_field', './assets/sheet/Email_field.png',
    {frameWidth: 64,  frameHeight: 68});
    // Board Info ===========================================================================
    this.load.spritesheet('aboutDopeWar_red', './assets/BoardInfo/AboutDopeWar_Red.png',
    {frameWidth: 1350,  frameHeight: 940});
    
    this.load.spritesheet('aboutDopeWar_yellow', './assets/BoardInfo/AboutDopeWar_Yellow.png',
    {frameWidth: 1350,  frameHeight: 940});
    this.load.spritesheet('aboutPaper_red', './assets/BoardInfo/AboutPaper_Red.png',
    {frameWidth: 910,  frameHeight: 1120});
    this.load.spritesheet('aboutPaper_yellow', './assets/BoardInfo/AboutPaper_Yellow.png',
    {frameWidth: 910,  frameHeight: 1120});
    this.load.spritesheet('bluePrint_red', './assets/BoardInfo/BluePrint_Red.png',
    {frameWidth: 1350,  frameHeight: 1070});
    this.load.spritesheet('bluePrint_yellow', './assets/BoardInfo/BluePrint_Yellow.png',
    {frameWidth: 1350,  frameHeight: 1070});
    this.load.spritesheet('board', './assets/BoardInfo/Board.png',
    {frameWidth: 3200,  frameHeight: 1800});
    this.load.spritesheet('character_red', './assets/BoardInfo/Character_Red.png',
    {frameWidth: 1170,  frameHeight: 940});
    this.load.spritesheet('character_yellow', './assets/BoardInfo/Character_Yellow.png',
    {frameWidth: 1170,  frameHeight: 940});
    this.load.spritesheet('roadMap_red', './assets/BoardInfo/RoadMap_Red.png',
    {frameWidth: 1340,  frameHeight: 750});
    this.load.spritesheet('roadMap_yellow', './assets/BoardInfo/RoadMap_Yellow.png',
    {frameWidth: 1340,  frameHeight: 750});

    // Kiosk =====================================================================================
    this.load.spritesheet('Kiosk', './assets/Kiosk.png',
    {frameWidth: 1720,  frameHeight: 1260});

    // map =======================================================================================
    this.load.spritesheet('map', './assets/map/RC_DF_UI_WP_Area.png',
    {frameWidth: 8635,  frameHeight: 1800});


    //NPC =========================================================================================
    this.load.spritesheet('acid', './assets/Character/RC_DF_Acid_AcidLSD_Anim_Idle.png',
    {frameWidth: 126,  frameHeight: 108});

    

    this.load.spritesheet('caramel', './assets/Character/RC_DF_Caramel_Anim_idle.png',
    {frameWidth: 126,  frameHeight: 108});

    this.load.spritesheet('heroin', './assets/Character/RC_DF_Heroin_Elien_Anim_Idle.png',
    {frameWidth: 126,  frameHeight: 108});

    this.load.spritesheet('menk', './assets/Character/RC_DF_Menk_Anim_idle.png',
    {frameWidth: 126,  frameHeight: 108});

    this.load.spritesheet('molly', './assets/Character/RC_DF_Molly_Molly_Anim_Idle.png',
    {frameWidth: 126,  frameHeight: 108});

    this.load.spritesheet('nahuel', './assets/Character/RC_DF_Nahuel_Anim_idle.png',
    {frameWidth: 126,  frameHeight: 108});

    this.load.spritesheet('speed', './assets/Character/RC_DF_Speed_Nahuel_Anim_Idle.png',
    {frameWidth: 126,  frameHeight: 108});

    this.load.spritesheet('weed', './assets/Character/RC_DF_Weed_Anim_idle.png',
    {frameWidth: 126,  frameHeight: 108});

    // NPC resize ===============================================================================
    this.load.spritesheet('acid_resize', './assets/Character/Resize/RC_DF_Acid_AcidLSD_Anim_Idle_Resize.png',
    {frameWidth: 630,  frameHeight: 540});

    this.load.spritesheet('caramel_resize', './assets/Character/Resize/RC_DF_Caramel_Anim_idle_Resize.png',
    {frameWidth: 630,  frameHeight: 540});

    this.load.spritesheet('heroin_resize', './assets/Character/Resize/RC_DF_Heroin_Elien_Anim_Idle_Resize.png',
    {frameWidth: 630,  frameHeight: 540});

    this.load.spritesheet('menk_resize', './assets/Character/Resize/RC_DF_Menk_Anim_idle_Resize.png',
    {frameWidth: 630,  frameHeight: 540});

    this.load.spritesheet('molly_resize', './assets/Character/Resize/RC_DF_Molly_Molly_Anim_Resize.png',
    {frameWidth: 630,  frameHeight: 540});

    this.load.spritesheet('nahuel_resize', './assets/Character/Resize/RC_DF_Nahuel_Anim_idle_Resize.png',
    {frameWidth: 630,  frameHeight: 540});

    // this.load.spritesheet('speed_resize', './assets/Character/Resize/RC_DF_Speed_Nahuel_Anim_Idle_Resize.png',
    // {frameWidth: 630,  frameHeight: 540});

    this.load.spritesheet('weed_resize', './assets/Character/Resize/RC_DF_Weed_Anim_idle_Resize.png',
    {frameWidth: 630,  frameHeight: 540});

    this.load.spritesheet('dialogueBox', './assets/dialogueBox.png',
    {frameWidth: 1125, frameHeight: 800});

    this.load.spritesheet('caramel_idle_phone', './assets/Character/caramel_idle_phone.png',
    {frameWidth: 236, frameHeight: 540});

    this.load.spritesheet('mechanic', './assets/Character/RC_DF_NPC_Anim_Idle_Sheet-export.png',
    {frameWidth: 210, frameHeight: 540});
    // video ========================================================================================
    // this.load.video('video1', 'https://www.youtube.com/watch?v=ahOIJNLLtkI');

    // Player ========================================================================================
}

    
function create(){
    key_space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, false);

    // game.world.setBounds(0, 0, 1920, 1920);
    // game.world.setBounds(0,0, 2000, 3000);
    
    // zoomScale = window.innerHeight >= 400 ? (window.innerHeight / (app.defaultHeight*2 / 100)) / 100 : (400 / (app.defaultHeight*2 / 100)) / 40
    zoomScale = 1;
    console.log("zoom scale: " + zoomScale);
    console.log("innerHeight: " + window.innerHeight);
    // this.zoomScale = 2;
    // this.screenWidth = window.innerWidth/this.zoomScale;
    // console.log(this.screenWidth);
    // this.cameras.main.setBounds(0, 0, 4000, 10000);
    this.cameras.main.setZoom(zoomScale);
    console.log("zoom: " + this.cameras.main.zoom);
        // window.addEventListener('resize', resize);
        // resize();
        // this.game.world.setBounds(0, 0, 10000, 1920);
        // this.add.sprite(100, 30, 'Road', 128, 128);

     // input field ===========================================
     

        //map =====================================
        this.map = this.add.image(0, 0, 'map').setOrigin(0, 0.5)
        // var ratio = window.innerHeight/ this.map.displayHeight
        // this.map.setScale(ratio);
        this.map.displayHeight = window.innerHeight;
        this.map.displayWidth =  this.map.displayHeight * 8635/1800
        console.log("map_x: " + this.map.x);
        var platforms = this.physics.add.staticGroup();
        
        // train = this.add.sprite(500, 400, 'train', '__BASE');
        // train.setScale(1);
        // platforms.create(0, 600, 'ground').setScale(10).refreshBody();
        cursorKeys = this.input.keyboard.createCursorKeys();

        
        

        // this.physics.add.collider(train);
        // this.Player = new Player(this);
        // this.physics.add.collider(this.Player.cody, platforms);
        // this.cody = this.Player.cody;
        // this.Settings= new Settings(this);
        // this.Box = new Box(this);

        // NPC create anim =================================================================================================
        this.anims.create({
            key: 'acid_idle',
            frames: this.anims.generateFrameNumbers('acid', { frames: [ 1,7, 13, 19, 25, 31 ] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'caramel_idle',
            frames: this.anims.generateFrameNumbers('caramel', { frames: [ 1,7, 13, 19, 25, 31 ] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'heroin_idle',
            frames: this.anims.generateFrameNumbers('heroin', { frames: [ 1,7, 13, 19, 25, 31 ] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'menk_idle',
            frames: this.anims.generateFrameNumbers('menk', { frames: [ 1,7, 13, 19, 25, 31 ] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'molly_idle',
            frames: this.anims.generateFrameNumbers('molly', { frames: [ 1,7, 13, 19, 25, 31 ] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'nahuel_idle',
            frames: this.anims.generateFrameNumbers('nahuel', { frames: [ 1,7, 13, 19, 25, 31 ] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'weed_idle',
            frames: this.anims.generateFrameNumbers('weed', { frames: [ 1,7, 13, 19, 25, 31 ] }),
            frameRate: 8,
            repeat: -1
        });
        
        // NPC resize create anim =================================================================================================
        this.anims.create({
            key: 'acid_resize_idle',
            frames: this.anims.generateFrameNumbers('acid_resize', { frames: [ 1,7, 13, 19, 25, 31 ] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'caramel_resize_idle',
            frames: this.anims.generateFrameNumbers('caramel_resize', { frames: [ 13, 19, 25, 31, 1,7 ] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'heroin_resize_idle',
            frames: this.anims.generateFrameNumbers('heroin_resize', { frames: [ 25, 31, 1,7, 13, 19 ] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'menk_resize_idle',
            frames: this.anims.generateFrameNumbers('menk_resize', { frames: [ 19, 25, 31, 1,7, 13 ] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'molly_resize_idle',
            frames: this.anims.generateFrameNumbers('molly_resize', { frames: [ 7, 13, 19, 25, 31,1 ] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'nahuel_resize_idle',
            frames: this.anims.generateFrameNumbers('nahuel_resize', { frames: [ 31, 1,7, 13, 19, 25 ] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'weed_resize_idle',
            frames: this.anims.generateFrameNumbers('weed_resize', { frames: [ 13, 19, 25, 31, 1,7 ] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'caramel_idle_phone_anim',
            frames: this.anims.generateFrameNumbers('caramel_idle_phone', { frames: [ 14, 30, 46, 62, 78, 94, 110, 126, 142, 158, 174, 190, 206, 222, 238, 254, 270, 286, 302, 318, 334, 350] }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'mechanic_idle',
            frames: this.anims.generateFrameNumbers('mechanic', { frames: [ 16, 34, 52, 70, 88, 106] }),
            frameRate: 4,
            repeat: -1
        });

        // this.anims.create({
        //     key: 'dialogue_box_show',
        //     frames: this.anims.generateFrameNumbers('dialogue_box', { frames: [ 0,1,2,3,4,5,6,7,8,9,10] }),
        //     frameRate: 4,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'dialogueBox_hide',
        //     frames: this.anims.generateFrameNumbers('dialogueBox', { frames: [10,9,8,7,6,5,4,3,2,1,0] }),
        //     frameRate: 4,
        //     repeat: -1
        // });
        // Instantiate NPC =====================================================================================================
        // NPC1 = this.physics.add.sprite(100, this.map.y , 'acid').setOrigin(0.5, 0.5);
        
        // // NPC1.body.setSize(22, 46, 5, 16);
        // NPC1.setScale(1);
        // // NPC1.setFrame(3);
        // NPC1.setCollideWorldBounds(true);
        // NPC1.anims.play('acid_idle');
        // this.physics.add.collider(NPC1, platforms);

        // this.physics.add.collider(NPC1, cody);
        // this.physics.add.overlap(cody, NPC1, triggerEnter, null, this);
        // face1.body.onCollide = new Phaser.Signal();
        // face1.body.onCollide.add(hitSprite, this);

        
        // console.log(this.game.renderer.width / 2);
        //console.log(game.width/4);
        
        

        // NPC1 = this.physics.add.sprite(this.map.displayWidth * 0.35, this.map.y + (this.map.height * 2/100) , 'acid_resize');
        NPC1 = this.add.sprite(this.map.displayWidth * 0.09, this.map.y + (this.map.height * 0.01)  , 'menk_resize');
        NPC1.displayHeight = window.innerHeight * 0.5
        NPC1.displayWidth = NPC1.displayHeight * 630/540

        bubbleChat = this.add.sprite(NPC1.x, NPC1.y - (NPC1.displayHeight *0.4), 'dialogueBox').setOrigin(0.5, 0.5);
        bubbleChat.setScale(window.innerHeight *  0.25/1000);
        bubbleChat.setFrame(10);
        bubbleChat.setVisible(false);
        label1 = this.add.text(bubbleChat.x - (bubbleChat.displayWidth * 0.4), bubbleChat.y - (bubbleChat.displayHeight * 0.4), 'Hey there hustler,', { wordWrap: { width: bubbleChat.displayWidth * 0.8},fontSize: window.innerHeight * 25/1000, fill: '#000000'});
        NPC1.anims.play('menk_resize_idle');

        NPC2 = this.add.sprite(NPC1.x + this.map.displayWidth * 0.09, NPC1.y, 'caramel_idle_phone');
        NPC2.displayHeight = window.innerHeight * 0.5
        NPC2.displayWidth = NPC2.displayHeight * 236/540
        NPC2.anims.play('caramel_idle_phone_anim');

        bubbleChat2 = this.add.sprite(NPC2.x, NPC2.y - (NPC2.displayHeight *0.4), 'dialogueBox').setOrigin(0.5, 0.5);
        bubbleChat2.setFrame(10);
        bubbleChat2.y -= NPC2.y * 0.7;
        bubbleChat2.setScale(window.innerHeight *  0.25/1000);
        bubbleChat2.setVisible(false);
        label2 = this.add.text(bubbleChat2.x - (bubbleChat2.displayWidth * 0.4), bubbleChat2.y - (bubbleChat2.displayHeight * 0.4), " Lookin good playa!…", { wordWrap: { width: bubbleChat2.displayWidth * 0.8 }, fill: '#000000', fontSize: window.innerHeight * 25/1000}).setOrigin(0, 0);

        NPC3 = this.add.sprite(NPC2.x + this.map.displayWidth * 0.15, NPC1.y, 'acid_resize');
        NPC3.displayHeight = window.innerHeight * 0.5
        NPC3.displayWidth = NPC3.displayHeight * 630/540
        NPC3.anims.play('acid_resize_idle')
        bubbleChat3 = this.add.sprite(NPC3.x, NPC3.y - (NPC3.displayHeight *0.4), 'dialogueBox').setOrigin(0.5, 0.5);
        bubbleChat3.setFrame(10);
        bubbleChat3.y -= NPC3.y * 0.7;
        bubbleChat3.setScale(window.innerHeight *  0.25/1000);
        bubbleChat3.setVisible(false);
        label3 = this.add.text(bubbleChat3.x - (bubbleChat3.displayWidth * 0.4), bubbleChat3.y - (bubbleChat3.displayHeight * 0.4), "Yo! Side hustle, Fancy a quick bet?", {wordWrap: { width: bubbleChat2.displayWidth * 0.8 }, fill: '#000000', fontSize: window.innerHeight * 25/1000}).setOrigin(0, 0);

        NPC4 = this.add.sprite(NPC3.x + this.map.displayWidth * 0.11, NPC1.y, 'weed_resize');
        NPC4.displayHeight = window.innerHeight * 0.5
        NPC4.displayWidth = NPC4.displayHeight * 630/540
        NPC4.anims.play('weed_resize_idle')
        bubbleChat4 = this.add.sprite(NPC4.x, NPC4.y - (NPC4.displayHeight *0.4), 'dialogueBox').setOrigin(0.5, 0.5);
        bubbleChat4.setFrame(10);
        bubbleChat4.y -= NPC4.y * 0.7;
        bubbleChat4.setScale(window.innerHeight *  0.25/1000);
        bubbleChat4.setVisible(false);
        label4 = this.add.text(bubbleChat4.x - (bubbleChat4.displayWidth * 0.4), bubbleChat4.y - (bubbleChat4.displayHeight * 0.4), "I built this city and now mother fuckers want to destroy it!", { wordWrap: { width: bubbleChat2.displayWidth * 0.8 }, fill: '#000000', fontSize: window.innerHeight * 25/1000}).setOrigin(0, 0);

        NPC5 = this.add.sprite(NPC4.x + this.map.displayWidth * 0.11, NPC1.y, 'molly_resize');
        NPC5.displayHeight = window.innerHeight * 0.5
        NPC5.displayWidth = NPC5.displayHeight * 630/540
        NPC5.anims.play('molly_resize_idle')
        bubbleChat5 = this.add.sprite(NPC5.x, NPC5.y - (NPC5.displayHeight *0.4), 'dialogueBox').setOrigin(0.5, 0.5);
        bubbleChat5.setFrame(10);
        bubbleChat5.y -= NPC5.y * 0.7;
        bubbleChat5.setScale(window.innerHeight *  0.25/1000);
        bubbleChat5.setVisible(false);
        label5 = this.add.text(bubbleChat5.x - (bubbleChat5.displayWidth * 0.4), bubbleChat5.y - (bubbleChat5.displayHeight * 0.4), "Looking fly there playa", { wordWrap: { width: bubbleChat2.displayWidth * 0.8 }, fill: '#000000', fontSize: window.innerHeight * 25/1000}).setOrigin(0, 0);

        NPC6 = this.add.sprite(NPC5.x + this.map.displayWidth * 0.11, NPC1.y, 'nahuel_resize');
        NPC6.displayHeight = window.innerHeight * 0.5
        NPC6.displayWidth = NPC6.displayHeight * 630/540
        NPC6.anims.play('nahuel_resize_idle')
        bubbleChat6 = this.add.sprite(NPC6.x, NPC6.y - (NPC6.displayHeight *0.4), 'dialogueBox').setOrigin(0.5, 0.5);
        bubbleChat6.setFrame(10);
        bubbleChat6.y -= NPC6.y * 0.7;
        bubbleChat6.setScale(window.innerHeight *  0.25/1000);
        bubbleChat6.setVisible(false);
        label6 = this.add.text(bubbleChat6.x - (bubbleChat6.displayWidth * 0.4), bubbleChat6.y - (bubbleChat6.displayHeight * 0.4), "Ahh so you wanna be a playa?", { wordWrap: { width: bubbleChat2.displayWidth * 0.8 }, fill: '#000000', fontSize: window.innerHeight * 25/1000}).setOrigin(0, 0);

        Kiosk = this.add.sprite(NPC6.x + this.map.displayWidth * 0.15, NPC1.y, 'Kiosk');
        // Kiosk.body.setSize(22, 46, 5, 16);
        Kiosk.setScale(0.2);
        Kiosk.anims.play('Kiosk');
        Kiosk.setFrame(1);
        Kiosk.setVisible(false);

        NPC7 = this.add.sprite(Kiosk.x + this.map.displayWidth * 0.1, NPC1.y, 'mechanic');
        NPC7.displayHeight = window.innerHeight * 0.5
        NPC7.displayWidth = NPC7.displayHeight * 210/540
        NPC7.anims.play('mechanic_idle')
        bubbleChat7 = this.add.sprite(NPC7.x, NPC7.y - (NPC7.displayHeight *0.4), 'dialogueBox').setOrigin(0.5, 0.5);
        bubbleChat7.setFrame(10);
        bubbleChat7.y -= NPC7.y * 0.7;
        bubbleChat7.setScale(window.innerHeight *  0.25/1000);
        bubbleChat7.setVisible(false);
        label7 = this.add.text(bubbleChat7.x - (bubbleChat7.displayWidth * 0.4), bubbleChat7.y - (bubbleChat7.displayHeight * 0.4), " Join our wait list to get on as an alpha tester", {wordWrap: { width: bubbleChat2.displayWidth * 0.8 }, fill: '#000000', fontSize: window.innerHeight * 25/1000}).setOrigin(0, 0);

        NPC8 = this.add.sprite(NPC7.x + this.map.displayWidth * 0.1, NPC1.y, 'heroin_resize');
        NPC8.displayHeight = window.innerHeight * 0.5
        NPC8.displayWidth = NPC8.displayHeight * 630/540
        NPC8.anims.play('heroin_resize_idle')
        bubbleChat8 = this.add.sprite(NPC8.x, NPC8.y - (NPC8.displayHeight *0.4), 'dialogueBox').setOrigin(0.5, 0.5);
        bubbleChat8.setFrame(10);
        bubbleChat8.y -= NPC8.y * 0.8;
        bubbleChat8.setScale(window.innerHeight *  0.25/1000);
        bubbleChat8.setVisible(false);
        label8 = this.add.text(bubbleChat8.x - (bubbleChat8.displayWidth * 0.4), bubbleChat8.y - (bubbleChat8.displayHeight * 0.4), "See how they hid me back here!!", { wordWrap: { width: bubbleChat2.displayWidth * 0.8 }, fill: '#000000', fontSize: window.innerHeight * 25/1000}).setOrigin(0, 0);

        this.map.displayHeight = window.innerHeight * 120/100;
        this.map.displayWidth =  this.map.displayHeight * 8635/1800;
        this.physics.world.setBounds(0, - (this.map.displayHeight * 0.9), this.map.displayWidth * 0.91, this.map.displayHeight);
        console.log("map_x: " + this.map.x);


        // Player ===============================================================================

        // this.load.spritesheet('character', './assets/Cyberblitz_Anim_Walk.png',
        // { frameWidth: 60, frameHeight: 69 });

        //create animation
        this.anims.create({
            key: 'walk_right',
            frames: this.anims.generateFrameNumbers('character2', { frames: [ 0, 4, 8, 12, 16, 20, 24, 28 ] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_up',
            frames: this.anims.generateFrameNumbers('character2', { frames: [ 1, 5, 9, 13, 17, 21, 25, 29  ] }),
            frameRate: 8,
            repeat: -1,
            //repeatDelay: 2000
        });
    
        this.anims.create({
            key: 'walk_left',
            frames: this.anims.generateFrameNumbers('character2', { frames: [ 2, 6, 10, 14, 18, 22, 26, 30 ] }),
            frameRate: 8,
            repeat: -1,
            //repeatDelay: 2000
        });
    
        this.anims.create({
            key: 'walk_down',
            frames: this.anims.generateFrameNumbers('character2', { frames: [ 3, 7, 11, 15, 19, 23, 27, 31 ] }),
            frameRate: 8,
            repeat: -1,
            //repeatDelay: 2000
        });

        // =====================================================================================================
        this.anims.create({
            key: 'walk_right2',
            frames: this.anims.generateFrameNumbers('character2', { frames: [ 0, 4, 8, 12, 16, 20, 24, 28 ] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walk_left2',
            frames: this.anims.generateFrameNumbers('character2', { frames: [ 2, 6, 10, 14, 18, 22, 26, 30 ] }),
            frameRate: 8,
            repeat: -1,
            //repeatDelay: 2000
        });

        cody = this.physics.add.sprite(this.map.displayWidth * 0.01, NPC1.y + (this.map.height * 0.001), 'character2');
        cody.displayHeight = window.innerHeight * 0.3
        cody.displayWidth = cody.displayHeight * 60/69
        // cody = this.add.sprite(500, 350, 'character');
        // cody.setScale(6);
        // cody.play('walk_right');
        // cody.body.setSize(22, 46, 5, 16);
        cody.body.setSize(128, 247);
        // cody.body.bounce.y = 0.2;
        cody.setCollideWorldBounds(true);
        // this.physics.add.collider(cody, platforms);

        

        // box ================================================
        
        this.input.keyboard.on('keydown', e => {
            keydown(e);
        });

        // camera ==================================================
        // game.camera.startFollow(cody);
        this.cameras.main.startFollow(cody);
        this.cameras.main.followOffset.set(0, 0);
        this.cameras.main.setBounds(0, this.physics.world.y , this.map.displayWidth, window.innerHeight);
        var camera = this.cameras.main;
        // camera.setZoom(2);
        // camera.zoomTo(2,5,)
        // console.log("camera" + camera);
        console.log(camera);
        console.log("camera width: " + camera.width);
        console.log("camera height: " + camera.height);
        
        

        //box ============================================================================================ black rectangle in screen
        box = this.add
        .rectangle(this.game.renderer.width/2, this.game.renderer.height/2, this.game.renderer.width, this.game.renderer.height/2, 0x000000)
        .setOrigin(0.5,1);
        box.setScrollFactor(0);
        // box.setVisible(false);
        box.update = function () {
            this.displayHeight = (window.innerHeight/zoomScale) * 0.6;
            this.displayWidth =  (window.innerWidth/zoomScale) ;
        }
        box.setInteractive();
        box.on("pointerup", () => {
            gameState = "play";
            // console.log(gamestate);
            gameIsPlaying = true;
            startGame = true;
            Text.setVisible(false);
        })


        box2 = this.add
        .rectangle(this.game.renderer.width/2, this.game.renderer.height/2, this.game.renderer.width, this.game.renderer.height/2, 0x000000)
        .setOrigin(0.5,0);
        box2.setScrollFactor(0);
        // box2.setVisible(false);
        box2.update = function () {
            this.displayHeight = (window.innerHeight/zoomScale)/2;
            this.displayWidth =  (window.innerWidth/zoomScale) ;
        }

        box2.setInteractive();
        box2.on("pointerup", () => {
            gameState = "play";
            // console.log(gamestate);
            gameIsPlaying = true;
            startGame = true;
            Text.setVisible(false);
        })

        
        // button =====================================================

        //show if device is not desktop
        var offset_y = 20;
        if (!this.sys.game.device.os.desktop){
            button_left =  this.add.image(100 , this.game.renderer.height * 4 / 5 - offset_y , 'button_left', '__BASE').setOrigin(0, 0);
            button_left.setInteractive();
            button_left.setVisible(false);
            button_left.setScrollFactor(0);
            button_left.on("pointerdown", () => {
                //bar.setVisible(!bar.visible);
                walkLeft = true;
            })

            button_left.on("pointerup", () => {
                //bar.setVisible(!bar.visible);
                walkLeft = false;
                
            })


            button_right =  this.add.image(200, this.game.renderer.height * 4 / 5 - offset_y , 'button_right', '__BASE').setOrigin(0, 0);
            button_right.setInteractive();
            button_right.setScrollFactor(0);
            button_right.setVisible(false);
            button_right.on("pointerdown", () => {
                walkRight = true;

            })
            button_right.on("pointerup", () => {
                walkRight = false;
                
            })


            button_E =  this.add.image(this.game.renderer.width - 200 , this.game.renderer.height * 4 / 5 - offset_y, 'button_E', '__BASE').setOrigin(0, 0);
            button_E.setInteractive();
            button_E.setScrollFactor(0);
            button_E.setVisible(false);
            button_E?.on("pointerup", () => {
                if (cantalkNPC1){
                    if (cody.x > NPC1.x - 30){
                        walkLeft = true;
                    } 
                    isGoingToNPC1 = true;
                } else if (cantalkNPC2){
                    if (cody.x > NPC2.x - 30){
                        walkLeft = true;
                    } 
                    isGoingToNPC2 = true;
                } else if (cantalkNPC3){
                    if (cody.x > NPC3.x - 30){
                        walkLeft = true;
                    } 
                    isGoingToNPC3 = true;
                } else if (cantalkNPC4){
                    if (cody.x > NPC4.x - 30){
                        walkLeft = true;
                    } 
                    isGoingToNPC4 = true;
                } else if (cantalkNPC5){
                    if (cody.x > NPC5.x - 30){
                        walkLeft = true;
                    } 
                    isGoingToNPC5 = true;
                } else if (cantalkNPC6){
                    if (cody.x > NPC6.x - 30){
                        walkLeft = true;
                    } 
                    isGoingToNPC6 = true;
                } else if (cantalkKiosk){
                    this.board.setVisible(true);
                    this.aboutDopeWar_red.setVisible(true);
                    this.aboutPaper_red.setVisible(true);
                    this.bluePrint_red.setVisible(true);
                    this.character_red.setVisible(true);
                    this.RoadMap_red.setVisible(true);
                    this.board_button_close.setVisible(true);
                } else if (cantalkNPC7){
                    if (cody.x > NPC7.x - 30){
                        walkLeft = true;
                    } 
                    isGoingToNPC7 = true;
                } else if (cantalkNPC8){
                    if (cody.x > NPC8.x - 30){
                        walkLeft = true;
                    } 
                    isGoingToNPC8 = true;
                } else if (cantalkSubway){
                    onDialogNPC = true;
                }
                
    
            })

            button_jump = this.add
            .rectangle(window.innerWidth/2, window.innerHeight * 0.95, window.innerWidth * 0.2, window.innerHeight * 0.05, 0x000000).setOrigin(0.5, 0.5);
            button_jump.setScrollFactor(0);
            button_jump.setInteractive();
            button_jump.setVisible(false);
            button_jump.on("pointerdown", () => {
                jump = true;
            })

            button_jump.on("pointerup", () => {
                jump = false;
            })
        }
        
        
        // this.scoreTxt = this.add.text(100,50, 16, 'text', { fontSize: '50px', fill: '#fff' });
        // this.scoreTxt.setScrollFactor(0);

        console.log(this.sys.game.device.os.desktop);
        console.log(this.game.renderer.height);
        // text =========================================================================================
        Text2 =  this.add.text(this.game.renderer.width/2, this.game.renderer.height * 0.95, 400, "press A or D to move", { wordWrap: { width: window.innerWidth * 0.8 }, fill: '#00FFFF'}).setOrigin(0.5,0.5);
        Text2.setFontFamily('upheavtt');
        Text2.setFontSize(window.innerWidth * 25/2000);
        Text2.setScrollFactor(0);
        Text2.setVisible(false);
        // set text to center
        // Text =  this.add.text(camera.width/2, camera.height/2, "press any key to start", {fontFamily: 'Minecraft', fill: '#ffffff', fontSize: 30,});
        Text = this.add.text(camera.width/2, camera.height/2, '', {fontFamily: 'upheavtt', wordWrap: { width: window.innerWidth * 0.8 }, fontSize: 30 * window.innerWidth/2000, fill: '#00FFFF'}).setOrigin(0.5, 0.5);
        // Text.setFontFamily('upheavtt');
        Text.setScrollFactor(0);
        typewriteText("press any key to start", this.time, Text);
        // Text.x -= Text.width/2;
        
        console.log(Text);
        
        // var TextWrap = this.add.text(camera.width/20, camera.height/10, '', { fill: '#00ff00', align: 'left'});
        // TextWrap.setScrollFactor(0);
        // this.add.text(0, 100, 'Case shrugged.\nThe girl to his right giggled and nudged him.', { color: '#00ff00', align: 'left' });

        // typewriteText("haaaaaiiiiiiii.\nhalllooooooooo.\napa kabar", this.time, TextWrap );
        // typewriteTextWrapped("halllooooooooo \n  apa kabar", this.label, this.time);


        

        button_close =  this.add.image(this.game.renderer.width * 0.98, this.game.renderer.height * 0.01 , 'button_close', '__BASE').setOrigin(1, 0);
        button_close.setScale(0.2);
        button_close.setInteractive();
        button_close.setScrollFactor(0);
        
        button_close.on("pointerdown", () => {
            onDialogNPC = false;
            dialogUItext.text = '';
            indexTalk = 0;
            isDialogUITextShow = false;
            button_close.setVisible(false);
            dialogUItext.setVisible(false);
            this.button_next.setVisible(false);
        })

        button_close.setVisible(false);


        this.button_next = this.add.image(this.game.renderer.width/2, this.game.renderer.height * 0.9 , 'button_next', '__BASE').setOrigin(0.5, 0.5);
        this.button_next.setScale(0.2);
        this.button_next.setInteractive();
        this.button_next.setScrollFactor(0);

        this.button_next.on("pointerdown", () => {
            indexTalk ++;

            if (indexTalk < talkMessage.length){
                dialogUItext.text = '';
                
                typewriteText(talkMessage[indexTalk], this.time, dialogUItext);
            }
            
        })
        this.button_next.setVisible(false);

        // Grey Filter ==============================================================================
        // var gray = game.add.filter('Gray');
        // this.game.world.filters = [gray];



        // Grid ==========================================================
        // this.aGrid = new AlignGrid({scene: this, rows:11, cols:11});
        // this.aGrid.showNumbers();

        // this.cameras.main.setBounds(0, 0, 1000, 1000);
        // console.log(this.cameras.main);

        

        // board info ============================================
        this.board = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'board').setOrigin(0.5, 0.5)
        this.board.orgWidth = this.board.displayWidth
        this.board.orgHeight = this.board.displayHeight
        this.board.setScrollFactor(0,0);
        this.board.setVisible(false);
        this.board.update = function () {
            this.displayHeight = window.innerHeight/zoomScale; // game.renderer.height ;
            this.displayWidth =  window.innerWidth/zoomScale; // game.renderer.width;
        }

        this.board_button_close = this.add.image(window.innerWidth * 0.95, window.innerHeight * 0.1, 'board_button_close', '__BASE').setOrigin(0.5, 0.5)
        this.board_button_close.setScrollFactor(0);
        this.board_button_close.setInteractive();
        this.board_button_close.setVisible(false);

        this.board_button_close.update = function () {
            var buttonScale = window.innerWidth/800;
            this.setScale()
        }


        this.board_button_close.on("pointerup", () => {
            this.board.setVisible(false);
            this.aboutDopeWar_red.setVisible(false);
            this.aboutPaper_red.setVisible(false);
            this.character_red.setVisible(false);
            this.RoadMap_red.setVisible(false);
            this.bluePrint_red.setVisible(false);
            this.board_button_close.setVisible(false);
            cantalkKiosk = false;
            KioskIsTalking = false;
        })

        

        
        console.log("anim: " + this.anim);
          //without repeat
        // this.file_sheet.stop();
        // anim.onStart.add(animationStarted, this);
        // anim.onLoop.add(animationLooped, this);
        // anim.onComplete.add(animationStopped, this);


        this.aboutDopeWar_red = this.add.image(window.innerWidth * 0.22, window.innerHeight * 0.25, 'aboutDopeWar_red').setOrigin(0.5, 0.5)
        this.aboutDopeWar_red.setScrollFactor(0);
        this.aboutDopeWar_red.setVisible(false);
        this.aboutDopeWar_red.update = function () {
            this.displayHeight = (window.innerHeight/zoomScale) * 0.5; //game.renderer.height * 0.5;
            this.displayWidth = (window.innerWidth/zoomScale) * 0.45; // game.renderer.width * 0.45;

            let height = window.innerHeight /zoomScale;
            let width = window.innerWidth /zoomScale;
            let centerX =  window.innerWidth / 2;
            let centerY = window.innerHeight / 2
            
            // this.top = this.centerY - this.height / 2
            // this.y =  (centerY - (height/4));
            // this.x = centerX - ((width/3.5));
        }

        this.aboutDopeWar_yellow = this.add.image(window.innerWidth * 0.22, window.innerHeight * 0.25, 'aboutDopeWar_yellow').setOrigin(0.5, 0.5)
        this.aboutDopeWar_yellow.setScrollFactor(0);
        this.aboutDopeWar_yellow.setVisible(false);
        this.aboutDopeWar_yellow.update = function () {
            this.displayHeight = (window.innerHeight/zoomScale) * 0.5; //game.renderer.height * 0.5;
            this.displayWidth =  (window.innerWidth/zoomScale) * 0.45; // game.renderer.width * 0.45;

            let height = window.innerHeight /zoomScale;
            let width = window.innerWidth /zoomScale;
            let centerX =  window.innerWidth / 2;
            let centerY = window.innerHeight / 2
            
            // this.top = this.centerY - this.height / 2
            // this.y =  (centerY - (height/4));
            // this.x = centerX - ((width/3.5));
        }

        // this.aboutDopeWar_red.inputEnabled = true;
        // game.input.addMoveCallback(p, this);

        this.aboutDopeWar_red.setInteractive();
        this.aboutDopeWar_red.on("pointerover", () => {
        console.log("hover");
        this.aboutDopeWar_yellow.setVisible(true);
        });

        this.aboutDopeWar_red.on("pointerdown", () => {
            // console.log("klik");
            this.file_sheet.setVisible(true);
            this.file_sheet.anims.play("show", false);
        })

        this.aboutDopeWar_red.on("pointerout", () => {
            console.log("out");
            this.aboutDopeWar_yellow.setVisible(false);
            
        });
        // this.aboutDopeWar_red.input.alwaysEnabled = true;


        this.aboutPaper_red = this.add.image(window.innerWidth * 0.48, window.innerHeight * 0.63, 'aboutPaper_red').setOrigin(0.5, 0.5)
        this.aboutPaper_red.setScrollFactor(0);
        this.aboutPaper_red.setVisible(false);
        this.aboutPaper_red.update = function () {
            this.displayHeight = (window.innerHeight/zoomScale) * 0.7;
            this.displayWidth =  (window.innerWidth/zoomScale) * 0.22;
            let height = window.innerHeight /zoomScale;
            let width = window.innerWidth /zoomScale;
            let centerX =  window.innerWidth / 2;
            let centerY = window.innerHeight / 2
            let bottom = centerY + height / 2;
            let right = centerX + width / 2;
            // this.top = this.centerY - this.height / 2
            // this.y =  bottom * 0.7;
            // this.x = right * 0.59

        }
        this.aboutPaper_yellow = this.add.image(window.innerWidth * 0.48, window.innerHeight * 0.63, 'aboutPaper_yellow').setOrigin(0.5, 0.5)
        this.aboutPaper_yellow.setScrollFactor(0);
        this.aboutPaper_yellow.setVisible(false);
        this.aboutPaper_yellow.update = function () {
            this.displayHeight = (window.innerHeight/zoomScale) * 0.7;
            this.displayWidth =  (window.innerWidth/zoomScale) * 0.22;

            let height = window.innerHeight /zoomScale;
            let width = window.innerWidth /zoomScale;
            let centerX =  window.innerWidth / 2;
            let centerY = window.innerHeight / 2
            let bottom = centerY + height / 2;
            let right = centerX + width / 2;
            // this.top = this.centerY - this.height / 2
            // this.y =  bottom * 0.7;
            // this.x = right * 0.59
        }

        this.aboutPaper_red.setInteractive();

        this.aboutPaper_red.on("pointerover", () => {
        console.log("hover");
        this.aboutPaper_yellow.setVisible(true);
        });

        this.aboutPaper_red.on("pointerdown", () => {
            // console.log("klik");
            this.file_sheet.setVisible(true);
            this.file_sheet.anims.play("show", false);
        })

        this.aboutPaper_red.on("pointerout", () => {
            console.log("out");
            this.aboutPaper_yellow.setVisible(false);
        });
        // this.aboutPaper_red.input.alwaysEnabled = true;


        this.bluePrint_red = this.add.image(window.innerWidth * 0.78, window.innerHeight * 0.7, 'bluePrint_red').setOrigin(0.5, 0.5)
        this.bluePrint_red.setScrollFactor(0);
        this.bluePrint_red.setVisible(false);
        this.bluePrint_red.update = function () {
            this.displayHeight = (window.innerHeight/zoomScale) * 0.5;
            this.displayWidth =  (window.innerWidth/zoomScale) * 0.4;

            let height = window.innerHeight /zoomScale;
            let width = window.innerWidth /zoomScale;
            let centerX =  window.innerWidth / 2;
            let centerY = window.innerHeight / 2
            let bottom = centerY + height / 2;
            let right = centerX + width / 2;
            // this.top = this.centerY - this.height / 2
            // this.y =  bottom * 0.75;
            // this.x = right * 0.83
        }
        this.bluePrint_yellow = this.add.image(window.innerWidth * 0.78, window.innerHeight * 0.7, 'bluePrint_yellow').setOrigin(0.5, 0.5)
        this.bluePrint_yellow.setScrollFactor(0);
        this.bluePrint_yellow.setVisible(false);
        this.bluePrint_yellow.update = function () {
            this.displayHeight = (window.innerHeight/zoomScale) * 0.5;
            this.displayWidth =  (window.innerWidth/zoomScale) * 0.4;
            let height = window.innerHeight /zoomScale;
            let width = window.innerWidth /zoomScale;
            let centerX =  window.innerWidth / 2;
            let centerY = window.innerHeight / 2
            let bottom = centerY + height / 2;
            let right = centerX + width / 2;
            // this.top = this.centerY - this.height / 2
            // this.y =  bottom * 0.75;
            // this.x = right * 0.83
        }
        this.bluePrint_red.setInteractive();

        this.bluePrint_red.on("pointerover", () => {
        console.log("hover");
        this.bluePrint_yellow.setVisible(true);
        });

        this.bluePrint_red.on("pointerdown", () => {
            // console.log("klik");
            this.file_sheet.setVisible(true);
            this.file_sheet.anims.play("show", false);
        })

        this.bluePrint_red.on("pointerout", () => {
            console.log("out");
            this.bluePrint_yellow.setVisible(false);
        });
        // this.bluePrint_red.input.alwaysEnabled = true;
        

        this.character_red = this.add.image(window.innerWidth * 0.19, window.innerHeight * 0.72, 'character_red').setOrigin(0.5, 0.5)
        this.character_red.setScrollFactor(0);
        this.character_red.setVisible(false);
        this.character_red.update = function () {
            this.displayHeight = (window.innerHeight/zoomScale) * 0.5;
            this.displayWidth =  (window.innerWidth/zoomScale) * 0.4;

            let height = window.innerHeight /zoomScale;
            let width = window.innerWidth /zoomScale;
            let centerX =  window.innerWidth / 2;
            let centerY = window.innerHeight / 2
            let bottom = centerY + height / 2;
            let right = centerX + width / 2;
            // this.top = this.centerY - this.height / 2
            // this.y =  bottom * 0.77;
            // this.x = right * 0.345
        }
        this.character_yellow = this.add.image(window.innerWidth * 0.19, window.innerHeight * 0.72, 'character_yellow').setOrigin(0.5, 0.5)
        this.character_yellow.setScrollFactor(0);
        this.character_yellow.setVisible(false);
        this.character_yellow.update = function () {
            this.displayHeight = (window.innerHeight/zoomScale) * 0.5;
            this.displayWidth =  (window.innerWidth/zoomScale) * 0.4;
            let height = window.innerHeight /zoomScale;
            let width = window.innerWidth /zoomScale;
            let centerX =  window.innerWidth / 2;
            let centerY = window.innerHeight / 2
            let bottom = centerY + height / 2;
            let right = centerX + width / 2;
            // this.top = this.centerY - this.height / 2
            // this.y =  bottom * 0.77;
            // this.x = right * 0.345
        }
        this.character_red.setInteractive();

        this.character_red.on("pointerover", () => {
        console.log("hover");
        this.character_yellow.setVisible(true);
        });

        this.character_red.on("pointerdown", () => {
            // console.log("klik");
            this.file_sheet.setVisible(true);
            this.file_sheet.anims.play("show", false);
        })
        
        this.character_red.on("pointerout", () => {
            console.log("out");
            this.character_yellow.setVisible(false);
        });
        // this.aboutPaper_red.input.alwaysEnabled = true;


        this.RoadMap_red = this.add.image(window.innerWidth * 0.71, window.innerHeight * 0.25, 'roadMap_red').setOrigin(0.5, 0.5)
        this.RoadMap_red.setScrollFactor(0);
        this.RoadMap_red.setVisible(false);   
        this.RoadMap_red.update = function () {
            this.displayHeight = (window.innerHeight/zoomScale) * 0.4;
            this.displayWidth =  (window.innerWidth/zoomScale) * 0.4;

            let height = window.innerHeight /zoomScale;
            let width = window.innerWidth /zoomScale;
            let centerX =  window.innerWidth / 2;
            let centerY = window.innerHeight / 2
            let bottom = centerY + height / 2;
            let right = centerX + width / 2;
            // this.top = this.centerY - this.height / 2
            // this.y =  bottom * 0.35;
            // this.x = right * 0.77
        }     
        this.RoadMap_yellow = this.add.image(window.innerWidth * 0.71, window.innerHeight * 0.25, 'roadMap_yellow').setOrigin(0.5, 0.5)
        this.RoadMap_yellow.setScrollFactor(0);
        this.RoadMap_yellow.setVisible(false);
        this.RoadMap_yellow.update = function () {
            this.displayHeight = (window.innerHeight/zoomScale) * 0.4;
            this.displayWidth =  (window.innerWidth/zoomScale) * 0.4;

            let height = window.innerHeight /zoomScale;
            let width = window.innerWidth /zoomScale;
            let centerX =  window.innerWidth / 2;
            let centerY = window.innerHeight / 2
            let bottom = centerY + height / 2;
            let right = centerX + width / 2;
            // this.top = this.centerY - this.height / 2
            // this.y =  bottom * 0.35;
            // this.x = right * 0.77
        } 

        this.RoadMap_red.setInteractive();

        this.RoadMap_red.on("pointerover", () => {
        console.log("hover");
        this.RoadMap_yellow.setVisible(true);
        });

        this.RoadMap_red.on("pointerdown", () => {
            // console.log("klik");
            this.file_sheet.setVisible(true);
            this.file_sheet.anims.play("show", false);
        })

        this.RoadMap_red.on("pointerout", () => {
            console.log("out");
            this.RoadMap_yellow.setVisible(false);
        });
        // this.aboutPaper_red.input.alwaysEnabled = true;

        // file_sheet
        //create animation
        this.anim = this.anims.create({
            key: 'show',
            frames: this.anims.generateFrameNumbers('file_sheet', { frames: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17] }),
            frameRate: 8,
            repeat: false,
        });

        this.anims.create({
            key: 'hide',
            frames: this.anims.generateFrameNumbers('file_sheet', { frames: [17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1] }),
            frameRate: 8,
            repeat: false,
        });

        this.file_sheet = this.add.sprite(window.innerWidth/2,window.innerHeight/2, 'file_sheet').setOrigin(0.5, 0.5);
        // cody = this.add.sprite(500, 350, 'character');
        this.file_sheet.setScale();
        this.file_sheet.orgWidth = this.file_sheet.displayWidth
        this.file_sheet.orgHeight = this.file_sheet.displayHeight
        this.file_sheet.setScrollFactor(0,0);
        // this.file_sheet.anims.play('show');
        this.file_sheet.setVisible(false);
        this.file_sheet.update = function () {
            this.displayHeight = window.innerHeight/zoomScale ; //game.renderer.height;
            this.displayWidth =  window.innerWidth/zoomScale; // game.renderer.width;
        }
        this.file_sheet_isShow = false
        this.file_sheet.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
            if (this.file_sheet_isShow){
                // this.sheet_button_close.setVisible(false);
                this.file_sheet_isShow = false;
                this.file_sheet.setVisible(false);
            } else {
                this.sheet_button_close.setVisible(true);
                text_content.setVisible(true);
                graphics.setVisible(false);
                this.file_sheet_isShow = true;
            }
            console.log("complete");
            
        }, this);


        this.sheet_button_close =  this.add.image(window.innerWidth * 0.9, window.innerHeight * 0.2, 'button_close', '__BASE').setOrigin(0.5, 0.5);
        this.sheet_button_close.setScale(window.innerHeight * 0.2/1000);
        this.sheet_button_close.setInteractive();
        this.sheet_button_close.setScrollFactor(0);
        this.sheet_button_close.setVisible(false);
        this.sheet_button_close.on("pointerdown", () => {
            this.file_sheet.anims.play("hide", false);
            this.sheet_button_close.setVisible(false);
            graphics.setVisible(false);
            text_content.setVisible(false);
        })
        this.sheet_button_close.update = function () {
            // this.setScale(this.scale * )

            let height = window.innerHeight /zoomScale;
            let width = window.innerWidth /zoomScale;
            let centerX =  window.innerWidth / 2;
            let centerY = window.innerHeight / 2
            let bottom = centerY + height / 2;
            let right = centerX + width / 2;
            // this.top = this.centerY - this.height / 2
            // this.y =  bottom * 0.36;
            // this.x = right * 0.92
        } 

        this.sheet_button_close.setVisible(false);
        

        // sheet ===================================================
        this.talk_bar = this.add.image(window.innerWidth/2,window.innerHeight/2, 'talk_bar', "__BASE").setOrigin(0.5, 0);
        // cody = this.add.sprite(500, 350, 'character');
        // this.talk_bar.setScale(1);
        console.log("org width: " + this.talk_bar.displayWidth)
        this.talk_bar.orgWidth = this.talk_bar.displayWidth;
        this.talk_bar.orgHeight = this.talk_bar.displayHeight;
        this.talk_bar.setScrollFactor(0,0);
        // this.talk_bar.setVisible(false);
        this.talk_bar.update = function () {
            this.displayHeight = (window.innerHeight/2)/zoomScale; //game.renderer.height;
            this.displayWidth =  window.innerWidth/zoomScale; // game.renderer.width;
        }

        this.box_sheet = this.add.image(window.innerWidth/2,0, 'box_sheet', "__BASE").setOrigin(0.5, 0);
        this.box_sheet.orgWidth = this.box_sheet.displayWidth
        this.box_sheet.orgHeight = this.box_sheet.displayHeight
        this.box_sheet.setScrollFactor(0,0);
        this.box_sheet.setVisible(false);
        this.box_sheet.update = function () {
            this.displayHeight = (window.innerHeight/zoomScale) * 0.25; //game.renderer.height;
            this.displayWidth =  (window.innerWidth/zoomScale); // game.renderer.width;
        }

        this.left_button_sheet = this.add.image(window.innerWidth * 0.075, window.innerHeight/8, 'left_button_sheet').setOrigin(0.5, 0.5);
        this.left_button_sheet.orgWidth = this.left_button_sheet.displayWidth
        this.left_button_sheet.orgHeight = this.left_button_sheet.displayHeight
        this.left_button_sheet.setScrollFactor(0,0);
        // this.talk_bar.setVisible(false);
        this.left_button_sheet.update = function () {
            this.displayHeight = (window.innerHeight/zoomScale) * 0.1; //game.renderer.height;
            this.displayWidth =  this.displayHeight; // game.renderer.width;
        }


        this.left_button_sheet.setInteractive();
        this.left_button_sheet.on("pointerdown", () => {
            if (indexTalk > 0){
                indexTalk --;
                this.text_sheet.text = '';
                
                typewriteText(talkMessage[indexTalk], this.time, this.text_sheet);
            }
            
        })


        this.right_button_sheet = this.add.image(window.innerWidth * 0.15, window.innerHeight/8, 'right_button_sheet').setOrigin(0.5, 0.5);
        this.right_button_sheet.orgWidth = this.right_button_sheet.displayWidth
        this.right_button_sheet.orgHeight = this.right_button_sheet.displayHeight
        this.right_button_sheet.setScrollFactor(0,0);
        // this.talk_bar.setVisible(false);
        this.right_button_sheet.update = function () {
            this.displayHeight = (window.innerHeight/zoomScale) * 0.1; //game.renderer.height;
            this.displayWidth =  this.displayHeight; // game.renderer.width;
        }

        this.right_button_sheet.setInteractive();
        this.right_button_sheet.on("pointerdown", () => {
            indexTalk ++;
            
            if (indexTalk < talkMessage.length){
                
                this.text_sheet.text = '';
                
                typewriteText(talkMessage[indexTalk], this.time, this.text_sheet);
            }else{
                indexTalk = talkMessage.length -1;
            }
            
        })


        this.record_button_sheet = this.add.image(window.innerWidth * 0.225, window.innerHeight/8, 'record_button_sheet').setOrigin(0.5, 0.5);
        this.record_button_sheet.orgWidth = this.record_button_sheet.displayWidth
        this.record_button_sheet.orgHeight = this.record_button_sheet.displayHeight
        this.record_button_sheet.setScrollFactor(0,0);
        // this.talk_bar.setVisible(false);
        this.record_button_sheet.update = function () {
            this.displayHeight = (window.innerHeight/zoomScale) * 0.1; //game.renderer.height;
            this.displayWidth =  this.displayHeight; // game.renderer.width;
        }

        this.record_button_sheet.setInteractive();
        this.record_button_sheet.on("pointerdown", () => {
            gameState = "play";
            this.box_sheet.setVisible(false)
            this.left_button_sheet.setVisible(false);
            this.right_button_sheet.setVisible(false);
            this.avatar_NPC.setVisible(false)
            this.talk_bar.setVisible(false);
            this.submit_button.setVisible(false);
            this.text_sheet.setVisible(false);
            this.record_button_sheet.setVisible(false);
            onDialogNPC = false;
            this.email_field.setVisible(false);
            indexTalk = 0;
            this.text_sheet.text = '';
            isDialogUITextShow = false;
            button_close.setVisible(false);
            this.emailInput.setVisible(false);
            this.passwordInput.setVisible(false);
        })


        this.avatar_NPC = this.add.image(window.innerWidth, window.innerHeight/2, 'avatar_NPC').setOrigin(1, 1);
        this.avatar_NPC.flipX = true;
        this.avatar_NPC.orgWidth = this.avatar_NPC.displayWidth
        this.avatar_NPC.orgHeight = this.avatar_NPC.displayHeight
        this.avatar_NPC.setScrollFactor(0,0);
        // this.talk_bar.setVisible(false);
        this.avatar_NPC.update = function () {
            this.displayHeight = (window.innerHeight/zoomScale) /2; //game.renderer.height;
            this.displayWidth =  (window.innerWidth/zoomScale)/4; // game.renderer.width;
        }

        this.email_field = this.add.image(window.innerWidth/2, window.innerHeight * 0.875, 'email_field', "__BASE").setOrigin(0.5, 0.5);
        this.email_field.orgWidth = this.email_field.displayWidth
        this.email_field.orgHeight = this.email_field.displayHeight
        this.email_field.setScrollFactor(0,0);
        this.email_field.setVisible(false);
        this.email_field.update = function () {
            this.displayHeight = (window.innerHeight/zoomScale) * 0.08; //game.renderer.height;
            this.displayWidth =  (window.innerWidth/zoomScale) * 0.5; // game.renderer.width;
        }


        this.submit_button = this.add.image(window.innerWidth/2, window.innerHeight * 0.97, 'button_submit', "__BASE").setOrigin(0.5, 0.5);
        this.submit_button.orgWidth = this.submit_button.displayWidth
        this.submit_button.orgHeight = this.submit_button.displayHeight
        this.submit_button.setScrollFactor(0,0);
        // this.talk_bar.setVisible(false);
        this.submit_button.update = function () {
            // this.scale = 2 * window.innerWidth/1000
            // if (window.innerWidth < 1000){
            //     this.scale = 2;
            // }

            this.displayHeight = (window.innerHeight/zoomScale) * 0.04; //game.renderer.height;
            this.displayWidth =  (window.innerWidth/zoomScale) * 0.15; // game.renderer.width;
        }

        this.submit_button.setInteractive();
        this.submit_button.on('pointerdown', () => {
            if (cantalkSubway){
                var password = this.passwordInput.getChildByName('password');
                password.value = '';
                this.text_sheet.text = '';
                typewriteText("password incorrect", this.time, this.text_sheet);
            } else {
                email = this.emailInput.getChildByName('email');
                
                $.ajax({
                    type: "POST",
                    url: url,
                    data: {
                        email: email.value
                     }
                  });
                
                console.log("mail value: " + email.value);
                email.value = '';

                this.text_sheet.text = '';
                typewriteText("send email success, thank you", this.time, this.text_sheet);
            }
        })



        this.text_sheet = this.add.text(window.innerWidth/2, window.innerHeight * 0.6, '', {fontFamily: 'Minecraft', wordWrap: { width: window.innerWidth * 0.8 }, fontSize: 25 * window.innerWidth/1000, fill: '#000000'}).setOrigin(0.5,0);
        this.text_sheet.setScrollFactor(0);
        this.index = 0;
        // typewriteText(this.TaniTalk[this.index], this.time, this.text_sheet);

        // this.box_sheet.setVisible(false)
        this.left_button_sheet.setVisible(false);
        this.right_button_sheet.setVisible(false);
        this.avatar_NPC.setVisible(false)
        this.talk_bar.setVisible(false);
        this.submit_button.setVisible(false);
        this.text_sheet.setVisible(false);
        this.record_button_sheet.setVisible(false);
        

        

        // });
        //Create Responsive ========================================================================================================
        this.imageList = []
        this.imageList.push( this.board, this.file_sheet, this.talk_bar, this.box_sheet, this.left_button_sheet, this.right_button_sheet, this.record_button_sheet, 
            this.avatar_NPC, this.submit_button, this.aboutDopeWar_red,this.aboutDopeWar_yellow, this.aboutPaper_red, this.aboutPaper_yellow, this.bluePrint_red, 
            this.bluePrint_yellow, this.RoadMap_red, this.RoadMap_yellow, this.character_red, this.character_yellow, box, box2, this.sheet_button_close, this.email_field,
            );

        
        
        // all sprite update
        for (let index = 0; index < this.imageList.length; index++) {
            this.imageList[index].update();
            // console.log("index: " + index);
        }
        // -------------------------------------------------------------

        // this.file_sheet.anims.play('show', false); 
        // this.scale.on('resize', this.resize, this)
        
        // this.cameraUpdate()
        // this.resize()
        // whitepaper content ==================================================================================================================
        var content = [
            "The sky above the port was the color of television, tuned to a dead channel.",
            "`It's not like I'm using,' Case heard someone say, as he shouldered his way ",
            "through the crowd around the door of the Chat. `It's like my body's developed",
            "this massive drug deficiency.' It was a Sprawl voice and a Sprawl joke.",
            "The Chatsubo was a bar for professional expatriates; you could drink there for",
            "a week and never hear two words in Japanese.",
            "",
            "Ratz was tending bar, his prosthetic arm jerking monotonously as he filled a tray",
            "of glasses with draft Kirin. He saw Case and smiled, his teeth a webwork of",
            "East European steel and brown decay. Case found a place at the bar, between the",
            "unlikely tan on one of Lonny Zone's whores and the crisp naval uniform of a tall",
            "African whose cheekbones were ridged with precise rows of tribal scars. `Wage was",
            "in here early, with two joeboys,' Ratz said, shoving a draft across the bar with",
            "his good hand. `Maybe some business with you, Case?'",
            "",
            "Case shrugged. The girl to his right giggled and nudged him.",
            "The bartender's smile widened. His ugliness was the stuff of legend. In an age of",
            "affordable beauty, there was something heraldic about his lack of it. The antique",
            "arm whined as he reached for another mug.",
            "",
            "",
            "From Neuromancer by William Gibson"
        ];
    
    
        graphics = this.make.graphics();
    
        // graphics.fillStyle(0xffffff);
        graphics.fillRect(window.innerWidth * 0.6, this.map.y + (this.map.displayHeight * 0.2), window.innerWidth * 0.4, window.innerHeight * 0.6);
        graphics.setScrollFactor(0);
        var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);
        graphics.setVisible(false);
        text_content = this.add.text(window.innerWidth * 0.6, this.map.y + (this.map.displayHeight * 0.2), content, { fontFamily: 'Minecraft', color: '#000000', wordWrap: { width: window.innerWidth * 0.3 } }).setOrigin(0);
        text_content.setFontFamily('Minecraft');
        text_content.setScrollFactor(0);
        text_content.setMask(mask);
        text_content.setVisible(false);
        //  The rectangle they can 'drag' within
        var zone = this.add.zone(window.innerWidth * 0.6, this.map.y + (this.map.displayHeight * 0.2), window.innerWidth * 0.4, window.innerHeight * 0.6).setOrigin(0).setInteractive();
        zone.setScrollFactor(0);
        zone.on('pointermove', function (pointer) {
    
            if (pointer.isDown)
            {
                text_content.y += (pointer.velocity.y / 10);
    
                text_content.y = Phaser.Math.Clamp(text_content.y, -400, text_content.height + 50);
            }
    
        });

        this.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {

            text_content.y -= deltaY * 0.5;
            if (text_content.y < -text_content.height/2){
                text_content.y = -text_content.height/2;
            } 
            if (text_content.y > text_content.height/2){
                text_content.y = text_content.height/2;
            }
            
            // soil.tilePositionY += deltaY * 0.5;

        });


        // // splash screen ============================================================================================
        this.anims.create({
            key: 'showSplash',
            frames: this.anims.generateFrameNumbers('splashScreen', { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35] }),
            frameRate: 8,
            repeat: false,
            // delay: 1000,
            // duration: 5000,
        });


        this.splashScreen = this.add.sprite(window.innerWidth/2, window.innerHeight/2, 'splashScreen',320, 182).setOrigin(0.5, 0.5);
        this.splashScreen.displayHeight = window.innerHeight/zoomScale 
        this.splashScreen.displayWidth =  window.innerWidth/zoomScale  
        this.splashScreen.anims.play("showSplash");
        this.splashScreen.on(Phaser.Animations.Events.ANIMATION_COMPLETE, async function () {
            await sleep(1000);
            this.splashScreen.setVisible(false);
        }, this);

        this.splashScreen.setScrollFactor(0);
        // this.splashScreen.setVisible(false);
        // email =========================================================================================================
        this.emailInput = this.add.dom(window.innerWidth/2, window.innerHeight * 0.875).createFromCache("email").setOrigin(0.5, 0.5);
        this.emailInput.setScrollFactor(0);
        this.emailInput.setVisible(false);

        this.passwordInput = this.add.dom(window.innerWidth/2, window.innerHeight * 0.875).createFromCache("password");
        this.passwordInput.setScrollFactor(0);
        this.passwordInput.setVisible(false);
        this.passwordInput.addListener('click');

        this.passwordInput.on('click', function (event) {

            if (event.target.name === 'loginButton')
            {
                var inputPassword = this.getChildByName('password');

                //  Have they entered anything?
                if (inputPassword.value !== '')
                {
                    //  Turn off the click events
                    this.removeListener('click');

                    //  Tween the login form out
                    
                    //  Populate the text with whatever they typed in as the username!
                    console.log('Welcome ' + inputPassword.value);
                }
               
            }

        });
        // this.nameInput.displayWidth = window.innerWidth;

        // this.element = this.add.dom(window.innerWidth/2, window.innerHeight/2).createFromCache('nameform');
        // this.element.setScrollFactor(0);

        // this.video1 = this.add.video('video1');
        // this.video1.play(true);
        //  x, y, anchor x, anchor y, scale x, scale y
        // this.video1.addToWorld(400, 300, 0.5, 0.5, 400, 300);


     }

     //end create

function StartGame(){
    if (time >= lastMoveTime + moveInterval && box2.y < 10000){
        lastMoveTime = time;
        box.y -= 5;
        box2.y += 5;
    }
}

//update
async function update(time){
    // console.log("cody_y: " + cody.y);
    // console.log("can talk mkios: " + cantalkKiosk);

    if (onDialogNPC){
        this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.D);
        // this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        // this.input.keyboard.enabled = false;
        // this.input.keyboard.enableGlobalCapture();
        // box.y  = 0 - (this.game.renderer.height/10) ;
        // box2.y = this.game.renderer.height * 3 /5;
        Text2.setVisible(false);
        // gameState = "onDialogueNPC";
        walkLeft = false;
        if (isGoingToNPC1){
            talkMessage = NPC1Talk;
        } else if (isGoingToNPC2){
            talkMessage = NPC2Talk;
        } else if (isGoingToNPC3){
            talkMessage = NPC3Talk;
        } else if (isGoingToNPC4){
            talkMessage = NPC4Talk;
        } else if (isGoingToNPC5){
            talkMessage = NPC5Talk;
        } else if (isGoingToNPC6){
            talkMessage = NPC6Talk;
        } else if (isGoingToNPC7){
            talkMessage = NPC7Talk;
        } else if (isGoingToNPC8){
            talkMessage = NPC8Talk;
        } else if (cantalkSubway){
            talkMessage = subwayTalk;
        }
        if (isDialogUITextShow == false){
            this.avatar_NPC.setVisible(true)
            if (isGoingToNPC1){
                this.avatar_NPC.setFrame(2);
            } else if (isGoingToNPC2){
                this.avatar_NPC.setFrame(7);
            } else if (isGoingToNPC3){
                this.avatar_NPC.setFrame(1);
            } else if (isGoingToNPC4){
                this.avatar_NPC.setFrame(4);
            } else if (isGoingToNPC5){
                this.avatar_NPC.setFrame(6);
            } else if (isGoingToNPC6){
                this.avatar_NPC.setFrame(0);
            }else if (isGoingToNPC7){
                this.avatar_NPC.setVisible(false);
                this.submit_button.setVisible(true);
                this.emailInput.setVisible(true);
            }else if (isGoingToNPC8){
                this.avatar_NPC.setFrame(5);
            }
            if (cantalkSubway){
                this.avatar_NPC.setVisible(false);
                this.submit_button.setVisible(true);
                this.passwordInput.setVisible(true);
            }

            this.box_sheet.setVisible(true)
            this.left_button_sheet.setVisible(true);
            this.right_button_sheet.setVisible(true);
            this.talk_bar.setVisible(true);
            this.text_sheet.setVisible(true);
            this.record_button_sheet.setVisible(true);
            
            typewriteText(talkMessage[indexTalk], this.time, this.text_sheet);
            isDialogUITextShow = true;
            
        }
        
        isGoingToNPC1 = false;
        isGoingToNPC2 = false;
        isGoingToNPC3 = false;
        isGoingToNPC4 = false;
        isGoingToNPC5 = false;
        isGoingToNPC6 = false;
        isGoingToNPC7 = false;
        isGoingToNPC8 = false;
        cantalkKiosk = false;
        button_close.setVisible(true);
    }

    if (gameIsPlaying){
        if (gameState == "play"){
            Move(this.input, cursorKeys, walkRight, walkLeft);
        }
        
        // Text2.x = cody.x + 100;
        // bar.x = cody.x + 300;
        //box
        if (startGame){
            if (time >= lastMoveTime + moveInterval && box2.y < this.game.renderer.height * 0.9){
                lastMoveTime = time;
                box.y -= 5;
                box2.y += 5;
            } else {
                gameState = "play";
                startGame = false;
                if (!this.sys.game.device.os.desktop){
                    button_E?.setVisible(true);
                    button_left?.setVisible(true);
                    button_right?.setVisible(true);
                    button_jump.setVisible(true);
                }
                
            }
        }
        

        // NPC 1

        if(cody.x >= NPC1.x - (NPC1.displayWidth * 0.2) &&  cody.x <= NPC1.x + 50 ){
            Text2.setVisible(true);
            Text2.text = "Press E To Talk";
            cantalkNPC1 = true;
            if (!NPC1IsTalking){
                
                bubbleChat.setVisible(true);
                label1.setVisible(true);
                // typewriteText('Hello!', this.time, this.label);
                bar1CanShow = true;
                NPC1IsTalking = true;
            }

        }  else if(cody.x >= NPC2.x - (NPC1.displayWidth * 0.2) &&  cody.x <= NPC2.x + 50){
            cantalkNPC2 = true;
            Text2.setVisible(true);
            Text2.text = "Press E To Talk";
            if (!NPC2IsTalking){
                
                label2.setVisible(true);
                bubbleChat2.setVisible(true);
                // typewriteText('Hello!', this.time, this.label);
                bar1CanShow = true;
                NPC2IsTalking = true;
            }

        } else if(cody.x >= NPC3.x - 50 &&  cody.x <= NPC3.x + 50){
            cantalkNPC3 = true;
            Text2.setVisible(true);
            Text2.text = "Press E To Talk";
            if (!NPC3IsTalking){
                
                label3.setVisible(true);
                bubbleChat3.setVisible(true);
                // typewriteText('Hello!', this.time, this.label);
                bar1CanShow = true;
                NPC3IsTalking = true;
            }
            
        } else if(cody.x >= NPC4.x - 50 &&  cody.x <= NPC4.x + 50){
            cantalkNPC4 = true;
            Text2.setVisible(true);
            Text2.text = "Press E To Talk";
            if (!NPC4IsTalking){
                
                label4.setVisible(true);
                bubbleChat4.setVisible(true);
                // typewriteText('Hello!', this.time, this.label);
                bar1CanShow = true;
                NPC4IsTalking = true;
            }
            
        } else if(cody.x >= NPC5.x - 50 &&  cody.x <= NPC5.x + 50){
            cantalkNPC5 = true;
            Text2.setVisible(true);
            Text2.text = "Press E To Talk";
            if (!NPC5IsTalking){
                
                label5.setVisible(true);
                bubbleChat5.setVisible(true);
                // typewriteText('Hello!', this.time, this.label);
                bar1CanShow = true;
                NPC5IsTalking = true;
            }
             
        } else if(cody.x >= NPC6.x - 50 &&  cody.x <= NPC6.x + 50){
            cantalkNPC6 = true;
            Text2.setVisible(true);
            Text2.text = "Press E To Talk";
            if (!NPC6IsTalking){
                
                label6.setVisible(true);
                bubbleChat6.setVisible(true);
                // typewriteText('Hello!', this.time, this.label);
                bar1CanShow = true;
                NPC6IsTalking = true;
            }
            
        } else if(cody.x >= Kiosk.x - 50 &&  cody.x <= Kiosk.x + 50){
            cantalkKiosk = true;
            Text2.setVisible(true);
            Text2.text = "Press E To Talk";

        } else if(cody.x >= NPC7.x - 50 &&  cody.x <= NPC7.x + 50){
            cantalkNPC7 = true;
            Text2.setVisible(true);
            Text2.text = "Press E To Talk";
            if (!NPC7IsTalking){
                
                label7.setVisible(true);
                bubbleChat7.setVisible(true);
                // typewriteText('Hello!', this.time, this.label);
                NPC7IsTalking = true;
            }

            
        }else if(cody.x >= NPC8.x - 50 &&  cody.x <= NPC8.x + 50){
            cantalkNPC8 = true;
            Text2.setVisible(true);
            Text2.text = "Press E To Talk";
            if (!NPC8IsTalking){
                
                label8.setVisible(true);
                bubbleChat8.setVisible(true);
                // typewriteText('Hello!', this.time, this.label);
                NPC8IsTalking = true;
            }

            
        } else if(cody.x >= (this.map.displayWidth * 0.9) - (cody.displayWidth * 0.2)){
            Text2.setVisible(true);
            cantalkSubway = true;
            
        } else {
            Text2.setVisible(false);
            bubbleChat.setVisible(false);
            bubbleChat2.setVisible(false);
            bubbleChat3.setVisible(false);
            bubbleChat4.setVisible(false);
            bubbleChat5.setVisible(false);
            bubbleChat6.setVisible(false);
            bubbleChat7.setVisible(false);
            bubbleChat8.setVisible(false);
            // bar.setVisible(false);
            bar1CanShow = false;
            NPC1IsTalking = false;
            NPC2IsTalking = false;
            NPC3IsTalking = false;
            NPC4IsTalking = false;
            NPC5IsTalking = false;
            NPC6IsTalking = false;
            NPC7IsTalking = false;
            NPC8IsTalking = false;
            KioskIsTalking = false;
            label1.setVisible(false);
            label2.setVisible(false);
            label3.setVisible(false);
            label4.setVisible(false);
            label5.setVisible(false);
            label6.setVisible(false);
            label7.setVisible(false);
            label8.setVisible(false);
            cantalkNPC1 = false;
            cantalkNPC2 = false;
            cantalkNPC3 = false;
            cantalkNPC4 = false;
            cantalkNPC5 = false;
            cantalkNPC6 = false;
            cantalkNPC7 = false;
            cantalkNPC8 = false;
            cantalkKiosk = false;
            cantalkSubway = false;
            isGoingToNPC1 = false;
            isGoingToNPC2 = false;
            isGoingToNPC3 = false;
            isGoingToNPC4 = false;
            isGoingToNPC5 = false;
            isGoingToNPC6 = false;
            isGoingToNPC7 = false;
            isGoingToNPC8 = false;
        }

        
        
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, false).isDown &&  cody.body.onFloor() || jump &&  cody.body.onFloor())
        {
            if (facing == 'right' || facing == 'idle'){
                cody.setFrame(24);
            } else {
                cody.setFrame(26);
            }
            
            cody.body.velocity.y = - (cody.displayHeight * 1.75);
            jumpTimer = this.time.now + 750;
            console.log(cody.frame);
            await sleep(750);
            cody.setFrame(23);
            
        } 
        

        //button screen controller
        button_left?.on("pointerdown", () => {
            cody.body.velocity.x = -150;
        })
        if (isGoingToNPC1){
            if (cody.x < NPC1.x - 30){
                walkLeft = false;
                isGoingToNPC1 == false;
                cody.setFrame(0);
                onDialogNPC = true;
                // gameState = "onDialogueNPC";
            }
        }

        if (isGoingToNPC2){
            if (cody.x < NPC2.x - 30){
                walkLeft = false;
                isGoingToNPC2 == false;
                cody.setFrame(0);
                onDialogNPC = true;
                // gameState = "onDialogueNPC";
            }
        }

        if (isGoingToNPC3){
            if (cody.x < NPC3.x - 30){
                walkLeft = false;
                isGoingToNPC3 == false;
                cody.setFrame(0);
                onDialogNPC = true;
                // gameState = "onDialogueNPC";
            }
        }

        if (isGoingToNPC4){
            if (cody.x < NPC4.x - 30){
                walkLeft = false;
                isGoingToNPC4 == false;
                cody.setFrame(0);
                onDialogNPC = true;
                // gameState = "onDialogueNPC";
            }
        }

        if (isGoingToNPC5){
            if (cody.x < NPC5.x - 30){
                walkLeft = false;
                isGoingToNPC5 == false;
                cody.setFrame(0);
                onDialogNPC = true;
                // gameState = "onDialogueNPC";
            }
        }

        if (isGoingToNPC6){
            if (cody.x < NPC6.x - 30){
                walkLeft = false;
                isGoingToNPC6 == false;
                cody.setFrame(0);
                onDialogNPC = true;
                // gameState = "onDialogueNPC";
            }
        }

        if (isGoingToNPC7){
            if (cody.x < NPC7.x - 30){
                walkLeft = false;
                isGoingToNPC7 == false;
                cody.setFrame(0);
                onDialogNPC = true;
                // gameState = "onDialogueNPC";
            }
        }

        if (isGoingToNPC8){
            if (cody.x < NPC8.x - 30){
                walkLeft = false;
                isGoingToNPC8 == false;
                cody.setFrame(0);
                onDialogNPC = true;
                // gameState = "onDialogueNPC";
            }
        }

        

        


        if (cantalkNPC1){
            cantalkKiosk = false;
            if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E, false).isDown){
                if (cody.x > NPC1.x - 30){
                    walkLeft = true;
                } 
                isGoingToNPC1 = true;
            }
        }

        else if (cantalkNPC2){
            if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E, false).isDown){
                if (cody.x > NPC2.x - 30){
                    walkLeft = true;
                } 
                isGoingToNPC2 = true;
            }
        }

        else if (cantalkNPC3){
            if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E, false).isDown){
                if (cody.x > NPC3.x - 30){
                    walkLeft = true;
                } 
                isGoingToNPC3 = true;
            }
        }

        else if (cantalkNPC4){
            if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E, false).isDown){
                if (cody.x > NPC4.x - 30){
                    walkLeft = true;
                } 
                isGoingToNPC4 = true;
            }
        }

        else if (cantalkNPC5){
            if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E, false).isDown){
                if (cody.x > NPC5.x - 30){
                    walkLeft = true;
                } 
                isGoingToNPC5 = true;
            }
        }

        else if (cantalkNPC6){
            cantalkKiosk = false;
            if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E, false).isDown){
                if (cody.x > NPC6.x - 30){
                    walkLeft = true;
                } 
                isGoingToNPC6 = true;
            }
        }
        else if (cantalkNPC7){
            cantalkKiosk = false;
            if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E, false).isDown){
                if (cody.x > NPC7.x - 30){
                    walkLeft = true;
                } 
                isGoingToNPC7 = true;
            }
        }

        else if (cantalkNPC8){
            cantalkKiosk = false;
            if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E, false).isDown){
                if (cody.x > NPC8.x - 30){
                    walkLeft = true;
                } 
                isGoingToNPC8 = true;
            }
        }

        else if (cantalkKiosk){
            if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E, false).isDown){
                console.log("E pressed");
                this.board.setVisible(true);
                this.aboutDopeWar_red.setVisible(true);
                this.aboutPaper_red.setVisible(true);
                this.bluePrint_red.setVisible(true);
                this.character_red.setVisible(true);
                this.RoadMap_red.setVisible(true);
                this.board_button_close.setVisible(true);
            }
        } else if (cantalkSubway){
            if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E, false).isDown){
                onDialogNPC = true;
            }
        }
    }
    

    // sheet =============================================================================
    // if (this.aboutDopeWar_red.input.pointerOver()){
    //     console.log("over");
    // }
    
}
    
function p(pointer) {

    // console.log(pointer.);
    console.log(pointer.event);

}

function Move(input, cursorKeys,  walkRight, walkLeft){
    
    if(cursorKeys.left.isDown || walkLeft || input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A, false).isDown){
        cody.body.velocity.x = window.innerHeight *  -350/1000;
        if (facing != 'left' && cody.body.onFloor())
        {
            cody.play('walk_left');
            facing = 'left';
        }   
    }
    else if(cursorKeys.right.isDown || walkRight || input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D, false).isDown){
        cody.body.velocity.x = window.innerHeight * 350/1000;
        if (facing != 'right' && cody.body.onFloor())
        {
            cody.play('walk_right');
            facing = 'right';
        }
        if (Text2.visible == true){
            Text2.setVisible(false);
        }
    }
    else
    {
        if (facing != 'idle')
        {
            cody.stop();
            cody.setFrame(23);
            facing = 'idle';
        }
        cody.body.velocity.x = 0;
    }
    walkLeft = false;
    walkRight = false;
    
    
    
    
}


function keydown(event){
    //cek tombol apa yang ditekan
    // console.log(event);

    gameIsPlaying = true;
    startGame = true;
    Text.setVisible(false);
    switch(event.keyCode){
        case 69:  //left
        
            break;

    }

}

function triggerEnter (player, NPC1)
{
    // NPC1.disableBody(true, true);
    NPC1.body.collider = false;
    bubbleChat.setVisible(true);
}


function typewriteText(text, time, label)
{
    const length = text.length
    let i = 0
    time.addEvent({
        callback: () => {
            label.text += text[i]
            ++i
        },
        repeat: length - 1,
        delay: 10
    })
}

/**
*
* @param {string} text
*/
function typewriteTextWrapped(text, label, time)
{
    const lines = label.getWrappedText(text)
    const wrappedText = lines.join('\n')

    typewriteText(wrappedText, time, label);
}

// Typewriter for BitmapText
/**
 *
 * @param {string} text
 */
 function typewriteBitmapText(text)
{
    this.bitmapLabel.setText(text)

    const bounds = this.bitmapLabel.getTextBounds(false)
    const wrappedText = bounds['wrappedText'] || text

    this.bitmapLabel.setText('')

    const length = wrappedText.length
    let i = 0
    this.time.addEvent({
        callback: () => {
            this.bitmapLabel.text += wrappedText[i]
            ++i
        },
        repeat: length - 1,
        delay: 200
    })
}


function render() {

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(cody, 32, 500);

}

function GoToNPC(NPC){
    if (cody.x < NPC.x ){
        walkRight = true;
    }
}


function resize() {
    console.log("call  resize");
    console.log(document.getElementsByClassName("parent-container")[0].offsetWidth);
    var canvas = game.canvas, width = document.getElementsByClassName("parent-container")[0].offsetWidth, height = window.innerHeight;
    var wratio = width / height, ratio = canvas.width / canvas.height;
    
    if (wratio < ratio) {
        canvas.style.width = width + 'px';
        canvas.style.height = (width / ratio) + 'px';
    } else {
        canvas.style.width = (height * ratio) + 'px';
        canvas.style.height = height + 'px';
    }
}

// function resize() {
//     var canvas = document.querySelector("canvas");
//     var windowWidth = window.innerWidth;
//     var windowHeight = window.innerHeight;
//     var windowRatio = windowWidth / windowHeight;
//     var gameRatio = game.config.width / game.config.height;
//     if(windowRatio < gameRatio){
//         canvas.style.width = windowWidth + "px";
//         canvas.style.height = (windowWidth / gameRatio) + "px";
//     }
//     else{
//         canvas.style.width = (windowHeight * gameRatio) + "px";
//         canvas.style.height = windowHeight + "px";
//     }
// }