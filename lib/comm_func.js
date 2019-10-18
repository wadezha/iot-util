// const os = require('os');

let geography = require('./geography_js');

// const isWin = os.platform().indexOf('win') !== -1;
// if (isWin) {
//   geography = require('./geography_js');
// } else {
//   try {
//     geography = require('../build/Release/geography.node');
//   } catch (ex) {
//     console.error(ex.message);
//     geography = require('./geography_js');
//   }
// }

// 将leftNum转二进制，加bits个0（相当左移运算），再转回10进制
// Will be converted to binary leftNum, followed by bits' 0 (equivalent to the left shift operation), and then back to 10 decimal
exports.leftShift = function (leftNum, bits) {
  // return parseInt(('' + parseInt(leftNum).toString(2) + (new Array(bits + 1).join('0'))), 2);
  if (isWin) {
    return leftNum * (2 ** bits);
  }
  return geography.leftShift(leftNum, bits);
};

exports.rightShift = function (rightNum, bits) {
  if (isWin) {
    return Math.floor(rightNum / (2 ** bits));
  }
  return geography.rightShift(rightNum, bits);
};

// 下划线转换驼峰
exports.toCamelCase = function (str) {
  return str.replace(/_(\w)/g, (all, letter) => letter.toUpperCase());
};

exports.camelCaseObjectKeys = function (data) {
  if (!data && typeof data !== 'object') {
    return data;
  }

  const res = {};
  for (const [k, v] of Object.entries(data)) {
    res[exports.toCamelCase(k)] = v;
  }

  return res;
};
