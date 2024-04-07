import { Context } from "../App";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

export default function Fued() {
  let app = useContext(Context);
  let state = app.state;
  let setState = app.setState;
  let foundWord = state.foundWord;
  let searchWord = state.searchWord;
  let definitions = state.definitions;
  let firstUse = state.firstUse;
  let synCopy = state.synCopy;
  let antCopy = state.antCopy;
  let saveToDeck = state.saveToDeck;
  let synAntChoice = state.chosenSynAnt;
  let dojoDeck = state.dojoDeck;

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
    let newArr;

    array.includes(answer) ? (newArr = array.filter((items) => items !== answer)) : (newArr = array);

    setState((prevState) => {
      return { ...prevState, [name]: newArr };
    });
  }

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
        {synAntChoice === "synonym" ? <button onClick={() => isCorrect(state.userAnswer, synCopy)}>Enter Synonym</button> : <button onClick={() => isCorrect(state.userAnswer, antCopy)}>Enter Antonym</button>}
        {antCopy.length === 0 && synAntChoice === "antonym" && firstUse === false ? (
          <div className="alert alert-light" role="alert">
            there are no antonyms for this word, would you like to add your own? or train synonyms?
            <button
              onClick={() =>
                setState((prevState) => {
                  return { ...prevState, chosenSynAnt: "synonym" };
                })
              }
            >
              Train Synonyms
            </button>
            <button onClick={() => saveToDeck(state, "dojo")}>Add Antonyms</button>
          </div>
        ) : synCopy.length === 0 && synAntChoice === "synonym" && firstUse === false ? (
          <div className="alert alert-light" role="alert">
            there are no synonyms for this word, would you like to add your own? or train antonyms?
            <button className="btn-success">Train Antonyms</button>
            <button className="btn-secondary">Add Synonyms</button>
          </div>
        ) : null}

        <div className="study-btn-div d-flex">
          <button className="study-btn" onClick={() => saveToDeck(state, "studyDeck")}>
            add to study
          </button>
          <button className="fav-btn" onClick={() => saveToDeck(state, "favDeck")}>
            add to favorites
          </button>
          <button className="fav-btn" onClick={() => saveToDeck(state, "dojo")}>
            add to dojo deck
          </button>
          <Link to="/trainer">
            <button className="def-home-btn">Go To Decks</button>
          </Link>
          <Link to="/choose">
            <button className="def-home-btn">Home</button>
          </Link>
        </div>
      </div>
    </>
  );
}

// add function to add own antonyms or snynonyms that adds to ant and syn array , not the copy and saves to local
// make it so if someone wants to delete a word outside of a study deck that has custom definitions, antonyms, or synonyms they are alerted that those will be removed permantley
// make sure the alert that pops up for the antonyms also works for synonyms if there are none.
// try adjusting checked radio buttons by using onChange instead of using conditional rendering like we have now
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
