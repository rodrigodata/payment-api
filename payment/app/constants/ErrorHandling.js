const PAYMENT_ERROR_HANDLING = {
  TYPE_BOLETO_WITH_CARD_INFORMATION:
    "Please, do not provide credit card information for payment type 'boleto'.",
  TYPE_NOT_SUPPORTED: "Payment method not supported."
};

const CARD_ERROR_HANDLING = {
  CARD_INVALID:
    "Credit card information is in a invalid state. Please, confirm your information and try again.",
  HOLDER_NAME_INVALID: "Credit card holder name invalid.",
  NUMBER_INVALID: "Credit card number invalid.",
  CVV_INVALID: "Security code invalid.",
  EXPIRATION_DATE_INVALID: "Expiration date invalid."
};

module.exports = {
  PAYMENT_ERROR_HANDLING,
  CARD_ERROR_HANDLING
};
