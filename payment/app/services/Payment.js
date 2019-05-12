/* Importação de dependencias */
const Mongoose = require("mongoose");

/* Importação de Models */
const PaymentType = require("@models/payment_type/PaymentType");
const Payment = Mongoose.model("Payment");

/* Importação de Builders */
const PaymentBuilder = require("@builders/Payment");

/* Importação de Services */
const CardService = require("./Card");

/* Importação de Constants */
const ErrorHandling = require("@constants/ErrorHandling");

class PaymentService {
  async create(_payment) {
    try {
      /* Validação */
      this.validateCardInformation(_payment.paymentInformation);
      this.validationTypeBoletoWithCardInformation(_payment);
      this.validationType(_payment.paymentInformation.type);

      /* Build & Model */
      const _paymentBuild = new PaymentBuilder().build(_payment);
      const payment = new Payment();

      /* Assign para salvar conforme model */
      payment.modelAssignment(_paymentBuild);

      payment
        .save()
        .then(paymentCreated => {
          return paymentCreated;
        })
        .catch(err => {
          throw err;
        });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id) {
    try {
      const payment = new Payment();

      payment
        .findById(id)
        .then(_payment => {
          return _payment;
        })
        .catch(err => {
          throw err;
        });
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
