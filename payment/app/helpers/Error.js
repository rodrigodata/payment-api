/* Import Constants */
const { ERRORS } = require("@constants/App");

exports.throw = message => {
  throw new Error(
    JSON.stringify({
      message: message,
      errors: {
        message: message,
        type: ERRORS.BUSINESS_LOGIC.TYPE,
        statusCode: ERRORS.BUSINESS_LOGIC.STATUS_CODE
      }
    })
  );
};
