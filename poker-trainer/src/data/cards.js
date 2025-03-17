export const suits = ["♥", "♦", "♣", "♠"];
export const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

const cards = () => {
  const deck = [];

  for (const suit of suits) {
    let id = 1; // only unique within a suit

    for (const value of values) {
      deck.push({ id, value, suit });
      id++;
    }
  }

  return deck;
};

export default cards;
