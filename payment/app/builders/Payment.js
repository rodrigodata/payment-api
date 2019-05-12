/* Import Builders */
const PaymentInformationBuilder = require("@builders/PaymentInformation");
const BuyerBuilder = require("@builders/Buyer");
const ClientBuilder = require("@builders/Client");

class Payment {
  /**
   *
   * @param {*} payment
   */
  build(payment) {
    /* Section Client */
    this.client = new ClientBuilder().setId(payment.idClient).build();

    /* Section Buyer */
    this.buyer = new BuyerBuilder()
      .setName(payment.nameBuyer)
      .setEmail(payment.emailBuyer)
      .setCpf(payment.cpfBuyer)
      .build();

    /* Section PaymentInformation */
    this.paymentInformation = new PaymentInformationBuilder()
      .setAmount(payment.amount)
      .setType(payment.type)
      .setBoletoNumber(payment.boletoNumber)
      .setCard(
        payment.cardInformation ? JSON.parse(payment.cardInformation) : {}
      )
      .setStatus()
      .build();

    return this;
  }
}

module.exports = Payment;
