let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    backgroundColor: '#000000',
    scene: [Menu, Play, Room2],
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    physics: {
        default: 'arcade',
    }
};

let keyUP, keyDOWN, keyLEFT, keyRIGHT, keyR, keySPACE, keyW, keyA, keyS, keyD;
let borderUISize = config.height / 15;
let borderPadding = config.height / 7;
let game = new Phaser.Game(config);
let finalScore;