class Card {
  constructor(card) {
    this.holderName = card.holderName;
    this.number = card.number;
    this.expirationDate = card.expirationDate;
    this.cvv = card.cvv;
  }
}

module.exports = Card;
