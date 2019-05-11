/* Importação de Services */
const PaymentService = require("@services/Payment");

exports.create = async (req, res, next) => {
  try {
    const body = req.body;

    const _paymentCreated = await PaymentService.create(body);

    return res.status(201).send({
      ..._paymentCreated
    });
  } catch (error) {
    next(error);
  }
};
