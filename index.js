// Copyright 2015 Sergii Iefremov
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

function padDigits(number, digits) {
  var n = number.toString(16);
  return Array(Math.max(digits - n.length + 1, 0)).join(0) + n;
}

function getChar(num) {
  if (num >= 32 && num <= 126 || num >= 161 && num <= 255) {
    return String.fromCharCode(num);
  }

  return '.';
}

function joinNumsAscii(s, ch) {
  var pad = 52 - s.length;
  if (pad > 0) {
    return s + Array(pad).join(' ') + ch;
  }

  return s + '  ' + ch;
}

module.exports = function(u8) {
  if (Object(u8) !== u8) {
    return '<not a buffer>';
  }

  var len = u8.length;
  var lines = [];
  var s = padDigits(0, 8) + ':';
  var ch = '';
  var c = 0;

  if (len === 0) {
    return '<empty buffer>';
  }

  for (var i = 0; i < len; ++i) {
    var num;

    if (u8.length <= i + 1) {
      num = u8[i];
      s += ' ' + padDigits(num, 2);
      ch += getChar(num);
    } else {
      num = (u8[i] << 8) | u8[i + 1];
      s += ' ' + padDigits(num, 4);
      ch += getChar(u8[i]) + getChar(u8[i + 1]);
      ++i;
    }

    if (++c >= 8) {
      lines.push(joinNumsAscii(s, ch));
      s = padDigits(lines.length * 16, 8) + ':';
      ch = '';
      c = 0;
    }
  }

  if (c > 0) {
    lines.push(joinNumsAscii(s, ch));
  }

  return lines.join('\n');
};
