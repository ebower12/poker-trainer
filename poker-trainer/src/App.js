import "./css/App.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Dealer from "./dealer";
import calculateOuts from "./util";

function App() {
  const [hand, updateHand] = useState([]);
  const [tableCards, updateTableCards] = useState([]);
  const [availableHands, updateAvailableHands] = useState({});
  const [outs, updateOuts] = useState(0);
  const [isDeckEmpty, setIsDeckEmpty] = useState(false);
  const [currentPhase, setCurrentPhase] = useState("pre-flop");
  const [dealer] = useState(new Dealer());

  function resetDeck() {
    dealer.reset();
    setIsDeckEmpty(false);
    setCurrentPhase("pre-flop");
    updateHand([]);
    updateTableCards([]);
    updateAvailableHands({});
    updateOuts(0);
  }

  function dealHand() {
    const newHand = [];
    for (let i = 0; i < 2; i++) {
      const nextCard = dealer.deal();

      if (nextCard === "No more cards in the deck") {
        setIsDeckEmpty(true);
        break;
      } else {
        newHand.push(nextCard);
        updateHand(newHand);
      }
    }
  }

  function dealTable() {
    const newTable = tableCards;
    let numberOfCards = 2;
    let nextPhase = currentPhase;

    switch (currentPhase) {
      case "pre-flop":
        numberOfCards = 3;
        nextPhase = "flop";
        break;
      case "flop":
        numberOfCards = 1;
        nextPhase = "turn";
        break;
      case "turn":
        numberOfCards = 1;
        nextPhase = "river";
        break;
      case "river":
        numberOfCards = 0;
        nextPhase = "pre-flop";
        break;
      default:
        break;
    }

    for (let i = 0; i < numberOfCards; i++) {
      const nextCard = dealer.deal();

      if (nextCard === "No more cards in the deck") {
        setIsDeckEmpty(true);
        break;
      }

      newTable.push(nextCard);
    }

    updateTableCards(newTable);
    setCurrentPhase(nextPhase);

    const { availableHands, outs } = calculateOuts(hand, newTable);
    updateAvailableHands(availableHands);
    updateOuts(outs);
  }

  const renderCards = (cards) => {
    return cards.map((card) => (
      <span
        key={`${card.value}${card.suit}`}
        style={{
          margin: "0 5px",
          color: ["♥", "♦"].includes(card.suit) ? "red" : "black",
        }}
      >
        {`${card.value}${card.suit}`}
      </span>
    ));
  };

  const renderAvailableHands = (availableHands) => {
    console.log(availableHands);
    for (const hand in availableHands) {
      return <li>{JSON.stringify(availableHands[hand])}</li>;
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Poker Trainer</h1>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button
            variant="primary"
            disabled={isDeckEmpty}
            onClick={() => dealHand()}
          >
            Deal Hand
          </Button>
          <Button
            variant="success"
            disabled={currentPhase === "river"}
            onClick={() => dealTable()}
          >
            Deal Table
          </Button>
          <Button variant="danger" onClick={() => resetDeck()}>
            Reset
          </Button>
        </div>
        <div>
          <h2>{`Current phase: ${currentPhase}`}</h2>
          {isDeckEmpty && <p>No more cards in the deck!</p>}
          <p>
            Table:
            {renderCards(tableCards)}
          </p>
          <p>
            Hand:
            {renderCards(hand)}
          </p>
          <div>
            AvailableHands:
            <ul>
              {Object.keys(availableHands).map((hand) => {
                if (availableHands[hand].length > 0) {
                  return <li key={hand}>{hand}</li>;
                }
              })}
            </ul>
          </div>
          <p>{`Outs: ${outs}`}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
