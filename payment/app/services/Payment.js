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
    /* Validação */
    this.validationType(_payment.paymentInformation.type);
    this.validationTypeBoletoWithCardInformation(_payment);
    this.validateCardInformation(_payment.paymentInformation);

    /* Build & Model */
    const payment = new Payment();

    /* Assign para salvar conforme model */
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
   * Método responsável por buscar pagamento por id dentro do nosso banco de dados.
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
   * Método responsável em validar se caso o método de pagamento for boleto,
   * não está sendo passado informação de cartão de crédito.
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
   * Método responsável por verificar se o tipo de pagamento é suportado pela aplicação
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
   * Método responsável por efetuar chamada ao serviço CardService e efetuar validação dos dados do cartão de crédito informado
   */
  validateCardInformation(paymentInformation) {
    if (paymentInformation.type != PaymentType.types.BOLETO) {
      CardService.validateCardInformation(paymentInformation.card);
    }
  }
}
module.exports = new PaymentService();
