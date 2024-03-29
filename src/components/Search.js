import { Context } from "../App";
import { useContext } from "react";

export default function Search() {
  let app = useContext(Context);
  let state = app.state;
  let updateInput = state.updateInput;
  let handleSearch = state.handleSearch;
  let searchedWord = state.searchedWord;
  let resetState = state.resetState;

  return (
    <>
      <input className="dict-input" onChange={updateInput}></input>
      <button className="dict-search-btn" onClick={() => handleSearch(searchedWord, resetState)}>
        search
      </button>
    </>
  );
}
