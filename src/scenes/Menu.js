class Menu extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {
        this.load.image('backbus', './assets/Images/MTFBus.png')
    }

    create() {
        this.add.image(game.config.width/2, game.config.height/2 - 32, 'backbus')
        this.add.text(game.config.width/2, game.config.height/2 - 250, 'Stuck Behind a Bus Simulator', { fontFamily: 'After Hours', fontSize: 64 } ).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 132, 'Press SPACE to Start', { fontFamily: 'After Hours', fontSize: 32 } ).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 196, 'Press UP ARROW for Instructions', { fontFamily: 'After Hours', fontSize: 32 } ).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 260, 'Press DOWN ARROW for Credits', { fontFamily: 'After Hours', fontSize: 32 } ).setOrigin(0.5)
        
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.scene.start('InstructionScene')
        }
        if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
            this.scene.start('creditsScene')
        }
    }

}