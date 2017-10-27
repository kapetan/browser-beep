var FREQUENCY = 440
var INTERVAL = 250
var RAMP_VALUE = 0.00001
var RAMP_DURATION = 1

module.exports = function (options) {
  if (!options) options = {}
  var context = options.context || new window.AudioContext()
  var frequency = options.frequency || FREQUENCY
  var interval = options.interval || INTERVAL

  var play = function () {
    var currentTime = context.currentTime
    var osc = context.createOscillator()
    var gain = context.createGain()

    osc.connect(gain)
    gain.connect(context.destination)

    gain.gain.setValueAtTime(gain.gain.value, currentTime)
    gain.gain.exponentialRampToValueAtTime(RAMP_VALUE, currentTime + RAMP_DURATION)

    osc.onended = function () {
      gain.disconnect(context.destination)
      osc.disconnect(gain)
    }

    osc.type = 'sine'
    osc.frequency.value = frequency
    osc.start(currentTime)
    osc.stop(currentTime + RAMP_DURATION)
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
