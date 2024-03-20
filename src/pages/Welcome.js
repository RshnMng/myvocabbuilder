import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";

export default function Welcome() {
  let [state, setState] = useState({
    cardsArr: [
      {
        title: "look up definitions and synonyms",
        id: 1,
      },
      {
        title: "build your vocab by testing your synonyms and anytonyms",
        id: 2,
      },
      {
        title: "save words to study deck to go over later",
        id: 3,
      },
    ],
    cards: [],
  });

  function makeCards() {
    let cards = state.cardsArr.map((obj) => {
      return <FeatureCard key={obj.id} title={obj.title} />;
    });
    setState((prevState) => {
      return { ...prevState, cards: cards };
    });
  }

  function goBack() {
    let copy = state;
    console.log(copy);
    let firstItem = copy.cardsArr.shift();
    copy.cardsArr.push(firstItem);
    setState((prevState) => {
      return { ...prevState, cardsArr: copy };
    });
    makeCards();
  }

  function goNext() {
    let copy = state;
    let lastItem = copy.cardsArr.pop();
    copy.cardsArr.unshift(lastItem);
    setState((prevState) => {
      return { ...prevState, cardsArr: copy };
    });
    makeCards();
  }

  useCallback(makeCards, [state]);
  return (
    <>
      <div className="container-fluid welcome">
        <div className="welcome-title col-12 mb-5">Welcome to Vocab Builder</div>
        <div className="welcome-cards-display col-12 d-flex">{state.cards}</div>
        <div className="welcome-btns col-4 m-auto">
          <button onClick={() => goBack()}>back</button>
          <Link to="/choose">
            <button>enter</button>
          </Link>
          <button onClick={() => goNext()}>next</button>
        </div>
      </div>
    </>
  );
}
