/* Import Dependencies */
const { MoipValidator } = require("moip-sdk-js");

/* Import Constants */
const { CARD_ERROR_HANDLING } = require("@constants/ErrorHandling");

/* Import Helpers */
const ErrorHelper = require("@helpers/Error");

class CardService {
  validateCardInformation(card) {
    this.validateCardObject(card);
    this.validateNumber(card.number);
    this.validateExpirationDate(card.expirationDate);
    this.validateCvv(card.number, card.cvv);
    this.validateHolderName(card.holderName);
  }

  validateCardObject(card) {
    if (!card) ErrorHelper.throw(CARD_ERROR_HANDLING.CARD_INVALID);
  }

  /**
   * @param {*} number
   * Method responsible for credit card number validation
   */
  validateNumber(number) {
    if (!number || !MoipValidator.isValidNumber(number))
      ErrorHelper.throw(CARD_ERROR_HANDLING.NUMBER_INVALID);
  }

  /**
   * @param {*} expirationDate
   * Method responsible for credit card expiration date validation
   */
  validateExpirationDate(expirationDate) {
    if (!expirationDate)
      ErrorHelper.throw(CARD_ERROR_HANDLING.EXPIRATION_DATE_INVALID);

    const [month, year] = expirationDate.split("/");

    if (!MoipValidator.isExpiryDateValid(month, year))
      ErrorHelper.throw(CARD_ERROR_HANDLING.EXPIRATION_DATE_INVALID);
  }

  /**
   * @param {*} cardNumber
   * @param {*} cvv
   * Method responsible for credit card security code validation
   */
  validateCvv(cardNumber, cvv) {
    if (
      !cardNumber ||
      !cvv ||
      !MoipValidator.isSecurityCodeValid(cardNumber, cvv)
    )
      ErrorHelper.throw(CARD_ERROR_HANDLING.CVV_INVALID);
  }

  /**
   * @param {*} holderName
   * Method responsible for credit card holder name validation
   */
  validateHolderName(holderName) {
    if (!holderName || holderName.length == 0) {
      ErrorHelper.throw(CARD_ERROR_HANDLING.HOLDER_NAME_INVALID);
    }
  }
}

module.exports = new CardService();
