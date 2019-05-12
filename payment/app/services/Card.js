/* Import Dependencies */
const { MoipValidator } = require("moip-sdk-js");

/* Import Constants */
const { CARD_ERROR_HANDLING } = require("@constants/ErrorHandling");
const { ERRORS } = require("@constants/App");

class CardService {
  validateCardInformation(card) {
    this.validateCardObject(card);
    this.validateNumber(card.number);
    this.validateExpirationDate(card.expirationDate);
    this.validateCvv(card.number, card.cvv);
  }

  validateCardObject(card) {
    if (!card)
      throw new Error(
        JSON.stringify({
          message: CARD_ERROR_HANDLING.CARD_INVALID,
          errors: {
            message: CARD_ERROR_HANDLING.CARD_INVALID,
            type: ERRORS.BUSINESS_LOGIC.TYPE,
            statusCode: ERRORS.BUSINESS_LOGIC.STATUS_CODE
          }
        })
      );
  }

  /**
   * @param {*} number
   * Method responsible for credit card number validation
   */
  validateNumber(number) {
    if (!MoipValidator.isValidNumber(number))
      throw new Error(
        JSON.stringify({
          message: CARD_ERROR_HANDLING.NUMBER_INVALID,
          errors: {
            message: CARD_ERROR_HANDLING.NUMBER_INVALID,
            type: ERRORS.BUSINESS_LOGIC.TYPE,
            statusCode: ERRORS.BUSINESS_LOGIC.STATUS_CODE
          }
        })
      );
  }

  /**
   * @param {*} expirationDate
   * Method responsible for credit card expiration date validation
   */
  validateExpirationDate(expirationDate) {
    const [month, year] = expirationDate.split("/");

    if (!MoipValidator.isExpiryDateValid(month, year))
      throw new Error(
        JSON.stringify({
          message: CARD_ERROR_HANDLING.EXPIRATION_DATE_INVALID,
          errors: {
            message: CARD_ERROR_HANDLING.EXPIRATION_DATE_INVALID,
            type: ERRORS.BUSINESS_LOGIC.TYPE,
            statusCode: ERRORS.BUSINESS_LOGIC.STATUS_CODE
          }
        })
      );
  }

  /**
   * @param {*} cardNumber
   * @param {*} cvv
   * Method responsible for credit card security code validation
   */
  validateCvv(cardNumber, cvv) {
    if (!MoipValidator.isSecurityCodeValid(cardNumber, cvv))
      throw new Error(
        JSON.stringify({
          message: CARD_ERROR_HANDLING.CVV_INVALID,
          errors: {
            message: CARD_ERROR_HANDLING.CVV_INVALID,
            type: ERRORS.BUSINESS_LOGIC.TYPE,
            statusCode: ERRORS.BUSINESS_LOGIC.STATUS_CODE
          }
        })
      );
  }

  /**
   * @param {*} holderName
   * Method responsible for credit card holder name validation
   */
  validateHolderName(holderName) {
    if (!holderName || holderName.length == 0) {
      throw new Error(
        JSON.stringify({
          message: CARD_ERROR_HANDLING.HOLDER_NAME_INVALID,
          errors: {
            message: CARD_ERROR_HANDLING.HOLDER_NAME_INVALID,
            type: ERRORS.BUSINESS_LOGIC.TYPE,
            statusCode: ERRORS.BUSINESS_LOGIC.STATUS_CODE
          }
        })
      );
    }
  }
}

module.exports = new CardService();
