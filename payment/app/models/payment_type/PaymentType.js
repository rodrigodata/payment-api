/* Import Constants */
const { PAYMENT_TYPES } = require("@constants/App");

class PaymentType {
  constructor() {
    this.setTypes();
  }
  setTypes() {
    this._types = PAYMENT_TYPES;
    return this;
  }

  get types() {
    return this._types;
  }
}

module.exports = new PaymentType();
