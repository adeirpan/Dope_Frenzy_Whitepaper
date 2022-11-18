import TypewriterDemo from "./typewriter.js";
const  config = {
    width: 1000,     //window.innerWidth,
    height: 500,
    type: Phaser.AUTO,
    parent: 'phaser-game',
    scene: [TypewriterDemo],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            // debug:true
        }
    }
    
};

var game = new Phaser.Game(config);