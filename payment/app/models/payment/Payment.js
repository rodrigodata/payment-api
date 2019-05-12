/* Import Dependencies */
const Mongoose = require("mongoose");
/* Supporting data_type Long for Mongoose */
require("mongoose-long")(Mongoose);

/* Import Builders */
const PaymentInformationBuilder = require("@builders/PaymentInformation");

/* Import Models */
const PaymentType = require("@models/payment_type/PaymentType");

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
  let paymentInformation = new PaymentInformationBuilder()
    .setAmount(payment.paymentInformation.amount)
    .setType(payment.paymentInformation.type)
    .setBoletoNumber()
    .setCard(payment.paymentInformation.card)
    .setStatus()
    .build();
  this.idClient = payment.client.id;
  this.nameBuyer = payment.buyer.name;
  this.emailBuyer = payment.buyer.email;
  this.cpfBuyer = payment.buyer.cpf;
  this.amount = paymentInformation.amount;
  this.type = paymentInformation.type;
  this.boletoNumber = paymentInformation.boletoNumber;
  this.cardInformation = JSON.stringify(paymentInformation.card);
  this.status = paymentInformation.status;
};

PaymentSchema.methods.formatToJSON = function() {
  if (this.type == PaymentType.types.BOLETO) {
    return {
      boletoNumber: this.boletoNumber
    };
  } else {
    return {
      status: this.status
    };
  }
};

Mongoose.model("Payment", PaymentSchema);
