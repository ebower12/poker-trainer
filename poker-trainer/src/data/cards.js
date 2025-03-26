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
    let id = 2; // only unique within a suit

    for (const value of values) {
      const card = { id, value, suit };
      if (value === "A") {
        card.altId = 1; // Assign alternate ID for Ace
      }
      deck.push(card);
      id++;
    }
  }

  return deck;
};

export default cards;
