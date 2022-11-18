let button_settings;
let bar;
export default class Settings {

    constructor(scene){
        this.scene = scene;

        scene.load.spritesheet('button_settings', './assets/button_settings.png',
        { frameWidth: 128, frameHeight: 128 });

        button_settings = scene.add.image(900, 100, 'button_settings', '__BASE').setOrigin(0, 0);
        
        //add bar image
        bar = scene.add.image(400, 100, 'bar_menu', '__BASE').setOrigin(0, 0);
        bar.setVisible(false);

        button_settings.setInteractive();
        button_settings.on("pointerup", () => {
            bar.setVisible(!bar.visible);
            console.log("clicked");
        })

    }


}