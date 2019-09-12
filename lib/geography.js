
const os = require('os');
let geography = require('./geography_js');

const isWin = os.platform().indexOf('win') !== -1;
if (!isWin) {
  geography = require('../build/Release/geography.node');
}

exports.convertBaiduToGps = function (lon, lat) {
  return geography.convertBaiduToGps(lon, lat);
};

exports.convertGpsToBaidu = function (lon, lat) {
  return geography.convertGpsToBaidu(lon, lat);
};

exports.convertGcjToGps = function (lon, lat) {
  return geography.convertGcjToGps(lon, lat);
};

exports.convertGpsToGcj = function (lon, lat) {
  return geography.convertGpsToGcj(lon, lat);
};

exports.distance = function (lon1, lat1, lon2, lat2) {
  return geography.distance(lon1, lat1, lon2, lat2);
};
