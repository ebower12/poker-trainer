import sortBy from "lodash/sortBy";
import uniq from "lodash/uniq";
import { suits } from "./data/cards";
import outs from "./data/outs";

const getCardsInARow = (cards) => {
  let longestSeries = [];
  let currentSeries = [];

  for (let i = 0; i < cards.length - 1; i++) {
    const currentCard = cards[i];
    const nextCard = cards[i + 1];

    if (
      nextCard.id === currentCard.id + 1 ||
      nextCard.id === currentCard.altId + 1
    ) {
      currentSeries.push(currentCard);
    } else {
      currentSeries.push(currentCard);
      if (currentSeries.length > longestSeries.length) {
        longestSeries = currentSeries;
      }
      currentSeries = [];
    }
  }

  // Be sure to capture the last card as well
  if (currentSeries.length > 0) {
    currentSeries.push(cards[cards.length - 1]);
    if (currentSeries.length > longestSeries.length) {
      longestSeries = currentSeries;
    }
  }

  return longestSeries;
};

const isOneAwayFromSeries = (cards) => {
  let gaps = [];

  for (let i = 0; i < cards.length - 1; i++) {
    const gap = cards[i + 1].id - cards[i].id;

    if (gap > 1) {
      for (let j = 1; j < gap; j++) {
        gaps.push(cards[i].id + j);
      }
    }
  }

  const uniqueGaps = uniq(gaps);
  return uniqueGaps.length === 1;
};

const getDraws = (cards, suitedCards, cardsInARow) => {
  let flushDraw = [];
  let openEndedStraightFlushDraw = [];
  let insideStraightFlushDraw = [];
  let openEndedStraightDraw = cardsInARow.length === 4 ? cardsInARow : [];

  const insideStraightDraw = isOneAwayFromSeries(cards) ? cards : [];
  const noPair = cards.filter(
    (card) => ![...flushDraw, ...openEndedStraightDraw].includes(card)
  );

  const isSameSuit = openEndedStraightDraw.every(
    (card) => card.suit === openEndedStraightDraw[0].suit
  );

  if (openEndedStraightDraw.length > 0 && isSameSuit) {
    openEndedStraightFlushDraw = openEndedStraightDraw;
  }

  for (const suit of suits) {
    const relevantCards = suitedCards[suit];

    if (relevantCards.length === 4) {
      flushDraw = relevantCards;
    }

    if (isOneAwayFromSeries(relevantCards)) {
      insideStraightFlushDraw = relevantCards;
    }
  }

  return [
    {
      noPair,
      flushDraw,
      insideStraightDraw,
      openEndedStraightDraw,
      insideStraightFlushDraw,
      openEndedStraightFlushDraw,
    },
  ];
};

const getSuitedCards = (cards) => {
  const result = {};

  for (const suit of suits) {
    const suitedCards = cards.filter((card) => card.suit === suit);
    result[suit] = suitedCards;
  }

  return result;
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

const getFlush = (suitedCards) => {
  let flushCards = [];

  for (const suit of suits) {
    if (suitedCards[suit].length >= 5) {
      flushCards = suitedCards[suit];
    }
  }

  return flushCards;
};

function determineHand(hand, table) {
  const cards = sortBy([...hand, ...table], ["id"]);
  const suitedCards = getSuitedCards(cards);
  const cardsInARow = getCardsInARow(cards);
  console.log(cardsInARow);

  const highCard = [cards[cards.length - 1]];
  const pair = getDuplicates(cards, 2);
  const threeOfAKind = getDuplicates(cards, 3);
  const fourOfAKind = getDuplicates(cards, 4);
  const twoPair = pair.length > 1 ? pair : [];
  const fullHouse =
    pair.length > 0 && threeOfAKind.length > 0
      ? [...pair, ...threeOfAKind]
      : [];
  const flush = getFlush(suitedCards);
  const straight = cardsInARow.length >= 5 ? cardsInARow : [];
  const draw = getDraws(cards, suitedCards, cardsInARow);

  const isSameSuit = straight.every((card) => card.suit === straight[0].suit);
  const straightFlush = straight.length > 0 && isSameSuit ? straight : [];

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
  console.log(hands);

  return hands;
}

function mapHandsToOuts(hands) {
  const mappedOuts = {};

  outs.forEach((out) => {
    if (hands[out.hand] && hands[out.hand].length > 0) {
      mappedOuts[out.hand] = out.outs;
    }
  });

  if (hands.draw && hands.draw.length > 0) {
    const drawHand = hands.draw[0];

    Object.keys(drawHand).forEach((drawType) => {
      if (drawHand[drawType].length > 0) {
        mappedOuts[drawType] =
          outs.find((out) => out.hand === drawType)?.outs || 0;
      }
    });
  }

  const totalOuts = Object.values(mappedOuts).reduce(
    (acc, curr) => acc + curr,
    0
  );

  return { mappedOuts, totalOuts };
}

function calculateOuts(hand, table) {
  const availableHands = determineHand(hand, table);
  const mappedOuts = mapHandsToOuts(availableHands);
  console.log(mappedOuts);

  return { availableHands, outs: mappedOuts.totalOuts };
}

export default calculateOuts;
