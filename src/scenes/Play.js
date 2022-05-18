class Play extends Phaser.Scene {
    constructor () {
        super("play");
    }
    preload () {
        //Visual
        this.load.image('tile', './assets/images/Tile.png');
        this.load.image('player', './assets/images/Player.png');

        //Audio
        this.load.audio('sfx_jump', './assets/sfx/sfx_jump.ogg');
        this.load.audio('sfx_walk', './assets/sfx/sfx_walk.ogg');
        
    }
    create() {
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        //this.player = this.physics.add.image(200, 100, 'player');
        //this.player = this.physics.add.sprite(200, 600, 'player');
        this.player = new Player(this, 200, 600, 'player')
        let playerGroup = this.physics.add.group([this.player]);
        this.player.setCollideWorldBounds(true).setGravityY(2000);
        

        this.enemy1 = this.physics.add.image(400, 300, 'tile');
        let enemyGroup = this.physics.add.group([this.enemy1]);
        this.enemy1.setVelocity(100, 100).setGravity(100).setCollideWorldBounds(true);
        this.physics.add.collider(playerGroup, enemyGroup, (p,e) => {
            console.log('Player collided with enemy: ', e);
        });
        this.mainCamera = this.cameras.main;
        this.mainCamera.startFollow(this.player);
        this.mainCamera.setDeadzone(200,200);
        //this.player.setVelocity(100,200);
        /*this.player.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true).setGravityY(200);*/
    }
    update() {
        this.player.update();

    }
}