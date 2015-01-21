var through = require('through')
  , duplexer = require('duplexer')
  , debounce = require('debounce')

module.exports = debounceStream

function debounceStream(_ms, immediate) {
  var ms = _ms || 100
    , input = through(debounce(write, ms, immediate))
    , output = through()

  return duplexer(input, output)

  function write(data) {
    output.queue(data)
  }
}
