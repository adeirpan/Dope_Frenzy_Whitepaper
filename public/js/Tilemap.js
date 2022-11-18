
export default class Tilemap {

    constructor(scene, game){
        this.scene = scene;
        this.game = game;

        var asphaltWidth = -500;
        for(let i = 0; i < 100; i++){

            //add asphalt
            // this.scene.load.spritesheet('Road', './assets/DW_RoadTilemap.png',
            // { frameWidth: 128, frameHeight: 128 });
            
            var road = this.scene.add.image(asphaltWidth, 500, 'Road');
            road.setFrame(1);

            var trotoar = this.scene.add.image(asphaltWidth, 628, 'Road');
            trotoar.setFrame(8);

            var trotoar_top = this.scene.add.image(asphaltWidth, 372, 'Road');
            trotoar_top.setFrame(8);
            var trotoar_top2 = this.scene.add.image(asphaltWidth, 244, 'Road');
            trotoar_top2.setFrame(8);

            var road2 = this.scene.add.image(asphaltWidth, 116, 'Road');
            road2.setFrame(1);
            asphaltWidth =  asphaltWidth + 128;
        }


        // add buildings ==================================================================================================================
        var building1 = this.scene.add.image(200, 170, 'building1');
        var building2 = this.scene.add.image(430, 300, 'building2');
        var building3 = this.scene.add.image(670, 300, 'building3');
        var building4 = this.scene.add.image(885, 280, 'building4');
        var building5 = this.scene.add.image(1190, 200, 'building5');
        var building6 = this.scene.add.image(1615, 250, 'building6');

    
        // end buildings ==================================================================================================================
        console.log(this.game.renderer.width);
        // add object =====================================================================================================================
        var hydrant = this.scene.add.image(200, 550, 'hydrant');
        hydrant.setFrame(36)
        var hydrant2 = this.scene.add.image(600, 550, 'hydrant');
        // hydrant2.setFrame(36)
        var hydrant3 = this.scene.add.image(200, 360, 'hydrant');
        hydrant3.setFrame(36);
        this.scene.add.image(500, 360, 'hydrant');

        var car = this.scene.add.image(240, 460, 'vehicle');
        car.setFrame(26);

        //end object ========================================================================================================================
    }
}