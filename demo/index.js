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
