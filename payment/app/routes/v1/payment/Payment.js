/* Importação de dependencias */
const router = require("express").Router();
const { celebrate } = require("celebrate");

/* Importação Controllers */
const PaymentController = require("@controllers/payment/Payment");

/* Importaçao de validations */
const PaymentSchemaValidation = require("@validationsv1/Payment");

router
  .route("/payment")
  .post(celebrate(PaymentSchemaValidation.BODY), PaymentController.create);

router
  .route("/payment/:id")
  .get(celebrate(PaymentSchemaValidation.PARAMS), PaymentController.findById);

module.exports = router;
