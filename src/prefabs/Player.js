class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.walkTime = 0;
        this.jumped = false;
        this.moveAnim = false;
        this.canAirDash = true;
        this.coyoteTime = 200;
        this.coyoteTimeCounter = this.coyoteTime;
        this.jumpBufferTime = 150;
        this.jumpBufferCounter = this.jumpBufferTime;
        this.spaceTime = 0;
        scene.add.existing(this);
    
        this.anims.create({
            key: 'playerRun',
            frames: this.anims.generateFrameNumbers('playerRun', {frames: [0, 1]}),
            frameRate: 10,
            repeat: -1
        });

    }
    update(time, delta) {
        console.log(this.jumpBufferCounter)
        if (this.body.blocked.down) {
            this.coyoteTimeCounter = this.coyoteTime;
        }
        else {
            this.coyoteTimeCounter -= delta;
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.jumpBufferCounter = this.jumpBufferTime;
        }
        else {
            this.jumpBufferCounter -= delta;
        }
        if(!(this.jumped) && this.jumpBufferCounter > 0 && this.coyoteTimeCounter > 0) {
            this.setVelocityY(-500);
            this.jumpBufferCounter = 0;
            this.scene.sound.play('sfx_jump');
            this.setTexture('playerRise');
            this.jumped = true;
            this.moveAnim = false;
            this.anims.stop();  

            //this.emitter.setPosition(this.x, this.y);
            //this.emitter.explode();     
        }
        else if(this.jumped && keySPACE.isDown && this.spaceTime <= 250 && !(this.body.blocked.down)) {
            this.spaceTime += delta;
            this.setTexture('playerRise');
            this.setVelocityY(-500);
            this.anims.stop();
            this.coyoteTimeCounter = 0;
        }
        else if(this.jumped && (!(keySPACE.isDown) || this.spaceTime > 350)){
            this.jumped = false;
            this.setTexture('playerFall');
            this.moveAnim = false;
            this.spaceTime = 0;
        }
        /*else if(this.jumped && this.body.blocked.down){
            this.jumped = false;
            console.log("here")
            if(keyRIGHT.isDown || keyLEFT.isDown) {
                this.anims.play('playerRun');
            }
        }*/

        if(!this.body.blocked.down && Phaser.Input.Keyboard.JustDown(keyD) && this.canAirDash){
            if(!this.flipX){
                if (this.body.velocity.y < 0) {
                    this.setVelocityX(500);
                }
                else this.setVelocity(500, 0);
            } else {
                if (this.body.velocity.y < 0) this.setVelocityX(-500);
                else this.setVelocity(-500, 0);
            }
            this.canAirDash = false;
            
        }

        if(keyRIGHT.isDown) {
            if(this.body.velocity.x < 200){
                this.setVelocityX(200);
            }
            this.walkTime++;
            this.flipX = false;
            if(!(this.moveAnim) && this.body.blocked.down) {
                this.moveAnim = true;
                this.anims.play('playerRun');
            }
        }
        else if(keyLEFT.isDown) {
            if(this.body.velocity.x > -200){
                this.setVelocityX(-200);
            }
            this.walkTime++;
            this.flipX = true;
            if(!(this.moveAnim) && this.body.blocked.down) {
                this.moveAnim = true;
                this.anims.play('playerRun');
            }
        }
        else {
            this.walkTime = 0; 
            if((this.body.blocked.down)){
                this.setVelocityX(0);
                this.setTexture('player');
                this.moveAnim = false;
            }
        }

        if(this.walkTime % 20 == 1 && this.body.blocked.down){
            this.scene.sound.play('sfx_walk');
        }

        if(this.body.blocked.down){
            this.canAirDash = true;
        }
        if(!this.canAirDash){
            this.setTexture('playerDash');
        }
    }
}