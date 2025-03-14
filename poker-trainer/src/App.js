import "./App.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Dealer from "./dealer";

function App() {
  const [hand, updateHand] = useState([]);
  const [dealer] = useState(new Dealer());

  function dealCards(numberOfCards) {
    const newHand = [];
    for (let i = 0; i < numberOfCards; i++) {
      newHand.push(dealer.deal());
    }
    updateHand(newHand);
  }

  function resetDeck() {
    dealer.reset();
    updateHand([]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Poker Trainer</h1>
        <p>Let's learn poker!</p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button variant="primary" onClick={() => dealCards(2)}>
            Deal
          </Button>
          <Button variant="secondary" onClick={() => dealer.shuffle()}>
            Shuffle
          </Button>
          <Button variant="danger" onClick={() => resetDeck()}>
            Reset
          </Button>
        </div>
        <p>
          {hand.map((card) => (
            <span
              key={card}
              style={{
                color:
                  card.includes("♥") || card.includes("♦") ? "red" : "black",
              }}
            >
              {card}
            </span>
          ))}
        </p>
      </header>
    </div>
  );
}

export default App;
