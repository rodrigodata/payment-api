/* Importação de Builders */
const PaymentInformationBuilder = require("@builders/PaymentInformation");
const BuyerBuilder = require("@builders/Buyer");
const ClientBuilder = require("@builders/Client");

class Payment {
  build(payment) {
    /* Montamos a seção Client */
    this.client = new ClientBuilder().setId(payment.client.id).build();

    /* Montamos a seção Buyer */
    this.buyer = new BuyerBuilder()
      .setName(payment.buyer.name)
      .setEmail(payment.buyer.email)
      .setCpf(payment.buyer.cpf)
      .build();

    /* Montamos a seção PaymentInformation */
    this.paymentInformation = new PaymentInformationBuilder()
      .setAmount(payment.paymentInformation.amount)
      .setType(payment.paymentInformation.type)
      .setCardIfNotBoleto(payment.paymentInformation.card)
      .build();

    return this;
  }
}

module.exports = Payment;
