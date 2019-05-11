/* Importação de Dependencias */
const Mongoose = require("mongoose");
require("mongoose-long")(Mongoose);

const PaymentSchema = new Mongoose.Schema({
  idClient: {
    type: Number,
    required: [true, "can't be empty"]
  },
  nameBuyer: {
    type: String,
    required: [true, "can't be empty"]
  },
  emailBuyer: {
    type: String,
    required: [true, "can't be empty"]
  },
  cpfBuyer: {
    type: String,
    required: [true, "can't be empty"]
  },
  amount: {
    type: Mongoose.Schema.Types.Long,
    required: [true, "can't be empty"]
  },
  type: {
    type: String,
    required: [true, "can't be empty"]
  },
  boletoNumber: {
    type: String
  },
  cardInformation: {
    type: String
  },
  status: {
    type: String,
    required: [true, "can't be empty"]
  }
});

PaymentSchema.methods.modelAssignment = function(payment) {
  this.idClient = payment.client.id;
  this.nameBuyer = payment.buyer.name;
  this.emailBuyer = payment.buyer.email;
  this.cpfBuyer = payment.buyer.cpf;
  this.amount = payment.paymentInformation.amount;
  this.type = payment.paymentInformation.type;
  this.boletoNumber = payment.paymentInformation.boletoNumber;
  this.cardInformation = JSON.stringify(payment.paymentInformation.card);
  this.status = payment.paymentInformation.status;
};

Mongoose.model("Payment", PaymentSchema);
