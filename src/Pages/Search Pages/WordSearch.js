import { useState } from "react";

export default function WordSearch() {
  const [searchState, setSearchState] = useState({
    userInput: "",
  });

  function updateUserInput(event) {
    setSearchState((prevState) => {
      return { ...prevState, userInput: event.target.value }; // updates userinput in state as user types in input search input field
    });
  }

  function searchWord() {
    console.log(searchState.userInput);
  }

  return (
    <>
      <div>Dictionary & Thesaurus</div>
      <input type="text" onChange={(event) => updateUserInput(event)} /> {/* fires function when ever something is tpyed in box */}
      <button onClick={() => searchWord()}>Search</button>
    </>
  );
}
