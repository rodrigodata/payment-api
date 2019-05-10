/* Importação de Models */
const Buyer = require("@models/buyer/Buyer");

class BuyerBuilder {
  setName(name) {
    this._name = name;
    return this;
  }

  setEmail(email) {
    this._email = email;
    return this;
  }

  setCpf(cpf) {
    this._cpf = cpf;
    return this;
  }

  build() {
    return new Buyer(this);
  }

  get name() {
    return this._name;
  }
  get email() {
    return this._email;
  }
  get cpf() {
    return this._cpf;
  }
}

module.exports = BuyerBuilder;
