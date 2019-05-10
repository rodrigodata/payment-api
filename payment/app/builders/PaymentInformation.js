/* Importação de Models */
const PaymentType = require("@models/payment_type/PaymentType");
const PaymentInformation = require("@models/payment_information/PaymentInformation");

/* Importação de Builders */
const CardBuilder = require("@builders/Card");

class PaymentInformationBuilder {
  setAmount(amount) {
    this._amount = amount;
    return this;
  }
  setType(type) {
    this._type = type;
    return this;
  }
  setCardIfNotBoleto(card) {
    /* Garantimos que apenas vamos enviar as informações de cartão de crédito se o tipo de pagamento for != boleto. */
    if (!this.isBoleto) {
      this._card = new CardBuilder()
        .setHolderName(card.holderName)
        .setNumber(card.number)
        .setExpirationDate(card.expirationDate)
        .setCvv(card.cvv)
        .build();
    }

    return this;
  }

  build() {
    return new PaymentInformation(this);
  }

  /* getters */
  get type() {
    return this._type;
  }

  get card() {
    return this._card;
  }

  get amount() {
    return this._amount;
  }

  get isBoleto() {
    return this._type == PaymentType.BOLETO;
  }
}

module.exports = PaymentInformationBuilder;
