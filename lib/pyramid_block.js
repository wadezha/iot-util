
const commFunc = require('./comm_func');

class PyramidBlock {
  constructor(rect = { minX: -180, minY: -180, maxX: 180, maxY: 180 }) {
    // china rect (72, 3, 136, 67)
    this.rect = rect;
  }

  static encryptBlockID(x, y, level) {
    return commFunc.leftShift(commFunc.leftShift(x, 28) + y, 8) + level;
  }

  static decodeBlockID(blockId) {
    const result = {};
    result.level = blockId & 0xFF;
    blockId = commFunc.rightShift(blockId, 8);
    result.y = blockId & 0xFFFFFFF;
    blockId = commFunc.rightShift(blockId, 28);
    result.x = blockId;
    return result;
  }

  static getParentID(blockId) {
    const result = PyramidBlock.decodeBlockID(blockId);
    const x = (result.x >> 1);
    const y = (result.y >> 1);
    const level = result.level - 1;
    return PyramidBlock.encryptBlockID(x, y, level);
  }

  static getLevel(blockId) {
    return blockId & 0xFF;
  }

  static getChildBlock(blockId) {
    const result = PyramidBlock.decodeBlockID(blockId);
    const x = result.x * 2;
    const y = result.y * 2;
    const level = result.level + 1;
    const childBlocks = {};
    childBlocks.leftTop = PyramidBlock.encryptBlockID(x, y + 1, level);
    childBlocks.rightTop = PyramidBlock.encryptBlockID(x + 1, y + 1, level);
    childBlocks.leftBottom = PyramidBlock.encryptBlockID(x, y, level);
    childBlocks.rightBottom = PyramidBlock.encryptBlockID(x + 1, y, level);
    return childBlocks;
  }

  getBlockSize(level) {
    const result = {};
    result.sizeX = (this.rect.maxX - this.rect.minX) / (1 << level);
    result.sizeY = (this.rect.maxY - this.rect.minY) / (1 << level);
    return result;
  }

  getInBlockID(lon, lat, level) {
    if (lon < this.rect.minX || lat < this.rect.minY || lon > this.rect.maxX || lat > this.rect.maxY) {
      return 0;
    }
    const size = this.getBlockSize(level);
    const x = Math.floor((lon - this.rect.minX) / size.sizeX);
    const y = Math.floor((lat - this.rect.minY) / size.sizeY);
    return PyramidBlock.encryptBlockID(x, y, level);
  }

  getBlockRect(blockId) {
    const result = PyramidBlock.decodeBlockID(blockId);
    const size = this.getBlockSize(result.level);
    const rect = {};
    rect.minX = result.x * size.sizeX + this.rect.minX;
    rect.minY = result.y * size.sizeY + this.rect.minY;
    rect.maxX = rect.minX + size.sizeX;
    rect.maxY = rect.minY + size.sizeY;
    return rect;
  }

  getLeftBottomVector(blockId) {
    const rect = this.getBlockRect(blockId);
    return { lon: rect.minX, lat: rect.minY };
  }

  getCrossedBlock(rect, level) {
    const size = this.getBlockSize(level);
    const ltBlockId = this.getInBlockID(rect.minX, rect.maxY, level);
    const rbBlockId = this.getInBlockID(rect.maxX, rect.minY, level);
    const ltRect = this.getBlockRect(ltBlockId);
    const rbRect = this.getBlockRect(rbBlockId);
    const minX = ltRect.minX;
    const maxX = rbRect.maxX > this.rect.maxX ? this.rect.maxX : rbRect.maxX;
    const minY = rbRect.minY;
    const maxY = ltRect.maxY > this.rect.maxY ? this.rect.maxY : ltRect.maxY;
    const blockIds = [];
    for (let x = minX; x < maxX; x += size.sizeX) {
      for (let y = minY; y < maxY; y += size.sizeY) {
        const blockId = this.getInBlockID(x, y, level);
        blockIds.push(blockId);
      }
    }
    return blockIds;
  }
}

module.exports = PyramidBlock;
