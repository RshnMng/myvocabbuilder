// const [state, setState] = useState({
//   dictionary: require("an-array-of-english-words"),
//   wordData: [],
//   searchedWord: "",
//   foundWord: "",
//   definitions: {},
//   associatedWords: [],
//   synonyms: [],
//   antonyms: [],
//   : [],
//   favDeck: [],
//   struggleDeck: [],
//   dojoDeck: [],
//   didYouMean: [],
// });

// const synKey = hidden;
// const dictKey = hidden;

// function updateInput(event) {
//   console.log(state.defintions);
//   setState((prevState) => {
//     return { ...prevState, searchedWord: event.target.value };
//   });
// }

// function handleSearch(word) {
//   resetState();
//   fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${dictKey}`)
//     .then((response) => response.json())
//     .then((data) => {
//       setState((prevState) => {
//         return { ...prevState, definitions: { ...prevState.definitions, [data[0].fl]: data[0].shortdef } };
//       });
//     });
//   fetch(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${synKey}`)
//     .then((response) => response.json())
//     .then((data) => {
//       typeof data[0] === "string"
//         ? setState((prevState) => {
//             return { ...prevState, didYouMean: data };
//           })
//         : data.forEach((entry) => {
//             let syns = [];
//             let ants = [];
//             entry.meta.syns.forEach((array) => syns.push(...array));
//             entry.def[0].sseq.forEach((array) => {
//               array[0][1].ant_list &&
//                 array[0][1].ant_list.forEach((array) => {
//                   array.forEach((item) => ants.push(item.wd));
//                 });

//               array[0][1].near_list &&
//                 array[0][1].near_list.forEach((array) => {
//                   array.forEach((item) => ants.push(item.wd));
//                 });
//               array[0][1].rel_list &&
//                 array[0][1].rel_list.forEach((array) => {
//                   array.forEach((item) => syns.push(item.wd));
//                 });
//             });
//             setState((prevState) => {
//               return {
//                 ...prevState,
//                 foundWord: data[0].hwi.hw,
//                 wordData: data,
//                 definitions: { ...prevState.definitions, [entry.fl]: entry.shortdef },
//                 associatedWords: [...prevState.associatedWords, ...entry.meta.stems],
//                 synonyms: [...prevState.synonyms, ...syns],
//                 antonyms: [...prevState.antonyms, ...ants],
//               };
//             });
//           });
//     });
// }

// function resetState() {
//   setState((prevState) => {
//     return {
//       ...prevState,
//       foundWord: "",
//       definitions: {},
//       associatedWords: [],
//       synonyms: [],
//       antonyms: [],
//       wordData: [],
//       didYouMean: [],
//     };
//   });
// }

// function handleRandom() {
//   console.log("handle random ran", state.definitions);
//   let randomNum = Math.floor(Math.random() * 274937);
//   let randomWord = state.dictionary[randomNum];
//   console.log(randomWord);
//   handleSearch(randomWord);
//   setState((prevState) => {
//     return { ...prevState, searchedWord: randomWord };
//   });
//   checkDefinitions();
// }

// function checkDefinitions() {
//   console.log(state);
//   console.log("check definitions ran");
//   if (state.definitions.hasOwnProperty(undefined) === false) {
//     console.log("found", state);
//     console.log(state.definitions);
//   } else {
//     console.log("not found", state);
//     console.log(state.definitions);
//     console.log("this is where handlerandom would be called again");
//     let newNum = Math.floor(Math.random() * 274937);
//     let newWord = state.dictionary[newNum];
//     console.log(newWord);
//     handleSearch(newWord);
//   }
// }

// i need to find a way to handle when the random word button calls up a word that doesnt have a definition,
// my original thought was to recall the function based on if the state.definition was undefined, but that keeps
// causing a loop, so we have to find another solution

{
  /* <input className="search-bar" onChange={(event) => updateInput(event)}></input>
      <button className="search-btn" onClick={() => handleSearch(state.searchedWord)}>
        search
      </button>
      <button
        className="random-btn"
        onClick={() => {
          resetState();
          handleRandom();
        }}
      >
        random
      </button>
      <textarea></textarea> */
}
