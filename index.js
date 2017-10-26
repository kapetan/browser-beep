var FREQUENCY = 440
var INTERVAL = 250
var RAMP_TIME = 0.00001
var RAMP_DURATION = 1

module.exports = function (options) {
  if (!options) options = {}
  var context = options.context || new window.AudioContext()
  var frequency = options.frequency || FREQUENCY
  var interval = options.interval || INTERVAL

  var play = function () {
    var osc = context.createOscillator()
    var gain = context.createGain()

    osc.type = 'sine'
    osc.frequency.value = frequency
    gain.gain.exponentialRampToValueAtTime(RAMP_TIME, context.currentTime + RAMP_DURATION)

    osc.connect(gain)
    gain.connect(context.destination)
    osc.start(0)
  }

  var beep = function (times) {
    if (!times) times = 1

    ;(function loop (i) {
      play()
      if (++i < times) setTimeout(loop, interval, i)
    })(0)
  }

  beep.destroy = function () {
    if (!options.context) context.close()
  }

  return beep
}
