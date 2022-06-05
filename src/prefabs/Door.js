class Door extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, nextScene, keyCount) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.nextScene = nextScene;
        scene.add.existing(this);
        this.collected = keyCount;
        this.touch = true;
    }
    update() {
        if (this.scene.player.x < this.x + this.width &&
            this.scene.player.x + this.scene.player.width > this.x &&
            this.scene.player.y < this.y + this.height &&
            this.scene.player.height + this.scene.player.y > this.y &&
            this.touch) {
                if(this.collected == 0) {
                    this.touch = false;
                    this.scene.sound.play('sfx_door');
                    this.scene.mainCamera.fadeOut(1000);
                    this.scene.player.canMove = false;
                    this.scene.time.delayedCall(1000, () => {
                        this.scene.scene.start(this.nextScene);
                    }, null, this);
                }
                else {
                    this.touch = false;
                    this.scene.mainCamera.fadeOut(800);
                    this.scene.player.canMove = false;
                    this.scene.time.delayedCall(800, () => {
                        this.scene.scene.restart();
                    }, null, this);
                }
            }
    }
}