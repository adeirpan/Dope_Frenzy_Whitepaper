import Player from './Player.js'
import Box from './box.js'
import Tilemap from './Tilemap.js';
import CharacterNPC from './NPC.js';
import HUD from './HUD.js';
import Preload from './Preload.js';
import phaser from './lib/phaser.js';
import { app } from './lib/appScale.js';


// variable ==============================================================================================
var cursorKeys;
var state = "start";
var moveInterval = 0;
var lastMoveTime = 0;

// box 


export default class MainScene extends Phaser.Scene{
    
    constructor(){
        super('MainScene');
    }
    
    preload(){
        
        this.Preload = new Preload(this, this.game);
        this.Preload.Preload();
    }
    
    create(){
        this.imageList = [];
        let scaleLogo = 1;
        
        // input keyboard ======================================================
        this.input.keyboard.on('keydown', e => {
            this.keydown(e);
        });

        // input cursorkeys ====================================================
        cursorKeys = this.input.keyboard.createCursorKeys();
        this.Tilemap = new Tilemap(this, this.game);
        this.Player = new Player(this, this.game);
        this.NPC = new CharacterNPC(this, this.game, 100, 395, this.Player);
        this.NPC2 = new CharacterNPC(this, this.game, 250, 395, this.Player);

        
        
        

        // camera ==============================================================================
        this.cameras.main.startFollow(this.Player.cody);
        var camera = this.cameras.main;


        

        
        
        // this.HUD = new HUD(this, this.game, this.Player.walkLeft, this.Player.walkRight, 20, state);
        // Grid ==========================================================
        // this.aGrid = new AlignGrid({scene: this, rows:11, cols:11}, this.game);
        // this.aGrid.showNumbers();

        
        // this.aGrid.placeAtIndex(60, this.middleNotificationText);

        // Phaser.Display.Align.In.Center(pic, this.add.zone(400, 300, 800, 600));

        //  Center the sprite to the picture
        // Phaser.Display.Align.In.Center(this.middleNotificationText, this.add.zone(400, 300, 800, 600));

        let bg = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'bg')
        bg.orgWidth = bg.displayWidth
        bg.orgHeight = bg.displayHeight
        bg.setScrollFactor(0);
        bg.setVisible(false);
        bg.update = function () {
            if (app.width * this.orgHeight/this.orgWidth < app.height){
                this.displayWidth = app.height * this.orgWidth/this.orgHeight
                this.displayHeight = app.height
            }else{
                this.displayWidth = app.width
                this.displayHeight = app.width * this.orgHeight/this.orgWidth
            }
        }

        this.box = this.add
        .rectangle(window.innerWidth / 2, app.top, window.innerWidth, window.innerHeight/2, 0xffffff)
        .setOrigin(0.5, 0);
        console.log("window x,y: " + this.cameras.main.x+ ", " + this.cameras.main.y)
        this.box.orgWidth = this.box.displayWidth
        // console.log("box width: " + this.box.width)
        this.box.orgHeight = this.box.displayHeight
        // console.log("box height: " + this.box.height)
        this.box.setScrollFactor(0);
        // this.box.setVisible(false);
        this.box.update = function () {
            this.displayHeight = app.height/2;
            this.displayWidth = app.width;
            console.log("box y : " + this.y);
        }


        this.box2 = this.add
        .rectangle(window.innerWidth / 2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2, 0xffffff)
        .setOrigin(0.5,0);
        this.box2.orgWidth = this.box2.displayWidth
        this.box2.orgHeight = this.box2.displayHeight/2
        this.box2.setScrollFactor(0);
        // this.box2.setVisible(false);
        this.box2.update = function () {
            this.displayHeight = app.height/2;
            this.displayWidth = app.width;
            console.log("box2 y : " + this.y);
        }

        // this.box2 = this.add
        // .rectangle(this.game.renderer.width/2,this.game.renderer.height/2, this.game.renderer.width, this.game.renderer.height/2, 0x000000)
        // .setOrigin(0.5,0);
        // this.box2.setScrollFactor(0);
        // text -------------------------------------------------------------
        // var style = { font: ' 150px Dimbo', fill: "#ffeeff" };
        // let text = this.add.text(app.centerX, app.centerY - 200, 'Qugurun', style).setOrigin(0.5)
        // text.setScrollFactor(0);
        // text.update = function () {
        //     this.text = window.innerWidth + ' ' + window.innerHeight
        // }

        // text.setInteractive({ cursor: 'pointer' })

        // text.on('pointerover', function (event) {
        //     this.alpha = 0.5;
        // });

        // text.on('pointerout', function (event) {
        //     this.alpha = 1.0;
        // });

        this.imageList.push( this.box, this.box2, bg);
        
        // all sprite update
        for (let index = 0; index < this.imageList.length; index++) {
            this.imageList[index].update();
            console.log("index: " + index);
        }
        // -------------------------------------------------------------

        this.scale.on('resize', this.resize, this)
        
        this.cameraUpdate()
        this.resize()
    }

    update(time){
        if (state == "prestart"){
            if (time >= lastMoveTime + moveInterval && this.box2.y < app.bottom){
                console.log("dieksekusi")
                lastMoveTime = time;
                this.box.y -= 5;
                this.box2.y += 5;
            } 
            else {
                state = "play";
                console.log("state: " + this.state);
            }
            
        }
        // console.log("can talk: " + this.NPC.canTalk);
        // this.HUD.update(time);
        if (state == "play"){
            // console.log(state);
            this.Player.update();
            this.NPC.update(time);
        }

        if (state == "onDialog"){
            if (time >= lastMoveTime + moveInterval && this.box2.y > this.game.renderer.height * 0.7){
                lastMoveTime = time;
                this.box.y += 5;
                this.box2.y -= 5;
            }
        }
    }

    keydown(event){
        //cek tombol apa yang ditekan
        // console.log(event);
        
        if (state == "start"){
            // console.log("hai");
            state = "prestart";
        }

        // gameIsPlaying = true;
        // startGame = true;
        // Text.setVisible(false);
        // switch(event.keyCode){
        //     case 69:  //left
            
        //         break;
    
        // }
    
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

/**
*
* @param {string} text
*/
    typewriteTextWrapped(text, label, time)
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
    typewriteBitmapText(text)
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
    
    cameraUpdate() {
        app.update()
        const camera = this.cameras.main
        camera.setZoom(app.zoom )
        console.log("camera zoom: " + camera.zoom);
        // camera.centerOn(app.centerX, app.centerY)
        camera.centerOn(this.Player.cody.x, this.Player.cody.y)
    }

    resize() {
        this.cameraUpdate()
        // all sprite update
        for (let index = 0; index < this.imageList.length; index++) {
            this.imageList[index].update()
        }
    }
}

