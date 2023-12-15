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
        this.load.spritesheet('explosion', './assets/Images/explosion3.png', {frameWidth: 125, frameHeight: 125, startFrame: 0, endFrame: 6});

        this.load.image('rain', './assets/Images/rain.png')
    }

    create() {
        //Create scrolling background
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bkg').setOrigin(0)
        bgs = 2
        
        //Create bus sprite and change the hitbox
        this.bus = this.physics.add.sprite(game.config.width / 2 + game.config.width*.15, game.config.height - game.config.height*.3, 'bus').setOrigin(0.5, 0.5)
        this.bus.setSize(50, 100)
        //Create player sprite and change the hitbox
        this.player = this.physics.add.sprite(game.config.width / 2 + game.config.width*.15, game.config.height - game.config.height*.1, 'car').setOrigin(0.5, 0.5)
        this.player.setSize(50, 100)

        //Setting up game logic and world bounds
        this.player.destroyed = false
        this.physics.world.setBounds(230, 0, 530, game.config.height)
        this.bus.setCollideWorldBounds(true)
        this.player.setCollideWorldBounds(true)

        //Initializing Timer Mechanic

        this.initialTime = 60
        this.timerText = this.add.text(50, 16, "Time Remaining ", { fontSize: '32px', fill: '#000000'})
        this.timedEvent = this.time.addEvent({
            delay: 1000,
            callback: this.countDown,
            callbackScope: this,
            loop: true,
        })

        //Creating audio which plays every couple of seconds
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

        //Create animation for collision
        this.anims.remove('explode')
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 6, first: 0 }),
            frameRate: 15
        });

        // Function to start the rain
        function startRain() {
            emitter.start();
        }

        // Function to stop the rain
        function stopRain() {
            emitter.stop();
        }

        //Create function which makes it rain on an interval
        const rainInterval = setInterval(() => {
            startRain();
            // Stop the rain after 5 seconds
            setTimeout(stopRain, 5000);
        }, 15000);

        //Create partical emitter
        const emitter = this.add.particles(0, 0, 'rain', {
            x: 0,
            y: 0,
            emitZone: {
                source: new Phaser.Geom.Rectangle(0, -150, game.config.width, game.config.height),
                type: 'random',
                quantity: 70
            },
            speedY: { min: 50, max: 70 },
            accelerationY: { random: [15, 25] },
            accelerationX: { random: [15, 25] },
            lifespan: { min: 8000, max: 10000 },
            scale: { random: [0.25, 0.75] },
            gravityY: 125,
            frequency: 10,
            blendMode: 'ADD'
        });

        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        //Background scroll
        this.background.tilePositionY -= bgs

        //Player movement logic
        if (!this.player.destroyed) {
            if (cursors.left.isDown) {
                this.player.setVelocityX(-80);
            }
            else if (cursors.right.isDown) {
                this.player.setVelocityX(80);
            }
            else if (cursors.up.isDown) {
                this.player.setVelocityY(-80)
            }
            else if (cursors.down.isDown) {
                this.player.setVelocityY(80)
            }
            
            if (this.player.body.velocity.x > maxVelocity) {
                this.player.setVelocityX(maxVelocity);
            } else if (this.player.body.velocity.x < -maxVelocity) {
                this.player.setVelocityX(-maxVelocity);
            }

            //Simple AI which causes the bus to block the driver
            this.physics.moveToObject(this.bus, this.player, 110)
    
            // Move the bus with a constant speed
            if (this.busMovingUp) {
                this.bus.setVelocityY(-75); // Move up
            } else {
                this.bus.setVelocityY(75);  // Move down
            }
    
            // Check if the bus is near the top or bottom of the scene and make the bus move forward or backwards
            if (this.bus.y < 150) {
                this.busMovingUp = false;
            } else if (this.bus.y > 320) {
                this.busMovingUp = true;
            }

            //Collision handling
            this.physics.world.collide(this.player, this.bus, this.handleCollision, null, this)
        }
        
        //Win condition
        if (this.player.y < this.bus.y - 100) {
            this.time.delayedCall(250, () => { this.scene.start('GameOverWinScene') })
        }
    }

    //Timer function which is another way to lose
    countDown() {

        const minutes = Math.floor(this.initialTime / 60)
        const seconds = this.initialTime % 60;
        
        this.timerText.setText(`Time Remaining ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)

        this.initialTime = this.initialTime - 1

        if (this.initialTime < 0) {
            this.scene.start('GameOverLoseScene')
        }
    }
    
    //Collision detection function
    handleCollision() {
        this.player.destroyed = true;
        bgs = 0
        this.bus.setVelocityY(0)
        this.bus.setVelocityX(0)
        this.player.setVelocityY(0)
        this.player.setVelocityX(0)
        //Shakes camera and plays animation
        this.cameras.main.shake(2500, 0.0075);
        let boom = this.add.sprite(this.player.x, this.player.y - 40, 'explosion').setOrigin(0.5, 0.5);
        boom.anims.play('explode');
        
        this.time.delayedCall(1500, () => { this.scene.start('GameOverLoseScene'); });
    }
}
