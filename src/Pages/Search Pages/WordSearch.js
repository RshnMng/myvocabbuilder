import { useState, useEffect } from "react";
import SearchDisplayHeader from "../../Components/Search Components/SearchDisplayHeader";
import SearchDisplay from "../../Components/Search Components/SearchDisplay";

export default function WordSearch() {
  const apiKey = process.env.REACT_APP_SYN_KEY; 
  const sndKey = process.env.REACT_APP_DICT_KEY;
  

   
  const [searchState, setSearchState] = useState({
    userInput: '', 
    dictionaryInfo: [],
    thesaurusInfo: [],
    searchedWord: '',
  });

  function updateUserInput(event) {
    setSearchState((prevState) => {
      return { ...prevState, userInput: event.target.value }; // updates userinput in state as user types in input search field
    });
  }

  function searchWord(word) {
    fetch(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${apiKey}`) // performs api call to word passed into the function
    .then((response) => response.json())
    .then((data) => setSearchState((prevState) => { return {...prevState, searchedWord: searchState.userInput, thesaurusInfo: data}})) // sets the data to wordInfo in searchState and saves the word that was searched into searched word variable and also saves the all the data returned by the api of that word into wordinfo

    fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${sndKey}`) // performs api call to word passed into the function
    .then((response) => response.json())
    .then((data) => setSearchState((prevState) => { return {...prevState, dictionaryInfo: data}}))
  }

  // useEffect(() => {
  //   console.log(searchState)
  // }, [searchState.dictionaryInfo])


  return (
    <>
      <div>Dictionary & Thesaurus</div>
      <input type="text" onChange={(event) => updateUserInput(event)} /> {/* fires function when ever something is tpyed in box */}
      <button onClick={() => {
        searchWord(searchState.userInput)
        setSearchState((prevState) => {
          return {...prevState, dictionaryInfo: [], thesaurusInfo: []}
        })
        
        }}>Search</button> 
      {/*on click search word func is ran and is passed in the word saved in searched state by update user input*/ }

      <SearchDisplayHeader searchState={searchState}/> {/*displays header for the definiton display area of the page */} 
    
      <SearchDisplay dictionaryInfo={searchState.dictionaryInfo} thesaurusInfo={searchState.thesaurusInfo}/> {/*passes word info from both api calls into the component so it can be rendered to the page*/}
      
    
    </>
  );
}
  
// 1. clear dictionary display when new word is searched // 
// 2. get thesaurus display working
// 3. save to github
