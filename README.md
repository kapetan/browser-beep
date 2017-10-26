# browser-beep

Beeping sound in browser using Web Audio API.

    npm install browser-beep

## Usage

The constructor accepts an options object with keys `context` (`AudioContext` instance), `frequency` (frequency in Hz) and `interval` (interval between multiple beeps).

```javascript
var beep = require('browser-beep')({ frequency: 830 })

// Number of times to beep
beep(2)
```
