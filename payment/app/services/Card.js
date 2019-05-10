// const Card = require("../models/card/Card");
//export default class CardService extends Card {

export default class CardService {
  /**
   * Método responsável pela validação do numero informado do cartão de crédito.
   */
  validateNumber(number) {}

  /**
   * Método responsável pela validação da data de vencimento informada do cartão de crédito.
   * Aqui podemos validar se a data informada está vencida ou não.
   */
  validateExpirationDate(expirationDate) {}

  /**
   * Verificar se o CVV informado está no range esperado.
   */
  validateCvv(cvv) {}
}
