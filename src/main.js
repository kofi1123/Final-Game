let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    backgroundColor: '#000000',
    scene: [Menu, Tutorial, Play, Room2, Room3, Room4, Room5],
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    physics: {
        default: 'arcade',
    }
};

let keyLEFT, keyRIGHT, keyR, keySPACE, keyD;
let borderUISize = config.height / 15;
let borderPadding = config.height / 7;
let game = new Phaser.Game(config);
let finalScore;