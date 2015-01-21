# stream-debounce

Debounces a stream.

[![Build Status](http://img.shields.io/travis/fardog/stream-debounce/master.svg?style=flat)](https://travis-ci.org/fardog/stream-debounce)
[![npm install](http://img.shields.io/npm/dm/stream-debounce.svg?style=flat)](https://www.npmjs.org/package/stream-debounce)


## Example

```javascript
var events = require('dom-event-stream')
  , values = require('dom-value-object-stream')
  , debounce = require('stream-debounce')

events(document.querySelector('[rel=inputs]'), 'input')
  .pipe(values()) // values is a stream that progressively updates on user input
  .pipe(debounce(500)) // only emit the latest value every 500 ms
  .on('data', function(data) {
    console.log(data) // {one: 'One', two: 'Two', three: 'Three'}
  })
```

## API

- `debounce([milliseconds] [, immediate])` - Create a new debounce duplex stream
    - `milliseconds` - Integer. The number of milliseconds to debounce the
      stream. Defaults to `100`
    - `immediate` - Boolean. If `true`, the debounced function will call
      immediately, rather than at the end of input.

Returns a duplex stream that accepts values on one end, and emits the debounced
values on the other.

## Events

- Emits a `data` event as any good stream should, with a key/value object, where
  the keys are the element names, and the value is the value of that element.

## License

MIT. See [LICENSE](./LICENSE) for details.
