class Tile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, isMovableX, isMovableY, range, speed) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.speed = speed;
        scene.add.existing(this);
    }
}