/* Importação de dependencias */
const router = require("express").Router();

/* Importação Controllers */
const PaymentController = require("../../../controllers/payment/Payment");

router
  .route("/payment")
  .get()
  .post(PaymentController.create);

module.exports = router;
