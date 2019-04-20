
const events = require('events');

class EventBus extends events.EventEmitter {
  constructor(name) {
    super();
    this.name = name;
  }
}

module.exports = EventBus;
