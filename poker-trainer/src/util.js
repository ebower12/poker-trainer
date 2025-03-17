import sortBy from "lodash/sortBy";
import uniq from "lodash/uniq";
import { suits } from "./data/cards";
import outs from "./data/outs";

const getDuplicates = (cards, numberOfDupes) => {
  const cardCounts = {};
  const groups = [];

  for (const card of cards) {
    if (cardCounts[card.value]) {
      cardCounts[card.value]++;
    } else {
      cardCounts[card.value] = 1;
    }
  }

  for (const card in cardCounts) {
    if (cardCounts[card] === numberOfDupes) {
      const relevantCards = cards.filter((fullCard) => fullCard.value === card);
      groups.push(relevantCards);
    }
  }

  return groups;
};

const getFlush = (cards) => {
  let flushCards = [];

  for (const suit of suits) {
    const suitedCards = cards.filter((card) => card.suit === suit);
    if (suitedCards.length >= 5) {
      flushCards = suitedCards;
    }
  }

  return flushCards;
};

const getStraight = (cards) => {
  let cardsInARow = [];

  for (let i = 0; i < cards.length - 1; i++) {
    const currentCard = cards[i];
    const nextCard = cards[i + 1];

    if (nextCard.id === currentCard.id + 1) {
      cardsInARow.push(currentCard);
    } else {
      cardsInARow = [];
    }
  }

  // Be sure to capture the last card as well
  if (cardsInARow.length > 0) {
    const lastCard = cards[cards.length - 1];
    const prevCard = cards[cards.length - 2];

    if (lastCard.id === prevCard.id + 1) {
      cardsInARow.push(lastCard);
    }
  }

  return cardsInARow.length >= 5 ? cardsInARow : [];
};

const getStraightFlush = (straight) => {
  const suits = straight.map((card) => card.suit);
  const uniqueSuits = uniq(suits);
  return uniqueSuits.length === 1 ? straight : [];
};

function determineHand(hand, table) {
  const cards = sortBy([...hand, ...table], ["id"]);

  const highCard = cards[cards.length - 1];
  const pairs = getDuplicates(cards, 2);
  const threeOfAKind = getDuplicates(cards, 3);
  const fourOfAKind = getDuplicates(cards, 4);
  const twoPair = pairs.length > 1 ? pairs : [];
  const fullHouse =
    pairs.length > 0 && threeOfAKind.length > 0
      ? [...pairs, ...threeOfAKind]
      : [];
  const flush = getFlush(cards);
  const straight = getStraight(cards);
  const straightFlush =
    flush.length > 0 && straight.length > 0 ? getStraightFlush(straight) : [];

  const hands = {
    highCard,
    pairs,
    threeOfAKind,
    fourOfAKind,
    twoPair,
    fullHouse,
    flush,
    straight,
    straightFlush,
  };

  return hands;
}

function calculateOuts(hand, table) {
  let outsCount = 0;
  const availableHands = determineHand(hand, table);
  console.log(availableHands);

  outs.forEach((out) => {
    if (hand.includes(out.hand)) {
      outsCount += out.outs;
    }
  });

  return outsCount;
}

export default calculateOuts;
