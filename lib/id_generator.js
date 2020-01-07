const util = require('util');
const commFunc = require('./comm_func');

const tilNextMillis = Symbol('tilNextMillis');



/**
 * 雪花算法分布式唯一ID生成器
 * 每个机器号最高支持每秒64000（1000*2的6次方）个序列, 当秒序列不足时启用备份机器号, 若备份机器也不足时借用备份机器下一秒可用序列
 * JS的Number类型精度最高只有53bit，53 bits 趋势自增ID结构如下:
 * |00000000|00011111|11111111|11111111|11111111|11111111|11111111|11111111|
 * |-----------|##########41bit 毫秒秒级时间戳##########-------|-------------|
 * |------------------------------------------------6bit机器位|xxxxxx|------|
 * |-----------------------------------------------------6bit自增序列|xxxxxx|
 **/
/** 初始偏移时间戳 */
const TWEPOCH = 1484201323141;
/** 机器id所占位数 (6bit, 支持最大机器数 2^6 = 64)*/
const WORKERIDBITS = 6;
/** 机器标识最大值 63 */
const MAXWORKERID = -1 ^ (-1 << WORKERIDBITS);
/** 自增序列所占位数 (6bit, 支持最大每秒生成 2^6 = 64) */
const SEQUENCEBITS = 6;

/** 机器id偏移位数 */
const WORKERIDSHIFT = SEQUENCEBITS;
/** 自增序列偏移位数 12 */
const TIMESTAMPLEFTSHIFT = SEQUENCEBITS + WORKERIDBITS;
/** 自增序列最大值 63 */
const SEQUENCEMASK = -1 ^ (-1 << SEQUENCEBITS);

class IdGenerator {
  constructor(workerId) {
    if (workerId > MAXWORKERID || workerId < 0) {
      throw new Error(util.format("worker Id can't be greater than %d or less than 0", MAXWORKERID));
    }

    this.workerId = workerId;
    this.lastTimestamp = -1;
    this.sequence = 0;
  }

  nextId() {
    let timestamp = new Date().getTime();
    if (this.lastTimestamp === timestamp) {
      this.sequence = (this.sequence + 1) & SEQUENCEMASK;
      if (this.sequence === 0) {
        timestamp = this[tilNextMillis](this.lastTimestamp);
      }
    } else {
      this.sequence = 0;
    }
    if (timestamp < this.lastTimestamp) {
      throw new Error(util.format('Clock moved backwards. Refusing to generate id for %d milliseconds',
        this.lastTimestamp - timestamp));
    }

    this.lastTimestamp = timestamp;
    return commFunc.leftShift((timestamp - TWEPOCH), TIMESTAMPLEFTSHIFT) + (this.workerId << WORKERIDSHIFT) + this.sequence;
  }

  [tilNextMillis](lastTimestamp) {
    let timestamp = new Date().getTime();
    while (timestamp <= lastTimestamp) {
      timestamp = new Date().getTime();
    }
    return timestamp;
  }
}

module.exports = IdGenerator;
