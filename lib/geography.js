
// const os = require('os');
// const isWin = os.platform().indexOf('win') !== -1;

let geography = require('./geography_js');
// if (!geography && isWin) {
//   geography = require('./geography_js');
// }
// if (!geography && !isWin) {
//   try {
//     geography = require('../build/Release/geography.node');
//   } catch (ex) {
//     console.error(ex.message);
//     geography = require('./geography_js');
//   }
// }

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
