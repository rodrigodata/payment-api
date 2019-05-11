/* Importação de Services */
const PaymentService = require("@services/Payment");

exports.create = (req, res, next) => {
  try {
    const body = req.body;

    const _paymentCreated = PaymentService.create(body);

    return res.status(201).send({
      ..._paymentCreated
    });
  } catch (error) {
    next(error);
  }
};
