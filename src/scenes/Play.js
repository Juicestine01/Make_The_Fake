class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        this.load.image('bus', './assets/Images/MTFBus.png')
        this.load.image('bkg', './assets/Images/MTFtempRoad.png')
        this.load.audio('moveit', './assets/audio/CmonMoveIt.mp3')
        this.load.audio('pullover', './assets/audio/PullOver.mp3')
    }

    create() {
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bkg').setOrigin(0)
        this.bus = this.physics.add.sprite(game.config.width / 2 + game.config.width*.2, game.config.height - game.config.height*.25, 'bus')
        this.physics.world.setBounds(0, 0, game.config.width, game.config.height)
        this.cameras.main.setBounds(0, 0, game.config.width, game.config.height)
        this.cameras.main.startFollow(this.bus)

        this.physics.world.enable(this.bus)
        this.bus.body.collideWorldBounds = true

        //Initializing Timer Mechanic

        this.initialTime = 300
        this.timerText = this.add.text(50, 16, "Time: " + this.initialTime, { fontSize: '32px', fill: '#000000'})
        this.timedEvent = this.time.addEvent({
            delay: 1000,
            callback: this.countDown,
            callbackScope: this,
            loop: true,
        })

        var audios = ['moveit', 'pullover']
        this.time.addEvent({
            delay: 15000,
            loop: true,
            callback: function () {
                var randomKey = Phaser.Math.RND.pick(audios)
                this.sound.play(randomKey)
            },
            callbackScope: this
        })
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.background.tilePositionY -= 2
        if (cursors.left.isDown) {
            this.bus.body.velocity.x -= carVelocity;
        }
        else if (cursors.right.isDown) {
            this.bus.body.velocity.x += carVelocity;
        }
    }

    countDown() {

        const minutes = Math.floor(this.initialTime / 60)
        const seconds = this.initialTime % 60;
        
        this.timerText.setText(`Time Remaining ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)

        this.initialTime = this.initialTime - 1

        if (this.initialTime < 0) {
            this.scene.start('GameOverScene')
        }
    }
}