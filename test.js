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
var test = require('tape');
var dump = require('./');

function makeBuffer(len, first) {
  first = first || 0;
  var u8 = new Uint8Array(len);
  for (var i = 0; i < len; ++i) {
    u8[i] = i + first;
  }

  return u8;
}

test('dump not a buffer', function(t) {
  var buf = makeBuffer(0);
  var r = dump(null);

  var lines = [
    '<not a buffer>'
  ];

  t.equal(r, lines.join('\n'))
  t.end();
});

test('dump empty buffer', function(t) {
  var buf = makeBuffer(0);
  var r = dump(buf);

  var lines = [
    '<empty buffer>'
  ];

  t.equal(r, lines.join('\n'))
  t.end();
});

test('dump 1 byte', function(t) {
  var buf = makeBuffer(1);
  var r = dump(buf);

  var lines = [
    '00000000: 00                                       .'
  ];

  t.equal(r, lines.join('\n'))
  t.end();
});

test('dump 3 bytes', function(t) {
  var buf = makeBuffer(3);
  var r = dump(buf);

  var lines = [
    '00000000: 0001 02                                  ...'
  ];

  t.equal(r, lines.join('\n'))
  t.end();
});

test('dump 8 bytes', function(t) {
  var buf = makeBuffer(8);
  var r = dump(buf);

  var lines = [
    '00000000: 0001 0203 0405 0607                      ........'
  ];

  t.equal(r, lines.join('\n'))
  t.end();
});

test('dump 16 bytes', function(t) {
  var buf = makeBuffer(16);
  var r = dump(buf);

  var lines = [
    '00000000: 0001 0203 0405 0607 0809 0a0b 0c0d 0e0f  ................'
  ];

  t.equal(r, lines.join('\n'))
  t.end();
});

test('dump 17 bytes', function(t) {
  var buf = makeBuffer(17);
  var r = dump(buf);

  var lines = [
    '00000000: 0001 0203 0405 0607 0809 0a0b 0c0d 0e0f  ................',
    '00000010: 10                                       .'
  ];

  t.equal(r, lines.join('\n'))
  t.end();
});

test('dump 18 bytes', function(t) {
  var buf = makeBuffer(18);
  var r = dump(buf);

  var lines = [
    '00000000: 0001 0203 0405 0607 0809 0a0b 0c0d 0e0f  ................',
    '00000010: 1011                                     ..'
  ];

  t.equal(r, lines.join('\n'))
  t.end();
});

test('dump 455 bytes', function(t) {
  var buf = makeBuffer(455);
  var r = dump(buf);

  var lines = [
    '00000000: 0001 0203 0405 0607 0809 0a0b 0c0d 0e0f  ................',
    '00000010: 1011 1213 1415 1617 1819 1a1b 1c1d 1e1f  ................',
    '00000020: 2021 2223 2425 2627 2829 2a2b 2c2d 2e2f   !"#$%&\'()*+,-./',
    '00000030: 3031 3233 3435 3637 3839 3a3b 3c3d 3e3f  0123456789:;<=>?',
    '00000040: 4041 4243 4445 4647 4849 4a4b 4c4d 4e4f  @ABCDEFGHIJKLMNO',
    '00000050: 5051 5253 5455 5657 5859 5a5b 5c5d 5e5f  PQRSTUVWXYZ[\\]^_',
    '00000060: 6061 6263 6465 6667 6869 6a6b 6c6d 6e6f  `abcdefghijklmno',
    '00000070: 7071 7273 7475 7677 7879 7a7b 7c7d 7e7f  pqrstuvwxyz{|}~.',
    '00000080: 8081 8283 8485 8687 8889 8a8b 8c8d 8e8f  ................',
    '00000090: 9091 9293 9495 9697 9899 9a9b 9c9d 9e9f  ................',
    '000000a0: a0a1 a2a3 a4a5 a6a7 a8a9 aaab acad aeaf  .¡¢£¤¥¦§¨©ª«¬­®¯',
    '000000b0: b0b1 b2b3 b4b5 b6b7 b8b9 babb bcbd bebf  °±²³´µ¶·¸¹º»¼½¾¿',
    '000000c0: c0c1 c2c3 c4c5 c6c7 c8c9 cacb cccd cecf  ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏ',
    '000000d0: d0d1 d2d3 d4d5 d6d7 d8d9 dadb dcdd dedf  ÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞß',
    '000000e0: e0e1 e2e3 e4e5 e6e7 e8e9 eaeb eced eeef  àáâãäåæçèéêëìíîï',
    '000000f0: f0f1 f2f3 f4f5 f6f7 f8f9 fafb fcfd feff  ðñòóôõö÷øùúûüýþÿ',
    '00000100: 0001 0203 0405 0607 0809 0a0b 0c0d 0e0f  ................',
    '00000110: 1011 1213 1415 1617 1819 1a1b 1c1d 1e1f  ................',
    '00000120: 2021 2223 2425 2627 2829 2a2b 2c2d 2e2f   !"#$%&\'()*+,-./',
    '00000130: 3031 3233 3435 3637 3839 3a3b 3c3d 3e3f  0123456789:;<=>?',
    '00000140: 4041 4243 4445 4647 4849 4a4b 4c4d 4e4f  @ABCDEFGHIJKLMNO',
    '00000150: 5051 5253 5455 5657 5859 5a5b 5c5d 5e5f  PQRSTUVWXYZ[\\]^_',
    '00000160: 6061 6263 6465 6667 6869 6a6b 6c6d 6e6f  `abcdefghijklmno',
    '00000170: 7071 7273 7475 7677 7879 7a7b 7c7d 7e7f  pqrstuvwxyz{|}~.',
    '00000180: 8081 8283 8485 8687 8889 8a8b 8c8d 8e8f  ................',
    '00000190: 9091 9293 9495 9697 9899 9a9b 9c9d 9e9f  ................',
    '000001a0: a0a1 a2a3 a4a5 a6a7 a8a9 aaab acad aeaf  .¡¢£¤¥¦§¨©ª«¬­®¯',
    '000001b0: b0b1 b2b3 b4b5 b6b7 b8b9 babb bcbd bebf  °±²³´µ¶·¸¹º»¼½¾¿',
    '000001c0: c0c1 c2c3 c4c5 c6                        ÀÁÂÃÄÅÆ'
  ];

  t.equal(r, lines.join('\n'))
  t.end();
});

test('node buffer', function(t) {
  var b = new Buffer('hello world 0123');
  var r = dump(b);

  var lines = [
    '00000000: 6865 6c6c 6f20 776f 726c 6420 3031 3233  hello world 0123'
  ];

  t.equal(r, lines.join('\n'))
  t.end();
});
