import { Context } from "../App";
import { useContext } from "react";
import WordSections from "./WordSections";

export default function Definition() {
  let state = useContext(Context);
  let foundWord = state.foundWord;
  let searchWord = state.searchWord;
  let definitions = state.definitions;
  let associatedWords = state.associatedWords;
  let synonyms = state.synonyms;
  let antonyms = state.antonyms;
  let saveToDeck = state.saveToDeck;
  let studyDeck = state.studyDeck;
  let favDeck = state.favDeck;

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
        <WordSections title="Associated Words" array={associatedWords} limit={6} index={0} />

        <div className="def-synonyms">
          <WordSections title="Synonyms" array={synonyms} limit={6} index={0} />
        </div>

        <div className="def-antonyms">
          <WordSections title="Antonyms" array={antonyms} limit={6} index={0} />
        </div>
        <div className="study-btn-div d-flex">
          <button className="study-btn" onClick={() => saveToDeck(state, "studyDeck")}>
            study
          </button>
          <button className="fav-btn" onClick={() => saveToDeck(state, "favDeck")}>
            fav
          </button>
        </div>
      </div>
    </>
  );
}

// local storage reset on everypage refresh, go to app page where local storage is being set and find a way to maintain local
// storage withougt it being reset between page refresh so we can maintain usage during diffeent sessions
// create working deck pages
// create functionality to study and go through deck
// create shuffle functionality by using random number vs deck length
// create remove from deck and struggle deck access as well
// add home btn or some button to navigate out of this page
// also create place holder display for the period before someone searches thier first word
// make it so all synonyms and antonym can be clicked on and when clicked on it fires the handle search function searching the clicked word
// make it so when you do search a new word that the limit for both the anytonym and synonyms are set back to 6
