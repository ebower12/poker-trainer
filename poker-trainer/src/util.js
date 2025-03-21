import sortBy from "lodash/sortBy";
import uniq from "lodash/uniq";
import { suits } from "./data/cards";
import outs from "./data/outs";

const getCardsInARow = (cards) => {
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

  return cardsInARow;
};

const getDraws = (cards, suitedCards, cardsInARow) => {
  const flushDrawCards = suitedCards.length === 4 ? suitedCards : [];
  const straightDrawCards = cardsInARow === 4 ? cardsInARow : [];
  const noPairDrawCards = cards.filter(
    (card) => ![...flushDrawCards, ...straightDrawCards].includes(card)
  );

  const result = {
    noPair: noPairDrawCards,
    flushDraw: flushDrawCards,
    insideStraightDraw: [],
    openEndedStraightDraw: [],
    insideStraightFlushDraw: [],
    openEndedStraightFlushDraw: [],
  };

  if (straightDrawCards.length > 0) {
  }
};

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
  const cardsInARow = getCardsInARow(cards);
  return cardsInARow.length >= 5 ? cardsInARow : [];
};

const getStraightFlush = (straight) => {
  const suits = straight.map((card) => card.suit);
  const uniqueSuits = uniq(suits);
  return uniqueSuits.length === 1 ? straight : [];
};

function determineHand(hand, table) {
  const cards = sortBy([...hand, ...table], ["id"]);

  const highCard = [cards[cards.length - 1]];
  const pair = getDuplicates(cards, 2);
  const threeOfAKind = getDuplicates(cards, 3);
  const fourOfAKind = getDuplicates(cards, 4);
  const twoPair = pair.length > 1 ? pair : [];
  const fullHouse =
    pair.length > 0 && threeOfAKind.length > 0
      ? [...pair, ...threeOfAKind]
      : [];
  const flush = getFlush(cards);
  const straight = getStraight(cards);
  const straightFlush =
    flush.length > 0 && straight.length > 0 ? getStraightFlush(straight) : [];
  const draw = getDraws(cards, flush, straight);

  const hands = {
    draw,
    highCard,
    pair,
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

function mapHandsToOuts(hands) {}

function calculateOuts(hand, table) {
  let outsCount = 0;
  const availableHands = determineHand(hand, table);
  console.log(availableHands);

  outs.forEach((out) => {
    if (availableHands[out.hand].length > 0) {
      outsCount += out.outs;
    }
  });

  return { availableHands, outs: outsCount };
}

export default calculateOuts;
