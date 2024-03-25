import { useState } from "react";

export default function (props) {
  let { name } = props;
  console.log(name);
  let cardsJSON = localStorage.getItem(name);
  let studyCards = JSON.parse(cardsJSON);
  let [state, setState] = useState({
    thisDeck: studyCards,
    currentIndex: 0,
    front: true,
    infavsDeck: "",
    inStruggleDeck: "",
    favDeck: [],
    struggleDeck: [],
    studyDeck: [],
    shuffle: false,
    currentCard: 1,
  });

  function flipCard() {
    setState((prevState) => {
      return { ...prevState, front: !prevState.front };
    });
  }

  function correct(event) {
    setState((prevState) => {
      event.target.value == "correct" ? state.thisDeck[state.currentIndex].correct.push(true) : state.thisDeck[state.currentIndex].correct.push(false);
      let index = state.currentIndex + 1;
      index >= state.thisDeck.length ? (index = 0) : (index = index);
      state.currentCard >= state.thisDeck.length && (state.currentCard = 0);
      return { ...prevState, currentIndex: index, front: true, currentCard: prevState.currentCard + 1 };
    });
  }

  function prevCard() {
    setState((prevState) => {
      let index = state.currentIndex - 1;
      index <= 0 ? (index = 0) : (index = index);
      state.currentCard <= state.thisDeck.length && (state.currentCard = 2);
      return { ...prevState, currentIndex: index, front: true, currentCard: prevState.currentCard - 1 };
    });
  }

  function addToDifferentDeck(cardInfo, name) {
    let card = {
      word: cardInfo.word,
      def: cardInfo.def,
      associatedWords: cardInfo.associatedWords,
      syns: cardInfo.syns,
      ants: cardInfo.ants,
      correct: [],
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
      return wordInfo.word !== state.thisDeck[state.currentIndex].word;
    });
    setState((prevState) => {
      return { ...prevState, [name]: newDeck, thisDeck: newDeck, front: true };
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

  console.log(state);

  return (
    <>
      {state.thisDeck === null || state.thisDeck.length === 0 ? (
        <div>deck is empty</div>
      ) : state.front ? (
        <div className="col-5 card-display m-auto">
          <div>
            card {state.currentCard}/{state.thisDeck.length}
          </div>
          <div>{state.thisDeck[state.currentIndex].word}</div>
          {state.shuffle ? <button onClick={() => shuffleOff()}>shuffle off</button> : <button onClick={() => shuffleOn()}>shuffle on</button>}
          <button onClick={() => flipCard()}>show answer</button>
        </div>
      ) : (
        <div className="col-5 card-display m-auto">
          <div>
            card {state.currentCard}/{state.thisDeck.length}
          </div>
          <div>{state.thisDeck[state.currentIndex].word}</div>
          {Object.keys(state.thisDeck[state.currentIndex].def).map((partOfSpeech) => {
            return (
              <>
                <div>{partOfSpeech}</div>
                <div>{state.thisDeck[state.currentIndex].def[partOfSpeech]}</div>
              </>
            );
          })}
          <button onClick={() => prevCard()}>Previous Card</button>
          {state.shuffle ? <button onClick={() => shuffleOn()}>Incorrect</button> : <button onClick={(event) => correct(event)}>Incorrect</button>}
          {state.shuffle ? <button onClick={() => shuffleOn()}>Correct</button> : <button onClick={(event) => correct(event)}>Correct</button>}
          {state.shuffle ? <button onClick={() => shuffleOff()}>Shuffle Off</button> : <button onClick={() => shuffleOn()}>Shuffle</button>}
          {checkIfInDeck("studyDeck", state.thisDeck[state.currentIndex].word) && (
            <button
              onClick={() => {
                removeCard("studyDeck");
              }}
            >
              Remove From Study Deck
            </button>
          )}
          {checkIfInDeck("favDeck", state.thisDeck[state.currentIndex].word) ? (
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
                addToDifferentDeck(state.thisDeck[state.currentIndex], "favDeck");
                let indeck = checkIfInDeck("favDeck", state.thisDeck[state.currentIndex].word);
                setState((prevState) => {
                  return { ...prevState, infavsDeck: indeck };
                });
              }}
            >
              Add To Favorites
            </button>
          )}
          {checkIfInDeck("struggleDeck", state.thisDeck[state.currentIndex].word) ? (
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
                addToDifferentDeck(state.thisDeck[state.currentIndex], "struggleDeck");
                let indeck = checkIfInDeck("favDeck", state.thisDeck[state.currentIndex].word);
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
