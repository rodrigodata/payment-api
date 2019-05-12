class PaymentInformation {
  /**
   *
   * @param {*} paymentInformation
   */
  constructor(paymentInformation) {
    this.amount = paymentInformation.amount;
    this.type = paymentInformation.type;
    this.status = paymentInformation.status;
    if (!paymentInformation.isBoleto) this.card = paymentInformation.card;
    if (paymentInformation.isBoleto)
      this.boletoNumber = paymentInformation.boletoNumber;
  }
}

module.exports = PaymentInformation;
