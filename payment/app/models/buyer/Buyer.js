class Buyer {
  /**
   *
   * @param {*} buyer
   */
  constructor(buyer) {
    this.name = buyer.name;
    this.email = buyer.email;
    this.cpf = buyer.cpf;
  }
}

module.exports = Buyer;
