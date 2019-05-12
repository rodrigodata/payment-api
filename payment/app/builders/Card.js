/* Import Models */
const Card = require("@models/card/Card");

class CardBuilder {
  /**
   *
   * @param {*} holderName
   */
  setHolderName(holderName) {
    this._holderName = holderName;
    return this;
  }
  /**
   *
   * @param {*} number
   */
  setNumber(number) {
    this._number = number;
    return this;
  }
  /**
   *
   * @param {*} expirationDate
   */
  setExpirationDate(expirationDate) {
    this._expirationDate = expirationDate;
    return this;
  }
  /**
   *
   * @param {*} cvv
   */
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
