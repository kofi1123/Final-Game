class Key extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, door) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.door = door;
        scene.add.existing(this);
        this.initY = this.y;
        this.time = 0;

        //Create Particles
        this.collectPart = this.scene.add.particles('bluePart').createEmitter({
            x: 400,
            y: 300,
            speed: { min: -500, max: 500 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.25, end: 0 } ,
            depth: -10,
            //blendMode: 'SCREEN',
            //active: false,
             lifespan: 350,
            frequency: -1,
            quantity: 50
        }); 
    }
    update() {
        if (this.scene.player.x < this.x + this.width &&
            this.scene.player.x + this.scene.player.width > this.x &&
            this.scene.player.y < this.y + this.height &&
            this.scene.player.height + this.scene.player.y > this.y &&
            this.visible) {
                this.door.collected -= 1;
                this.setVisible(false);
                this.scene.sound.play('sfx_collectible');
                this.collectPart.setPosition(this.x, this.y);
                this.collectPart.explode();
        }
        this.y = this.initY + Math.sin(this.time) * 4;
        this.time += 0.075;
    }
}