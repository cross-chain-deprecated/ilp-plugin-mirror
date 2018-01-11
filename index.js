class Plugin {
  constructor (helpers, mirror) {
    this.helpers = helpers
    if (!mirror) {
      mirror = new Plugin(helpers, this)
    }
    this.mirror = mirror
    this.onceConnected = new Promise(resolve => { this.resolveOnceConnected = resolve })
  }
  getPeer () { return this.mirror } 

  connect () { this._connected = true; this.resolveOnceConnected() }
  disconnect () { this._connected = false }
  isConnected () { return this._connected }

  sendData (packet) { return this.mirror._dataHandler(packet) }
  sendMoney (packet) { return this.mirror._moneyHandler(packet) }
  registerDataHandler (handler) { this._dataHandler = handler }
  registerMoneyHandler (handler) { this._moneyHandler = handler }
}

Plugin.version = 2

module.exports = Plugin
