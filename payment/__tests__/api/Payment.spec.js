/* Import Dependencies */
const supertest = require("supertest");
const { expect } = require("chai");

/* Import Server file */
const app = require("../../server");

/* Import Models */
const PaymentStatus = require("@models/payment_status/PaymentStatus");

/* Import Constants */
const { ERRORS } = require("@constants/App");
const {
  CARD_ERROR_HANDLING,
  PAYMENT_ERROR_HANDLING
} = require("@constants/ErrorHandling");

describe("POST /api/v1/payment", function() {
  beforeEach(done => {
    this.testeServer = supertest(app);
    this.paymentCreditCardJSON = {
      client: {
        id: 1
      },
      buyer: {
        name: "JOHN DOE",
        email: "john@doe.com",
        cpf: "222.333.666-38"
      },
      paymentInformation: {
        amount: "100",
        type: "credit_card",
        card: {
          holderName: "JOHN DOE",
          number: "5555666677778884",
          expirationDate: "04/2027",
          cvv: "124"
        }
      }
    };
    this.paymentBoletoJSON = {
      client: {
        id: 1
      },
      buyer: {
        name: "JOHN DOE",
        email: "john@doeeee.com",
        cpf: "222.333.666-38"
      },
      paymentInformation: {
        amount: "10000",
        type: "boleto"
      }
    };
    done();
  });

  /**
   * Payment Creation SUCCESS
   * @begin
   */
  it("Return payment created with status SUCCESS for payment method CREDIT_CARD.", done => {
    this.testeServer
      .post("/api/v1/payment")
      .send(this.paymentCreditCardJSON)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function(err, response) {
        expect(response).to.not.be.undefined;
        expect(response.body).to.not.be.undefined;
        expect(response.body.id).to.not.be.undefined;
        expect(response.body.status).to.not.be.undefined;
        expect(response.body.status).to.eql(PaymentStatus.status.SUCCESS);
        done();
      });
  });

  it("Return payment created with boleto number for payment method BOLETO.", done => {
    this.testeServer
      .post("/api/v1/payment")
      .send(this.paymentBoletoJSON)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function(err, response) {
        expect(response).to.not.be.undefined;
        expect(response.body).to.not.be.undefined;
        expect(response.body.id).to.not.be.undefined;
        expect(response.body.boletoNumber).to.not.be.undefined;
        expect(response.body.boletoNumber).to.equal(
          "03399.63290 64000.000006 00125.201020 4 56140000017832"
        );
        done();
      });
  });

  /**
   * Payment Creation
   * @end
   */

  /**
   * Payment Creation ERROR
   * @begin
   */
  it("Return business exception for payment method CREDIT_CARD. Validation error for CREDIT_CARD [CREDIT_CARD_NUMBER].", done => {
    this.paymentCreditCardJSON.paymentInformation.card.number = "A";
    this.testeServer
      .post("/api/v1/payment")
      .send(this.paymentCreditCardJSON)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(ERRORS.BUSINESS_LOGIC.STATUS_CODE)
      .end(function(err, response) {
        expect(response).to.not.be.undefined;
        expect(response.body).to.not.be.undefined;
        expect(response.body.message).to.not.be.undefined;
        expect(response.body.message).to.eql(
          CARD_ERROR_HANDLING.NUMBER_INVALID
        );
        expect(response.body.errors).to.not.be.undefined;
        expect(response.body.errors).to.be.an("object");
        expect(response.body.errors.message).to.eql(
          CARD_ERROR_HANDLING.NUMBER_INVALID
        );
        expect(response.body.errors.type).to.eql(ERRORS.BUSINESS_LOGIC.TYPE);
        expect(response.body.errors.statusCode).to.eql(
          ERRORS.BUSINESS_LOGIC.STATUS_CODE
        );
        done();
      });
  });

  it("Return business exception for payment method CREDIT_CARD. Validation error for CREDIT_CARD [CREDIT_CARD_EXPIRATION_DATE].", done => {
    this.paymentCreditCardJSON.paymentInformation.card.expirationDate = "78E";
    this.testeServer
      .post("/api/v1/payment")
      .send(this.paymentCreditCardJSON)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(ERRORS.BUSINESS_LOGIC.STATUS_CODE)
      .end(function(err, response) {
        expect(response).to.not.be.undefined;
        expect(response.body).to.not.be.undefined;
        expect(response.body.message).to.not.be.undefined;
        expect(response.body.message).to.eql(
          CARD_ERROR_HANDLING.EXPIRATION_DATE_INVALID
        );
        expect(response.body.errors).to.not.be.undefined;
        expect(response.body.errors).to.be.an("object");
        expect(response.body.errors.message).to.eql(
          CARD_ERROR_HANDLING.EXPIRATION_DATE_INVALID
        );
        expect(response.body.errors.type).to.eql(ERRORS.BUSINESS_LOGIC.TYPE);
        expect(response.body.errors.statusCode).to.eql(
          ERRORS.BUSINESS_LOGIC.STATUS_CODE
        );
        done();
      });
  });

  it("Return business exception for payment method CREDIT_CARD. Validation error for CREDIT_CARD [CREDIT_CARD_SECURITY_CODE].", done => {
    this.paymentCreditCardJSON.paymentInformation.card.cvv = "AAAA";
    this.testeServer
      .post("/api/v1/payment")
      .send(this.paymentCreditCardJSON)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(ERRORS.BUSINESS_LOGIC.STATUS_CODE)
      .end(function(err, response) {
        expect(response).to.not.be.undefined;
        expect(response.body).to.not.be.undefined;
        expect(response.body.message).to.not.be.undefined;
        expect(response.body.message).to.eql(CARD_ERROR_HANDLING.CVV_INVALID);
        expect(response.body.errors).to.not.be.undefined;
        expect(response.body.errors).to.be.an("object");
        expect(response.body.errors.message).to.eql(
          CARD_ERROR_HANDLING.CVV_INVALID
        );
        expect(response.body.errors.type).to.eql(ERRORS.BUSINESS_LOGIC.TYPE);
        expect(response.body.errors.statusCode).to.eql(
          ERRORS.BUSINESS_LOGIC.STATUS_CODE
        );
        done();
      });
  });

  it("Return business exception for payment method not supported.", done => {
    this.paymentCreditCardJSON.paymentInformation.type = "NEW_METHOD";
    this.testeServer
      .post("/api/v1/payment")
      .send(this.paymentCreditCardJSON)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(ERRORS.BUSINESS_LOGIC.STATUS_CODE)
      .end(function(err, response) {
        expect(response).to.not.be.undefined;
        expect(response.body).to.not.be.undefined;
        expect(response.body.message).to.not.be.undefined;
        expect(response.body.message).to.eql(
          PAYMENT_ERROR_HANDLING.TYPE_NOT_SUPPORTED
        );
        expect(response.body.errors).to.not.be.undefined;
        expect(response.body.errors).to.be.an("object");
        expect(response.body.errors.message).to.eql(
          PAYMENT_ERROR_HANDLING.TYPE_NOT_SUPPORTED
        );
        expect(response.body.errors.type).to.eql(ERRORS.BUSINESS_LOGIC.TYPE);
        expect(response.body.errors.statusCode).to.eql(
          ERRORS.BUSINESS_LOGIC.STATUS_CODE
        );
        done();
      });
  });

  it("Return business exception for payment method type BOLETO but CREDIT_CARD information was provided.", done => {
    this.paymentCreditCardJSON.paymentInformation.type = "boleto";
    this.testeServer
      .post("/api/v1/payment")
      .send(this.paymentCreditCardJSON)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(ERRORS.BUSINESS_LOGIC.STATUS_CODE)
      .end(function(err, response) {
        expect(response).to.not.be.undefined;
        expect(response.body).to.not.be.undefined;
        expect(response.body.message).to.not.be.undefined;
        expect(response.body.message).to.eql(
          PAYMENT_ERROR_HANDLING.TYPE_BOLETO_WITH_CARD_INFORMATION
        );
        expect(response.body.errors).to.not.be.undefined;
        expect(response.body.errors).to.be.an("object");
        expect(response.body.errors.message).to.eql(
          PAYMENT_ERROR_HANDLING.TYPE_BOLETO_WITH_CARD_INFORMATION
        );
        expect(response.body.errors.type).to.eql(ERRORS.BUSINESS_LOGIC.TYPE);
        expect(response.body.errors.statusCode).to.eql(
          ERRORS.BUSINESS_LOGIC.STATUS_CODE
        );
        done();
      });
  });
  /**
   * Payment Creation ERROR
   * @end
   */

  /**
   * Payment findById SUCCESS
   * @begin
   */
  it("Return payment created with status of transaction. [CREDIT_CARD]", done => {
    const _this = this;

    this.testeServer
      .post("/api/v1/payment")
      .send(this.paymentCreditCardJSON)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function(err, response) {
        expect(response).to.not.be.undefined;
        expect(response.body).to.not.be.undefined;
        expect(response.body.id).to.not.be.undefined;
        expect(response.body.status).to.not.be.undefined;
        expect(response.body.status).to.eql(PaymentStatus.status.SUCCESS);

        /* Buscar Pagamento rescem criado pelo o seu id.  */
        _this.testeServer
          .get(`/api/v1/payment/${response.body.id}`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end(function(err, payment) {
            /* Check if properties exists before validation values. */
            expect(payment).to.not.be.undefined;
            expect(payment.body).to.not.be.undefined;
            expect(payment.body.id).to.not.be.undefined;
            expect(payment.body.client).to.not.be.undefined;
            expect(payment.body.client).to.be.an("object");
            expect(payment.body.client.id).to.not.be.undefined;
            expect(payment.body.buyer).to.not.be.undefined;
            expect(payment.body.buyer).to.be.an("object");
            expect(payment.body.buyer.name).to.not.be.undefined;
            expect(payment.body.buyer.email).to.not.be.undefined;
            expect(payment.body.buyer.cpf).to.not.be.undefined;
            expect(payment.body.paymentInformation).to.not.be.undefined;
            expect(payment.body.paymentInformation).to.be.an("object");
            expect(payment.body.paymentInformation.amount).to.not.be.undefined;
            expect(payment.body.paymentInformation.type).to.not.be.undefined;
            expect(payment.body.paymentInformation.status).to.not.be.undefined;
            expect(payment.body.paymentInformation.card).to.not.be.undefined;
            expect(payment.body.paymentInformation.card).to.be.an("object");
            expect(
              payment.body.paymentInformation.card.holderName
            ).to.not.be.undefined;
            expect(
              payment.body.paymentInformation.card.number
            ).to.not.be.undefined;
            expect(
              payment.body.paymentInformation.card.expirationDate
            ).to.not.be.undefined;
            expect(
              payment.body.paymentInformation.card.cvv
            ).to.not.be.undefined;

            /* Checking if the values returned from our endpoint is the same as the payment we created before. */
            expect(payment.body.client.id).to.equal(
              _this.paymentCreditCardJSON.client.id
            );
            expect(payment.body.buyer.name).to.equal(
              _this.paymentCreditCardJSON.buyer.name
            );
            expect(payment.body.buyer.email).to.equal(
              _this.paymentCreditCardJSON.buyer.email
            );
            expect(payment.body.buyer.cpf).to.equal(
              _this.paymentCreditCardJSON.buyer.cpf
            );
            expect(payment.body.paymentInformation.amount).to.equal(
              _this.paymentCreditCardJSON.paymentInformation.amount
            );
            expect(payment.body.paymentInformation.type).to.equal(
              _this.paymentCreditCardJSON.paymentInformation.type
            );
            expect(payment.body.paymentInformation.status).to.equal(
              PaymentStatus.status.SUCCESS
            );
            expect(payment.body.paymentInformation.card.holderName).to.equal(
              _this.paymentCreditCardJSON.paymentInformation.card.holderName
            );
            expect(payment.body.paymentInformation.card.number).to.equal(
              _this.paymentCreditCardJSON.paymentInformation.card.number
            );
            expect(
              payment.body.paymentInformation.card.expirationDate
            ).to.equal(
              _this.paymentCreditCardJSON.paymentInformation.card.expirationDate
            );
            expect(payment.body.paymentInformation.card.cvv).to.equal(
              _this.paymentCreditCardJSON.paymentInformation.card.cvv
            );
            done();
          });
      });
  });

  it("Return payment created with boleto number. [BOLETO]", done => {
    const _this = this;

    this.testeServer
      .post("/api/v1/payment")
      .send(this.paymentBoletoJSON)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function(err, response) {
        expect(response).to.not.be.undefined;
        expect(response.body).to.not.be.undefined;
        expect(response.body.id).to.not.be.undefined;
        expect(response.body.boletoNumber).to.not.be.undefined;
        expect(response.body.boletoNumber).to.eql(
          "03399.63290 64000.000006 00125.201020 4 56140000017832"
        );

        /* Buscar Pagamento rescem criado pelo o seu id.  */
        _this.testeServer
          .get(`/api/v1/payment/${response.body.id}`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end(function(err, payment) {
            /* Check if properties exists before validation values. */
            expect(payment).to.not.be.undefined;
            expect(payment.body).to.not.be.undefined;
            expect(payment.body.id).to.not.be.undefined;
            expect(payment.body.client).to.not.be.undefined;
            expect(payment.body.client).to.be.an("object");
            expect(payment.body.client.id).to.not.be.undefined;
            expect(payment.body.buyer).to.not.be.undefined;
            expect(payment.body.buyer).to.be.an("object");
            expect(payment.body.buyer.name).to.not.be.undefined;
            expect(payment.body.buyer.email).to.not.be.undefined;
            expect(payment.body.buyer.cpf).to.not.be.undefined;
            expect(payment.body.paymentInformation).to.not.be.undefined;
            expect(payment.body.paymentInformation).to.be.an("object");
            expect(payment.body.paymentInformation.amount).to.not.be.undefined;
            expect(payment.body.paymentInformation.type).to.not.be.undefined;
            expect(payment.body.paymentInformation.status).to.not.be.undefined;
            expect(
              payment.body.paymentInformation.boletoNumber
            ).to.not.be.undefined;

            /* Checking if the values returned from our endpoint is the same as the payment we created before. */
            expect(payment.body.client.id).to.equal(
              _this.paymentBoletoJSON.client.id
            );
            expect(payment.body.buyer.name).to.equal(
              _this.paymentBoletoJSON.buyer.name
            );
            expect(payment.body.buyer.email).to.equal(
              _this.paymentBoletoJSON.buyer.email
            );
            expect(payment.body.buyer.cpf).to.equal(
              _this.paymentBoletoJSON.buyer.cpf
            );
            expect(payment.body.paymentInformation.amount).to.equal(
              _this.paymentBoletoJSON.paymentInformation.amount
            );
            expect(payment.body.paymentInformation.type).to.equal(
              _this.paymentBoletoJSON.paymentInformation.type
            );
            expect(payment.body.paymentInformation.status).to.equal(
              PaymentStatus.status.SUCCESS
            );
            expect(payment.body.paymentInformation.boletoNumber).to.equal(
              "03399.63290 64000.000006 00125.201020 4 56140000017832"
            );

            done();
          });
      });
  });

  /**
   * Payment findById SUCCESS
   * @end
   */
});
