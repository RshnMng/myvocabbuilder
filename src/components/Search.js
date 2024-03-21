import { Context } from "../App";
import { useContext } from "react";

export default function Search() {
  let state = useContext(Context);
  let updateInput = state.updateInput;
  let handleSearch = state.handleSearch;
  let searchedWord = state.searchedWord;
  let resetState = state.resetState;

  console.log(state);
  return (
    <>
      <input className="dict-input" onChange={updateInput}></input>
      <button className="dict-search-btn" onClick={() => handleSearch(searchedWord, resetState)}>
        search
      </button>
    </>
  );
}

//1. make it so when you enter a word in the search input and hit the search button - all the
// information we want displayed shows up on the display side.
