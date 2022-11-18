var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
    height: window.innerHeight,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{

}

function create ()
{
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


    var graphics = this.make.graphics();

    // graphics.fillStyle(0xffffff);
    graphics.fillRect(window.innerWidth/2, window.innerHeight/2, window.innerWidth * 0.4, window.innerHeight * 0.4);

    var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

    var text = this.add.text(window.innerWidth/2, window.innerHeight/2, content, { fontFamily: 'Arial', color: '#00ff00', wordWrap: { width: window.innerWidth * 0.3 } }).setOrigin(0);

    text.setMask(mask);

    //  The rectangle they can 'drag' within
    var zone = this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth * 0.4, window.innerHeight * 0.4).setOrigin(0).setInteractive();

    zone.on('pointermove', function (pointer) {

        if (pointer.isDown)
        {
            text.y += (pointer.velocity.y / 10);

            text.y = Phaser.Math.Clamp(text.y, -400, text.height + 50);
        }

    });
}
