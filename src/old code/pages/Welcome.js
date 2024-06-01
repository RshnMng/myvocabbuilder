import { useState } from "react";
import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";

export default function Welcome() {
  let [state, setState] = useState([
    {
      title: "look up definitions and synonyms",
      id: 1,
      link: "/dict&thes",
    },
    {
      title: "build your vocab by testing your synonyms and anytonyms",
      id: 2,
      link: "/trainer",
    },
    {
      title: "save words to study deck to go over later",
      id: 3,
      link: "/study",
    },
  ]);

  let cards = state.map((obj) => {
    return <FeatureCard key={obj.id} title={obj.title} link={obj.link} />;
  });

  function goBack() {
    let copy = state;
    let firstItem = copy.shift();
    copy.push(firstItem);
    setState([...copy]);
  }

  function goNext() {
    let copy = state;
    let lastItem = copy.pop();
    copy.unshift(lastItem);
    setState([...copy]);
  }

  return (
    <>
      <div className="container-fluid welcome">
        <div className="welcome-title col-12 mb-5">Welcome to Vocab Builder</div>
        <div className="welcome-cards-display col-12 d-flex justify-content-around">{cards}</div>
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

// add a link along with the feauted card component so that when its clicked it takes
// us to the correct page
