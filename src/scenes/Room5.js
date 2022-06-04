class Room5 extends Phaser.Scene {
    constructor () {
        super("room5");
    }
    preload () {
        //Sprites
        this.load.image('whiteTile', './assets/images/whiteTile.png');
        this.load.image('redTile', './assets/images/redTile.png');
        this.load.image('player', './assets/images/Player.png');
        this.load.image('playerHead', './assets/images/playerHead.png');
        this.load.image('playerRise', './assets/images/playerRise.png');
        this.load.image('playerFall', './assets/images/playerFall.png');
        this.load.image('playerDash', './assets/images/playerDash.png');
        this.load.image('door', './assets/images/door.png');
        this.load.image('key', './assets/images/key.png');
        this.load.image('whiteSpike', './assets/images/whiteSpike.png');
        this.load.image('redSpike', './assets/images/redSpike.png');
        this.load.image('lava', './assets/images/lava.png');

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


        this.text = this.add.text(2 * this.pixelSize, 2 * this.pixelSize, 'Use Dashing to Gain Momentum', {fontSize: '25px'}).setOrigin(0,0).setScrollFactor(0);
        this.text = this.add.text(2 * this.pixelSize, 2 * this.pixelSize, 'Use Dashing to Gain Momentum', {fontSize: '25px'}).setOrigin(0,0);
        this.player = new Player(this, 2 * this.pixelSize, 7 * this.pixelSize, 'player', undefined/*, this.playerEmitter*/).setOrigin(0,0);
        //this.playerHead = new playerHead(this, 200, 600, 'playHead', this.playerEmitter).setOrigin(0,0);
        let playerGroup = this.physics.add.group([this.player/*, this.playerHead*/]);
        this.player.setFriction(0);
        this.player.setCollideWorldBounds(false).setGravityY(2000);
        this.landGroup = this.physics.add.group();
        this.spikeGroup = this.physics.add.group();
        this.bgRight = new Block(this, -32 , -32, 'whiteTile', undefined, 180, 12, true, this.landGroup);
        new Block(this, 0 * this.pixelSize, 9 * this.pixelSize, 'whiteTile', undefined, 8, 1, false, this.landGroup);
        new Block(this, 20 * this.pixelSize, 9 * this.pixelSize, 'whiteTile', undefined, 7, 1, false, this.landGroup);
        new Block(this, 45 * this.pixelSize, 9 * this.pixelSize, 'whiteTile', undefined, 7, 1, false, this.landGroup);
        new Block(this, 78 * this.pixelSize, 9 * this.pixelSize, 'whiteTile', undefined, 7, 1, false, this.landGroup);
        new Block(this, 121 * this.pixelSize, 9 * this.pixelSize, 'whiteTile', undefined, 8, 1, false, this.landGroup);
        new Block(this, 169 * this.pixelSize, 9 * this.pixelSize, 'whiteTile', undefined, 9, 1, false, this.landGroup);
        new Block(this, 8 * this.pixelSize, 9 * this.pixelSize, 'redSpike', undefined, 12, 1, false, this.spikeGroup);
        new Block(this, 27 * this.pixelSize, 9 * this.pixelSize, 'redSpike', undefined, 18, 1, false, this.spikeGroup);
        new Block(this, 52 * this.pixelSize, 9 * this.pixelSize, 'redSpike', undefined, 26, 1, false, this.spikeGroup);
        new Block(this, 85 * this.pixelSize, 9 * this.pixelSize, 'redSpike', undefined, 36, 1, false, this.spikeGroup);
        new Block(this, 129 * this.pixelSize, 9 * this.pixelSize, 'redSpike', undefined, 40, 1, false, this.spikeGroup);
        this.door1 = new Door(this, 176 * this.pixelSize, 6 * this.pixelSize, 'door', undefined, 'room6', 2).setOrigin(0,0);
        this.key = new Key(this, 30 * this.pixelSize, 4 * this.pixelSize, 'key', undefined, this.door1).setOrigin(0,0);
        this.key2 = new Key(this, 137 * this.pixelSize, 4 * this.pixelSize, 'key', undefined, this.door1).setOrigin(0,0);
        this.canvasBg = this.add.rectangle(1.5 * this.pixelSize, 1.5 * this.pixelSize , 5 * this.pixelSize, 2 * this.pixelSize, 0x7d7d7d).setOrigin(0,0).setScrollFactor(0);
        this.canvas = this.add.sprite(2 * this.pixelSize, 2 * this.pixelSize, 'key').setOrigin(0, 0).setScrollFactor(0);
        this.canvasText = this.add.text(3 * this.pixelSize, 2 * this.pixelSize, ': 0/2', {fontSize: '32px'}).setOrigin(0,0).setScrollFactor(0);
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
        this.mainCamera.setBounds(-3 * this.pixelSize, -5 * this.pixelSize, 184 * this.pixelSize, 11 * this.pixelSize);
        //this.mainCamera.zoom = 2;
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
        this.canvasText.text = ': ' + (2 - this.door1.collected) + '/2';
        if (this.door1.collected == 0) {
            this.canvasBg.fillColor = 0x5ac947;
        }
        this.key.update();
        this.key2.update();
        this.door1.update();
        this.player.update(time, delta);
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        //this.playerHead.update();
    }
}