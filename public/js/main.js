import Info from "./example/info.js";
import MainScene from "./MainScene.js";
// import TittleScreen from "./TittleScreen.js";

const  config = {
    width: window.innerWidth,
    height: window.innerHeight,
    // type: Phaser.AUTO,
    type: Phaser.WEBGL,
    // type: Phaser.CANVAS,
    parent: 'phaser-game',
    scene: [MainScene],
    physics: {
        default: "arcade",
        arcade: {
            // gravity: { y: 300 },
            // debug:true
        }
    }
    
};

var game = new Phaser.Game(config);

