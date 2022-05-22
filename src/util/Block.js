class Block {
    constructor(scene, x, y, texture, frame, width, height, isHollow, landGroup) {
        this.block = []
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                if (!isHollow || i == width - 1 || j == height - 1 || i == 0 || j == 0) {
                    let newTile = new Tile (scene, x + (i * 32), y + (j * 32), texture, frame).setOrigin(0,0)
                    this.block.push(newTile);
                    landGroup.add(newTile);
                }
            }
        }
    }
}