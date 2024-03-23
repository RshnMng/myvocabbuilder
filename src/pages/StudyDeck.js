import { useState, useEffect } from "react";

export default function StudyDeck() {
  let cardsJSON = localStorage.getItem("studyDeck");
  let studyCards = JSON.parse(cardsJSON);
  let [state, setState] = useState({
    deckCards: studyCards,
    currentIndex: 0,
    front: true,
    infavsDeck: "",
    inStruggleDeck: "",
  });

  function flipCard() {
    setState((prevState) => {
      return { ...prevState, front: !prevState.front };
    });
  }

  function nextCard() {
    setState((prevState) => {
      let index = state.currentIndex + 1;
      index >= state.deckCards.length ? (index = 0) : (index = index);
      return { ...prevState, currentIndex: index, front: true };
    });
  }

  function prevCard() {
    setState((prevState) => {
      let index = state.currentIndex - 1;
      index <= 0 ? (index = state.deckCards.length - 1) : (index = index);
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

  // switch buttons to remove if already in deck
  // delete card
  // shuffle deck

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

  return (
    <>
      {state.front ? (
        <div className="col-5 card-display m-auto">
          <div>{state.deckCards[state.currentIndex].word}</div>
          <button onClick={() => flipCard()}>show answer</button>
        </div>
      ) : (
        <div className="col-5 card-display m-auto">
          <div>{state.deckCards[state.currentIndex].word}</div>
          <div>{state.deckCards[state.currentIndex].def.adjective}</div>
          <button onClick={() => prevCard()}>Previous Card</button>
          <button onClick={() => nextCard()}>Next Card</button>
          {checkIfInDeck("favDeck", state.deckCards[state.currentIndex].word) ? (
            <button>Remove From Favorites</button>
          ) : (
            <button
              onClick={() => {
                addToDifferentDeck(state.deckCards[state.currentIndex], "favDeck");
                let indeck = checkIfInDeck("favDeck", state.deckCards[state.currentIndex].word);
                setState((prevState) => {
                  return { ...prevState, infavsDeck: indeck };
                });
              }}
            >
              Add To Favorites
            </button>
          )}
          {checkIfInDeck("struggleDeck", state.deckCards[state.currentIndex].word) ? (
            <button>Remove From Struggle Deck</button>
          ) : (
            <button
              onClick={() => {
                addToDifferentDeck(state.deckCards[state.currentIndex], "struggleDeck");
                let indeck = checkIfInDeck("favDeck", state.deckCards[state.currentIndex].word);
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

// add remove from deck functionality along with setting state so page rerenders
