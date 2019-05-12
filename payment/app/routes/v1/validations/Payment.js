/* */
const { Joi } = require("celebrate");

const PaymentSchemaValidation = {
  PARAMS: {
    params: Joi.object({
      id: Joi.string().required()
    })
  },
  BODY: {
    body: Joi.object({
      client: Joi.object().keys({
        id: Joi.number()
          .integer()
          .required()
      }),
      buyer: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email(),
        cpf: Joi.string()
          .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
          .required()
      }),
      paymentInformation: Joi.object().keys({
        amount: Joi.number()
          .integer()
          .min(1)
          .max(9999999999),
        type: Joi.string()
          .valid("boleto", "credit_card")
          .required(),
        card: Joi.object().keys({
          holderName: Joi.string()
            .min(1)
            .max(30)
            .required(),
          number: Joi.string().required(),
          expirationDate: Joi.string().required(),
          cvv: Joi.string()
            .min(3)
            .max(4)
            .required()
        })
      })
    })
  }
};

module.exports = PaymentSchemaValidation;
