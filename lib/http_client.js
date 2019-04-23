
const request = require('superagent');

const getUrl = Symbol('getUrl');

class HttpClient {

  constructor(url) {
    this.url = url;
  }

  [getUrl](path) {
    return `${this.url}/${path}`;
  }

  async post(path, data, timeout = 3000) {
    try {
      const res = await request
        .post(this[getUrl](path))
        .send(data)
        .type('json')
        .timeout(timeout);

      if (!res.ok) {
        return res.text;
      }

      if (res.headers['content-type'].indexOf('text') === 0) {
        return res.text;
      }

      return res.body;
    } catch (err) {
      const error = new Error(err.message);
      error.status = err.status || 1000;
      error.status = err.status > 1000 ? err.status : 1000;
      error.path = path;
      throw error;
    }
  }

  async get(path, timeout = 3000) {
    try {
      const res = await request
        .get(this[getUrl](path))
        .timeout(timeout);

      if (!res.ok) {
        return res.text;
      }

      if (res.headers['content-type'].indexOf('text') === 0) {
        return res.text;
      }
      return res.body;
    } catch (err) {
      const error = new Error(err.message);
      error.status = err.status || 1000;
      error.status = err.status > 1000 ? err.status : 1000;
      error.path = path;
      throw error;
    }
  }
}

module.exports = HttpClient;
