const Card = require("@models/card/Card");

class CardBuilder {
  setHolderName(holderName) {
    this._holderName = holderName;
    return this;
  }
  setNumber(number) {
    this._number = number;
    return this;
  }
  setExpirationDate(expirationDate) {
    this._expirationDate = expirationDate;
    return this;
  }
  setCvv(cvv) {
    this._cvv = cvv;
    return this;
  }
  build() {
    return new Card(this);
  }

  get holderName() {
    return this._holderName;
  }

  get number() {
    return this._number;
  }

  get expirationDate() {
    return this._expirationDate;
  }

  get cvv() {
    return this._cvv;
  }
}

module.exports = CardBuilder;
