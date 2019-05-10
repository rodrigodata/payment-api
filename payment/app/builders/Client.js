/* Importação de Models */
const Client = require("@models/client/Client");

class ClientBuilder {
  setId(id) {
    this._id = id;
    return this;
  }

  build() {
    return new Client(this);
  }

  get id() {
    return this._id;
  }
}

module.exports = ClientBuilder;
