// import Phaser from 'phaser'

export default class TypewriterDemo extends Phaser.Scene
{
	constructor()
	{
		super('typewriter-demo')
	}

	preload()
	{
        //for bitmatText
        this.load.bitmapFont('american-typewriter', 'assets/american-typewriter.png', 'assets/american-typewriter.fnt')
	}

	create()
	{
        this.label = this.add.text(100, 100, '')

        this.typewriteText('Hello, World!')

        //for wrapText
        // this.label = this.add.text(100, 100, '')
		// .setWordWrapWidth(100)

	    // this.typewriteTextWrapped('Hello, World!')


        //for bitmapText
        this.bitmapLabel = this.add.bitmapText(100, 100, 'american-typewriter', '')
			.setMaxWidth(500)
	}

    typewriteText(text)
    {
        const length = text.length
        let i = 0
        this.time.addEvent({
            callback: () => {
                this.label.text += text[i]
                ++i
            },
            repeat: length - 1,
            delay: 200
        })
    }

    /**
 *
 * @param {string} text
 */
    typewriteTextWrapped(text)
    {
        const lines = this.label.getWrappedText(text)
        const wrappedText = lines.join('\n')

        this.typewriteText(wrappedText)
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
}