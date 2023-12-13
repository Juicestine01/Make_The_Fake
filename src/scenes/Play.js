class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        this.load.image('bus', './assets/Images/finalbus.png')
        this.load.image('bkg', './assets/Images/finalbkg.png')
        this.load.image('deer', './assets/Images/deer.png')
        this.load.image('car', './assets/Images/NewWCar.png')
        this.load.audio('moveit', './assets/audio/CmonMoveIt.mp3')
        this.load.audio('pullover', './assets/audio/PullOver.mp3')
    }

    create() {
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bkg').setOrigin(0)
        this.bus = this.physics.add.sprite(game.config.width / 2 + game.config.width*.15, game.config.height - game.config.height*.3, 'bus')
        this.player = this.physics.add.sprite(game.config.width / 2 + game.config.width*.15, game.config.height - game.config.height*.1, 'car')
        this.physics.world.setBounds(200, 0, 560, game.config.height)
        this.physics.world.enable(this.bus)
        this.bus.body.collideWorldBounds = true

        this.gameOver = false


        this.obstacleGroup = this.physics.add.group()

        this.placeObstacles()

        this.physics.add.collider(this.player, this.obstacleGroup, this.handleCollision)

        //Initializing Timer Mechanic

        this.initialTime = 300
        this.timerText = this.add.text(50, 16, "Time Remaining ", { fontSize: '32px', fill: '#000000'})
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
            this.player.setVelocityX(-100);
        }
        else if (cursors.right.isDown) {
            this.player.setVelocityX(100);
        }
        else if (cursors.up.isDown) {
            this.player.setVelocityY(-100)
        }
        else if (cursors.down.isDown) {
            this.player.setVelocityY(100)
        }

        this.physics.moveToObject(this.bus, this.player, 100)

        // Move the bus with a constant speed
        if (this.busMovingUp) {
            this.bus.setVelocityY(-100) // Move up
        } else {
            this.bus.setVelocityY(100)  // Move down
        }

        // Check if the bus is near the top or bottom of the scene
        if (this.bus.y < 25) {
            this.busMovingUp = false
        } else if (this.bus.y > 320) {
            this.busMovingUp = true
        }
        else if (this.bus.y > this.player.y - 75) {
            this.busMovingUp = true
        }

        if (this.player.y < this.bus.y - 50) {
            this.time.delayedCall(1500, () => { this.scene.start('GameOverScene') })
        }
    }

    placeObstacles() {
        for (let i = 0; i < 5; i++) {
            const obstacle = this.obstacleGroup.create(
            Phaser.Math.Between(200, 760),
            'obstacle'
        )
        obstacle.setCollideWorldBounds(true)
        obstacle.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200,200))
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
    
    handleCollision() {
        this.gameOver = true
        this.time.delayedCall(1500, () => { this.scene.start('gameOverScene') })
    }
}
