import cards from "./data/cards";

class Dealer {
  constructor() {
    this.deck = [];
    this.dealtCards = [];
  }

  shuffle() {
    this.deck = cards.suits.flatMap((suit) =>
      cards.values.map((value) => value + suit)
    );
    this.deck.sort(() => Math.random() - 0.5);
  }

  reset() {
    this.deck = [];
    this.dealtCards = [];
    this.shuffle();
  }

  deal() {
    if (this.deck.length === 0) {
      return "No more cards in the deck";
    }

    const card = this.deck.pop();
    this.dealtCards.push(card);
    return card;
  }
}

export default Dealer;
