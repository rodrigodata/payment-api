exports.error = (err, req, res, next) => {
  if (err) {
    let _errorMessage = isValidStringJSON(err.message)
      ? JSON.parse(err.message)
      : err.message;
    return res.status(_errorMessage.errors.statusCode).send(_errorMessage);
  }
};

function isValidStringJSON(_string) {
  try {
    JSON.parse(_string);
    return true;
  } catch (error) {
    return false;
  }
}
