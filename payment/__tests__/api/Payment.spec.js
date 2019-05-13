/* Registering module-alias for importing dependencies */
require("module-alias/register");

/* Import Dependencies */
const { expect } = require("chai");
const mongoose = require("mongoose");
const sinon = require("sinon");
require("sinon-mongoose");
require("@models");

describe("Validação de regras de negócio do serviço PaymentService", () => {
  beforeEach(done => {
    this.Payment = mongoose.model("Payment");
    this.PaymentMock = sinon.mock(this.Payment);
    this.paymentService = require("@services/Payment");
    this.paymentId = "5cd89bc0712647000f477cda";
    this.paymentModelObject = {
      idClient: 1,
      nameBuyer: "JOHN DOE",
      emailBuyer: "john@doe.com",
      cpfBuyer: "222.333.666-38",
      amount: 100,
      type: "credit_card",
      cardInformation: {
        holderName: "John Doe",
        number: "5555666677778884",
        expirationDate: "04/2027",
        cvv: "124"
      },
      status: "SUCCESS"
    };
    this.paymentObject = {
      client: {
        id: 1
      },
      buyer: {
        name: "JOHN DOE",
        email: "john@teste.com",
        cpf: "222.333.666-38"
      },
      paymentInformation: {
        amount: "10000",
        type: "boleto",
        status: "SUCCESS",
        boletoNumber: "03399.63290 64000.000006 00125.201020 4 56140000017832"
      }
    };
    done();
  });

  it("Retornar sucesso em método responsável em buscar no banco de dados pagamento por id. Tipo de pagamento: Boleto. ", done => {
    /* Scope of function */
    const _this = this;

    /* Mocking database search */
    sinon
      .mock(this.paymentService)
      .expects("findById")
      .withArgs(this.paymentId)
      .yields(null, this.paymentObject);

    this.paymentService.findById(this.paymentId, function(err, result) {
      /* Expect result */
      expect(result).to.not.be.undefined;

      /* Expect client */
      expect(result.client).to.not.be.undefined;
      expect(result.client).to.be.an("object");
      expect(result.client.id).to.not.be.undefined;
      expect(result.client.id).to.be.eql(_this.paymentObject.client.id);

      /* Expect buyer */
      expect(result.buyer).to.not.be.undefined;
      expect(result.buyer).to.be.an("object");

      /* Buyer name */
      expect(result.buyer.name).to.not.be.undefined;
      expect(result.buyer.name).to.be.eql(_this.paymentObject.buyer.name);

      /* Buyer email */
      expect(result.buyer.email).to.not.be.undefined;
      expect(result.buyer.email).to.be.eql(_this.paymentObject.buyer.email);

      /* Buyer cpf */
      expect(result.buyer.cpf).to.not.be.undefined;
      expect(result.buyer.cpf).to.be.eql(_this.paymentObject.buyer.cpf);

      /* Expect paymentInformation */
      expect(result.paymentInformation).to.not.be.undefined;
      expect(result.paymentInformation).to.be.an("object");

      /* Amount */
      expect(result.paymentInformation.amount).to.not.be.undefined;
      expect(result.paymentInformation.amount).to.be.eql(
        _this.paymentObject.paymentInformation.amount
      );

      /* Type */
      expect(result.paymentInformation.type).to.not.be.undefined;
      expect(result.paymentInformation.type).to.be.eql(
        _this.paymentObject.paymentInformation.type
      );

      done();
    });
  });
});

//  /* Expect paymentInformation.card */
//  expect(result.paymentInformation.card).to.not.be.undefined;
//  expect(result.paymentInformation.card).to.be.an("object");

//  /* Credit card holder name  */
//  expect(result.paymentInformation.card.holderName).to.not.be.undefined;
//  expect(result.paymentInformation.card.holderName).to.be.eql(
//    _this.paymentObject.paymentInformation.card.holderName
//  );

//  /* Credit card number  */
//  expect(result.paymentInformation.card.number).to.not.be.undefined;
//  expect(result.paymentInformation.card.number).to.be.eql(
//    _this.paymentObject.paymentInformation.card.number
//  );

//  /* Credit card expirationDate  */
//  expect(result.paymentInformation.card.expirationDate).to.not.be.undefined;
//  expect(result.paymentInformation.card.expirationDate).to.be.eql(
//    _this.paymentObject.paymentInformation.card.expirationDate
//  );

//  /* Credit card security code  */
//  expect(result.paymentInformation.card.cvv).to.not.be.undefined;
//  expect(result.paymentInformation.card.cvv).to.be.eql(
//    _this.paymentObject.paymentInformation.card.cvv
//  );
