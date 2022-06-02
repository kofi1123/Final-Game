class Room2 extends Phaser.Scene {
    constructor () {
        super("room2");
    }
    preload () {
        //Sprites
        this.load.image('tile', './assets/images/Tile.png');
        this.load.image('player', './assets/images/Player.png');
        this.load.image('playerHead', './assets/images/playerHead.png');
        this.load.image('playerRise', './assets/images/playerRise.png');
        this.load.image('playerFall', './assets/images/playerFall.png');
        this.load.image('door', './assets/images/door.png');
        this.load.image('spike', './assets/images/spike.png');

        //Animation
        this.load.spritesheet('playerRun', './assets/animations/playerWalk.png', {frameWidth: 32, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet('playerHeadMove', './assets/animations/playerHeadMove.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 3});

        //Particles
        this.load.image('grayPart', 'assets/images/particle.png');

        //Audio
        this.load.audio('sfx_jump', './assets/sfx/sfx_jump.ogg');
        this.load.audio('sfx_walk', './assets/sfx/sfx_walk.ogg');
        
    }
    create() {
        this.pixelSize = 32;
        this.padding = 16;
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        
        this.playerEmitter = this.add.particles('grayPart').createEmitter({
            x: 400,
            y: 300,
            speed: { min: -800, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0 },
            //blendMode: 'SCREEN',
            //active: false,
            lifespan: 500,
            frequency: -1,
            quantity: 50
        }); 

        this.player = new Player(this, 100, 200, 'player', this.playerEmitter).setOrigin(0,0);
        //this.playerHead = new playerHead(this, 200, 600, 'playHead', this.playerEmitter).setOrigin(0,0);
        let playerGroup = this.physics.add.group([this.player/*, this.playerHead*/]);
        this.player.setFriction(1);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(false).setGravityY(2000);
        this.landGroup = this.physics.add.group();
        this.spikeGroup = this.physics.add.group();
        new Block(this, -32 , -32, 'tile', undefined, 50, 22, true, this.landGroup);
        new Block(this,  0 * this.pixelSize, 10 * this.pixelSize, 'tile', undefined, 4, 10, false, this.landGroup);
        new Block(this,  11 * this.pixelSize, 10 * this.pixelSize, 'tile', undefined, 1, 10, false, this.landGroup);
        new Block(this,  19 * this.pixelSize, 10 * this.pixelSize, 'tile', undefined, 1, 10, false, this.landGroup);
        new Block(this,  27 * this.pixelSize, 10 * this.pixelSize, 'tile', undefined, 1, 10, false, this.landGroup);
        new Block(this,  35 * this.pixelSize, 10 * this.pixelSize, 'tile', undefined, 1, 10, false, this.landGroup);
        new Block(this,  43 * this.pixelSize, 10 * this.pixelSize, 'tile', undefined, 1, 10, false, this.landGroup);
        new Block(this, 4 * this.pixelSize, 19 * this.pixelSize, 'spike', undefined, 7, 1, false, this.spikeGroup);
        new Block(this, 12 * this.pixelSize, 19 * this.pixelSize, 'spike', undefined, 7, 1, false, this.spikeGroup);
        new Block(this, 20 * this.pixelSize, 19 * this.pixelSize, 'spike', undefined, 7, 1, false, this.spikeGroup);
        new Block(this, 28 * this.pixelSize, 19 * this.pixelSize, 'spike', undefined, 7, 1, false, this.spikeGroup);
        new Block(this, 36 * this.pixelSize, 19 * this.pixelSize, 'spike', undefined, 7, 1, false, this.spikeGroup);
        this.door1 = new Door(this, 46 * this.pixelSize, 17 * this.pixelSize, 'door', undefined, 'room3', 2).setOrigin(0,0);
        this.key = new Key(this, 15 * this.pixelSize, 7 * this.pixelSize, 'key', undefined, this.door1).setOrigin(0,0);
        this.key2 = new Key(this, 31 * this.pixelSize, 7 * this.pixelSize, 'key', undefined, this.door1).setOrigin(0,0);
        for (let child of this.landGroup.getChildren()) {
            child.setImmovable(true).setFriction(1);
        }
        for (let child of this.spikeGroup.getChildren()) {
            child.setImmovable(true).setFriction(1);
        }
        this.physics.add.collider(playerGroup, this.landGroup, (p,l) => {
            if (  p.body.touching.down == true  ) {
                this.player.jumpCount = jumpCount;
                this.player.isJumping = false;
            }
        });
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
    update() {
        this.key.update();
        this.key2.update();
        this.door1.update();
        this.player.update();
        //this.playerHead.update();
    }
    
    checkCollisionDoor(door) {
        if (this.player.x < door.x + door.width &&
            this.player.x + this.player.width > door.x &&
            this.player.y < door.y + door.height &&
            this.player.height + this.player.y > door.y) {
                return true;
            }
        else {
            return false;
        }
    }
}