import { useState, useContext } from "react";
import { Context } from "../App";

export default function StudyDeck() {
  let cardsJSON = localStorage.getItem("studyDeck");
  let app = useContext(Context);
  let saveToDeck = app.saveToDeck;
  let studyCards = JSON.parse(cardsJSON);
  let [state, setState] = useState({
    deckCards: studyCards,
    currentIndex: 0,
    front: true,
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

  console.log(state);
  console.log(app);

  // add to struggle deck
  // delete card
  // shuffle deck

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
          {/* <button onClick={() => saveToDeck(state.deckCards[state.currentIndex], "favDeck")}>Add To Favorites</button> */}
          {/* <button onClick={() => saveToDeck(state.deckCards[state.currentIndex], "struggleDeck")}>Add To Struggle</button> */}
        </div>
      )}
    </>
  );
}
