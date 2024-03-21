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
      </div>
    </>
  );
}

// add a button div, one to add to a study deck, and one to a favorites deck
// create working deck pages and create an array that takes this deck information and stores it into local storage
// create functionality to study and go through deck
// create shuffle functionality by using random number vs deck length
// create remove from deck and struggle deck access as well
// add home btn or some button to navigate out of this page
// also create place holder display for the period before someone searches thier first word
