class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        scene.add.existing(this);
        console.log(this);
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.setVelocityY(-500);
            
            //console.log(this.scene.input.keyboard.checkDown(keyUP, 10000));
        }
        else if (keySPACE.isDown && keySPACE.getDuration() <= 300) {
            this.setVelocityY(-500);
        }
        else if (keySPACE.isUp) {
            this.setVelocityY(400);
        }
        if(keyRIGHT.isDown) {
            this.setVelocityX(200);
        }
        else if(keyLEFT.isDown) {
            this.setVelocityX(-200);
        }
        else {
            this.setVelocityX(0);
        }
        //console.log(keySPACE.getDuration());
    }
}