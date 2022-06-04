class Tutorial extends Phaser.Scene {
    constructor () {
        super("tutorial");
    }
    preload () {
        //Sprites
        this.load.image('whiteTile', './assets/images/whiteTile.png');
        this.load.image('player', './assets/images/Player.png');
        this.load.image('playerHead', './assets/images/playerHead.png');
        this.load.image('playerRise', './assets/images/playerRise.png');
        this.load.image('playerFall', './assets/images/playerFall.png');
        this.load.image('playerDash', './assets/images/playerDash.png');
        this.load.image('door', './assets/images/door.png');
        this.load.image('key', './assets/images/key.png');
        this.load.image('redSpike', './assets/images/redSpike.png');

        //Animation
        this.load.spritesheet('playerRun', './assets/animations/playerWalk.png', {frameWidth: 32, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet('playerHeadMove', './assets/animations/playerHeadMove.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 3});

        //Particles
        this.load.image('grayPart', 'assets/images/particle.png');
        this.load.image('bluePart', 'assets/images/bluePart.png');

        //Audio
        this.load.audio('sfx_jump', './assets/sfx/sfx_jump2.ogg');
        this.load.audio('sfx_walk', './assets/sfx/sfx_walk.ogg');
        this.load.audio('sfx_dash', './assets/sfx/sfx_dash.ogg');
        this.load.audio('sfx_collectible', './assets/sfx/sfx_collectible.ogg');

        
        
    }
    create() {
        this.pixelSize = 32;
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.text1 = this.add.text(9.5 * this.pixelSize, 4 * this.pixelSize, 'Press Space to Jump', {fontSize: '25px'}).setOrigin(0.5);
        this.text2 = this.add.text(24.5 * this.pixelSize, 4 * this.pixelSize, 'Hold Space to Jump Longer', {fontSize: '25px'}).setOrigin(0.5);
        this.text3 = this.add.text(39.5 * this.pixelSize, 4 * this.pixelSize, 'Avoid Red Objects', {fontSize: '25px'}).setOrigin(0.5);
        this.text4 = this.add.text(54.5 * this.pixelSize, 4 * this.pixelSize, 'Press D in the Air to Dash', {fontSize: '25px'}).setOrigin(0.5);
        this.text5 = this.add.text(69.5 * this.pixelSize, 4 * this.pixelSize, 'Collect Keys to Open Door', {fontSize: '25px'}).setOrigin(0.5);
        this.player = new Player(this, 1 * this.pixelSize, 11 * this.pixelSize, 'player', undefined/*, this.playerEmitter*/).setOrigin(0,0);
        //this.playerHead = new playerHead(this, 200, 600, 'playHead', this.playerEmitter).setOrigin(0,0);
        let playerGroup = this.physics.add.group([this.player/*, this.playerHead*/]);
        this.player.setFriction(0);
        this.player.setCollideWorldBounds(false).setGravityY(2000);
        this.landGroup = this.physics.add.group();
        this.spikeGroup = this.physics.add.group();
        this.bgRight = new Block(this, -32 , -32, 'whiteTile', undefined, 80, 15, true, this.landGroup);
        new Block(this, 7 * this.pixelSize, 11 * this.pixelSize, 'whiteTile', undefined, 5, 2, false, this.landGroup);
        new Block(this, 22 * this.pixelSize, 9 * this.pixelSize, 'whiteTile', undefined, 5, 4, false, this.landGroup);
        new Block(this, 38 * this.pixelSize, 12 * this.pixelSize, 'redSpike', undefined, 3, 1, false, this.spikeGroup);
        new Block(this, 52 * this.pixelSize, 12 * this.pixelSize, 'redSpike', undefined, 5 , 1, false, this.spikeGroup);
        this.door1 = new Door(this, 76 * this.pixelSize, 10 * this.pixelSize, 'door', undefined, 'play', 1).setOrigin(0,0);
        this.key = new Key(this, 69.5 * this.pixelSize, 11 * this.pixelSize, 'key', undefined, this.door1).setOrigin(0,0);
        this.canvasBg = this.add.rectangle(1.5 * this.pixelSize, 1.5 * this.pixelSize , 5 * this.pixelSize, 2 * this.pixelSize, 0x7d7d7d).setOrigin(0,0).setScrollFactor(0);
        this.canvas = this.add.sprite(2 * this.pixelSize, 2 * this.pixelSize, 'key').setOrigin(0, 0).setScrollFactor(0);
        this.canvasText = this.add.text(3 * this.pixelSize, 2 * this.pixelSize, ': 0/1', {fontSize: '32px'}).setOrigin(0,0).setScrollFactor(0);
        for (let child of this.landGroup.getChildren()) {
            child.setImmovable(true).setFriction(1);
        }
        for (let child of this.spikeGroup.getChildren()) {
            child.setImmovable(true);
        }
        this.physics.add.collider(playerGroup, this.landGroup);
        this.physics.add.collider(playerGroup, this.spikeGroup, (p,s) => {
            this.scene.restart();
        });
        this.mainCamera = this.cameras.main;
        this.mainCamera.startFollow(this.player);
        this.mainCamera.setDeadzone(200,200);
        //Tweens
        this.idleTween = this.tweens.add({
            targets: this.player ,
            targets: this.playerHead,
            scaleX: (0.9, 1.1),
            scaleY: (1.1, 0.9),
            duration: 1000,
            repeat: -1,
            yoyo: true
        });
    }
    update(time, delta) {
        this.canvasText.text = ': ' + (1 - this.door1.collected) + '/1';
        if (this.player.x > (5 * this.pixelSize)) {
            this.text1.setAlpha((15 * this.pixelSize - this.player.x)/(10 * this.pixelSize));
        }
        if (this.player.x > (20 * this.pixelSize)) {
            this.text2.setAlpha((30 * this.pixelSize - this.player.x)/(10 * this.pixelSize));
        }
        if (this.player.x > (35 * this.pixelSize)) {
            this.text3.setAlpha((45 * this.pixelSize - this.player.x)/(10 * this.pixelSize));
        }
        if (this.player.x > (50 * this.pixelSize)) {
            this.text4.setAlpha((60 * this.pixelSize - this.player.x)/(10 * this.pixelSize));
        }
        if (this.player.x > (65 * this.pixelSize)) {
            this.text5.setAlpha((75 * this.pixelSize - this.player.x)/(10 * this.pixelSize));
        }
        if (this.door1.collected == 0) {
            this.canvasBg.fillColor = 0x5ac947;
        }
        this.key.update();
        this.door1.update();
        this.player.update(time, delta);
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        //this.playerHead.update();
    }
}