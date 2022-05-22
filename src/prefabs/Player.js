class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.walkTime = 0;
        scene.add.existing(this);
        console.log(this);
        this.jumpCount = jumpCount;
        this.extend = false;
        this.isJumping = false;
    }
    update() {

        if(Phaser.Input.Keyboard.JustDown(keySPACE) && this.jumpCount > 0) {
            this.setVelocityY(-500);
            this.scene.sound.play('sfx_jump');
            console.log("jump");
            this.extend = true;
            this.isJumping = true;
        }
        else if (this.extend && keySPACE.isDown && keySPACE.getDuration() <= 250 && this.jumpCount > 0) {
            this.setVelocityY(-500);
            console.log("jump2")
        }
        else if (Phaser.Input.Keyboard.JustUp(keySPACE)) {
            console.log("this");
            this.jumpCount -= 1;
        }
        if (this.jumpCount <= 0) this.extend = false;
        if(keyRIGHT.isDown) {
            this.setVelocityX(200);
            this.walkTime++;
            this.flipX = false;
        }
        else if(keyLEFT.isDown) {
            this.setVelocityX(-200);
            this.walkTime++;
            this.flipX = true;
        }
        else {
            this.setVelocityX(0);
            this.walkTime = 0;
        }

        if(this.walkTime % 20 == 1 && !this.isJumping){
            this.scene.sound.play('sfx_walk');
        }
        //console.log(keySPACE.getDuration());
    }
}