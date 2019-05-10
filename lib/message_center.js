const events = require('events');
const redis = require('redis');

class MessageCenter extends events.EventEmitter {
  constructor(redisConfig) {
    super();
    this.redisConfig = redisConfig;
    this.messageHandlers = {};
    const opt = { db: this.redisConfig.db || 0, auth_pass: this.redisConfig.pass };
    this.redisClient = redis.createClient(this.redisConfig.port, this.redisConfig.host, opt);
    this.redisClient.on('error', err => super.emit('error', err));

    this.redisClient.on('message', (topic, message) => {

      const topicHandlers = this.messageHandlers[topic];
      if (!topicHandlers || topicHandlers.length === 0) {
        return;
      }
      topicHandlers.forEach((handler) => {
        handler.handle(topic, message);
      });
    });

    this.pubRedisClient = redis.createClient(this.redisConfig.port, this.redisConfig.host, opt);
    this.pubRedisClient.on('error', err => super.emit('error', err));
  }

  addMessageHandler(topic, handler) {
    let topicHandlers = this.messageHandlers[topic];
    if (!topicHandlers) {
      topicHandlers = [];
      this.messageHandlers[topic] = topicHandlers;
      this.redisClient.subscribe(topic);
    }
    topicHandlers.push(handler);
  }

  publish(topic, message) {
    if (!topic || !message) {
      throw new Error('topic or message can not empty');
    }

    if (typeof message !== 'string') {
      message = JSON.stringify(message);
    }

    return new Promise((resolve, reject) => {
      this.pubRedisClient.publish(topic, message, (err, response) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(response);
      });
    });
  }

  push(queue, message) {
    if (!queue || !message) {
      throw new Error('queue or message can not empty');
    }

    if (typeof message !== 'string') {
      message = JSON.stringify(message);
    }

    return new Promise((resolve, reject) => {
      this.pubRedisClient.rpush(queue, message, (err, response) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(response);
      });
    });
  }

  pop(queue) {
    return new Promise((resolve, reject) => {
      this.pubRedisClient.lpop(queue, (err, response) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(response);
      });
    });
  }
}

module.exports = MessageCenter;
