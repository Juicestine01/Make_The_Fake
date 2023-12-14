// Justin Xu
// Make The Fake

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
    scene: [ Menu, Instruction, Play, GameOver,]
}

let game = new Phaser.Game(config);
let cursors;
let countdown = 0;
let bgs = 2