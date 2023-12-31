class Instruction extends Phaser.Scene {
    constructor() {
        super('InstructionScene');
    }
    create() {
        this.add.text(game.config.width/2, game.config.height/2, 'Use the ARROW KEYS to Maneuver', { fontFamily: 'After Hours', fontSize: 32 }).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Try to Overtake the Bus', { fontFamily: 'After Hours', fontSize: 32 }).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 128, 'Press DOWN ARROW to go back to the Menu', { fontFamily: 'After Hours', fontSize: 32 } ).setOrigin(0.5)

        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
            this.scene.start('MenuScene')
        }
    }
}