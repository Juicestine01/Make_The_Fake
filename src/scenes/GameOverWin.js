class GameOverWin extends Phaser.Scene {
    constructor() {
        super('GameOverWinScene');
    }

    preload() {
        this.load.image('WinBKG', './assets/Images/ThumbsUpBKG.png')
    }
    
    create() {
        const background = this.add.image(0, 0, 'WinBKG').setOrigin(0.5,0.5)
        background.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2 - 140);
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