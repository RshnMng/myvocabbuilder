import { BrowserRouter, Routes, Route, useContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { wordInfoAndApi } from "./Pages/Utility Pages/WordInfoAndAPI";
import { globalFunctions } from "./Pages/Utility Pages/GlobalFunctions";
import { local } from "./Pages/Utility Pages/LocalStorage";
import Welcome from "./Pages/Navigation Pages/Welcome";
import HomePage from "./Pages/Navigation Pages/HomePage";
import WordSearch from "./Pages/Search Pages/WordSearch";
import VocabTrainerHome from "./Pages/Vocab Trainer Pages/VocabTrainerHome";
import StudyDeckHome from "./Pages/Study Deck Pages/StudyDeckHome";

export default function App() {
  let [appState, setAppState] = useState({
    allDecksEmpty: true,
  });
  useEffect(() => {
    let areEmpty = local.initialDeckSetUp(); // on page load, checks to see if our decks in local storage are null/undefined - if so it saves it as an empty array so its ready right away;
    // gets boolean from local file whether all decks are empty - sets all decks state variable depending on boolean it gets.
    setAppState((prevState) => {
      return { ...prevState, allDecksEmpty: areEmpty }; // sets all decks empty in state
    });
  }, [appState.allDecksEmpty]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="home" element={<HomePage />} />
          <Route path="word-search" element={<WordSearch />}></Route>
          <Route path="vocab-section-home" element={<VocabTrainerHome />} />
          <Route path="study-deck-home" element={<StudyDeckHome />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

// NEXT STEP//

// if all decks are empty make it so that the button study decks is disabled and unable to be clicked
