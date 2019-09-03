const events = require('events');
const redis = require('redis');

class RedisPubClient extends events.EventEmitter {
  constructor(redisConfig) {
    super();
    this.redisConfig = redisConfig;
    const opt = { db: this.redisConfig.db || 0, auth_pass: this.redisConfig.pass };
    this.redisClient = redis.createClient(this.redisConfig.port, this.redisConfig.host, opt);
    this.redisClient.on('ready', err => super.emit('ready', err));
    this.redisClient.on('error', err => super.emit('error', err));
  }

  publish(channel, message) {
    return new Promise((resolve, reject) => {
      this.redisClient.publish(channel, message, (err, response) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(response);
      });
    });
  }

  end() {
    this.redisClient.end(true);
  }
}

module.exports = RedisPubClient;
