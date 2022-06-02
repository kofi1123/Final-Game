class Door extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, nextScene, keyCount) {
        super(scene, x, y, texture, frame);
        this.nextScene = nextScene;
        scene.add.existing(this);
        this.collected = keyCount;
    }
    update() {
        if (this.scene.player.x < this.x + this.width &&
            this.scene.player.x + this.scene.player.width > this.x &&
            this.scene.player.y < this.y + this.height &&
            this.scene.player.height + this.scene.player.y > this.y) {
                if(this.collected == 0) this.scene.scene.start(this.nextScene);
                else this.scene.scene.restart();
            }
    }
}