let config = {
    type: Phaser.CANVAS,
    width: 900,
    height: 700,
    backgroundColor: '#000000',
    scene: [Menu, Play/*, GameOver*/],
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    physics: {
        default: 'arcade',
    }
};

let keyUP, keyDOWN, keyLEFT, keyRIGHT, keyR, keySPACE;
let borderUISize = config.height / 15;
let borderPadding = config.height / 7;
let game = new Phaser.Game(config);
let finalScore;