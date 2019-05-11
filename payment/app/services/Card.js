/* Importação de dependencias */
const MoipSdk = require("moip-sdk-js");

/* Importação de Constants */
const ErrorHandling = require("@constants/ErrorHandling");

class CardService {
  validateCardInformation(card) {
    try {
      this.validateNumber(card.number);
      this.validateExpirationDate(card.expirationDate);
      this.validateCvv(card.number, card.cvv);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Método responsável pela validação do numero informado do cartão de crédito.
   */
  validateNumber(number) {
    if (!MoipSdk.MoipValidator.isValidNumber(number))
      throw Error(
        JSON.stringify({
          message: ErrorHandling.CARD_ERROR_HANDLING.NUMBER_INVALID,
          errors: {
            message: ErrorHandling.CARD_ERROR_HANDLING.NUMBER_INVALID,
            statusCode: 500
          }
        })
      );
  }

  /**
   * Método responsável pela validação da data de vencimento informada do cartão de crédito.
   * Aqui podemos validar se a data informada está vencida ou não.
   */
  validateExpirationDate(expirationDate) {
    const [month, year] = expirationDate.split("/");

    if (!MoipSdk.MoipValidator.isExpiryDateValid(month, year))
      throw Error(
        JSON.stringify({
          message: ErrorHandling.CARD_ERROR_HANDLING.EXPIRATION_DATE_INVALID,
          errors: {
            message: ErrorHandling.CARD_ERROR_HANDLING.EXPIRATION_DATE_INVALID,
            statusCode: 500
          }
        })
      );
  }

  /**
   * Verificar se o CVV informado está no range esperado.
   */
  validateCvv(cardNumber, cvv) {
    if (!MoipSdk.MoipValidator.isSecurityCodeValid(cardNumber, cvv))
      throw Error(
        JSON.stringify({
          message: ErrorHandling.CARD_ERROR_HANDLING.CVV_INVALID,
          errors: {
            message: ErrorHandling.CARD_ERROR_HANDLING.CVV_INVALID,
            statusCode: 500
          }
        })
      );
  }

  validateHolderName(holderName) {
    if (!holderName || holderName.length == 0) {
      throw Error(
        JSON.stringify({
          message: ErrorHandling.CARD_ERROR_HANDLING.HOLDER_NAME_INVALID,
          errors: {
            message: ErrorHandling.CARD_ERROR_HANDLING.HOLDER_NAME_INVALID,
            statusCode: 500
          }
        })
      );
    }
  }
}

module.exports = new CardService();
