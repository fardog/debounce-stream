var test = require('tape')
var through = require('through')
var debounce = require('./index')

test('debounces a stream', function (t) {
  t.plan(1)

  var testStream = countStream(5, 100)
  var last

  testStream.pipe(debounce(300)).on('data', check)

  testStream.on('done', function () {
    last = Date.now()
  })

  function check () {
    var now = Date.now()

    t.ok(approximately(now - last, 300, 20))
  }
})

test('can be set immediate', function (t) {
  t.plan(1)

  var testStream = countStream(5, 100)
  var firstPass = true
  var last = Date.now()

  testStream.pipe(debounce(300, true)).on('data', check)

  function check () {
    var now = Date.now()

    if (firstPass) {
      t.ok(approximately(now - last, 100, 20))
      firstPass = false

      return
    }

    t.fail()
  }
})

function countStream (total, _ms) {
  var stream = through()
  var ms = _ms || 50
  var count = 0
  var interval

  stream.cancel = cancel

  interval = setTimeout(emit, ms)

  return stream

  function emit () {
    stream.queue(Math.random())
    ++count

    if (count < total) {
      interval = setTimeout(emit, ms)
    } else {
      stream.emit('done')
    }
  }

  function cancel () {
    clearTimeout(interval)
  }
}

function approximately (number, compare, skew) {
  var lower = compare - skew
  var upper = compare + skew

  return lower < number && number < upper
}
