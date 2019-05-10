const util = require('util');
const commFunc = require('./comm_func');

const tilNextMillis = Symbol('tilNextMillis');

const TWEPOCH = 1400485784045;
const WORKERIDBITS = 6;
const MAXWORKERID = -1 ^ (-1 << WORKERIDBITS);
const SEQUENCEBITS = 6;

const WORKERIDSHIFT = SEQUENCEBITS;
const TIMESTAMPLEFTSHIFT = SEQUENCEBITS + WORKERIDBITS;
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
