/* Importação de Services */
const PaymentService = require("@services/Payment");

exports.create = async (req, res, next) => {
  try {
    const body = req.body;
    const _paymentCreated = await PaymentService.create(body);
    return res.status(201).send(_paymentCreated);
  } catch (error) {
    next(error);
  }
};

exports.findById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const _payment = await PaymentService.findById(id);
    return res.status(200).send(..._payment);
  } catch (error) {
    next(error);
  }
};
