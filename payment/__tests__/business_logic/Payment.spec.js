/* Registering module-alias for importing dependencies */
require("module-alias/register");
require("@models");

/* Import Dependencies */
const { expect } = require("chai");

/* Importação de Constants */
const {
  PAYMENT_ERROR_HANDLING,
  CARD_ERROR_HANDLING
} = require("@constants/ErrorHandling");

describe("Validação de regras de negócio do serviço PaymentService", () => {
  beforeEach(done => {
    this.paymentService = require("@services/Payment");
    this.payment = {
      creditCard: {
        client: {
          id: 1
        },
        buyer: {
          name: "John Doe",
          email: "john@doe.com",
          cpf: "222.333.666-38"
        },
        paymentInformation: {
          amount: 100,
          type: "credit_card",
          card: {
            holderName: "John Doe",
            number: "5555666677778884",
            expirationDate: "04/2027",
            cvv: "124"
          }
        }
      },
      boleto: {
        client: {
          id: 1
        },
        buyer: {
          name: "John Doe",
          email: "john@doe.com",
          cpf: "222.333.666-38"
        },
        paymentInformation: { amount: 10000, type: "boleto" }
      }
    };
    done();
  });

  afterEach(done => {
    this.paymentService = {};
    done();
  });

  /**
   * Payment Type Validation
   * @begin
   */
  it("Retornar que não é aceito enviar informações de cartão de crédito para tipo de pagamento BOLETO.", done => {
    this.payment.boleto.paymentInformation.card = this.payment.creditCard.paymentInformation.card;
    expect(() => {
      this.paymentService.validationTypeBoletoWithCardInformation(
        this.payment.boleto
      );
    }).to.throw(
      Error.message,
      PAYMENT_ERROR_HANDLING.TYPE_BOLETO_WITH_CARD_INFORMATION
    );
    done();
  });

  it("Retornar que é obrigatório informar dados do cartão de crédito caso o tipo de pagamento seja CARTÃO DE CRÉDITO.", done => {
    delete this.payment.creditCard.paymentInformation.card;

    expect(() => {
      this.paymentService.validateCardInformation(this.payment.creditCard);
    }).to.throw(Error.message, CARD_ERROR_HANDLING.CARD_INVALID);
    done();
  });

  it("Retornar que o tipo de pagamento não é suportado.", done => {
    this.payment.creditCard.paymentInformation.type = "METHOD_PAYMENT";

    expect(() => {
      this.paymentService.validationType(
        this.payment.creditCard.paymentInformation.type
      );
    }).to.throw(Error.message, PAYMENT_ERROR_HANDLING.TYPE_NOT_SUPPORTED);
    done();
  });

  /**
   * Payment Type Validation
   * @end
   */
});
