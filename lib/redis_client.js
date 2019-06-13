const events = require('events');
const redis = require('redis');

class RedisClient extends events.EventEmitter {
  constructor(redisConfig) {
    super();
    this.redisConfig = redisConfig;
    const opt = { db: this.redisConfig.db || 0, auth_pass: this.redisConfig.pass };
    this.redisClient = redis.createClient(this.redisConfig.port, this.redisConfig.host, opt);
    this.redisClient.on('error', err => super.emit('error', err));
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this.redisClient.get(key, (err, response) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(response);
      });
    });
  }


  set(key, val) {
    val = typeof val === 'string' ? val : JSON.stringify(val);
    return new Promise((resolve, reject) => {
      this.redisClient.set(key, val, (err, response) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(response);
      });
    });
  }

  /* key, val, expire 过期秒 */
  setex(key, expire, val) {
    val = typeof val === 'string' ? val : JSON.stringify(val);
    return new Promise((resolve, reject) => {
      this.redisClient.setex(key, expire, val, (err, response) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(response);
      });
    });
  }

  hget(name, key) {
    return new Promise((resolve, reject) => {
      this.redisClient.hget(name, key, (err, response) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(response);
      });
    });
  }

  hset(name, key, val) {
    val = typeof val === 'string' ? val : JSON.stringify(val);
    return new Promise((resolve, reject) => {
      this.redisClient.hset(name, key, val, (err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }

  hdel(name, key) {
    return new Promise((resolve, reject) => {
      this.redisClient.hdel(name, key, (err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }

  hgetall(name) {
    return new Promise((resolve, reject) => {
      this.redisClient.hgetall(name, (err, response) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(response);
      });
    });
  }

  hexists(name, key) {
    return new Promise((resolve, reject) => {
      this.redisClient.hexists(name, key, (err, response) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(response);
      });
    });
  }

  zadd(key, score, val) {
    return new Promise((resolve, reject) => {
      this.redisClient.zadd(key, score, val, (err, response) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(response);
      });
    });
  }

  hmset(hashKey, obj) {
    return new Promise((resolve, reject) => {
      this.redisClient.hmset(hashKey, obj, (err, response) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(response);
      });
    });
  }

  hmget(hashKey, fields) {
    return new Promise((resolve, reject) => {
      this.redisClient.hmget(hashKey, fields, (err, response) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(response);
      });
    });
  }

}

module.exports = RedisClient;
