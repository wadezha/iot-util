const events = require('events');
const amqp = require('amqp');

class AMQPClient extends events.EventEmitter {
  constructor(amqpConfig) {
    super();

    this.amqpClient = amqp.createConnection(amqpConfig);
    this.amqpClient.on('error', err => super.emit('error', err));
    this.amqpClient.on('ready', err => super.emit('ready', err));

    // Wait for connection to become established.
    connection.on('ready', function () {
      // Use the default 'amq.topic' exchange
      connection.queue('my-queue', function (q) {
        // Catch all messages
        q.bind('#');

        // Receive messages
        q.subscribe(function (message) {
          // Print messages to stdout
          console.log(message);
        });
      });
    });

  }

  queue(topic) {
    connection.publish("my-queue",{hello:'world'});
    return new Promise((resolve, reject) => {
      this.amqpClient.queue(topic, (err, response) => {
        if (err) {
          reject(err);
          return;
        }

        response.q.bind('#');

        resolve(response);
      });
    });
  }
}

module.exports = AMQPClient;
