/* Importação de dependencias */
const router = require("express").Router();

/* Importação Controllers */
const PaymentController = require("@controllers/payment/Payment");

router
  .route("/payment")
  .get()
  .post(PaymentController.create);

router.route("/payment/:id").get(PaymentController.findById);

module.exports = router;
