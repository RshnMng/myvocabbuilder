import { useState, useEffect } from "react";
import SearchDisplayHeader from "../../Components/Search Components/SearchDisplayHeader";
import SearchDisplay from "../../Components/Search Components/SearchDisplay";

export default function WordSearch() {
  const apiKey = process.env.REACT_APP_SYN_KEY;  // api keys to use during api call
  const sndKey = process.env.REACT_APP_DICT_KEY;
  

   
  const [searchState, setSearchState] = useState({ // sets a state and updates on each api call 
    userInput: '', 
    dictionaryInfo: [],
    thesaurusInfo: [],
    searchedWord: '',
    loading: false
  });

  function updateUserInput(event) {
    setSearchState((prevState) => {
      return { ...prevState, userInput: event.target.value }; // updates userinput in state as user types in input search field
    });
  }

  function searchWord(word) {
    setSearchState((prevState) => { return {...prevState, loading: true}})
    fetch(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${apiKey}`) // performs api call to word passed into the function
    .then((response) => response.json())
    .then((data) => setSearchState((prevState) => { return {...prevState, searchedWord: searchState.userInput, thesaurusInfo: data}})) // sets the data to wordInfo in searchState and saves the word that was searched into searched word variable and also saves the all the data returned by the api of that word into wordinfo

    fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${sndKey}`) // performs api call to word passed into the function
    .then((response) => response.json())
    .then((data) => setSearchState((prevState) => { return {...prevState, dictionaryInfo: data, loading: false}})) //sets state using information returned from the api call 
  }



  return (
    <>
      <div>Dictionary & Thesaurus</div>
      <input type="text" onChange={(event) => updateUserInput(event)} /> {/* fires function when ever something is tpyed in box */}
      <button onClick={() => { // empties current state and display while a new api fetch request is made and updated again when the info is successfully retrieved
        searchWord(searchState.userInput)
        setSearchState((prevState) => {
          return {...prevState, dictionaryInfo: [], thesaurusInfo: []}
        })
        
        }}>Search</button> 
      {/*on click search word func is ran and is passed in the word saved in searched state by update user input*/ }

      <SearchDisplayHeader searchState={searchState}/> {/*displays header for the definiton display area of the page */} 
        
        

      {searchState.loading === true ? <div>Loading...</div> : <SearchDisplay dictionaryInfo={searchState.dictionaryInfo} thesaurusInfo={searchState.thesaurusInfo}/>} {/*passes word info from both api calls into the component so it can be rendered to the page*/}

    
    </>
  );
}
  

// 2. get thesaurus display working
// 3. save to github
// 4. update exposition sentences
