class Door extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, nextScene) {
        super(scene, x, y, texture, frame);
        this.nextScene = nextScene;
        scene.add.existing(this);
    }
    goNextScene() {
        this.scene.scene.start(this.nextScene);
    }
}