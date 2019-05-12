/* Application Constants */
const DB_HOST = process.env.DB_HOST || "mongodb://db:27017/wirecard";

/* Http Status Code Constants */
const ERRORS = {
  BUSINESS_LOGIC: {
    TYPE: "BUSINESS_LOGIC_ERROR",
    STATUS_CODE: 409
  }
};

/* Payment methods types supported */
const PAYMENT_TYPES = {
  CREDIT_CARD: "credit_card",
  BOLETO: "boleto"
};

/* Payment status */
const PAYMENT_STATUS = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR"
};

module.exports = {
  DB_HOST,
  ERRORS,
  PAYMENT_TYPES,
  PAYMENT_STATUS
};
