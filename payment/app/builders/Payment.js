/* Importação de Builders */
const PaymentInformationBuilder = require("@builders/PaymentInformation");
const BuyerBuilder = require("@builders/Buyer");
const ClientBuilder = require("@builders/Client");

class Payment {
  build(payment) {
    /* Montamos a seção Client */
    this.client = new ClientBuilder().setId(payment.idClient).build();

    /* Montamos a seção Buyer */
    this.buyer = new BuyerBuilder()
      .setName(payment.nameBuyer)
      .setEmail(payment.emailBuyer)
      .setCpf(payment.cpfBuyer)
      .build();

    /* Montamos a seção PaymentInformation */
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
