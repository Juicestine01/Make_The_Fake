// Justin Xu
// Make The Fake
//The 5 phaser componenets which I used were a physics system, particle emitter,
//camera control from the collision, an explosion animation, and a timer

let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Menu, Instruction, Play, GameOverWin, GameOverLose, Credits]
}

let game = new Phaser.Game(config);
let cursors
let countdown = 0
let bgs = 2
let maxVelocity = 125