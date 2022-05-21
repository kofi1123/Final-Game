class Block {
    constructor(scene, x, y, texture, frame, width, height, isFilled) {
        this.block = []
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                if (!isFilled || i == width - 1 || j == height - 1 || i == 0 || j == 0)
                    this.block.push(new Tile (scene, x + (i * 32), y + (j * 32), texture, frame).setOrigin(0,0));
            }
        }
    }
}