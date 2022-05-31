class playerHead extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.walkTime = 0;
        this.jumped = false;
        scene.add.existing(this);
        console.log(this);
        

        this.anims.create({
            key: 'playerHeadMove',
            frames: this.anims.generateFrameNumbers('playerHeadMove', {frames: [0, 1, 2, 3]}),
            frameRate: 7.5,
            repeat: -1
        });

        this.anims.play('playerHeadMove');



    }
    update() {
        if(keyRIGHT.isDown) {
            this.setVelocityX(200);
            this.walkTime++;
            this.flipX = false;
            if(Phaser.Input.Keyboard.JustDown(keyRIGHT) && this.body.blocked.down) {
                this.moveAnim = true;
                this.anims.play('playerHeadMove');
            }
        }
        else if(keyLEFT.isDown) {
            this.setVelocityX(-200);
            this.walkTime++;
            this.flipX = true;
            if(Phaser.Input.Keyboard.JustDown(keyLEFT) && this.body.blocked.down) {
                this.moveAnim = true;
                this.anims.play('playerHeadMove');
            }
        }
        else {
            this.setVelocityX(0);
            this.walkTime = 0; 
            if((this.body.blocked.down)){
               this.setTexture('playerHead');
               this.moveAnim = false;
            }
        }

        if(this.walkTime % 20 == 1 && this.body.blocked.down){
            this.scene.sound.play('sfx_walk');
        }
        //console.log(keySPACE.getDuration());
    }
}