class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }
    
    create() {
        this.add.text(game.config.width/2, game.config.height/2, 'Congratulations You Won!!', { fontFamily: 'After Hours', fontSize: 32 }).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press SPACE to return to the Main Menu', { fontFamily: 'After Hours', fontSize: 32 }).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 128, 'Press UP to Try Again', { fontFamily: 'After Hours', fontSize: 32 }).setOrigin(0.5)
        
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.start('MenuScene')
        }
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.scene.start('playScene')
        }
    }
}