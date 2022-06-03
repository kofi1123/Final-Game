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
        this.jumpBufferTime = 170;
        this.jumpBufferCounter = this.jumpBufferTime;
        this.spaceTime = 0;
        scene.add.existing(this);
    
        //Animations
        this.anims.create({
            key: 'playerRun',
            frames: this.anims.generateFrameNumbers('playerRun', {frames: [0, 1]}),
            frameRate: 10,
            repeat: -1
        });

        //Particles
        this.jumpPart = this.scene.add.particles('grayPart').createEmitter({
            x: 400,
            y: 300,
            speed: { min: -180, max: 180 },
            angle: { min: 180, max: 360 },
            scale: { start: 0.25, end: 0 } ,
            depth: -10,
            //blendMode: 'SCREEN',
            //active: false,
             lifespan: 400,
            frequency: -1,
            quantity: 5
        }); 
        this.jumpPart.setAlpha(0.5);

        this.walkPart = this.scene.add.particles('grayPart').createEmitter({
            x: 400,
            y: 300,
            speed: { min: -180, max: 180 },
            angle: { min: 180, max: 360 },
            scale: { start: 0.25, end: 0 } ,
            depth: -10,
            //blendMode: 'SCREEN',
            //active: false,
             lifespan: 300,
            frequency: -1,
            quantity: 3
        }); 
        this.walkPart.setAlpha(0.3);

        this.rightDashPart = this.scene.add.particles('grayPart').createEmitter({
            x: 400,
            y: 300,
            speed: { min: 30, max: 400 },
            angle: { min: 170, max: 190 },
            scale: { start: 0.25, end: 0 } ,
            depth: -10,
            //blendMode: 'SCREEN',
            //active: false,
             lifespan: 500,
            frequency: -1,
            quantity: 12
        }); 
        this.rightDashPart.setAlpha(0.7);

        this.leftDashPart = this.scene.add.particles('grayPart').createEmitter({
            x: 400,
            y: 300,
            speed: { min: -30, max: -400 },
            angle: { min: 10, max: -10 },
            scale: { start: 0.25, end: 0 } ,
            depth: -10,
            //blendMode: 'SCREEN',
            //active: false,
             lifespan: 500,
            frequency: -1,
            quantity: 12
        }); 
        this.leftDashPart.setAlpha(0.7);

    }
    update(time, delta) {
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

            this.jumpPart.setPosition(this.x, this.y + 64);
            this.jumpPart.explode();     
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
            this.scene.sound.play('sfx_dash');
            if(!this.flipX){
                this.rightDashPart.setPosition(this.x + 16, this.y + 16);
                this.rightDashPart.explode();
                if (this.body.velocity.y < 0) {
                    this.setVelocityX(500);
                }
                else {
                    this.setVelocity(500, 0);
                } 
            } else {
                this.leftDashPart.setPosition(this.x + 16, this.y + 16);
                this.leftDashPart.explode();  
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
            this.walkPart.setPosition(this.x, this.y + 64);
            this.walkPart.explode();  
        }

        if(this.body.blocked.down){
            this.canAirDash = true;
        }
        if(!this.canAirDash){
            this.setTexture('playerDash');
        }
    }
}