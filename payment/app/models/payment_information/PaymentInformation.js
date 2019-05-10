/* TODO: Verificar se essa logica deve ficar dentro de models ou deve ser considerado um serviço */
class PaymentInformation {
  constructor(paymentInformation) {
    this.amount = paymentInformation.amount;
    this.type = paymentInformation.type;
    if (!paymentInformation.isBoleto) this.card = paymentInformation.card;
  }
}

module.exports = PaymentInformation;
