(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var beep = require('../')()

var beepOnceButton = document.getElementById('beep-1')
var beepTwiceButton = document.getElementById('beep-2')
var beepThriceButton = document.getElementById('beep-3')

beepOnceButton.onclick = function () {
  beep()
}

beepTwiceButton.onclick = function () {
  beep(2)
}

beepThriceButton.onclick = function () {
  beep(3)
}

},{"../":2}],2:[function(require,module,exports){
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

},{}]},{},[1]);
