var test = require('tape')
  , through = require('through')
  , debounce = require('./index')

test('debounces a stream', function(t) {
  t.plan(1)

  var testStream = countStream(5, 100)
    , last

  testStream.pipe(debounce(300)).on('data', check)

  testStream.on('done', function() {
    last = Date.now()
  })

  function check() {
    var now = Date.now()

    t.ok(approximately(now - last, 300, 10))
  }
})

test('can be set immediate', function(t) {
  t.plan(1)

  var testStream = countStream(5, 100)
    , firstPass = true
    , last = Date.now()

  testStream.pipe(debounce(300, true)).on('data', check)

  function check() {
    var now = Date.now()

    if(firstPass) {
      t.ok(approximately(now - last, 100, 10))
      firstPass = false

      return
    }

    t.fail()
  }
})

function countStream(total, _ms) {
  var stream = through()
    , ms = _ms || 50
    , count = 0
    , interval

  stream.cancel = cancel

  interval = setTimeout(emit, ms)

  return stream

  function emit() {
    stream.queue(Math.random())
    ++count

    if(count < total) {
      interval = setTimeout(emit, ms)
    }
    else {
      stream.emit('done')
    }
  }

  function cancel() {
    clearTimeout(interval)
  }
}

function approximately(number, compare, skew) {
  var lower = compare - skew
    , upper = compare + skew

  return lower < number && number < upper
}
