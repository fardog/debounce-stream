var through = require('through')
var duplexer = require('duplexer')
var debounce = require('debounce')

module.exports = debounceStream

function debounceStream (_ms, immediate) {
  var ms = _ms || 100
  var input = through(debounce(write, ms, immediate))
  var output = through()

  return duplexer(input, output)

  function write (data) {
    output.queue(data)
  }
}
