# debounce-stream

Debounces a stream.

[![Build Status](http://img.shields.io/travis/fardog/debounce-stream/master.svg?style=flat)](https://travis-ci.org/fardog/debounce-stream)
[![npm install](http://img.shields.io/npm/dm/debounce-stream.svg?style=flat)](https://www.npmjs.org/package/debounce-stream)


## Example

```javascript
var events = require('dom-delegation-stream')
  , values = require('dom-value-object-stream')
  , debounce = require('debounce-stream')

events(document.querySelector('[rel=inputs]'), 'input')
  .pipe(values()) // values is a stream that progressively updates on user input
  .pipe(debounce(500)) // emit only after a pause of 500 ms
  .on('data', function(data) {
    console.log(data) // the data after a user has stopped typing for 500 ms
  })
```

## API

- `debounce([milliseconds] [, immediate])` - Create a new debounce duplex stream
    - `milliseconds` - Integer. The number of milliseconds to debounce the
      stream. Defaults to `100`
    - `immediate` - Boolean. If `true`, the debounced function will call
      immediately, rather than at the end of input. Default is `false`.

Returns a duplex stream that accepts values on one end, and emits the debounced
values on the other.

## Notes

This module which was previously known as `stream-debounce` is now known as
`debounce-stream`. Thanks to [RangerMauve][rangermauve] for allowing this
module to take over that name! The version was bumped to v2.0.0 for the name
change, and to ensure compatibility for users of the old version.

## License

MIT. See [LICENSE](./LICENSE) for details.

[rangermauve]: https://github.com/RangerMauve
