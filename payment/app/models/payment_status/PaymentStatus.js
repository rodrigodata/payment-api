/* Import Constants */
const { PAYMENT_STATUS } = require("@constants/App");

class PaymentStatus {
  constructor() {
    this.setStatus();
  }
  setStatus() {
    this._status = PAYMENT_STATUS;
    return this;
  }

  get status() {
    return this._status;
  }
}

module.exports = new PaymentStatus();
