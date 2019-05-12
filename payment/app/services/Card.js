/* Importação de dependencias */
const { MoipValidator } = require("moip-sdk-js");

/* Importação de Constants */
const ErrorHandling = require("@constants/ErrorHandling");
const AppConstants = require("@constants/App");

class CardService {
  validateCardInformation(card) {
    this.validateNumber(card.number);
    this.validateExpirationDate(card.expirationDate);
    this.validateCvv(card.number, card.cvv);
  }

  /**
   * Método responsável pela validação do numero informado do cartão de crédito.
   */
  validateNumber(number) {
    if (!MoipValidator.isValidNumber(number))
      throw new Error(
        JSON.stringify({
          message: ErrorHandling.CARD_ERROR_HANDLING.NUMBER_INVALID,
          errors: {
            message: ErrorHandling.CARD_ERROR_HANDLING.NUMBER_INVALID,
            type: AppConstants.ERRORS.BUSINESS_LOGIC.TYPE,
            statusCode: AppConstants.ERRORS.BUSINESS_LOGIC.STATUS_CODE
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

    if (!MoipValidator.isExpiryDateValid(month, year))
      throw new Error(
        JSON.stringify({
          message: ErrorHandling.CARD_ERROR_HANDLING.EXPIRATION_DATE_INVALID,
          errors: {
            message: ErrorHandling.CARD_ERROR_HANDLING.EXPIRATION_DATE_INVALID,
            type: AppConstants.ERRORS.BUSINESS_LOGIC.TYPE,
            statusCode: AppConstants.ERRORS.BUSINESS_LOGIC.STATUS_CODE
          }
        })
      );
  }

  /**
   * Verificar se o CVV informado está no range esperado.
   */
  validateCvv(cardNumber, cvv) {
    if (!MoipValidator.isSecurityCodeValid(cardNumber, cvv))
      throw new Error(
        JSON.stringify({
          message: ErrorHandling.CARD_ERROR_HANDLING.CVV_INVALID,
          errors: {
            message: ErrorHandling.CARD_ERROR_HANDLING.CVV_INVALID,
            type: AppConstants.ERRORS.BUSINESS_LOGIC.TYPE,
            statusCode: AppConstants.ERRORS.BUSINESS_LOGIC.STATUS_CODE
          }
        })
      );
  }

  validateHolderName(holderName) {
    if (!holderName || holderName.length == 0) {
      throw new Error(
        JSON.stringify({
          message: ErrorHandling.CARD_ERROR_HANDLING.HOLDER_NAME_INVALID,
          errors: {
            message: ErrorHandling.CARD_ERROR_HANDLING.HOLDER_NAME_INVALID,
            type: AppConstants.ERRORS.BUSINESS_LOGIC.TYPE,
            statusCode: AppConstants.ERRORS.BUSINESS_LOGIC.STATUS_CODE
          }
        })
      );
    }
  }
}

module.exports = new CardService();
