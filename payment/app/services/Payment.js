/* Importação de dependencias */
const { model } = require("mongoose");

/* Importação de Models */
const PaymentType = require("@models/payment_type/PaymentType");
const Payment = model("Payment");

/* Importação de Builders */
const PaymentBuilder = require("@builders/Payment");

/* Importação de Services */
const CardService = require("./Card");

/* Importação de Constants */
const { PAYMENT_ERROR_HANDLING } = require("@constants/ErrorHandling");

/* Import Helpers */
const ErrorHelper = require("@helpers/Error");

class PaymentService {
  async create(_payment) {
    /* Validations */
    this.validationType(_payment.paymentInformation.type);
    this.validationTypeBoletoWithCardInformation(_payment);
    this.validateCardInformation(_payment.paymentInformation);

    /* Model */
    const payment = new Payment();

    /* Assign */
    payment.modelAssignment(_payment);

    return payment
      .save()
      .then(paymentCreated => {
        return paymentCreated.formatToJSON();
      })
      .catch(err => {
        throw err;
      });
  }

  /**
   *
   * @param {*} id
   * Method responsible for searching by document id
   */
  async findById(id) {
    return Payment.findById(id)
      .then(_payment => {
        if (_payment) {
          const _paymentBuild = new PaymentBuilder().build(_payment);
          return _paymentBuild;
        } else {
          return {};
        }
      })
      .catch(err => {
        return {};
      });
  }

  /**
   *
   * @param {*} payment
   * Method responsible to check if the payment method == boleto, we can't accept credit card information.
   */
  validationTypeBoletoWithCardInformation(payment) {
    if (
      payment &&
      payment.paymentInformation &&
      payment.paymentInformation.card &&
      payment.paymentInformation.type.toLowerCase() == PaymentType.types.BOLETO
    ) {
      ErrorHelper.throw(
        PAYMENT_ERROR_HANDLING.TYPE_BOLETO_WITH_CARD_INFORMATION
      );
    }
  }

  /**
   *
   * @param {*} type
   * Method responsible to check if the payment type is supported
   */
  validationType(type) {
    if (
      !type ||
      !Object.values(PaymentType.types).includes(type.toLowerCase())
    ) {
      ErrorHelper.throw(PAYMENT_ERROR_HANDLING.TYPE_NOT_SUPPORTED);
    }
  }

  /**
   *
   * @param {*} paymentInformation
   * Method responsible for calling CardService and check credit card values
   */
  validateCardInformation(paymentInformation) {
    if (paymentInformation.type != PaymentType.types.BOLETO) {
      CardService.validateCardInformation(paymentInformation.card);
    }
  }
}
module.exports = new PaymentService();
