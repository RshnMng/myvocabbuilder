import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChoosePath from "./pages/ChoosePath";
import DictThes from "./pages/DictThes";
import Trainer from "./pages/Trainer";
import Welcome from "./pages/Welcome";
import Study from "./pages/Study";
import StudyDeck from "./pages/StudyDeck";
import Dojo from "./pages/Dojo";

import "./App.css";

export const Context = createContext();

console.log(process.env.REACT_APP_DICT_KEY, process.env.REACT_APP_SYN_KEY);

export default function App() {
  const synKey = process.env.REACT_APP_SYN_KEY;
  const dictKey = process.env.REACT_APP_DICT_KEY;
  const [state, setState] = useState({
    dictionary: require("an-array-of-english-words"),
    firstUse: true,
    wordData: [],
    searchedWord: "",
    foundWord: "",
    definitions: {},
    associatedWords: [],
    synonyms: [],
    antonyms: [],
    synCopy: [],
    antCopy: [],
    usedIndex: [],
    userAnswer: [],
    dojoDeck: [],
    didYouMean: [],
    favDeck: [],
    struggleDeck: [],
    chosenSynAnt: "synonym",
    updateInput: (event) => {
      setState((prevState) => {
        return { ...prevState, searchedWord: event.target.value };
      });
    },
    resetState: () => {
      setState((prevState) => {
        return {
          ...prevState,
          foundWord: "",
          definitions: {},
          associatedWords: [],
          synonyms: [],
          antonyms: [],
          wordData: [],
          didYouMean: [],
        };
      });
    },
    handleSearch: (word, resetFunc) => {
      resetFunc();
      fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${dictKey}`)
        .then((response) => response.json())
        .then((data) => {
          setState((prevState) => {
            return { ...prevState, definitions: { ...prevState.definitions, [data[0].fl]: data[0].shortdef } };
          });
        });
      fetch(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${synKey}`)
        .then((response) => response.json())
        .then((data) => {
          typeof data[0] === "string"
            ? setState((prevState) => {
                return { ...prevState, didYouMean: data };
              })
            : data.forEach((entry) => {
                let syns = [];
                let ants = [];
                entry.meta.syns.forEach((array) => syns.push(...array));
                entry.def[0].sseq.forEach((array) => {
                  array[0][1].ant_list &&
                    array[0][1].ant_list.forEach((array) => {
                      array.forEach((item) => ants.push(item.wd));
                    });

                  array[0][1].near_list &&
                    array[0][1].near_list.forEach((array) => {
                      array.forEach((item) => ants.push(item.wd));
                    });
                  array[0][1].rel_list &&
                    array[0][1].rel_list.forEach((array) => {
                      array.forEach((item) => syns.push(item.wd));
                    });
                });
                setState((prevState) => {
                  return {
                    ...prevState,
                    firstUse: false,
                    foundWord: data[0].hwi.hw,
                    wordData: data,
                    definitions: { ...prevState.definitions, [entry.fl]: entry.shortdef },
                    associatedWords: [...prevState.associatedWords, ...entry.meta.stems],
                    synonyms: [...prevState.synonyms, ...syns],
                    antonyms: [...prevState.antonyms, ...ants],
                    synCopy: [...prevState.synonyms, ...syns],
                    antCopy: [...prevState.antonyms, ...ants],
                  };
                });
              });
        });
    },
    saveToDeck: (currentState, name) => {
      let card = {
        word: currentState.searchedWord,
        def: currentState.definitions,
        associatedWords: currentState.associatedWords,
        syns: currentState.synonyms,
        ants: currentState.antonyms,
        correct: [],
      };

      let deckJSON = localStorage.getItem(name);
      let deck;
      deckJSON == null ? (deck = []) : (deck = JSON.parse(deckJSON));
      deck.push(card);

      let arrayJSON = JSON.stringify(deck);
      localStorage.setItem(name, arrayJSON);
    },
  });

  return (
    <>
      <BrowserRouter>
        <Context.Provider value={{ state, setState }}>
          <Routes>
            <Route path="/" element={<Welcome />}></Route>
            <Route path="/choose" element={<ChoosePath />} />
            <Route path="/dict&thes" element={<DictThes />} />
            <Route path="/trainer" element={<Trainer />} />
            <Route path="/study" element={<Study />} />
            <Route path="/studydeck" element={<StudyDeck name={"studyDeck"} />} />
            <Route path="/struggledeck" element={<StudyDeck name={"struggleDeck"} />} />
            <Route path="/favorites" element={<StudyDeck name={"favDeck"} />} />
            <Route path="/dojo" element={<Dojo />} />
          </Routes>
        </Context.Provider>
      </BrowserRouter>
    </>
  );
}

//................................................................

// dictionary & thesaurus//

//** [ WORD SEARCH ] */
// 1. search a word that returns a definition that also has a few syns and ants; a see more button can be clicked to see all syn or ant if any
// 2. on this card it has a add to deck button that adds it to study deck
// 3. also on this card has a favorite button that adds it to study deck and favorites deck
// 4. card displays part of speech with part of speech connected to its definition
// 5. card has audio played when button is clicked
// 6. handle misspell word and words that are modifcations of other words (ex. explicit, explicitly)

//**[ RANDOM WORD ] */
// 1. same functionality as above, except instead of choosing a word. You click a button that runs a function in which
//    a random number is created and is used to choose a word from the wordlist array.

//** [ STUDY DECKS ] */

// 1. two decks, SAVED WORDS & FAVORITES & DIFFICULT
// 2. All 3 decks have options where you can delete word from deck
// 3. each deck has its on view cards list where you can search for a word, this has buttons where you can also add to other lists or remove from lists by clicking buttons
// 4. deck have 2 study modes. Shuffle and Order
// 5. will have clear deck button, with a warning that makes a random code and makes you type it if you are sure; if not code entered wrong, it will let user know

// synonym & antonym trainer

// 1. two modes WORD SEARCH and RANDOM WORD like above
// 2. a button that specifies whether we want to match syns or ants, if any
// 3. a card is returned that displays the total number of syns or ants in the top left corner;
// 4. the user is provided with options of how many syns or ants it wants to try to guess, roughly amounting to 25%, 50%, 75% or 100%;
// 5. bubbles will pop down representing syns or ants that are covered up... think of family fued. along with an input area to type in
// 6. upon entry the word will be searched among all of the possible words, if there. the word will be revealed in a random one of the boxes available; (not hard coding)
// 7. if wrong an X pops up, three X's and you lose. for every sucesssful word you complete you get 6 X's added to your total that can be used on other words
// 8. after 3 X's are used a pop up comes up and says you lost and if you have X's asks you if you like to use more X's to keep guessing? if not you can cancel and go to another word.
// 9. whether you win or lose at the end youre are asked if you want to add word to your DOJO where you can later go and perform the same actions without risking X's.
// this is a way to train words youve already seen (x's) are usually relegated for words you have not previously saved into your DOJO.

// [DOJO]
// 1. same basic functionality as above, just with no expediture or collection of X's
// 2. a view words page that allows you to delete word from DOJO or delete all words from DOJO

// Eventually can make this multiplayer where you can basically play family fued but with synonyms and ant against a live player
