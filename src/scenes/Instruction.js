class Instruction extends Phaser.Scene {
    constructor() {
        super('InstructionScene');
    }
    create() {
        this.add.text(game.config.width/2, game.config.height/2, 'Use the LEFT and RIGHT ARROWS to Maneuver', { fontFamily: 'After Hours', fontSize: 32 }).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press DOWN ARROW to go back', { fontFamily: 'After Hours', fontSize: 32 } ).setOrigin(0.5)

        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
            this.scene.start('MenuScene')
        }
    }
}