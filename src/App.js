import "./App.css";
import { useState, useEffect } from "react";
import SingleCard from "./components/SingleCard";

const disneyPrincesses = [
  { src: "img/snow1.png", matched: false },
  { src: "img/cinderella1.png", matched: false },
  { src: "img/aurora1.png", matched: false },
  { src: "img/ariel.png", matched: false },
  { src: "img/jasmine.png", matched: false },
  { src: "img/mulan.png", matched: false },
];

const disneyHeroines = [
  { src: "img/esmeralda.png", matched: false },
  { src: "img/giselle.png", matched: false },
  { src: "img/jessica.png", matched: false },
  { src: "img/neverland-mermaids.png", matched: false },
  { src: "img/alice.png", matched: false },
  { src: "img/poca1.png", matched: false },
];

const disney3DCharacters = [
  { src: "img/moana.png", matched: false },
  { src: "img/merida1.png", matched: false },
  { src: "img/elsa1.png", matched: false },
  { src: "img/elsa2.png", matched: false },
  { src: "img/rapunzel.png", matched: false },
  { src: "img/vanellope1.png", matched: false },
];

const characterMix = [
  { src: "img/rey1.png", matched: false },
  { src: "img/kylo.png", matched: false },
  { src: "img/daenerys.png", matched: false },
  { src: "img/cersei.png", matched: false },
  { src: "img/aurora2.png", matched: false },
  { src: "img/vanellope2.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isShowingDisneyDecks, setIsShowingDisneyDecks] = useState(false);
  const [deck, setDeck] = useState(null);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...deck, ...deck]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const changeDeck = (deckChoice) => {
    setDeck(deckChoice);
    shuffleCards();
    //setDeck(deck);
  };

  const toggleDisneyButtons = () =>
    setIsShowingDisneyDecks(!isShowingDisneyDecks);

  //compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 750);
      }
    }
  }, [choiceOne, choiceTwo]);

  //if deck changes, reshuffle cards
  useEffect(() => {
    if (deck) {
      shuffleCards();
    }
  }, [deck]);

  //reset choices & increase turn
  function resetTurn() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  }

  /*   // start a new game automatically
  useEffect(() => {
    shuffleCards(deck);
  }, []); */

  return (
    <div className="App">
      <h1>Disney Memory Game</h1>
      <p>
        Choose your deck by clicking the categories below and test your memory!
      </p>
      <button
        onClick={() => toggleDisneyButtons()}
        className={isShowingDisneyDecks ? "selected" : ""}
      >
        Disney Decks
      </button>
      <button disabled>New Category Coming Soon!</button>
      {isShowingDisneyDecks ? (
        <div>
          <button
            className="second-menu-button"
            onClick={() => changeDeck(disneyPrincesses)}
          >
            Disney Princesses
          </button>
          <button
            className="second-menu-button"
            onClick={() => changeDeck(disneyHeroines)}
          >
            Disney Heroines
          </button>
          <button
            className="second-menu-button"
            onClick={() => changeDeck(disney3DCharacters)}
          >
            Disney 3D Characters
          </button>
          <button
            className="second-menu-button"
            onClick={() => changeDeck(characterMix)}
          >
            Character Mix
          </button>
        </div>
      ) : (
        <span></span>
      )}

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === choiceOne || card === choiceTwo || card.matched === true
            }
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
