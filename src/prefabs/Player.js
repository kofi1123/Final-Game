class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.walkTime = 0;
        this.jumped = false;
        this.moveAnim = false;
        this.canAirDash = true;
        scene.add.existing(this);
        console.log(this);
    
        this.anims.create({
            key: 'playerRun',
            frames: this.anims.generateFrameNumbers('playerRun', {frames: [0, 1]}),
            frameRate: 10,
            repeat: -1
        });



    }
    update() {

        if(!(this.jumped) && Phaser.Input.Keyboard.JustDown(keySPACE) && (this.body.blocked.down)) {
            this.setVelocityY(-500);
            this.scene.sound.play('sfx_jump');
            this.setTexture('playerRise');
            this.jumped = true;
            this.moveAnim = false;
            this.anims.stop();  

            //this.emitter.setPosition(this.x, this.y);
            //this.emitter.explode();     
        }
        else if(this.jumped && keySPACE.isDown && keySPACE.getDuration() <= 250 && !(this.body.blocked.down)) {
            this.setTexture('playerRise');
            this.setVelocityY(-500);
            this.anims.stop(); 
        }
        else if(this.jumped && (!(keySPACE.isDown) || keySPACE.getDuration() > 350)){
            this.jumped = false;
            this.setTexture('playerFall');
            this.moveAnim = false;
        }
        else if(this.jumped && this.body.blocked.down){
            this.jumped = false;
            if(keyRIGHT.isDown || keyLEFT.isDown) {
                this.anims.play('playerRun');
            }
        }

        if(!this.body.blocked.down && Phaser.Input.Keyboard.JustDown(keyD) && this.canAirDash){
            if(!this.flipX){
                this.setVelocityX(/*this.body.velocity.x+*/500);
                console.log("airDash +");
            } else {
                this.setVelocityX(/*this.body.velocity.x*/-500);
                console.log("airDash -");
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

        
        //console.log(keySPACE.getDuration());
        if(this.body.blocked.down){
            this.canAirDash = true;
        }
        if(!this.canAirDash){
            this.setTexture('playerDash');
        }
        //console.log("x Velocity = " + this.body.velocity.x + " y Velocity = " + this.body.velocity.y);
    }
}