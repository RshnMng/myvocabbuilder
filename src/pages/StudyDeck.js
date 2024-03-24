import { useState } from "react";

export default function StudyDeck() {
  let cardsJSON = localStorage.getItem("studyDeck");
  let studyCards = JSON.parse(cardsJSON);
  let [state, setState] = useState({
    studyDeck: studyCards,
    currentIndex: 0,
    front: true,
    infavsDeck: "",
    inStruggleDeck: "",
    favDeck: [],
    struggleDeck: [],
    shuffle: false,
    currentCard: 1,
  });

  function flipCard() {
    setState((prevState) => {
      return { ...prevState, front: !prevState.front };
    });
  }

  function nextCard() {
    setState((prevState) => {
      let index = state.currentIndex + 1;
      index >= state.studyDeck.length ? (index = 0) : (index = index);
      return { ...prevState, currentIndex: index, front: true, currentCard: prevState.currentCard + 1 };
    });
  }

  function prevCard() {
    setState((prevState) => {
      let index = state.currentIndex - 1;
      index <= 0 ? (index = state.studyDeck.length - 1) : (index = index);
      return { ...prevState, currentIndex: index, front: true };
    });
  }

  function addToDifferentDeck(cardInfo, name) {
    let card = {
      word: cardInfo.word,
      def: cardInfo.def,
      associatedWords: cardInfo.associatedWords,
      syns: cardInfo.syns,
      ants: cardInfo.ants,
    };

    let deckJSON = localStorage.getItem(name);
    let deck;
    deckJSON == null ? (deck = []) : (deck = JSON.parse(deckJSON));
    deck.push(card);

    let arrayJSON = JSON.stringify(deck);
    localStorage.setItem(name, arrayJSON);
  }

  function removeCard(name) {
    let deckJSON = localStorage.getItem(name);
    let deck = JSON.parse(deckJSON);
    let newDeck = deck.filter((wordInfo) => {
      return wordInfo.word !== state.studyDeck[state.currentIndex].word;
    });
    setState((prevState) => {
      return { ...prevState, [name]: newDeck, front: true };
    });

    let newDeckJSON = JSON.stringify(newDeck);
    localStorage.setItem(name, newDeckJSON);
  }

  function checkIfInDeck(name, word) {
    let indeck = [];
    let deck;
    let deckJSON = localStorage.getItem(name);
    deckJSON == null ? (deck = []) : (deck = JSON.parse(deckJSON));
    deck.forEach((wordInfo) => {
      return wordInfo.word === word && indeck.push(true);
    });
    let result = indeck.includes(true);
    return result;
  }
  function shuffleOn() {
    let randomNum = Math.floor(Math.random() * state.studyDeck.length);
    setState((prevState) => {
      return { ...prevState, currentIndex: randomNum, shuffle: true, front: true };
    });
  }

  function shuffleOff() {
    setState((prevState) => {
      return { ...prevState, shuffle: false, front: true };
    });
  }

  return (
    <>
      {studyCards === null || studyCards.length === 0 ? (
        <div>deck is empty</div>
      ) : state.front ? (
        <div className="col-5 card-display m-auto">
          <div>
            card {state.currentCard}/{state.studyDeck.length}
          </div>
          <div>{state.studyDeck[state.currentIndex].word}</div>
          {state.shuffle ? <button onClick={() => shuffleOff()}>shuffle off</button> : <button onClick={() => shuffleOn()}>shuffle on</button>}
          <button onClick={() => flipCard()}>show answer</button>
        </div>
      ) : (
        <div className="col-5 card-display m-auto">
          <div>
            card {state.currentCard}/{state.studyDeck.length}
          </div>
          <div>{state.studyDeck[state.currentIndex].word}</div>
          {Object.keys(state.studyDeck[state.currentIndex].def).map((partOfSpeech) => {
            return (
              <>
                <div>{partOfSpeech}</div>
                <div>{state.studyDeck[state.currentIndex].def[partOfSpeech]}</div>
              </>
            );
          })}
          <button onClick={() => prevCard()}>Previous Card</button>
          {state.shuffle ? <button onClick={() => shuffleOn()}>Next Card</button> : <button onClick={() => nextCard()}>Next Card</button>}
          {state.shuffle ? <button onClick={() => shuffleOff()}>Shuffle Off</button> : <button onClick={() => shuffleOn()}>Shuffle</button>}
          <button
            onClick={() => {
              removeCard("studyDeck");
            }}
          >
            Remove From Study Deck
          </button>
          {checkIfInDeck("favDeck", state.studyDeck[state.currentIndex].word) ? (
            <button
              onClick={() => {
                removeCard("favDeck");
              }}
            >
              Remove From Favorites
            </button>
          ) : (
            <button
              onClick={() => {
                addToDifferentDeck(state.studyDeck[state.currentIndex], "favDeck");
                let indeck = checkIfInDeck("favDeck", state.studyDeck[state.currentIndex].word);
                setState((prevState) => {
                  return { ...prevState, infavsDeck: indeck };
                });
              }}
            >
              Add To Favorites
            </button>
          )}
          {checkIfInDeck("struggleDeck", state.studyDeck[state.currentIndex].word) ? (
            <button
              onClick={() => {
                removeCard("struggleDeck");
              }}
            >
              Remove From Struggle Deck
            </button>
          ) : (
            <button
              onClick={() => {
                addToDifferentDeck(state.studyDeck[state.currentIndex], "struggleDeck");
                let indeck = checkIfInDeck("favDeck", state.studyDeck[state.currentIndex].word);
                setState((prevState) => {
                  return { ...prevState, infavsDeck: indeck };
                });
              }}
            >
              Add To Struggle
            </button>
          )}
        </div>
      )}
    </>
  );
}

// make it so that a card can be clicked correct or
// incorrect and when does removes card from list for the session not remove from the deck, update card count
// make completed prompt for when the end of the deck is reached
// make previous button make the card counter go backwards
// make component reusable for all decks
