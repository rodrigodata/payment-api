/* Import Services */
const PaymentService = require("@services/Payment");

class PaymentController {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async create(req, res, next) {
    try {
      const body = req.body;
      const _paymentCreated = await PaymentService.create(body);
      return res.status(201).send(_paymentCreated);
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async findById(req, res, next) {
    try {
      const id = req.params.id;
      const _payment = await PaymentService.findById(id);
      return res.status(200).send(_payment);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PaymentController();
