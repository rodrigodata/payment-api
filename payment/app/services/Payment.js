/* Importação de Models */
const PaymentType = require("@models/payment_type/PaymentType");

/* Importação de Builders */
const PaymentBuilder = require("@builders/Payment");

/* Importação de Services */
const CardService = require("./Card");

/* Importação de Constants */
const ErrorHandling = require("@constants/ErrorHandling");

class PaymentService {
  create(payment) {
    try {
      this.validateCardInformation(payment.paymentInformation);
      this.validationTypeBoletoWithCardInformation(payment);
      this.validationType(payment.paymentInformation.type);
      const _payment = new PaymentBuilder().build(payment);

      return _payment;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param {*} payment
   * Método responsável em validar se caso o método de pagamento for boleto,
   * não está sendo passado informação de cartão de crédito.
   */
  validationTypeBoletoWithCardInformation(payment) {
    if (
      payment.paymentInformation.card &&
      payment.paymentInformation.type.toLowerCase() == PaymentType.BOLETO
    ) {
      /* TODO: Implementar middleware com erros de regras de negocio */
      throw Error(
        JSON.stringify({
          message:
            ErrorHandling.PAYMENT_ERROR_HANDLING
              .TYPE_BOLETO_WITH_CARD_INFORMATION,
          errors: {
            message:
              ErrorHandling.PAYMENT_ERROR_HANDLING
                .TYPE_BOLETO_WITH_CARD_INFORMATION,
            statusCode: 500
          }
        })
      );
    }
  }

  /**
   *
   * @param {*} type
   * Método responsável por verificar se o tipo de pagamento é suportado pela aplicação
   */
  validationType(type) {
    if (!Object.values(PaymentType).includes(type.toLowerCase())) {
      /* TODO: Implementar middleware com erros de regras de negocio */
      throw Error(
        JSON.stringify({
          message: ErrorHandling.PAYMENT_ERROR_HANDLING.TYPE_NOT_SUPPORTED,
          errors: {
            message: ErrorHandling.PAYMENT_ERROR_HANDLING.TYPE_NOT_SUPPORTED,
            statusCode: 500
          }
        })
      );
    }
  }

  /**
   *
   * @param {*} paymentInformation
   * Método responsável por efetuar chamada ao serviço CardService e efetuar validação dos dados do cartão de crédito informado
   */
  validateCardInformation(paymentInformation) {
    if (paymentInformation.type != PaymentType.BOLETO) {
      CardService.validateCardInformation(paymentInformation.card);
    }
  }
}
module.exports = new PaymentService();
