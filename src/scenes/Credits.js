class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {
        
        this.add.text(game.config.width/2, game.config.height/2 + 192, 'Press DOWN ARROW to go back to the Menu', { fontFamily: 'After Hours', fontSize: 32 } ).setOrigin(0.5)
        const creditsText = [
            'Game Developed by Justin Xu',
            'Sprite Artwork by Justin Xu',
            'Play Background Artwork by Justin Xu',
            'Sound from https://www.youtube.com/watch?v=JoHB7iGDFTU&ab_channel=UncleTim',
            'Gameover Images from https://www.imdb.com/title/tt2040793/ and https://gamebanana.com/sprays/67243',
        ];
        
        const textStyle = {
            fontFamily: 'After Hours',
            fontSize: '18px',
            color: '#ffffff',
            align: 'center',
        };
        
        // Position the text objects on the screen
        const textX = 960 / 2; // Centered on a 960-wide screen
        const textYSpacing = 30; // Spacing between lines
        
        creditsText.forEach((line, index) => {
            this.add.text(textX, textYSpacing * (index + 1), line, textStyle)
                .setOrigin(0.5, 0); // Centered horizontally, anchored to the top
        });

        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
            this.scene.start('MenuScene')
        }
    }
}