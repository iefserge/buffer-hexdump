## SYNOPSIS

Buffer hexdump tool for browser and Node

## USAGE

```js
var dump = require('buffer-hexdump');

var buf = new Uint8Array([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]);
console.log(dump(buf));
// 00000000: 0102 0304 0506 0708 090a 0b0c 0d0e 0f10  ................
// 00000010: 1112                                     ..

var nodeBuf = new Buffer('hello world 0123');
console.log(dump(nodeBuf));
// 00000000: 6865 6c6c 6f20 776f 726c 6420 3031 3233  hello world 0123
```

##LICENSE

Apache License, Version 2.0
