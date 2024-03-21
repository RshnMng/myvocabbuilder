import { Context } from "../App";
import { useContext } from "react";

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
        <div>
          {associatedWords.map((word) => {
            return (
              <div>
                <div>{word}</div>
              </div>
            );
          })}
        </div>
        <div>
          {synonyms.map((word) => {
            return (
              <div>
                <div>{word}</div>
              </div>
            );
          })}
        </div>
        <div>
          {antonyms.map((word) => {
            return (
              <div>
                <div>{word}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// 1. give labels to each section so we know which words are what
// 2. limit the amount of ants and syns so it only shows the first 5
// 3. implement a button to be clicked to show 5 more, show in invrements of 5
