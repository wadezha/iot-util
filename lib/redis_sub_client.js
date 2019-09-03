const events = require('events');
const redis = require('redis');

class RedisSubClient extends events.EventEmitter {
  constructor(redisConfig) {
    super();
    this.redisConfig = redisConfig;
    const opt = { db: this.redisConfig.db || 0, auth_pass: this.redisConfig.pass };
    this.redisClient = redis.createClient(this.redisConfig.port, this.redisConfig.host, opt);
    this.redisClient.on('error', err => super.emit('error', err));
    this.redisClient.on('message', (channel, message) => super.emit('message', channel, message));
  }

  subscribe(channel) {
    this.redisClient.subscribe(channel);
  }

  unsubscribe() {
    this.redisClient.unsubscribe();
  }

  end() {
    this.redisClient.end(true);
  }
}

module.exports = RedisSubClient;
