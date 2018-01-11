const EventEmitter2 = require('eventemitter2')

class Plugin extends EventEmitter2 {
  constructor (opts, mirror) {
    super()
    if (!mirror) {
      mirror = new Plugin(opts, this)
    }
    this.mirror = mirror
    this.onceConnected = new Promise(resolve => { this.resolveOnceConnected = resolve })
  }

  connect () { this._connected = true; this.resolveOnceConnected(); this.emit('connect') }
  disconnect () { this._connected = false; this.emit('disconnect') }
  isConnected () { return this._connected }

  sendData (data) { return Promise.resolve(this.mirror._dataHandler && this.mirror._dataHandler(data)) }
  registerDataHandler (handler) { this._dataHandler = handler }
  deregisterDataHandler (handler) { delete this._dataHandler }

  sendMoney (amount) { return Promise.resolve(this.mirror._moneyHandler && this.mirror._moneyHandler(amount)) }
  registerMoneyHandler (handler) { this._moneyHandler = handler }
  deregisterMoneyHandler (handler) { delete this._moneyHandler }
}
Plugin.version = 2
module.exports = Plugin
