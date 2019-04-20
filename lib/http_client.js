
const request = require('superagent');

class HttpClient {

  // [getUrl](path) {
  //   return `${this.https ? 'https' : 'http'}://${this.host}:${this.port}/${path}`;
  // }

  post(url, data, timeout = 3000) {

    return request
      .post(url)
      .send(data)
      .type('json')
      .timeout(timeout)
      .then((res) => {
        if (res.error || res.status !== 200) {
          throw res ? res.error : '';
        }
        return res.text;
      });
  }

  get(url, timeout = 3000) {

    return request
      .get(url)
      .timeout(timeout)
      .then((res) => {
        if (res.error || res.status !== 200) {
          throw res ? res.error : '';
        }
        return res.text;
      });
  }
}

module.exports = HttpClient;
