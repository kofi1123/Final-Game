class Play extends Phaser.Scene {
    constructor () {
        super("play");
    }
    preload () {
        //Visual
        this.load.image('tile', './assets/images/Tile.png');
        this.load.image('player', './assets/images/Player.png');
        this.load.image('door', './assets/images/door.png');

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
        
        this.player = new Player(this, 200, 600, 'player').setOrigin(0,0);
        let playerGroup = this.physics.add.group([this.player]);
        this.player.setFriction(1);
        this.player.setCollideWorldBounds(true).setGravityY(2000);
        this.bgRight = new Block(this, -32 , -32, 'tile', undefined, 32, 22, true);
        this.block1 = new Block(this, 320, 18 * this.pixelSize, 'tile', undefined, 5, 2, false);
        this.door1 = new Door(this, 28 * this.pixelSize, 17 * this.pixelSize, 'door', undefined, 'room2').setOrigin(0,0);
        this.enemyGroup = this.physics.add.group(this.block1.block);

        for (let child of this.enemyGroup.getChildren()) {
            child.setImmovable(true).setFriction(1);
        }
        this.physics.add.collider(playerGroup, this.enemyGroup, (p,e) => {});
        this.mainCamera = this.cameras.main;
        this.mainCamera.startFollow(this.player);
        this.mainCamera.setDeadzone(200,200);

        this.idleTween = this.tweens.add({
            targets: this.player,
            scaleX: (0.9, 1.1),
            scaleY: (1.1, 0.9),
            duration: 1000,
            repeat: -1,
            yoyo: true
        });
    }
    update() {
        if (this.checkCollisionDoor(this.door1)) {
            this.door1.goNextScene();
        }
        this.player.update();
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