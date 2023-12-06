class Menu extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }
    create() {
        this.add.text(game.config.width/2, game.config.height/3, 'Stuck Behind a Bus Simulator', { fontFamily: 'After Hours', fontSize: 64 } ).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 128, 'Press SPACE to Start', { fontFamily: 'After Hours', fontSize: 32 } ).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 192, 'Press UP ARROW for Instructions', { fontFamily: 'After Hours', fontSize: 32 } ).setOrigin(0.5)

        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.scene.start('InstructionScene')
        }
    }

}