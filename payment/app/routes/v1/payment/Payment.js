/* Import Dependencies */
const router = require("express").Router();
const { celebrate } = require("celebrate");

/* Import Controllers */
const PaymentController = require("@controllers/payment/Payment");

/* Import Validations */
const PaymentSchemaValidation = require("@validationsv1/Payment");

router
  .route("/payment")
  .post(celebrate(PaymentSchemaValidation.BODY), PaymentController.create);

router
  .route("/payment/:id")
  .get(celebrate(PaymentSchemaValidation.PARAMS), PaymentController.findById);

module.exports = router;
