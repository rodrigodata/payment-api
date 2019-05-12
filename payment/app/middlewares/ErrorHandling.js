exports.error = (err, req, res, next) => {
  if (err) {
    let _errorMessage = isValidStringJSON(err.message)
      ? JSON.parse(err.message)
      : err.message;
    if (_errorMessage.errors && _errorMessage.errors.statusCode) {
      return res
        .status(
          _errorMessage.errors.statusCode
            ? _errorMessage.errors.statusCode
            : 500
        )
        .send(_errorMessage);
    } else {
      return res.status(500).send(_errorMessage);
    }
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
