/* Registering module-alias for importing dependencies */
require("module-alias/register");

/* Import Dependencies */
const { expect } = require("chai");

/* Import Constants */
const { CARD_ERROR_HANDLING } = require("@constants/ErrorHandling");

describe("Validação de regras de negócio do serviço CardService", () => {
  beforeEach(done => {
    this.cardService = require("@services/Card");
    this.creditCardInformation = {
      holderName: "John Doe",
      number: "5555666677778884",
      expirationDate: "07/2027",
      cvv: "123"
    };
    done();
  });

  afterEach(done => {
    this.cardService = {};
    done();
  });

  /**
   * Validation SUCCESS
   * @begin
   */
  it("Retornar que todos os dados informados do cartão de crédito são validos e existem.", done => {
    expect(() => {
      this.cardService.validateCardInformation(this.creditCardInformation);
    }).to.not.throw(Error);

    done();
  });
  /**
   * Validation SUCCESS
   * @end
   */

  /**
   * HolderName Validation
   * @begin
   */
  it("Retornar que o nome no cartão de crédito é invalido. Método principal de validação. ", done => {
    this.creditCardInformation.holderName = "";

    expect(() => {
      this.cardService.validateCardInformation(this.creditCardInformation);
    }).to.throw(Error.message, CARD_ERROR_HANDLING.HOLDER_NAME_INVALID);

    done();
  });

  it("Retornar que o nome no cartão de crédito é inexistente. Método principal de validação. ", done => {
    delete this.creditCardInformation.holderName;

    expect(() => {
      this.cardService.validateCardInformation(this.creditCardInformation);
    }).to.throw(Error.message, CARD_ERROR_HANDLING.HOLDER_NAME_INVALID);

    done();
  });

  /**
   * HolderName Validation
   * @end
   */

  /**
   * Number Validation
   * @begin
   */
  it("Retornar que o número cartão de crédito é invalido. Método principal de validação. ", done => {
    this.creditCardInformation.number = "";

    expect(() => {
      this.cardService.validateCardInformation(this.creditCardInformation);
    }).to.throw(Error.message, CARD_ERROR_HANDLING.NUMBER_INVALID);

    done();
  });

  it("Retornar que o número no cartão de crédito é inexistente. Método principal de validação. ", done => {
    delete this.creditCardInformation.number;

    expect(() => {
      this.cardService.validateCardInformation(this.creditCardInformation);
    }).to.throw(Error.message, CARD_ERROR_HANDLING.NUMBER_INVALID);

    done();
  });

  /**
   * Number Validation
   * @end
   */

  /**
   * Expiration Date Validation
   * @begin
   */
  it("Retornar que a data de validade do cartão de crédito é invalido. Método principal de validação. ", done => {
    this.creditCardInformation.expirationDate = "4";

    expect(() => {
      this.cardService.validateCardInformation(this.creditCardInformation);
    }).to.throw(Error.message, CARD_ERROR_HANDLING.EXPIRATION_DATE_INVALID);

    done();
  });

  it("Retornar que a data de validade do cartão de crédito é inexistente. Método principal de validação. ", done => {
    delete this.creditCardInformation.expirationDate;

    expect(() => {
      this.cardService.validateCardInformation(this.creditCardInformation);
    }).to.throw(Error.message, CARD_ERROR_HANDLING.EXPIRATION_DATE_INVALID);

    done();
  });
  /**
   * Expiration Date Validation
   * @end
   */

  /**
   * CVV Validation
   * @begin
   */
  it("Retornar que o código de segurança do cartão de crédito é invalido. Método principal de validação. ", done => {
    this.creditCardInformation.cvv = "1";

    expect(() => {
      this.cardService.validateCardInformation(this.creditCardInformation);
    }).to.throw(Error.message, CARD_ERROR_HANDLING.CVV_INVALID);

    done();
  });

  it("Retornar que o código de segurança do cartão de crédito é inexistente. Método principal de validação. ", done => {
    delete this.creditCardInformation.cvv;

    expect(() => {
      this.cardService.validateCardInformation(this.creditCardInformation);
    }).to.throw(Error.message, CARD_ERROR_HANDLING.CVV_INVALID);

    done();
  });
  /**
   * CVV Validation
   * @end
   */
});
