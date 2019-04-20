
const log4js = require('log4js');

class Logger {
  constructor(loggerConfig, logSource) {
    this.logSource = logSource;
    log4js.configure(loggerConfig);
    this.logger = log4js.getLogger();
  }

  // ...args: key, logType, module, logContent
  trace(...args) {
    this.logger.trace('%s#%s#%s#%s#%s', this.logSource, ...args);
  }

  debug(...args) {
    this.logger.debug('%s#%s#%s#%s#%s', this.logSource, ...args);
  }

  info(...args) {
    this.logger.info('%s#%s#%s#%s#%s', this.logSource, ...args);
  }

  warn(...args) {
    this.logger.warn('%s#%s#%s#%s#%s', this.logSource, ...args);
  }

  error(...args) {
    this.logger.error('%s#%s#%s#%s#%s', this.logSource, ...args);
  }

  fatal(...args) {
    this.logger.fatal('%s#%s#%s#%s#%s', this.logSource, ...args);
  }
}

module.exports = Logger;
