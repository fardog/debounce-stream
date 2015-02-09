# stream-debounce

Debounces a stream.

[![Build Status](http://img.shields.io/travis/fardog/stream-debounce/master.svg?style=flat)](https://travis-ci.org/fardog/stream-debounce)
[![npm install](http://img.shields.io/npm/dm/stream-debounce.svg?style=flat)](https://www.npmjs.org/package/stream-debounce)


## Example

```javascript
var events = require('dom-delegation-stream')
  , values = require('dom-value-object-stream')
  , debounce = require('stream-debounce')

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

## License

MIT. See [LICENSE](./LICENSE) for details.
