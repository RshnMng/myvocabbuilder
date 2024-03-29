import { Context } from "../App";
import { useContext, useState } from "react";
// import { Link } from "react-router-dom";

export default function Fued() {
  let app = useContext(Context);
  let state = app.state;
  let setState = app.setState;
  let foundWord = state.foundWord;
  let searchWord = state.searchWord;
  let definitions = state.definitions;
  // let associatedWords = state.associatedWords;
  let synCopy = state.synCopy;
  // let antonyms = state.antCopy;
  // let saveToDeck = state.saveToDeck;

  console.log(state);

  function handleChange(event) {
    let answer = event.target.value;
    setState((prevState) => {
      return { ...prevState, userAnswer: answer };
    });
  }

  function isCorrect(word, array) {
    let inArray = array.includes(word);

    inArray ? displayAnswer() : showX();
  }

  function displayAnswer() {
    let answerHTML = document.getElementsByClassName("fued-answer");
    let answerElem = Array.from(answerHTML);
    findOpenIndex(answerElem, state.usedIndex);
    removeFromCopyList(state.userAnswer, synCopy, "synCopy");
  }

  function findOpenIndex(ansarr, arr) {
    let randomIndex = Math.floor(Math.random() * 6);
    arr.includes(randomIndex)
      ? findOpenIndex(ansarr, arr)
      : setState((prevState) => {
          ansarr[randomIndex].textContent = state.userAnswer;
          arr.push(randomIndex);
          return { ...prevState, usedIndex: arr };
        });
  }

  function removeFromCopyList(answer, array, name) {
    console.log({ [array]: array });
    let newArr;
    console.log(array.includes(answer));
    array.includes(answer) ? (newArr = array.filter((items) => items !== answer)) : (newArr = array);
    console.log(newArr);
    setState((prevState) => {
      return { ...prevState, [name]: newArr };
    });
  }

  // we also need to create a copy of these arrays we can modify in the dojo state, so
  // we can remove the correct answers as we come acorss them so we can make sure duplicate
  // answers are not recognized

  function showX() {
    console.log("X");
  }

  return (
    <>
      <div className="dict-def-display">
        <div className="def-title">{foundWord === "" ? searchWord : foundWord}</div>
        <div className="def-definitions">
          {Object.keys(definitions).map((partOfSpeech, i) => {
            return (
              <div key={i}>
                <div>{partOfSpeech}</div>
                <div>{definitions[partOfSpeech]}</div>
              </div>
            );
          })}
        </div>
        <div className="fued-answer">1</div>
        <div className="fued-answer">2</div>
        <div className="fued-answer">3</div>
        <div className="fued-answer">4</div>
        <div className="fued-answer">5</div>
        <div className="fued-answer">6</div>

        <input type="text" className="fued-input" onChange={(event) => handleChange(event)}></input>
        <button onClick={() => isCorrect(state.userAnswer, synCopy)}>enter</button>

        {/* <div className="def-synonyms">
          <WordSections title="Synonyms" array={synonyms} limit={6} index={0} />
        </div>

        <div className="def-antonyms">
          <WordSections title="Antonyms" array={antonyms} limit={6} index={0} />
        </div> */}
        {/* <div className="study-btn-div d-flex">
          <button className="study-btn" onClick={() => saveToDeck(state, "studyDeck")}>
            add to study
          </button>
          <button className="fav-btn" onClick={() => saveToDeck(state, "favDeck")}>
            add to favorites
          </button>
          <Link to="/trainer">
            <button className="def-home-btn">Go To Trainer</button>
          </Link> */}
        {/* </div> */}
      </div>
    </>
  );
}

// make so you can choose antonoyms or synonyms to train; adjust functions to repsond properly to choices
// make so if answer is entered that has already been answered the user is alerted
// if all 6 anwers are answered ask if they want to do 6 more?
// choose how many definitions are goinng to be put, create a see more button for it (dictionary side and dojo side)
// is dojo going to pool all anytonyms and synonyms for a word or just one particular usage?
// create save to dojo button
// create save to dojo deck
// add home btn or some button to navigate out of this page
// also create place holder display for the period before someone searches thier first word
// make it so all synonyms and antonym can be clicked on and when clicked on it fires the handle search function searching the clicked word
// make it so when you do search a new word that the limit for both the anytonym and synonyms are set back to 6
