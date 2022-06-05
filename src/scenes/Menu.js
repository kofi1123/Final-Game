class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
    }
    preload() {
        this.load.audio('mus_bgm', './assets/sfx/mus_bgm.ogg');
        this.load.image('menu_background', './assets/images/menuBackground.png');
        this.load.image('whiteTile', './assets/images/whiteTile.png');
        this.load.image('player', './assets/images/Player.png');
        this.load.image('playerHead', './assets/images/playerHead.png');
        this.load.image('playerRise', './assets/images/playerRise.png');
        this.load.image('playerFall', './assets/images/playerFall.png');
        this.load.image('playerDash', './assets/images/playerDash.png');
        this.load.spritesheet('playerRun', './assets/animations/playerWalk.png', {frameWidth: 32, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet('playerHeadMove', './assets/animations/playerHeadMove.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 3});
        this.load.audio('sfx_jump', './assets/sfx/sfx_jump2.ogg');
        this.load.audio('sfx_walk', './assets/sfx/sfx_walk.ogg');
        this.load.audio('sfx_dash', './assets/sfx/sfx_dash.ogg');
        this.load.image('grayPart', 'assets/images/particle.png');
        this.load.audio('sfx_door', './assets/sfx/sfx_door.ogg');
        this.load.image('door', './assets/images/door.png');
    }
    create(){
        this.pixelSize = 32;
        this.add.image(0, 0, 'menu_background').setOrigin(0, 0);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.door1 = new Door(this,  27* this.pixelSize, 16 * this.pixelSize, 'door', undefined, 'tutorial', 0).setOrigin(0,0);
        this.player = new Player(this, 640/2, 510, 'player', undefined).setOrigin(0,0);
        let playerGroup = this.physics.add.group(this.player);
        this.player.setFriction(0);
        this.player.setCollideWorldBounds(true).setGravityY(2000);
        this.landGroup = this.physics.add.group();
        new Block(this, -2 * this.pixelSize, 19 * this.pixelSize, 'whiteTile', undefined, 35, 1, false, this.landGroup);
        this.physics.add.collider(playerGroup, this.landGroup);
        for (let child of this.landGroup.getChildren()) {
            child.setImmovable(true).setFriction(1);
        }
        this.idleTween = this.tweens.add({
            targets: this.player ,
            targets: this.playerHead,
            scaleX: (0.9, 1.1),
            scaleY: (1.1, 0.9),
            duration: 1000,
            repeat: -1,
            yoyo: true
        });
        this.time.delayedCall(800, () => {
            this.player.canMove = true; 
        }, null, this);
        //Background music
        music = this.sound.add('mus_bgm', {loop: true});
        music.play();
        music.volume -= 0.9;
        this.mainCamera = this.cameras.main;
    }
    update(time, delta) {
        this.player.update(time, delta);
        this.door1.update();
    }
}