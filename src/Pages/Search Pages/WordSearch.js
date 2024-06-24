import { useState } from "react";
import SearchDefinition from "../../Components/Search Components/SearchDefinition";
import SearchDisplayHeader from "../../Components/Search Components/SearchDisplayHeader";

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


  searchState.dictionaryInfo.map((item) => {
    item.def.map((nestedArr) => {
      nestedArr.sseq.map((sndNest) => {
        sndNest.map((defArr) => {
          let definition = '';
          defArr[1].dt === undefined ? console.log('nope') : definition = defArr[1].dt[0][1];
          let regex = /[^0-9a-zA-Z]+/g
         let newDef = definition.replace(regex, ' ');

         let newerDef = newDef.replace( /bc/g, '');
         let def1 = newerDef.replace(/sx/g, '');
         let def2 = def1.replace(/dx/g, '');
         let def3 = def2.replace(/dxt/g, '');
         let def4 = def3.replace(/d link/g, '')
         let def5 = def4.replace(/def/g , '')
         let def6 = def5.replace(/1 1e/g , '')
         let def7 = def6.replace(/see t/g , '')


          console.log(def7)
          
        })
      })
    })
    // item.map((defArr) => {
    //   defArr.map((arr) => {
    //     let definition = arr[1].dt[0][1];
    //     console.log(definition)
    //   })
    // })
  })

  // let definitionArray = definitionInfo.def[0].sseq;


  // definitionArray.map((defArr) => {
  //     defArr.map((arr) => {
  //         let definition = arr[1].dt[0][1];
  //         console.log(definition)
  //     })
  // })

 
  return (
    <>
      <div>Dictionary & Thesaurus</div>
      <input type="text" onChange={(event) => updateUserInput(event)} /> {/* fires function when ever something is tpyed in box */}
      <button onClick={() => searchWord(searchState.userInput)}>Search</button> 
      {/*on click search word func is ran and is passed in the word saved in searched state by update user input*/ }

      <SearchDisplayHeader searchState={searchState}/> {/*displays header for the definiton display area of the page */}   

      
    
    </>
  );
}
  
{/* */}
// next steps --- in the return section on this component -- use word info to map 
// through the array items while making a new component for each item amd access the 
// neccesary word information [synonyms, antonyms, part of speech] through that particular component 